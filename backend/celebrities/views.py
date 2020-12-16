from django.utils import timezone
from rest_framework.generics import ListAPIView
from rest_framework.pagination import LimitOffsetPagination

from .models import Celebrity
from .serializers import CelebritySerializer


class CelebritiesListAPIView(ListAPIView):
    serializer_class = CelebritySerializer
    queryset = Celebrity.objects.all()
    pagination_class = LimitOffsetPagination


class CelebritiesBornTodayListAPIView(ListAPIView):
    serializer_class = CelebritySerializer
    queryset = Celebrity.objects.order_by("-debut_date")
    pagination_class = LimitOffsetPagination
