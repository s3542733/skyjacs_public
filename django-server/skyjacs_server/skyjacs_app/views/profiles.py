from __future__ import unicode_literals
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import viewsets, mixins, status
from skyjacs_app.models import Profile, Buying, Selling
from skyjacs_app.serializers import ProfileSerializer, BuyingSerializer, SellingSerializer
from skyjacs_app.views.auth import authenticate
from skyjacs_app.views.rating import updateUserRating

class ProfileViewSet(viewsets.ModelViewSet):
  queryset = Profile.objects.all().order_by('uid')
  serializer_class = ProfileSerializer

class GetProfileView(APIView):

  def get(self, request, pk, format=None):

    token = request.META.get('HTTP_TOKEN')
    user = authenticate(token)
    username = ""
    first_name = ""
    last_name = ""
    user_rating = 0
    user_data = [];
    if user != None:
      try:
        updateUserRating(pk)
        profile = Profile.objects.get(user=pk)
        profile_user = User.objects.get(pk=pk) 
        username = profile_user.username
        first_name = profile.first_name
        last_name = profile.last_name
        user_rating = profile.user_rating
        email = profile_user.email
        user_data.append(username)
        user_data.append(first_name)
        user_data.append(last_name)
        user_data.append(user_rating)
        user_data.append(email)
        return Response(user_data)
      except Profile.DoesNotExist:
        return Response({'message':'This user does not exists.'}, status=status.HTTP_400_BAD_REQUEST)
    return Response({'message' : 'Please log in to browse.'}, status=status.HTTP_401_UNAUTHORIZED)

class GetListings(APIView):

  def get(self, request, format=None):

    token = request.META.get('HTTP_TOKEN')
    user = authenticate(token)
    listings = []
    if user != None:
      buyings = Buying.objects.filter(user=user)
      sellings = Selling.objects.filter(user=user)
      if buyings:
        serializer = BuyingSerializer(buyings, many=True, context={'request':request})
        listings.append(serializer.data)
      if sellings:
        serializer = SellingSerializer(sellings, many=True, context={'request':request})
        listings.append(serializer.data)
      if not listings:
        return Response({'message' : 'You have no listings.'}, headers={'token':user.token})

      return Response(listings, headers={'token':user.token})

    return Response({'message' : 'Please log in to browse.'}, status=status.HTTP_401_UNAUTHORIZED)