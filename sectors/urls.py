from django.urls import path
from .views import SectorListView

urlpatterns = [
    path('', SectorListView.as_view())
]
