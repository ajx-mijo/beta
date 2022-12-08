from .common import AppSerializer
from reviews.serializers.common import ReviewSerializer
from tools.serializers.common import ToolSerializer


class PopulatedAppSerializer(AppSerializer):
    reviews = ReviewSerializer(many=True)
    tools = ToolSerializer(many=True)
