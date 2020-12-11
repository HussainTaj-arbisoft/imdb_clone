from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


class Message(models.Model):
    sender = models.ForeignKey(
        User,
        verbose_name="Sender",
        on_delete=models.DO_NOTHING,
        related_name="sent_messages",
    )
    receiver = models.ForeignKey(
        User,
        verbose_name="Receiver",
        on_delete=models.DO_NOTHING,
        related_name="received_messages",
    )
    text = models.TextField("text")
    time = models.DateTimeField("Time", auto_now=False, auto_now_add=True)

    class Meta:
        ordering = ("-time",)