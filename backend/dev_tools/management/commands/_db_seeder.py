import datetime
import decimal
import random
import time

import faker
from django.utils.timezone import make_aware

from accounts.models import Profile, User
from celebrities.models import Celebrity
from chat.models import Message
from movies.models import (
    Movie,
    MovieCrew,
    MovieImage,
    MovieTrailer,
    UserMovieRating,
    UserMovieReview,
)

fake = faker.Faker()
fake.add_provider(faker.providers.person)
fake.add_provider(faker.providers.lorem)
fake.add_provider(faker.providers.date_time)

PROFILE_IMAGES = [
    "accounts/dummy/profile_picture_1.jpg",
    "accounts/dummy/profile_picture_2.jpg",
    "accounts/dummy/profile_picture_3.jpg",
]

MOVIE_IMAGES = [
    ("movies/dummy/poster_image_1.jpg", "movies/dummy/cover_image_1.jpg"),
    ("movies/dummy/poster_image_2.jpg", "movies/dummy/cover_image_2.jpg"),
    ("movies/dummy/poster_image_3.jpg", "movies/dummy/cover_image_3.jpg"),
]

CELEBRITY_IMAGES = [
    "celebrities/dummy/celebrity_1.jpg",
    "celebrities/dummy/celebrity_2.jpg",
    "celebrities/dummy/celebrity_3.jpg",
    "celebrities/dummy/celebrity_4.jpg",
]


def _random_date(
    start_date=make_aware(datetime.datetime(1990, 1, 1)),
    end_date=make_aware(datetime.datetime.today()),
):
    time_between_dates = end_date - start_date
    days_between_dates = time_between_dates.days
    random_number_of_days = random.randrange(days_between_dates)
    random_date = start_date + datetime.timedelta(days=random_number_of_days)
    return random_date


def seed_user(users_count: int = 20):
    print(f"\nSeeding {users_count} users...")
    for user_number in range(users_count):
        user = User(
            first_name=fake.first_name(),
            last_name=fake.last_name(),
            email=f"user{user_number}@test.com",
        )
        user.set_password("^YHN7ujm")

        user.profile = Profile(user=user, image=random.choice(PROFILE_IMAGES))
        user.save()
        user.profile.save()
        user.last_seen = make_aware(fake.date_time_this_year())
        user.save()

        print(f"Progress: {((user_number+1)/users_count * 100):.2f}%", end="\r")
    print()


def seed_movie(movie_count: int = 500):
    trailers = [
        "movies/dummy/trailers/dummy-trailer-1.mp4",
        "movies/dummy/trailers/dummy-trailer-2.mp4",
    ]
    images = [
        "movies/dummy/images/dummy-gallery-1.jpg",
        "movies/dummy/images/dummy-gallery-2.jpg",
    ]

    print(f"\nSeeding {movie_count} movies...")
    for movie_number in range(movie_count):
        display_images = random.choice(MOVIE_IMAGES)
        movie = Movie(
            title=fake.text(max_nb_chars=30),
            tagline=fake.text(max_nb_chars=60),
            rating=random.choice(Movie.RATING_CHOICES),
            synopsis=fake.paragraph(nb_sentences=6),
            release_date=_random_date(),
            cover_image=display_images[1],
            poster_image=display_images[0],
            popularity=random.randint(0, 100),
            price=random.randint(1, 100),
        )
        movie.save()
        counter = 0
        for trailer_url, image_url in zip(trailers, images):
            trailer = MovieTrailer(
                movie=movie,
                title=f"Trailer {fake.text(max_nb_chars=20)}",
                video=trailer_url,
                duration=datetime.timedelta(minutes=random.randint(1, 60)),
            )
            trailer.save()

            image = MovieImage(
                movie=movie,
                caption=f"Image {fake.text(max_nb_chars=20)}",
                image=image_url,
            )
            image.save()
            counter += 1

        print(f"Progress: {((movie_number+1)/movie_count * 100):.2f}%", end="\r")
    print()


