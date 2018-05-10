from __future__ import unicode_literals
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework import viewsets, mixins, status
from skyjacs_app.models import Buying, Selling, User, Recent
from skyjacs_app.views.auth import authenticate
from skyjacs_app.serializers import RecentSerializer, BuyingSerializer, SellingSerializer

def listToString(intList):

  intString = " ".join(str(x) for x in intList)

  return intString

def stringToList(intString):

  intList = list(map(int, intString.split()))

  return intList

def addToFront(valueList, value):

  while len(valueList) >=4:
    valueList.pop()

  valueList.reverse()
  valueList.append(value)
  valueList.reverse()

  return valueList

def removeDupe(valueList, value):
  
  if value in valueList:
    valueList.remove(value)

  return valueList

def updateList(valueList, value):

  valueList = removeDupe(valueList, value)
  valueList = addToFront(valueList, value)

  return valueList

def updateRecent(user, listingType, pk):

  recent = Recent.objects.get(user=user)
  buying_string = recent.recent_buyings
  selling_string = recent.recent_sellings

  buying_list = stringToList(buying_string)
  selling_list = stringToList(selling_string)

  if listingType == 'buying':
    buying_list = updateList(buying_list, pk)

  if listingType == 'selling':
    selling_list = updateList(selling_list, pk)

  buying_string = listToString(buying_list)
  selling_string = listToString(selling_list)

  recent.recent_buyings = buying_string
  recent.recent_sellings = selling_string

  recent.save()

class RecentView(APIView):

  # Needs listing_type and listing_uid.
  # listing_type and listing_uid (listing_uid refers to the uid of
  # selling or buying) can both be found in Selling and Buying Models.
  def post(self, request, format=None):

    token = request.META.get('HTTP_TOKEN')
    user = authenticate(token)
    if user != None:
      listing_type = request.POST.get('listing_type')
      listing_uid = int(request.POST.get('listing_uid'))

      updateRecent(user, listing_type, listing_uid)

      return Response({'message' : 'Listing has been added to recent history.'})
    return Response({'message' : 'Please log in to browse.'}, status=status.HTTP_401_UNAUTHORIZED)


  # Needs no input, just call it with a token
  # and it'll return the recent listings as json
  def get(self, request, format=None):

    token = request.META.get('HTTP_TOKEN')
    user = authenticate(token)
    if user != None:
      recent = Recent.objects.get(user=user)
      buying_string = recent.recent_buyings
      selling_string = recent.recent_sellings
      print(buying_string)
      print(selling_string)
      if buying_string == "" and selling_string == "":
        return Response({'message' : 'There are no recently visited listings.'})

      buying_list = stringToList(buying_string)
      selling_list = stringToList(selling_string)

      print(buying_list)
      print(selling_list)

      recent_listings = []
      missing_listings = []

      if buying_list:
        for uid in buying_list:
          try:
            listing = Buying.objects.get(pk=uid)
            serializer = BuyingSerializer(listing, context={'request':request})
            recent_listings.append(serializer.data)
          except Buying.DoesNotExist:
            missing_listings.append(uid)
  
      if not missing_listings:
        for uid in missing_listings:
          buying_list.remove(uid)
  
      missing_listings = []

      if selling_list:
        for uid in selling_list:
          try:
            listing = Selling.objects.get(pk=uid)
            serializer = SellingSerializer(listing, context={'request':request})
            recent_listings.append(serializer.data)
          except Selling.DoesNotExist:
            missing_listings.append(uid)

      if not missing_listings:
        for uid in missing_listings:
          selling_list.remove(uid)

      if not buying_list:
        recent.recent_buyings = ""
      else:
        recent.recent_buyings = listToString(buying_list)
  
      if not selling_list:
        recent.recent_sellings = ""
      else:
        recent.recent_sellings = listToString(selling_list)

      recent.save()

      return Response(recent_listings)
    return Response({'message' : 'Please log in to browse.'}, status=status.HTTP_401_UNAUTHORIZED)