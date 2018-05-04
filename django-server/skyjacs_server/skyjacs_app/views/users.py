from __future__ import unicode_literals
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import viewsets, mixins, status
from django.contrib.auth.hashers import make_password, check_password
from skyjacs_app.models import User, Profile, Recent
from skyjacs_app.serializers import UserSerializer
from skyjacs_app.views.auth import authenticate

class UserViewSet(viewsets.ModelViewSet):
	queryset = User.objects.all().order_by('uid')
	serializer_class = UserSerializer

class RegisterView(APIView):

	def post(self, request, format=None):

		email = request.POST.get('email')
		username = request.POST.get('username')
		first_name = request.POST.get('first_name')
		last_name = request.POST.get('last_name')
		password = request.POST.get('password')

		fields = {
		'Email' : email,
		'Username' : username,
		'First Name' : first_name,
		'Last Name' : last_name,
		'Password' : password
		}

		for key, value in fields.items():
			if value == "":
				return Response("Invalid: user information. The '%s' field cannot be empty!" % key, status=status.HTTP_400_BAD_REQUEST)
		
		newUser = User.objects.create(
			email=email, 
			username=username,
			password=make_password(password, salt=None, hasher='default'))
		
		newUserProfile = Profile.objects.create(
			user=newUser,
			first_name=first_name,
			last_name=last_name)

		newRecent = Recent.objects.create(
			user=newUser)
		
		return Response({'message':"User successfully created. Login to start browsing!"})

class GetUserView(APIView):

	def get(self, request, format=None):

		token = request.META.get('HTTP_TOKEN')
		user = authenticate(token)
		if user != None:
			if user.user_admin:
				users = User.objects.all()
				if users:
					serializer = UserSerializer(users, many=True, context={'request':request})
					return Response(serializer.data)		
			else:
				serializer = UserSerializer(user, context={'request':request})
				return Response(serializer.data)
		
		return Response({'message' : 'Please log in to browse.'}, status=status.HTTP_401_UNAUTHORIZED)
