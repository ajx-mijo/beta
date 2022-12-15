from .common import ReviewSerializer
from apps.serializers.common import AppSerializer
from jwt_auth.serializers.common import UserSerializer


class PopulatedReviewSerializer(ReviewSerializer):
    app = AppSerializer()
    owner = UserSerializer()
