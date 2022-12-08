from django.shortcuts import render
from .models import App

from .serializers.common import AppSerializer
from .serializers.populated import PopulatedAppSerializer

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from rest_framework.exceptions import NotFound, ValidationError, PermissionDenied
from rest_framework.permissions import IsAuthenticatedOrReadOnly


class AppListView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly, )
    # GET All Apps Controller

    def get(self, _request):
        apps = App.objects.all()
        print('App queryset ->', apps)
        serialized_apps = AppSerializer(apps, many=True)
        print('Serialized app data ->', serialized_apps.data)
        return Response(serialized_apps.data, status.HTTP_200_OK)

    # POST New App
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


class AppIndiView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly, )

    # GET Helper
    def get_app(self, pk):
        try:
            return App.objects.get(pk=pk)
        except App.DoesNotExist as e:
            print('Error ->', e)
            raise NotFound(str(e))
        except Exception as e:
            print('Error ->', e)
            return Response(str(e), status.HTTP_500_INTERNAL_SERVER_ERROR)

    # GET Single App
    def get(self, _request, pk):
        return Response(PopulatedAppSerializer(self.get_app(pk)).data)

    def put(self, request, pk):
        app = self.get_app(pk)
        request.data['owner'] = request.user.id
        print('APP OWNER ->', app.owner)
        print('REQUEST USER->', request.user)
        if app.owner != request.user:
            raise PermissionDenied('Unauthorized')
        try:
            updated_app = PopulatedAppSerializer(
                app, request.data, partial=True)
            if updated_app.is_valid():
                updated_app.save()
                return Response(updated_app.data, status.HTTP_202_ACCEPTED)
            else:
                return Response(updated_app.errors, status.HTTP_422_UNPROCESSABLE_ENTITY)
        except Exception as e:
            return Response(str(e), status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def delete(self, request, pk):
        app = self.get_app(pk)
        try:
            if app.owner != request.user:
                raise PermissionDenied('Unauthorized')
            app.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response(str(e), status=status.HTTP_500_INTERNAL_SERVER_ERROR)
