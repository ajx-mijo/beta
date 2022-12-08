from django.shortcuts import render
from .models import Application

from .serializers.common import AppSerializer
#from .serializers.populated import PopulatedBookSerializer

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from rest_framework.exceptions import NotFound, ValidationError, PermissionDenied
from rest_framework.permissions import IsAuthenticatedOrReadOnly


class AppListView(APIView):

    # GET All Apps Controller
    def get(self, _request):
        apps = Application.objects.all()
        print('App queryset ->', apps)
        serialized_apps = AppSerializer(apps, many=True)
        print('Serialized app data ->', serialized_apps.data)
        return Response(serialized_apps.data, status.HTTP_200_OK)

    def post(self, request):
        print('Req data->', request.data)
        app_to_add = AppSerializer(data=request.data)
        try:
            if app_to_add.is_valid():
                print('Valid data ->', app_to_add.validated_data)
                app_to_add.save()
                return Response(app_to_add.data, status.HTTP_201_CREATED)
            print('Add new app errors ->', app_to_add.errors)
            return Response(app_to_add.errors, status.HTTP_422_UNPROCESSABLE_ENTITY)
        except Exception as e:
            return Response(str(e), status.HTTP_500_INTERNAL_SERVER_ERROR)
