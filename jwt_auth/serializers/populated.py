from .common import UserSerializer
from user_profile.serializers.common import UserProfileSerializer


class PopulatedUserSerializer(UserSerializer):
    user_profile = UserProfileSerializer
