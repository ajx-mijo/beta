from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .serializers.populated import PopulatedToolSerializer
from .serializers.common import ToolSerializer
from .models import Tool


class ToolListView(APIView):
    def get(self, _request):
        tools = Tool.objects.all()
        print('Tools ->', tools)
        serialized_tools = ToolSerializer(tools, many=True)
        return Response(serialized_tools.data)
