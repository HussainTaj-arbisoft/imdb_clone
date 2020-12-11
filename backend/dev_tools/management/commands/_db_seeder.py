import datetime
import decimal
import random
import time
import decimal

from django.utils.timezone import make_aware
import faker

from accounts.models import User, Profile
from movies.models import (
    Movie,
    MovieImage,
    MovieTrailer,
    MovieCrew,
    UserMovieRating,
    UserMovieReview,
)
from celebrities.models import Celebrity


fake = faker.Faker()
fake.add_provider(faker.providers.person)
fake.add_provider(faker.providers.lorem)
fake.add_provider(faker.providers.date_time)

PROFILE_IMAGES = [
    "accounts/dummy/profile_picture_1.jpg",
    "accounts/dummy/profile_picture_2.jpg",
    "accounts/dummy/profile_picture_3.jpg",
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
    User.objects.all().delete()
    print("\nOld Users Deleted.")

    print(f"Seeding {users_count} users...")
    for user_number in range(users_count):
        user = User(
            first_name=fake.first_name(),
            last_name=fake.last_name(),
            email=f"user{user_number}@test.com",
            last_seen=fake.date_time_this_month(),
        )
        user.set_password("#EDC4rfv")

        user.save()

        profile = Profile(user=user, image=random.choice(PROFILE_IMAGES))
        profile.save()

        print(
            f"Progress: {((user_number+1)/users_count * 100):.2f}%", end="\r"
        )
    print()


def seed_movie(movie_count: int = 500):
    Movie.objects.all().delete()
    print("\nOld Movies Deleted.")

    trailers = [
        "movies/dummy/trailers/dummy-trailer-1.mp4",
        "movies/dummy/trailers/dummy-trailer-2.mp4",
    ]
    images = [
        "movies/dummy/images/dummy-gallery-1.jpg",
        "movies/dummy/images/dummy-gallery-2.jpg",
    ]

    print(f"Seeding {movie_count} movies...")
    for movie_number in range(movie_count):
        movie = Movie(
            title=fake.text(max_nb_chars=30),
            tagline=fake.text(max_nb_chars=60),
            rating=random.choice(Movie.RATING_CHOICES),
            synopsis=fake.paragraph(nb_sentences=6),
            release_date=_random_date(),
            cover_image="movies/dummy/cover_image.jpg",
            poster_image="movies/dummy/poster_image.jpg",
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

        print(
            f"Progress: {((movie_number+1)/movie_count * 100):.2f}%", end="\r"
        )
    print()


def seed_superuser():
    user = User.objects.create_superuser("admin@test.com", "admin", "admin")
    user.set_password("#EDC4rfv")
    user.save()

    profile = Profile(user=user, image=random.choice(PROFILE_IMAGES))
    profile.save()

    print("\nSuper user created.")
    print(f"Email: {user.email}")
    print("Password: #EDC4rfv")


def seed_celebrities(celebrity_count: int = 50):
    Celebrity.objects.all().delete()
    print("\nOld Celebrities Deleted.")

    print(f"Seeding {celebrity_count} celebrities...")
    for celebrity_number in range(celebrity_count):
        celeb = Celebrity(
            first_name=fake.first_name(),
            last_name=fake.last_name(),
            date_of_birth=fake.date_this_century(),
            description=fake.paragraph(nb_sentences=10),
            popularity_score=decimal.Decimal(random.random()),
            debut_date=fake.date_this_century(),
            image="celebrities/dummy/celebrity_image.jpg",
        )

        celeb.save()

        print(
            f"Progress: {((celebrity_number+1)/celebrity_count * 100):.2f}%",
            end="\r",
        )
    print()


def seed_movie_crew():
    MovieCrew.objects.all().delete()
    print("\nOld Crews Deleted.")

    movies = Movie.objects.all()
    celebrities = list(Celebrity.objects.all())
    movies_count = len(movies)
    movie_number = 0

    print(f"Seeding {movies_count} movies with crew...")
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
    UserMovieRating.objects.all().delete()
    UserMovieReview.objects.all().delete()
    print("\nOld User Ratings and Reviews Deleted.")

    users = User.objects.all()
    movies = Movie.objects.all()
    movies_count = len(movies)
    movie_number = 0

    print(f"Seeding {movies_count} movies with ratings and reviews...")
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


def seed_all_default():
    seed_user()
    seed_celebrities()
    seed_movie()
    seed_movie_crew()
    seed_user_rating_and_reviews()
    seed_superuser()