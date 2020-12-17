import itertools

from django.contrib.auth import get_user_model
from django.db.models import Q, Sum
from rest_framework.decorators import action
from rest_framework.generics import ListAPIView
from rest_framework.mixins import ListModelMixin
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import GenericViewSet

from .models import Message
from .serializers import MessageSerializer, UserSerializer

User = get_user_model()


class MessageViewSet(GenericViewSet, ListModelMixin):
    serializer_class = MessageSerializer
    queryset = Message.objects
    permission_classes = [IsAuthenticated]
    pagination_class = LimitOffsetPagination

    def filter_queryset(self, *args, **kwargs):
        return (
            super()
            .get_queryset()
            .filter(
                Q(receiver=self.request.user) | Q(sender=self.request.user)
            )
        )

    @action(
        methods=["GET"],
        detail=False,
        url_path=r"user_messages/(?P<user_id>\d+)",
    )
    def user_messages(self, *args, **kwargs):
        user_id = kwargs.get("user_id")
        queryset = (
            super()
            .get_queryset()
            .filter(
                Q(receiver=self.request.user, sender_id=user_id)
                | Q(sender=self.request.user, receiver_id=user_id)
            )
        )
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class MessageContacts(ListAPIView):
    serializer_class = UserSerializer
    pagination_class = LimitOffsetPagination
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return User.objects

    def list(self, request, *args, **kwargs):
        """
        Return a list of last messages sent by each unqiue sender to
        this user.
        """
        user_receiver_sender_ids = (
            Message.objects.filter(
                Q(receiver=self.request.user) | Q(sender=self.request.user)
            )
            .order_by()
            .distinct("receiver", "sender")
            .values_list("receiver", "sender")
        )
        user_ids_list = list(sum(user_receiver_sender_ids, ()))
        user_ids = set(user_ids_list)  # Get unique ids
        user_ids.discard(self.request.user.id)

        queryset = User.objects.filter(id__in=user_ids)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