def seed_superuser():
    user = User(
        first_name=fake.first_name(),
        last_name=fake.last_name(),
        email=f"admin@test.com",
        is_superuser=True,
        is_admin=True,
    )
    user.set_password("^YHN7ujm")
    user.profile = Profile(user=user, image=random.choice(PROFILE_IMAGES))
    user.save()
    user.profile.save()
    user.last_seen = make_aware(fake.date_time_this_year())
    user.save()

    print("\nSuper user created.")
    print(f"Email: {user.email}")
    print("Password: ^YHN7ujm")


def seed_celebrities(celebrity_count: int = 50):
    print(f"\nSeeding {celebrity_count} celebrities...")
    for celebrity_number in range(celebrity_count):
        celeb = Celebrity(
            first_name=fake.first_name(),
            last_name=fake.last_name(),
            date_of_birth=fake.date_this_century(),
            description=fake.paragraph(nb_sentences=10),
            popularity_score=decimal.Decimal(random.randint(0, 100)),
            debut_date=fake.date_this_century(),
            image=random.choice(CELEBRITY_IMAGES),
        )

        celeb.save()

        print(
            f"Progress: {((celebrity_number+1)/celebrity_count * 100):.2f}%",
            end="\r",
        )
    print()


def seed_movie_crew():
    movies = Movie.objects.all()
    celebrities = list(Celebrity.objects.all())
    movies_count = len(movies)
    movie_number = 0

    print(f"\nSeeding {movies_count} movies with crew...")
    for movie in movies:
        crew_count = random.randint(5, 15)
        movie_celebrities = random.sample(celebrities, crew_count)
        for crewmate_number in range(crew_count):
            crewmate = MovieCrew(
                movie=movie,
                celebrity=movie_celebrities[crewmate_number],
                role=random.choice(MovieCrew.ROLE_CHOICES),
            )
            crewmate.save()

        movie_number += 1
        print(
            f"Progress: {((movie_number)/movies_count * 100):.2f}%",
            end="\r",
        )
    print()


def seed_user_rating_and_reviews():
    users = User.objects.all()
    movies = Movie.objects.all()
    movies_count = len(movies)
    movie_number = 0

    print(f"\nSeeding {movies_count} movies with ratings and reviews...")
    for movie in movies:
        rating_count = random.randint(5, 15)
        sample_users = random.sample(list(users), rating_count)
        for rating_number in range(rating_count):
            user_rating = UserMovieRating(
                movie=movie,
                user=sample_users[rating_number],
                rating=random.randint(1, 11),
            )
            user_rating.save()

        for review_number in range(rating_count):
            user_review = UserMovieReview(
                movie=movie,
                user=sample_users[review_number],
                review=fake.text(max_nb_chars=500),
            )
            user_review.save()

        movie_number += 1
        print(
            f"Progress: {((movie_number)/movies_count * 100):.2f}%",
            end="\r",
        )
    print()


def seed_messages(range_count: (int, int) = (3, 10)):
    users = list(User.objects.all())
    users_count = len(users)
    user_number = 0

    print(f"\nSeeding {users_count} users with messages...")
    for sender_user in users:
        recipent_users = random.sample(users, random.randint(*range_count))
        for recipent_user in recipent_users:
            message = Message(
                sender=sender_user,
                receiver=recipent_user,
                text=fake.text(max_nb_chars=200),
            )
            message.save()
            message.time = make_aware(fake.date_time_this_decade())
            message.save()
        user_number += 1

        print(
            f"Progress: {((user_number)/users_count * 100):.2f}%",
            end="\r",
        )
    print()


def deleteOldTables():
    Message.objects.all().delete()
    print("Old Messages Deleted.")
    UserMovieRating.objects.all().delete()
    UserMovieReview.objects.all().delete()
    print("Old User Ratings and Reviews Deleted.")
    MovieCrew.objects.all().delete()
    print("Old Crews Deleted.")
    Celebrity.objects.all().delete()
    print("Old Celebrities Deleted.")
    Movie.objects.all().delete()
    print("Old Movies Deleted.")
    User.objects.all().delete()
    print("Old Users Deleted.")


def seed_all_default():
    deleteOldTables()

    seed_user()
    seed_celebrities()
    seed_movie()
    seed_movie_crew()
    seed_user_rating_and_reviews()
    seed_messages()
    seed_superuser()
