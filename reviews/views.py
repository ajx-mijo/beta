from django.shortcuts import render
from .serializers.common import ReviewSerializer
from .models import Review
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Review
from rest_framework.exceptions import NotFound

from rest_framework.permissions import IsAuthenticated

from rest_framework.exceptions import PermissionDenied


class ReviewListView(APIView):
    permission_classes = (IsAuthenticated, )

    def post(self, request):
        print('Request User ->', request.user)
        request.data['owner'] = request.user.id
        review_to_add = ReviewSerializer(data=request.data)
        try:
            if review_to_add.is_valid():
                review_to_add.save()
                return Response(review_to_add.data, status.HTTP_201_CREATED)
            return Response(review_to_add.errors, status.HTTP_422_UNPROCESSABLE_ENTITY)
        except Exception as e:
            return Response(str(e), status.HTTP_500_INTERNAL_SERVER_ERROR)

    def get(self, _request):
        reviews = Review.objects.all()
        print('App queryset ->', reviews)
        serialized_reviews = ReviewSerializer(reviews, many=True)
        print('Serialized app data ->', serialized_reviews.data)
        return Response(serialized_reviews.data, status.HTTP_200_OK)


class ReviewIndiView(APIView):
    permission_classes = (IsAuthenticated, )

    def delete(self, request, pk):
        try:
            review_to_delete = Review.objects.get(pk=pk)
            print('Found review Owner ->', review_to_delete.owner)
            print('Request User ->', request.user)
            if review_to_delete.owner != request.user:
                raise PermissionDenied('Unauthorized')
            review_to_delete.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Review.DoesNotExist as e:
            raise NotFound(str(e))
