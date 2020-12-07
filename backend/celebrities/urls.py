from django.urls import path
from .views import CelebritiesListAPIView, CelebritiesBornTodayListAPIView

urlpatterns = [
    path("", CelebritiesListAPIView.as_view()),
    path("born_today", CelebritiesBornTodayListAPIView.as_view()),
]
