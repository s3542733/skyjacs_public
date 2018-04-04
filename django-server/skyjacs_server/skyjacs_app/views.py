from __future__ import unicode_literals
from django.shortcuts import render
from rest_framework import viewsets, generics
from django.contrib.auth.models import User
from .serializers import UserSerializer
from .serializers import ShoeSerializer
from .models import Shoe

class UserViewSet(viewsets.ModelViewSet):
	queryset = User.objects.all().order_by('-date_joined')
	serializer_class = UserSerializer

class ShoesViewSet(viewsets.ModelViewSet):
	queryset = Shoe.objects.all().order_by('-date_added')
	serializer_class = ShoeSerializer
