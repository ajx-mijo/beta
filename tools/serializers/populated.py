from .common import ToolSerializer
from apps.serializers.common import AppSerializer


class PopulatedToolSerializer(ToolSerializer):
    apps = AppSerializer(many=True)
