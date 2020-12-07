from django.urls import path
from .views import CelebritiesListAPIView

urlpatterns = [path("", CelebritiesListAPIView.as_view())]
