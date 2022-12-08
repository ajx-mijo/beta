from django.db import models

# Create your models here.


class Tool(models.Model):
    name = models.CharField(max_length=50)
    logo = models.TextField(max_length=1000)

    def __str__(self):
        return self.name
