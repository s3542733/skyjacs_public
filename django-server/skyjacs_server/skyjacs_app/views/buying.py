from __future__ import unicode_literals
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework import viewsets, mixins, status
from skyjacs_app.models import Buying, User
from skyjacs_app.serializers import BuyingSerializer
from skyjacs_app.views.auth import authenticate

class BuyingListViewSet(APIView):

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
				listing_title = request.POST.get('listing_title')
				min_price = request.POST.get('min_price')
				max_price = request.POST.get('max_price')
				item_type = request.POST.get('item_type')
				type_priority = request.POST.get('type_priority')
				item_sex = request.POST.get('item_sex')
				sex_priority = request.POST.get('sex_priority')
				item_brand = request.POST.get('item_brand')
				brand_priority = request.POST.get('brand_priority')
				item_model = request.POST.get('item_model')
				model_priority = request.POST.get('model_priority')
				item_colour =  request.POST.get('item_colour')
				colour_priority = request.POST.get('colour_priority')
				item_condition = request.POST.get('item_condition')
				condition_priority = request.POST.get('condition_priority')
				item_material = request.POST.get('item_material')
				material_priority = request.POST.get('material_priority')
				item_size = request.POST.get('item_size')
				size_priority = request.POST.get('size_priority')
				item_notes =request.POST.get('item_notes')
				
				item_image = None
				if request.FILES.get('item_image'):
					item_image = request.FILES.get('item_image')

				if user.user_admin == True:
					buying = Buying.objects.create(user=req_user, listing_title=listing_title, 
						item_type=item_type, type_priority=type_priority, item_sex=item_sex, 
						sex_priority=sex_priority, item_brand=item_brand, brand_priority=brand_priority, 
						item_model=item_model, model_priority=model_priority, item_colour=item_colour, 
						colour_priority=colour_priority, item_condition=item_condition, condition_priority=condition_priority, 
						item_material=item_material, material_priority=material_priority, item_size=item_size, 
						size_priority=size_priority, item_notes=item_notes, image_url=item_image)
					return Response({'message' : "Successfully created item for {req_user.username}."}, headers={'token':user.token})
				else:
					buying = Buying.objects.create(user=user, listing_title=listing_title, 
						item_type=item_type, type_priority=type_priority, item_sex=item_sex, 
						sex_priority=sex_priority, item_brand=item_brand, brand_priority=brand_priority, 
						item_model=item_model, model_priority=model_priority, item_colour=item_colour, 
						colour_priority=colour_priority, item_condition=item_condition, condition_priority=condition_priority, 
						item_material=item_material, material_priority=material_priority, item_size=item_size, 
						size_priority=size_priority, item_notes=item_notes, image_url=item_image)
					return Response({'message' : 'Successfully created item!', 'buying_id' : buying.uid}, headers={'token':user.token})
			return Response({'message' : 'Please log in to browse.'}, status=status.HTTP_401_UNAUTHORIZED)
		return Respones({'message' : 'Please log in to browse.'}, status=status.HTTP_401_UNAUTHORIZED)

	def get(self, request, format=None):
		token = self.request.META.get('HTTP_TOKEN')
		print(token)
		if token != "":
			user = authenticate(token)
			if user != None:
				if user.user_admin == True:
					queryset = Buying.objects.all()
					serializer = BuyingSerializer(queryset, many=True, context={'request':request})
					return Response(serializer.data)
				else:
					queryset = Buying.objects.all().filter(user=user)
					serializer = BuyingSerializer(queryset, many=True, context={'request':request})
					return Response(serializer.data)

		return Response({'message' : 'Please log in to browse.'}, status=status.HTTP_401_UNAUTHORIZED)

class BuyingDetailViewSet(APIView):

	def get(self, request, pk, format=None):
		token = request.META.get('HTTP_TOKEN')
		if token != "":
			user = authenticate(token)
			if user != None:
				if user.user_admin == True:
					try:
						queryset = Buying.objects.get(pk=pk)
						serializer = BuyingSerializer(queryset, context={'request':request})						
						return Response(serializer.data, headers={'token':user.token})
					except Buying.DoesNotExist:
						return Response("That listing does not exist.", status=status.HTTP_400_BAD_REQUEST)
				else:
					try:
						queryset = Buying.objects.get(pk=pk, user=user)
						serializer = BuyingSerializer(queryset, context={'request':request})
						return Response(serializer.data, headers={'token':user.token})
					except Buying.DoesNotExist:
						return Response("That listing does not exist.", status=status.HTTP_400_BAD_REQUEST)

		return Response("Please login to start browsing.", status=status.HTTP_400_BAD_REQUEST)

	def delete(self, request, pk, format=None):
		token = request.META.get('HTTP_TOKEN')
		if token != "":
			user = authenticate(token)
			if user != None:
				if user.user_admin == True:
					listing = Buying.objects.get(pk=pk)
					listing.delete()
					return Response("Successfully removed listing.", status=status.HTTP_204_NO_CONTENT, headers={'token':user.token})
				else:
					listing = Buying.objects.get(pk=pk, user=user)
					listing.delete()
					return Response("Successfully removed listing.", status=status.HTTP_204_NO_CONTENT, headers={'token':user.token})

		return Response("Please login to start browsing.", status=status.HTTP_400_BAD_REQUEST)