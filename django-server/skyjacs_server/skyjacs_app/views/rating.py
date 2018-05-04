from __future__ import unicode_literals
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework import viewsets, mixins, status
from skyjacs_app.models import Buying, Selling, User, Rating, Profile
from skyjacs_app.views.auth import authenticate
from skyjacs_app.serializers import ProfileSerializer, RatingSerializer

def updateUserRating(user):

	ratings = Rating.objects.all().filter(rated_user=user)
	totalRating = 0.0
	if ratings:
		for rating in ratings:
			totalRating = totalRating + rating.rating_value
		profile = Profile.objects.get(user=user)
		profile.user_rating = totalRating/float(len(ratings))
	else:
		profile = Profile.objects.get(user=user)
		profile.user_rating = totalRating

	profile.save()

class RatingViewSet(viewsets.ModelViewSet):
	queryset = Rating.objects.all().order_by('uid')
	serializer_class = RatingSerializer

class RatingView(APIView):

	def post(self, request, format=None):

		token = request.META.get('HTTP_TOKEN')
		user = authenticate(token)

		# Needs 'user' from the profile data
		# which is an integer. Pass it as form data
		# as 'rated_user'. Also needs a float, 'rating_value'.

		if user != None:
			rating_user = user
			rated_user = User.objects.get(uid=int(request.POST.get('rated_user')))
			rating_value = float(request.POST.get('rating_value'))
			rating = None
			try:
				rating = Rating.objects.get(rating_user=rating_user, rated_user=rated_user)
				rating.rating_value = rating_value
				rating.save()
			except Rating.DoesNotExist:
				rating = Rating.objects.create(
					rating_user=rating_user, 
					rated_user=rated_user, 
					rating_value=rating_value)
			if rating != None:
				updateUserRating(rated_user)
				profile = Profile.objects.get(user=rated_user)
				serializer = ProfileSerializer(profile, context={'request':request})
				return Response(serializer.data)
		return Response({'message' : 'Please log in to browse.'}, status=status.HTTP_401_UNAUTHORIZED)

	def get(self, request, format=None):

		token = request.META.get('HTTP_TOKEN')
		user = authenticate(token)
		if user != None:
			updateUserRating(user)
			profile = Profile.objects.get(user=user)
			serializer = ProfileSerializer(profile, context={'request':request})
			return Response(serializer.data)

		return Response({'message' : 'Please log in to browse.'}, status=status.HTTP_401_UNAUTHORIZED)