import uuid
import os
from django.db import models


def _get_celebrity_image_url(instance, filename):
    return (
        f"celebrities/{instance.id}/cover_image{os.path.splitext(filename)[1]}"
    )


class Celebrity(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    first_name = models.CharField("First Name", max_length=50)
    last_name = models.CharField("Last Name", max_length=50)
    date_of_birth = models.DateField(
        "Date of Birth", auto_now=False, auto_now_add=False
    )
    debut_date = models.DateField(
        "Debut Date", auto_now=False, auto_now_add=False
    )
    description = models.TextField("Description")
    popularity_score = models.DecimalField(
        "Popularity Score", max_digits=4, decimal_places=1
    )
    image = models.ImageField(
        "Celebrity Image",
        upload_to=_get_celebrity_image_url,
    )

    class Meta:
        ordering = ("-popularity_score",)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"
