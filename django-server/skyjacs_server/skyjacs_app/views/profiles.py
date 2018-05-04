from __future__ import unicode_literals
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import viewsets, mixins, status
from skyjacs_app.models import Profile
from skyjacs_app.serializers import ProfileSerializer
from skyjacs_app.views.auth import authenticate
from skyjacs_app.views.rating import updateUserRating

class ProfileViewSet(viewsets.ModelViewSet):
	queryset = Profile.objects.all().order_by('uid')
	serializer_class = ProfileSerializer

class GetProfileView(APIView):

	def get(self, request, pk, format=None):

		token = request.META.get('HTTP_TOKEN')
		user = authenticate(token)
		if user != None:
			try:
				updateUserRating(pk)
				profile = Profile.objects.get(user=pk)
				serializer = ProfileSerializer(profile, context={'request':request})
				return Response(serializer.data)
			except Profile.DoesNotExist:
				return Response({'message':'This user does not exists.'}, status=status.HTTP_400_BAD_REQUEST)

		return Response({'message' : 'Please log in to browse.'}, status=status.HTTP_401_UNAUTHORIZED)