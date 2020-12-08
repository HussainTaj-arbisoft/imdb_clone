from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.exceptions import AuthenticationFailed
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.response import Response

from django.db.models.aggregates import Avg

from .models import Movie, MovieCrew, UserMovieRating, UserMovieReview
from .serializers import (
    MovieSerializer,
    MovieCrewSerializer,
    UserMovieRatingSerializer,
    UserMovieReviewSerializer,
)
from .permissions import IsOwnerOrReadOnly


class MovieViewSet(viewsets.ModelViewSet):
    queryset = Movie.objects.annotate(
        average_user_rating=Avg("user_ratings__rating")
    ).all()
    serializer_class = MovieSerializer
    pagination_class = LimitOffsetPagination


class MovieCrewListAPIView(ListAPIView):
    serializer_class = MovieCrewSerializer

    def get_queryset(self):
        movie_id = self.kwargs.get("movie_id")
        return MovieCrew.objects.filter(movie__id=movie_id).order_by(
            "-celebrity__popularity_score"
        )


class UserMovieRatingViewSet(viewsets.ModelViewSet):
    serializer_class = UserMovieRatingSerializer
    queryset = UserMovieRating.objects.all()
    permission_classes = [IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]
    pagination_class = LimitOffsetPagination

    def perform_create(self, serializer):
        if serializer.validated_data.get("user") != self.request.user:
            raise AuthenticationFailed(
                "User that is trying to rate is not the user signed in.",
                status.HTTP_406_NOT_ACCEPTABLE,
            )
        rating = UserMovieRating.objects.filter(
            movie=serializer.validated_data.get("movie"),
            user=serializer.validated_data.get("user"),
        ).first()

        if rating is None:
            super().perform_create(serializer)
        else:
            rating.rating = serializer.validated_data.get("rating")
            rating.save()

    @action(
        methods=["get"],
        url_path="user_movie_rating/(?P<movie_id>[0-9a-f-]+)",
        detail=False,
    )
    def user_movie_rating(self, request, movie_id):
        if not request.user.is_authenticated:
            raise AuthenticationFailed(
                "Not signed in.", status.HTTP_401_UNAUTHORIZED
            )

        rating = UserMovieRating.objects.filter(
            movie=movie_id, user=request.user.id
        ).first()

        return Response(self.serializer_class(rating).data)


class UserMovieReviewViewSet(viewsets.ModelViewSet):
    serializer_class = UserMovieReviewSerializer
    queryset = UserMovieReview.objects.all()
    permission_classes = [IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]
    pagination_class = LimitOffsetPagination

    def perform_create(self, serializer):
        print("\n\n\n CAME TO CREATE \n\n\n")
        if serializer.validated_data.get("user") != self.request.user:
            raise AuthenticationFailed(
                "User that is trying to review is not the user signed in.",
                status.HTTP_406_NOT_ACCEPTABLE,
            )
        review = UserMovieReview.objects.filter(
            movie=serializer.validated_data.get("movie"),
            user=serializer.validated_data.get("user"),
        ).first()

        if review is None:
            super().perform_create(serializer)
        else:
            review.review = serializer.validated_data.get("review")
            review.save()

    @action(
        methods=["get"],
        url_path="user_movie_review/(?P<movie_id>[0-9a-f-]+)",
        detail=False,
    )
    def user_movie_rating(self, request, movie_id):
        if not request.user.is_authenticated:
            raise AuthenticationFailed(
                "Not signed in.", status.HTTP_401_UNAUTHORIZED
            )

        review = UserMovieReview.objects.filter(
            movie=movie_id, user=request.user.id
        ).first()

        return Response(self.serializer_class(review).data)
