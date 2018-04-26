from __future__ import unicode_literals
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import viewsets, mixins, status
from django.contrib.auth.hashers import make_password, check_password
from skyjacs_app.models import User
from skyjacs_app.serializers import UserSerializer
import uuid

def create_token():
	token = uuid.uuid4().hex
	return token

def authenticate(token):
	try:
		user = User.objects.get(token=token)
		#user.token = create_token()
		return user
	except User.DoesNotExist:
		return None

class NewUserView(APIView):

	def post(self, request, format=None):

		email = request.POST.get('email')
		username = request.POST.get('username')
		first_name = request.POST.get('first_name')
		last_name = request.POST.get('last_name')
		password = make_password(request.POST.get('password'), salt=None, hasher='default')

		newUser = User.objects.create(
			email=email, 
			username=username,
			password=password)

		newUserProfile = Profile.objects.create(
			user=newUser,
			first_name=first_name,
			last_name=last_name)

		return Response({'message' : 'User created! Login to start browsing!'})

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