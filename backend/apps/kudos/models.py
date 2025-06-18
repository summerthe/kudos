from apps.base.models import BaseModel
from django.contrib.auth import get_user_model
from django.db import models

User = get_user_model()


class Kudo(BaseModel):
    sender = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="sent_kudos",
    )
    receiver = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="received_kudos",
    )
    message = models.TextField()

    class Meta:
        verbose_name = "Kudo"
        verbose_name_plural = "Kudos"
        ordering = ["-updated_at"]

    def __str__(self):
        return f"{self.sender} -> {self.receiver}: {self.message[:50]}"
