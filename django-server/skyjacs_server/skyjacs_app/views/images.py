from __future__ import unicode_literals
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import viewsets, mixins, status
from skyjacs_app.models import Image
from skyjacs_app.serializers import ImageSerializer

class ImageViewSet(viewsets.ModelViewSet):
	queryset = Image.objects.all().order_by('uid')
	serializer_class = ImageSerializer