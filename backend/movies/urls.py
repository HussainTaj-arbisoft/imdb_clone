from django.urls import path, include
from rest_framework.routers import DefaultRouter
from movies import views

router = DefaultRouter()
router.register("", views.MovieViewSet)

urlpatterns = [
    path("", include(router.urls)),
    path("crew/<str:movie_id>/", views.MovieCrewListAPIView.as_view()),
]