from django.shortcuts import render


from .serializers.common import UserProfileSerializer
from .models import UserProfile
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from rest_framework.exceptions import NotFound

from rest_framework.permissions import IsAuthenticated

from rest_framework.exceptions import PermissionDenied


class UserProfileMultiView(APIView):
    def post(self, request):
        print('Req data->', request.data)
        user_profile_to_add = UserProfileSerializer(data=request.data)
        try:
            if user_profile_to_add.is_valid():
                print('Valid data ->', user_profile_to_add.validated_data)
                user_profile_to_add.save()
                return Response(user_profile_to_add.data, status.HTTP_201_CREATED)
            print('Add new app errors ->', user_profile_to_add.errors)
            return Response(user_profile_to_add.errors, status.HTTP_422_UNPROCESSABLE_ENTITY)
        except Exception as e:
            return Response(str(e), status.HTTP_500_INTERNAL_SERVER_ERROR)


class UserProfileIndiView(APIView):
    permission_classes = (IsAuthenticated, )

    # GET Helper
    def get_user_profile(self, pk):
        try:
            return UserProfile.objects.get(pk=pk)
        except UserProfile.DoesNotExist as e:
            print('Error ->', e)
            raise NotFound(str(e))
        except Exception as e:
            print('Error ->', e)
            return Response(str(e), status.HTTP_500_INTERNAL_SERVER_ERROR)

    # GET Single User Profile
    def get(self, _request, pk):
        return Response(UserProfileSerializer(self.get_user_profile(pk)).data)

    # Edit User Profile

    def put(self, request, pk):
        user_profile = self.get_user_profile(pk)
        request.data['owner'] = request.user.id
        print('APP OWNER ->', user_profile.owner)
        print('REQUEST USER->', request.user)
        if user_profile.owner != request.user:
            raise PermissionDenied('Unauthorized')
        try:
            updated_user_profile = UserProfileSerializer(
                user_profile, request.data, partial=True)
            if updated_user_profile.is_valid():
                updated_user_profile.save()
                return Response(updated_user_profile.data, status.HTTP_202_ACCEPTED)
            else:
                return Response(updated_user_profile.errors, status.HTTP_422_UNPROCESSABLE_ENTITY)
        except Exception as e:
            return Response(str(e), status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def delete(self, request, pk):
        user_profile = self.get_user_profile(pk)
        try:
            if user_profile.owner != request.user:
                raise PermissionDenied('Unauthorized')
            user_profile.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response(str(e), status=status.HTTP_500_INTERNAL_SERVER_ERROR)
