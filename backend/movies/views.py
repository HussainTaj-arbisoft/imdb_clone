from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.generics import ListAPIView

from .models import Movie, MovieCrew
from .serializers import MovieSerializer, MovieCrewSerializer


class MovieViewSet(viewsets.ModelViewSet):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer
    pagination_class = LimitOffsetPagination


class MovieCrewListAPIView(ListAPIView):
    serializer_class = MovieCrewSerializer

    def get_queryset(self):
        movie_id = self.kwargs.get("movie_id")
        return MovieCrew.objects.filter(movie__id=movie_id).order_by(
            "-celebrity__popularity_score"
        )
