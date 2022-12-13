from rest_framework import serializers
from django.contrib.auth import get_user_model, password_validation, hashers
from django.contrib.auth.hashers import make_password
from django.core.exceptions import ValidationError

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    password_confirmation = serializers.CharField(write_only=True)

    def validate(self, data):
        print('data->', data)
        password = data.pop('password')
        password_confirmation = data.pop('password_confirmation')

        # Check if the passwords match
        if password != password_confirmation:
            raise ValidationError({
                'password_confirmation': 'Does not match the password field'
            })
        # Validate the password
        password_validation.validate_password(password)

        data['password'] = hashers.make_password(password)

        return data

    class Meta:
        model = User
        fields = ('id', 'email', 'username',
                  'password', 'password_confirmation')
