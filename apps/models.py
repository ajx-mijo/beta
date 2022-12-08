from django.db import models
from django.contrib.postgres.fields import ArrayField


# Application Model


class App(models.Model):
    name = models.CharField(max_length=100)
    year = models.PositiveIntegerField()
    site_images = ArrayField(models.CharField(max_length=500), blank=True)
    description = models.TextField(max_length=1000)
    version = models.CharField(max_length=50)
    new_features = models.TextField(max_length=500)
    logo = models.TextField(max_length=500)
    link = models.CharField(max_length=200)
    added_at = models.DateTimeField(auto_now_add=True)
    sectors = models.ManyToManyField(
        'sectors.Sector',
        related_name='apps'
    )
    tools = models.ManyToManyField(
        'tools.Tool',
        related_name='apps'
    )
    owner = models.ForeignKey(
        'jwt_auth.User',
        related_name='apps',
        on_delete=models.CASCADE
    )

    def __str__(self):
        return f"{self.name} - {self.version}"
