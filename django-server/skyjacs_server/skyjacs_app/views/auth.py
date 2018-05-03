from __future__ import unicode_literals
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import viewsets, mixins, status
from django.contrib.auth.hashers import make_password, check_password
from skyjacs_app.models import User
from skyjacs_app.serializers import UserSerializer
import uuid

# DON'T WORRY ABOUT THIS FILE
# AS LONG AS YOU HAVE TOKEN
# EVERYTHING ON THIS PAGE WILL WORK

def create_token():
	token = uuid.uuid4().hex
	return token

def authenticate(token):
	try:
		user = User.objects.get(token=token)
		return user
	except User.DoesNotExist:
		return None

class LoginView(APIView):

	def post(self, request, format=None):

		username = request.POST.get('username')
		password = request.POST.get('password')

		try:
			user = User.objects.get(username=username)
			if check_password(password, user.password):
				user.token = create_token()
				user.save()
				return Response(user.token)
			else:
				return Response({'message' : 'Login failed. Incorrect username or password.'}, status=status.HTTP_400_BAD_REQUEST)
		except User.DoesNotExist:
			return Response({'message' : 'Login failed. Incorrect username or password.'}, status=status.HTTP_400_BAD_REQUEST)

class LogoutView(APIView):

	def post(self, request, format=None):
		token = request.META.get('HTTP_TOKEN')
		
		user = authenticate(token)
		if user != None:
			user.token = None
			user.save()
			return Response({'message' : "You've been logged out"})
		else:
			return Response({'message' : 'Log in to browse.'}, status=status.HTTP_400_BAD_REQUEST)