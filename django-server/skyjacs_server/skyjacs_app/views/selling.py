from __future__ import unicode_literals
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework import viewsets, mixins, status
from skyjacs_app.models import Selling, User
from skyjacs_app.serializers import SellingSerializer
from skyjacs_app.views.auth import authenticate
import random

  # Pretty much the same instructions as in buying.
  # There are some minor differences, but you can pretty
  # much follow what is in buying for this too.

class SellingViewSet(mixins.ListModelMixin, viewsets.GenericViewSet):
  queryset = Selling.objects.all().order_by('uid')
  serializer_class = SellingSerializer

class RandomSellingView(APIView):

  def get(self, request, format=None):
    token = request.META.get('HTTP_TOKEN')
    if token != "":
      user = authenticate(token)
      if user != None:
        rand = False
        try:
          count = 0
          max_uid = Selling.objects.all().count()
          while(rand == False and max_uid != 0):
            count += 1
            pk = random.randint(1, max_uid)
            selling = Selling.objects.get(uid=pk)
            if selling.user != user.uid:
              serializer = SellingSerializer(selling, context={'request' : request})
              return Response(serializer.data)
            elif(count >= 20):
              return Response({'message' : "Things aren't random enough at the moment. Try again in a second or two."})
        except Selling.DoesNotExist:
          return Response({'message' : "Looks like there are no listings to randomise at the moment."})


    return Response({'message' : 'Please log in to browse.'}, status=status.HTTP_401_UNAUTHORIZED)

class SellingAltListViewSet(APIView):

  def post(self, request, format=None):
    token = request.META.get('HTTP_TOKEN')
    if token != "":
      user = authenticate(token)
      if user != None:
        if request.POST.get('user_id') != None:
          try:
            req_user = User.objects.get(uid=request.POST.get('user_id'))
            sellings = Selling.objects.filter(user=req_user)
            if sellings:
              serializer = SellingSerializer(sellings, many=True, context={'request':request})
              return Response(serializer.data)
            else:
              return Response({'message': "User doesn't have any buying listings."})
          except User.DoesNotExist:
            return Response({'message' : "User doesn't exist."}, status=status.HTTP_400_BAD_REQUEST)
        else:
          return Response({'message' : "Invalid request."}, status=status.HTTP_400_BAD_REQUEST)
    
    return Response({'message' : 'Please log in to browse.'}, status=status.HTTP_401_UNAUTHORIZED)

class SellingListViewSet(APIView):

  def post(self, request, format=None):   
    token = request.META.get('HTTP_TOKEN')
    if token != "":
      user = authenticate(token)
      if user != None:
        req_user = user
        if request.POST.get('user_id') != None:
          try:
            req_user = User.objects.get(pk=int(request.POST.get('user_id')))
          except:
            return Response({'message' : "Requested user doesn't exist."})
        # Each thing that has request.POST.get() needs to be from a form.
        # Try and enforce float format i.e 0.0 for float fields.
        listing_title = request.POST.get('listing_title')
        listing_type = 'selling'
        item_price = float(request.POST.get('item_price'))
        item_type = request.POST.get('item_type')
        item_sex = request.POST.get('item_sex')
        item_brand = request.POST.get('item_brand')
        item_model = request.POST.get('item_model')
        item_colour =  request.POST.get('item_colour')
        item_condition = request.POST.get('item_condition')
        item_material = request.POST.get('item_material')
        item_size = float(request.POST.get('item_size'))
        item_notes =request.POST.get('item_notes')
        
        item_image = None
        if request.FILES.get('item_image'):
          item_image = request.FILES.get('item_image')

        if user.user_admin == True:
          selling = Selling.objects.create(user=req_user, item_price=item_price, listing_type=listing_type,
            listing_title=listing_title, item_sex=item_sex, item_brand=item_brand, 
            item_type=item_type, item_model=item_model, item_colour=item_colour, item_condition=item_condition, 
            item_material=item_material, item_size=item_size, item_notes=item_notes, image_url=item_image)

          return Response({'message' : "Successfully created item for {req_user.username}."}, headers={'token':user.token})
        else:
          selling = Selling.objects.create(user=user, item_price=item_price, 
            listing_title=listing_title, item_sex=item_sex, item_brand=item_brand, listing_type=listing_type,
            item_type=item_type, item_model=item_model, item_colour=item_colour, item_condition=item_condition, 
            item_material=item_material, item_size=item_size, item_notes=item_notes, image_url=item_image)
          return Response({'message' : 'Successfully created item!', 'selling_id' : selling.uid}, headers={'token':user.token})
      return Response({'message' : 'Please log in to browse.'}, status=status.HTTP_401_UNAUTHORIZED)
    return Response({'message' : 'Please log in to browse.'}, status=status.HTTP_401_UNAUTHORIZED)

  def get(self, request, format=None):
    token = self.request.META.get('HTTP_TOKEN')
    print(token)
    if token != "":
      user = authenticate(token)
      if user != None:
        if user.user_admin == True:
          queryset = Selling.objects.all()
          serializer = SellingSerializer(queryset, many=True, context={'request':request})
          return Response(serializer.data)
        else: 
          queryset = Selling.objects.all().filter(user=user)
          serializer = SellingSerializer(queryset, many=True, context={'request':request})
          return Response(serializer.data)

    return Response({'message' : 'Please log in to browse.'}, status=status.HTTP_401_UNAUTHORIZED)

class SellingDetailViewSet(APIView):

  def get(self, request, pk, format=None):
    token = request.META.get('HTTP_TOKEN')
    if token != "":
      user = authenticate(token)
      if user != None:
        if user.user_admin == True:
          try:
            queryset = Selling.objects.get(pk=pk)
            serializer = SellingSerializer(queryset, context={'request':request})           
            return Response(serializer.data, headers={'token':user.token})
          except Selling.DoesNotExist:
            return Response("That listing does not exist.", status=status.HTTP_400_BAD_REQUEST)
        else:
          try:
            queryset = Selling.objects.get(pk=pk, user=user)
            serializer = SellingSerializer(queryset, context={'request':request})
            return Response(serializer.data, headers={'token':user.token})
          except Selling.DoesNotExist:
            return Response("That listing does not exist.", status=status.HTTP_400_BAD_REQUEST)

    return Response("Please login to start browsing.", status=status.HTTP_400_BAD_REQUEST)

  def delete(self, request, pk, format=None):
    token = request.META.get('HTTP_TOKEN')
    if token != "":
      user = authenticate(token)
      if user != None:
        if user.user_admin == True:
          listing = Selling.objects.get(pk=pk)
          listing.delete()
          return Response("Successfully removed listing.", status=status.HTTP_204_NO_CONTENT, headers={'token':user.token})
        else:
          listing = Selling.objects.get(pk=pk, user=user)
          listing.delete()
          return Response("Successfully removed listing.", status=status.HTTP_204_NO_CONTENT, headers={'token':user.token})

    return Response("Please login to start browsing.", status=status.HTTP_400_BAD_REQUEST)