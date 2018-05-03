from __future__ import unicode_literals
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import viewsets, mixins, status
from skyjacs_app.models import Profile
from skyjacs_app.serializers import ProfileSerializer

class ProfileViewSet(viewsets.ModelViewSet):
  queryset = Profile.objects.all().order_by('uid')
  serializer_class = ProfileSerializer