from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .serializers.populated import PopulatedSectorSerializer
from .models import Sector


class SectorListView(APIView):
    def get(self, _request):
        sectors = Sector.objects.all()
        serialized_sectors = PopulatedSectorSerializer(sectors, many=True)
        return Response(serialized_sectors.data)
