from django.urls import path
from .views import UserProfileIndiView, UserProfileMultiView

urlpatterns = [
    path('<int:pk>/', UserProfileIndiView.as_view()),
    path('', UserProfileMultiView.as_view())
]
