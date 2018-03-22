from __future__ import unicode_literals
from django.shortcuts import render
from rest_framework import viewsets
from django.contrib.auth.models import User
from skyjacs_app.serializers import UserSerializer

class UserViewSet(viewsets.ModelViewSet):
	queryset = User.objects.all().order_by('-date_joined')
	serializer_class = UserSerializer