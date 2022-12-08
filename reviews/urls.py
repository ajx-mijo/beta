from django.urls import path
from .views import ReviewListView, ReviewIndiView

urlpatterns = [
    path('', ReviewListView.as_view()),
    path('<int:pk>/', ReviewIndiView.as_view())
]
