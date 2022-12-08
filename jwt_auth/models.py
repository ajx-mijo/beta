from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    email = models.CharField(max_length=50, unique=True)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    username = models.CharField(max_length=50, unique=True)
    profile_image = models.CharField(
        max_length=500, default=None, blank=True, null=True)
    current_role_title = models.CharField(
        max_length=50, default=None, blank=True, null=True)
    current_employer = models.CharField(
        max_length=50, default=None, blank=True, null=True)
    years_exp = models.PositiveIntegerField(
        default=None, blank=True, null=True)
    biography = models.TextField(
        max_length=1000, default=None, blank=True, null=True)

    def __str__(self):
        return f"{self.username} - {self.email}"
