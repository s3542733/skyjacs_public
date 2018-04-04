from django.contrib.auth.models import User, Group
from rest_framework import serializers
from .models import Shoe

class UserSerializer(serializers.HyperlinkedModelSerializer):
	class Meta:
		model = User
		fields = ('url', 'username', 'email')

class ShoeSerializer(serializers.ModelSerializer):
	class Meta:
		model = Shoe
		fields = ('date_added', 'title', 'photo')