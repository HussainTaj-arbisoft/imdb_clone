import json
from channels.generic.websocket import (
    AsyncWebsocketConsumer,
    AsyncJsonWebsocketConsumer,
)
from channels.db import database_sync_to_async

from .models import Message


@database_sync_to_async
def add_message(sender_id, receiver_id, text_message):
    Message.objects.create(
        sender_id=sender_id,
        receiver_id=receiver_id,
        text=text_message,
    )


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
        text_message = data["message"]
        await add_message(self.from_user_id, self.to_user_id, text_message)

        # send message to room group
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                "type": "chat_message",
                "message": text_message,
            },
        )

    # receive message from room group
    async def chat_message(self, event):
        # Send message to WebSocket
        await self.send_json(content=event)
