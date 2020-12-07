from django.conf import settings
from rest_framework import serializers

from .models import Movie, MovieImage, MovieTrailer, MovieCrew
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

    class Meta:
        model = Movie
        fields = "__all__"


class MovieCrewSerializer(serializers.ModelSerializer):
    celebrity = CelebritySerializer()

    class Meta:
        model = MovieCrew
        fields = "__all__"