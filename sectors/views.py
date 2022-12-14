from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .serializers.common import SectorSerializer
from .models import Sector


class SectorListView(APIView):
    def get(self, _request):
        sectors = Sector.objects.all()
        print(sectors)
        serialized_sectors = SectorSerializer(sectors, many=True)
        return Response(serialized_sectors.data)
