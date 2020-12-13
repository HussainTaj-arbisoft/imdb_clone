import json
from channels.generic.websocket import (
    AsyncWebsocketConsumer,
    AsyncJsonWebsocketConsumer,
)
from channels.db import database_sync_to_async
from django.db.models import Q

from accounts.models import User
from accounts.serializers import UserSerializer

from .models import Message
from .serializers import MessageSerializer


@database_sync_to_async
def add_message(sender_id, receiver_id, text_message):
    message = Message.objects.create(
        sender_id=sender_id,
        receiver_id=receiver_id,
        text=text_message,
    )
    serializer = MessageSerializer(instance=message)
    return serializer.data


@database_sync_to_async
def get_existing_messages(sender_id, receiver_id):
    queryset = Message.objects.filter(
        Q(receiver=receiver_id, sender_id=sender_id)
        | Q(sender=receiver_id, receiver_id=sender_id)
    ).order_by("time")

    serializer = MessageSerializer(instance=queryset, many=True)
    return serializer.data


@database_sync_to_async
def get_user(user_id):
    user = User.objects.get(id=user_id)
    serializer = UserSerializer(instance=user)
    return serializer.data


class ChatConsumer(AsyncJsonWebsocketConsumer):
    def is_authenticated(self, user):
        if user is None or user.id is None or not user.is_authenticated:
            return False
        return True

    async def connect(self):
        await self.accept()

        if not (self.is_authenticated(self.scope["user"])):
            await self.close(code=4403)
            return

        self.to_user_id = int(self.scope["url_route"]["kwargs"]["user_id"])
        self.from_user_id = self.scope["user"].id
        self.ids = sorted([self.to_user_id, self.from_user_id])
        self.room_group_name = f"chat_{self.ids[0]}_{self.ids[1]}"

        # join room group
        await self.channel_layer.group_add(
            self.room_group_name, self.channel_name
        )

    async def disconnect(self, close_code):
        if getattr(self, "room_group_name", None) is not None:
            await self.channel_layer.group_discard(
                self.room_group_name, self.channel_name
            )

    async def receive_json(self, data):
        req_type = data["type"]

        if req_type == "user_info":
            await self.send_json(
                {
                    "type": "user_info",
                    "data": await get_user(self.to_user_id),
                }
            )
            return

        if req_type == "all_messages":
            await self.send_json(
                {
                    "type": "all_messages",
                    "data": await get_existing_messages(
                        self.from_user_id, self.to_user_id
                    ),
                }
            )
            return

        if req_type == "message":
            text_message = data["message"]
            message = await add_message(
                self.from_user_id, self.to_user_id, text_message
            )

            # send message to room group
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    "type": "chat_message",
                    "data": message,
                },
            )
            return

        await self.send_json(
            {"type": "error", "reason": "Type of action is not valid"}
        )

    # receive message from room group
    async def chat_message(self, event):
        # Send message to WebSocket
        await self.send_json(
            content={"type": "message", "data": event.get("data")}
        )
