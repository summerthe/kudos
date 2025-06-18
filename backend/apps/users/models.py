from datetime import timedelta

from apps.base.models import BaseModel
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils import timezone


class Organization(BaseModel):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class UserManager(BaseUserManager):
    def create_superuser(self, email, name, organization, password, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("organization_id", organization)  # Set default org

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True.")

        return self._create_user(email, name, password, **extra_fields)

    def _create_user(self, email, name, password, **extra_fields):
        if not email:
            raise ValueError("The Email must be set")
        email = self.normalize_email(email)
        user = self.model(email=email, name=name, **extra_fields)
        user.set_password(password)
        user.save()
        return user


class User(AbstractUser, BaseModel):
    last_name = first_name = None
    username = None

    objects = UserManager()

    name = models.CharField("Name", max_length=255)
    email = models.EmailField("Email address", unique=True)
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["name", "organization"]

    organization = models.ForeignKey(
        Organization,
        on_delete=models.CASCADE,
        related_name="users",
    )

    @property
    def kudos_available(self):
        today = timezone.now().date()
        start_of_week = today - timedelta(days=today.weekday())  # Monday
        # Make datetime object into django timezone aware
        start_of_week = timezone.make_aware(
            timezone.datetime.combine(start_of_week, timezone.datetime.min.time()),
        )

        given_this_week = self.sent_kudos.filter(
            created_at__gte=start_of_week,
        ).count()

        return max(0, 3 - given_this_week)

    def can_give_kudo(self):
        return self.kudos_available > 0

    def __str__(self):
        return self.email

    class Meta:
        verbose_name = "User"
        verbose_name_plural = "Users"
        ordering = ["-updated_at"]
