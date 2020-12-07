import os
import uuid

from django.db import models
from django.conf import settings


def _get_movie_cover_image_url(instance, filename):
    return f"movies/{instance.id}/cover_image{os.path.splitext(filename)[1]}"


def _get_movie_poster_image_url(instance, filename):
    return f"movies/{instance.id}/poster_image{os.path.splitext(filename)[1]}"


def _get_movie_trailer_video_url(instance, filename):
    return f"movies/{instance.movie.id}/trailers/{uuid.uuid4()}{filename}"


def _get_movie_image_url(instance, filename):
    return f"movies/{instance.movie.id}/images/{uuid.uuid4()}{filename}"


class Movie(models.Model):
    RATING_CHOICES = (
        ("G", "G - General Audiences"),
        ("PG", "PG - Parental Guidance Suggested"),
        ("PG-13", "PG-13 - Parents Strongly Cautioned"),
        ("R", "R - Restricted Children Under 17"),
        ("NC-17", "NC-17 - No One 17 and Under"),
    )
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(verbose_name="Title", max_length=500)
    tagline = models.CharField(verbose_name="Title", max_length=1024)
    rating = models.CharField(
        verbose_name="Rating", max_length=100, choices=RATING_CHOICES
    )
    synopsis = models.TextField(verbose_name="Synopsis")
    release_date = models.DateTimeField(verbose_name="Release Date")
    cover_image = models.ImageField(
        "Cover Image",
        upload_to=_get_movie_cover_image_url,
        max_length=2048,
    )
    poster_image = models.ImageField(
        "Poster Image",
        upload_to=_get_movie_poster_image_url,
        max_length=2048,
    )

    class Meta:
        ordering = ("-release_date",)

    def __str__(self):
        return f"{self.title} ({self.id})"


class MovieTrailer(models.Model):
    movie = models.ForeignKey(
        Movie, on_delete=models.CASCADE, related_name="trailers"
    )
    title = models.CharField(verbose_name="Title", max_length=500)
    video = models.FileField(
        "Video", upload_to=_get_movie_trailer_video_url, max_length=2048
    )
    duration = models.DurationField("Duration")

    def __str__(self):
        return f"{self.video}"


class MovieImage(models.Model):
    movie = models.ForeignKey(
        Movie, on_delete=models.CASCADE, related_name="images"
    )
    caption = models.CharField(verbose_name="Caption", max_length=500)
    image = models.ImageField(
        "Image", upload_to=_get_movie_image_url, max_length=2048
    )

    def __str__(self):
        return f"{self.image}"


class MovieCrew(models.Model):
    ROLE_CHOICES = (
        ("Cast", "Cast"),
        ("Director", "Director"),
        ("Writer", "Writer"),
        ("Producer", "Producer"),
        ("Animator", "Animator"),
    )

    movie = models.ForeignKey(Movie, models.CASCADE, related_name="crew")
    celebrity = models.ForeignKey(
        settings.CELEBRITY_MODEL, models.CASCADE, related_name="movies"
    )
    role = models.CharField("Role", max_length=50, choices=ROLE_CHOICES)

    def __str__(self):
        return f"{self.celebrity} {self.movie} {self.role}"