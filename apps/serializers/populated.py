from .common import AppSerializer
from reviews.serializers.common import ReviewSerializer
from tools.serializers.common import ToolSerializer
from sectors.serializers.common import SectorSerializer


class PopulatedAppSerializer(AppSerializer):
    sectors = SectorSerializer(many=True)
    tools = ToolSerializer(many=True)
    reviews = ReviewSerializer(many=True)
