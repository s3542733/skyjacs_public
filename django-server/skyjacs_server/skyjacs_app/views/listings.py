from __future__ import unicode_literals
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework import viewsets, mixins, status
from skyjacs_app.models import Listing, User
from skyjacs_app.serializers import ListingSerializer
from skyjacs_app.views.auth import authenticate

class ListingListViewSet(APIView):

	def post(self, request, format=None):		
		token = request.META.get('HTTP_TOKEN')
		if token != "":
			user = authenticate(token)
			if user != None:
				req_user = User.objects.get(pk=int(request.POST.get('user_id')))
				listing_type = request.POST.get('listing_type')
				listing_title = request.POST.get('listing_title')
				item_type = request.POST.get('item_type')
				type_priority = request.POST.get('type_priority')
				type_strict = request.POST.get('type_strict')
				item_sex = request.POST.get('item_sex')
				sex_priority = request.POST.get('sex_priority')
				sex_strict = request.POST.get('sex_strict')
				item_brand = request.POST.get('item_brand')
				brand_priority = request.POST.get('brand_priority')
				brand_strict = request.POST.get('brand_strict')
				item_model = request.POST.get('item_model')
				model_priority = request.POST.get('model_priority')
				model_strict = request.POST.get('model_strict')
				item_colour =  request.POST.get('item_colour')
				colour_priority = request.POST.get('colour_priority')
				colour_strict = request.POST.get('colour_strict')
				item_condition = request.POST.get('item_condition')
				condition_priority = request.POST.get('condition_priority')
				condition_strict = request.POST.get('condition_strict')
				item_material = request.POST.get('item_material')
				material_priority = request.POST.get('material_priority')
				material_strict = request.POST.get('material_strict')
				item_size = request.POST.get('item_size')
				size_priority = request.POST.get('size_priority')
				size_strict = request.POST.get('size_strict')
				item_notes =request.POST.get('item_notes')
				if user.user_admin == True:
					listing = Listing.objects.create(user=req_user, listing_type=listing_type, 
						listing_title=listing_title, item_type=item_type, type_priority=type_priority,
						type_strict=type_strict, item_sex=item_sex, sex_priority=sex_priority,
						sex_strict=sex_strict, item_brand=item_brand, brand_priority=brand_priority,
						brand_strict=brand_strict, item_model=item_model, model_priority=model_priority,
						model_strict=model_strict, item_colour=item_colour, colour_priority=colour_priority,
						colour_strict=colour_strict, item_condition=item_condition, condition_priority=condition_priority,
						condition_strict=condition_strict, item_material=item_material, material_priority=material_priority,
						material_strict=material_strict, item_size=item_size, size_priority=size_priority, size_strict=size_strict,
						item_notes=item_notes)
					queryset = listing
					serializer = ListingSerializer(queryset, context={'request':request})
					return Response("Successfully created item for {req_user.username}.")
				else:	
					listing = Listing.objects.create(user=user, listing_type=listing_type, 
						listing_title=listing_title, item_type=item_type, type_priority=type_priority,
						type_strict=type_strict, item_sex=item_sex, sex_priority=sex_priority,
						sex_strict=sex_strict, item_brand=item_brand, brand_priority=brand_priority,
						brand_strict=brand_strict, item_model=item_model, model_priority=model_priority,
						model_strict=model_strict, item_colour=item_colour, colour_priority=colour_priority,
						colour_strict=colour_strict, item_condition=item_condition, condition_priority=condition_priority,
						condition_strict=condition_strict, item_material=item_material, material_priority=material_priority,
						material_strict=material_strict, item_size=item_size, size_priority=size_priority, size_strict=size_strict,
						item_notes=item_notes)
					queryset = listing
					serializer = ListingSerializer(queryset, context={'request':request})
					return Response("Successfully created item!")
			return Response("Please login to start browsing.", status=status.HTTP_401_UNAUTHORIZED)
		return Respones("Please login to start browsing", status=status.HTTP_401_UNAUTHORIZED)

	def get(self, request, format=None):
		token = self.request.META.get('HTTP_TOKEN')
		print(token)
		if token != "":
			user = authenticate(token)
			if user != None:
				if user.user_admin == True:
					queryset = Listing.objects.all()
					serializer = ListingSerializer(queryset, many=True, context={'request':request})

					return Response(serializer.data)
				else:	
					queryset = Listing.objects.all().filter(user=user)
					serializer = ListingSerializer(queryset, many=True, context={'request':request})

					return Response(serializer.data)

		return Response("Please log in to browse.", status=status.HTTP_401_UNAUTHORIZED)

class ListingDetailViewSet(APIView):

	def get(self, request, pk, format=None):
		token = request.META.get('HTTP_TOKEN')
		if token != "":
			user = authenticate(token)
			if user != None:
				if user.user_admin == True:
					try:
						queryset = Listing.objects.get(pk=pk)
						serializer = ListingSerializer(queryset)

						return Response(serializer.data)
					except Listing.DoesNotExist:
						return Response("That listing does not exist.", status=status.HTTP_400_BAD_REQUEST)
				else:
					try:
						queryset = Listing.objects.get(pk=pk, user=user)
						serializer = ListingSerializer(queryset)

						return Response(serializer.data)
					except Listing.DoesNotExist:
						return Response("That listing does not exist.", status=status.HTTP_400_BAD_REQUEST)

		return Response("Please login to start browsing.", status=status.HTTP_400_BAD_REQUEST)

	def delete(self, request, pk, format=None):
		token = request.META.get('HTTP_TOKEN')
		if token != "":
			user = authenticate(token)
			if user != None:
				if user.user_admin == True:
					listing = Listing.objects.get(pk=pk)
					listing.delete()
					return Response("Successfully removed listing.", status=status.HTTP_204_NO_CONTENT)
				else:
					listing = Listing.objects.get(pk=pk, user=user)
					listing.delete()
					return Response("Successfully removed listing.", status=status.HTTP_204_NO_CONTENT)

		return Response("Please login to start browsing.", status=status.HTTP_400_BAD_REQUEST)