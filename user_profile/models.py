from django.db import models

# Create your models here.


class UserProfile(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
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
    owner = models.ForeignKey(
        'jwt_auth.User',
        related_name='user_profile',
        on_delete=models.CASCADE
    )
