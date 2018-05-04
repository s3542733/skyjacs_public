from __future__ import unicode_literals
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework import viewsets, mixins, status
from skyjacs_app.models import Selling, User
from skyjacs_app.serializers import SellingSerializer
from skyjacs_app.views.auth import authenticate

  # Pretty much the same instructions as in buying.
  # There are some minor differences, but you can pretty
  # much follow what is in buying for this too.

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
            item_model=item_model, item_colour=item_colour, item_condition=item_condition, 
            item_material=item_material, item_size=item_size, item_notes=item_notes, image_url=item_image)

          return Response({'message' : "Successfully created item for {req_user.username}."}, headers={'token':user.token})
        else:
          selling = Selling.objects.create(user=user, item_price=item_price, 
            listing_title=listing_title, item_sex=item_sex, item_brand=item_brand, listing_type=listing_type,
            item_model=item_model, item_colour=item_colour, item_condition=item_condition, 
            item_material=item_material, item_size=item_size, item_notes=item_notes, image_url=item_image)
          return Response({'message' : 'Successfully created item!', 'selling_id' : selling.uid}, headers={'token':user.token})
      return Response({'message' : 'Please log in to browse.'}, status=status.HTTP_401_UNAUTHORIZED)
    return Respones({'message' : 'Please log in to browse.'}, status=status.HTTP_401_UNAUTHORIZED)

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