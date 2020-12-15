from django.db import models


class Order(models.Model):
    movie = models.ForeignKey(
        "movies.Movie",
        verbose_name="Movie",
        on_delete=models.PROTECT,
        related_name="orders",
    )
    user = models.ForeignKey(
        "accounts.User",
        verbose_name="User",
        on_delete=models.SET_NULL,
        null=True,
        related_name="orders",
    )
    session_id = models.CharField(
        "Checkout Session ID", max_length=200, unique=True
    )
    price = models.DecimalField("Price", max_digits=9, decimal_places=2)
    completed = models.BooleanField("Completed", default=False)
    completed_time = models.DateTimeField(
        "Date Time when order was completed",
        auto_now=False,
        auto_now_add=False,
        null=True,
    )
    created_time = models.DateTimeField(
        "Date Time when order was created.", auto_now=False, auto_now_add=True
    )
