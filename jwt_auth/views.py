from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

# Exceptions to raise
from rest_framework.exceptions import PermissionDenied, NotFound
from django.contrib.auth import get_user_model

from .serializers.common import UserSerializer

from rest_framework.permissions import IsAuthenticated

from rest_framework.exceptions import PermissionDenied

# Modules
from datetime import datetime, timedelta
import jwt


# Import Settings modules
from django.conf import settings

User = get_user_model()


class RegisterView(APIView):

    def post(self, request):
        try:
            # Validating User Data
            user_to_register = UserSerializer(data=request.data)
            if user_to_register.is_valid():
                user_to_register.save()
                return Response('Registration Successful', status=status.HTTP_201_CREATED)
            return Response(user_to_register.errors, status.HTTP_422_UNPROCESSABLE_ENTITY)
        except Exception as e:
            print(e)
            return Response(e)


class LoginView(APIView):

    def post(self, request):
        email = request.data['email']
        password = request.data['password']
        try:
            user_to_login = User.objects.get(email=email)
        except User.DoesNotExist as e:
            raise PermissionDenied(str(e))
        print('User to log in ->', user_to_login)

        if not user_to_login.check_password(password):
            print('PASSWORD INCORRECT')
            raise PermissionDenied('Invalid Credentials')

        dt = datetime.now() + timedelta(days=7)
        dt_as_seconds = int(dt.strftime('%s'))

        token = jwt.encode(
            {'sub': user_to_login.id, 'exp': dt_as_seconds},
            settings.SECRET_KEY,
            'HS256'
        )
        print(token)
        return Response({
            'token': token,
            'message': f'Welcome back, {user_to_login.username}'
        }, status.HTTP_202_ACCEPTED)


# ! CREATE DIFFERENT PROFILE APP


class UpdateUserView(APIView):
    permission_classes = (IsAuthenticated, )

    def get_user(self, pk):
        try:
            return User.objects.get(pk=pk)
        except User.DoesNotExist as e:
            print('Error ->', e)
            raise NotFound(str(e))
        except Exception as e:
            print('Error ->', e)
            return Response(str(e), status.HTTP_500_INTERNAL_SERVER_ERROR)

    def put(self, request, pk):
        user = self.get_user(pk)
        # print('User type ->', type(user))
        # print('User object ->', user)
        # print('Request User ->', request.user)
        # if user.owner != request.user:
        #     raise PermissionDenied('Unauthorized')
        request.data['owner'] = request.user.id
        try:
            updated_user = UserSerializer(
                user, request.data, partial=True)
            if updated_user.is_valid():
                print('Updated user DATA ->', updated_user.validated_data)
                print('Request data ->', request.user.id)
                updated_user.save()
                return Response(updated_user.data, status.HTTP_202_ACCEPTED)
            else:
                return Response(updated_user.errors, status.HTTP_422_UNPROCESSABLE_ENTITY)
        except Exception as e:
            return Response(str(e), status=status.HTTP_500_INTERNAL_SERVER_ERROR)
