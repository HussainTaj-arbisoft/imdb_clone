from django.urls import path

from .views import CelebritiesBornTodayListAPIView, CelebritiesListAPIView

urlpatterns = [
    path("", CelebritiesListAPIView.as_view()),
    path("born_today", CelebritiesBornTodayListAPIView.as_view()),
]
