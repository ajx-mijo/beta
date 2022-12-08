from .common import AppSerializer
from reviews.serializers.common import ReviewSerializer


class PopulatedAppSerializer(AppSerializer):
    reviews = ReviewSerializer(many=True)
