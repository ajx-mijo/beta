from django.urls import path
from .views import AppListView, AppIndiView


urlpatterns = [
    path('', AppListView.as_view()),
    path('<int:pk>/', AppIndiView.as_view())
]
