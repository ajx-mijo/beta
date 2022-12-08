from django.db import models

# Create your models here.


class Review(models.Model):

    text = models.TextField(max_length=500)
    version = models.CharField(max_length=50)
    ux_rating = models.PositiveIntegerField()
    design_rating = models.PositiveIntegerField()
    accessibility_rating = models.PositiveIntegerField()
    performance_rating = models.PositiveIntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    app = models.ForeignKey(
        'apps.App',
        related_name='reviews',
        on_delete=models.CASCADE
    )

    def __str__(self):
        return f"{self.created_at}"
