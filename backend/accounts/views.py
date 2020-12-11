from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import ListModelMixin
from rest_framework.decorators import action
from rest_framework.pagination import LimitOffsetPagination

from .serializers import UserSerializer
from .models import User


class UserListViewSet(GenericViewSet, ListModelMixin):
    queryset = User.objects.filter(is_active=True)
    serializer_class = UserSerializer
    pagination_class = LimitOffsetPagination

    def get_queryset(self):
        order_by = self.request.query_params.get("order_by")
        if order_by is not None:
            return super().get_queryset().order_by(order_by)
        return super().get_queryset()
