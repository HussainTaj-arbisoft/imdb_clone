import djoser.serializers
from rest_framework import serializers

from .models import Profile, User


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = "__all__"


class UserSerializer(djoser.serializers.UserSerializer):
    profile = ProfileSerializer()

    class Meta(djoser.serializers.UserSerializer.Meta):
        fields = [
            "id",
            "first_name",
            "last_name",
            "email",
            "last_seen",
            "profile",
        ]


class UserCreateSerializer(djoser.serializers.UserCreateSerializer):
    class Meta(djoser.serializers.UserCreateSerializer.Meta):
        model = User
        fields = (
            "id",
            "email",
            "password",
            "first_name",
            "last_name",
        )
