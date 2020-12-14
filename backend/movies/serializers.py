from django.conf import settings
from rest_framework import serializers

from .models import (
    Movie,
    MovieImage,
    MovieTrailer,
    MovieCrew,
    UserMovieRating,
    UserMovieReview,
    WishList,
)
from celebrities.serializers import CelebritySerializer


class MovieTrailerSerializer(serializers.ModelSerializer):
    class Meta:
        model = MovieTrailer
        fields = "__all__"


class MovieImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = MovieImage
        fields = "__all__"


class MovieSerializer(serializers.ModelSerializer):
    trailers = MovieTrailerSerializer(many=True)
    images = MovieImageSerializer(many=True)
    average_user_rating = serializers.DecimalField(
        max_digits=3, decimal_places=1, required=False
    )

    class Meta:
        model = Movie
        fields = "__all__"


class MovieCrewSerializer(serializers.ModelSerializer):
    celebrity = CelebritySerializer()

    class Meta:
        model = MovieCrew
        fields = "__all__"


class UserMovieRatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserMovieRating
        fields = "__all__"


class UserMovieReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserMovieReview
        fields = "__all__"


class WishListSerialiser(serializers.ModelSerializer):
    movie_item = MovieSerializer(
        source="movie", read_only=True, required=False
    )

    class Meta:
        model = WishList
        fields = "__all__"
