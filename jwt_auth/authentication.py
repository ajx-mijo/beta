from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import PermissionDenied

from django.contrib.auth import get_user_model
from django.conf import settings

import jwt


User = get_user_model()


class JWTAuthentication(BaseAuthentication):

    def authenticate(self, request):
        print('Request Headers ->', request.headers)

        if not request.headers:
            print('No request headers')
            return None

        headers = request.headers.get('Authorization')
        if not headers:
            print('No authentication header')
            return None

        if not headers.startswith('Bearer '):
            print('Invalid token format')
            raise PermissionDenied('Invalid token')

        try:
            token = headers.replace('Bearer ', '')
            print('Token->', token)

            payload = jwt.decode(token, settings.SECRET_KEY, ['HS256'])
            print('Payload->', payload)

            user = User.objects.get(pk=payload['sub'])
        except User.DoesNotExist as e:
            raise PermissionDenied('User not found')
        except Exception as e:
            print(e)
            raise PermissionDenied(str(e))

        return (user, token)
