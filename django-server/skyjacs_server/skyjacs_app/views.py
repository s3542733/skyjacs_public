from __future__ import unicode_literals
from django.shortcuts import render
from rest_framework import viewsets
#from django.contrib.auth.models import User
from skyjacs_app.models import User, Listing, Notification, Image
from skyjacs_app.serializers import UserSerializer, ListingSerializer, NotificationSerializer, ImageSerializer


class UserViewSet(viewsets.ModelViewSet):
	queryset = User.objects.all().order_by('uid')
	serializer_class = UserSerializer

class ListingViewSet(viewsets.ModelViewSet):
	queryset = Listing.objects.all().order_by('uid')
	serializer_class = ListingSerializer

class NotificationViewSet(viewsets.ModelViewSet):
	queryset = Notification.objects.all().order_by('uid')
	serializer_class = NotificationSerializer

#class SpecViewSet(viewsets.ModelViewSet):
#	queryset = Spec.objects.all().order_by('uid')
#	serializer_class = SpecSerializer

class ImageViewSet(viewsets.ModelViewSet):
	queryset = Image.objects.all().order_by('uid')
	serializer_class = ImageSerializer