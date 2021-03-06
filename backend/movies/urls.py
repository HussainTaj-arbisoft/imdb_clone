from django.urls import include, path
from rest_framework.routers import DefaultRouter

from movies import views

router = DefaultRouter()
router.register("ratings", views.UserMovieRatingViewSet)
router.register("reviews", views.UserMovieReviewViewSet)
router.register("wishlist", views.WishListViewSet)
router.register("", views.MovieViewSet)

urlpatterns = [
    path("", include(router.urls)),
    path("crew/<str:movie_id>/", views.MovieCrewListAPIView.as_view()),
]
