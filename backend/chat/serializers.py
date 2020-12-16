from rest_framework import serializers

from accounts.serializers import UserSerializer

from .models import Message


class MessageSerializer(serializers.ModelSerializer):
    sender = UserSerializer()
    receiver = UserSerializer()

    class Meta:
        model = Message
        fields = "__all__"
