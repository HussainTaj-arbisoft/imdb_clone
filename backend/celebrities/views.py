from rest_framework.generics import ListAPIView
from rest_framework.pagination import LimitOffsetPagination

from .serializers import CelebritySerializer
from .models import Celebrity


class CelebritiesListAPIView(ListAPIView):
    serializer_class = CelebritySerializer
    queryset = Celebrity.objects.all()
    pagination_class = LimitOffsetPagination
