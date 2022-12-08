from .common import SectorSerializer
from apps.serializers.common import AppSerializer


class PopulatedSectorSerializer(SectorSerializer):
    apps = AppSerializer(many=True)
