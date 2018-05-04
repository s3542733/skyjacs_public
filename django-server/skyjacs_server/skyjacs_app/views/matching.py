from __future__ import unicode_literals
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import viewsets, mixins, status
from skyjacs_app.models import Buying, Selling, User
from skyjacs_app.views.auth import authenticate
from skyjacs_app.serializers import BuyingSerializer, SellingSerializer
from django.db.models import Q
from fuzzywuzzy import fuzz
from fuzzywuzzy import process

SLIPON_REL = {
	'Slip On' : 5.0,
	'Low Top' : 4.0,
	'Skaters' : 4.0,
	'Cageless' : 3.0,
	'Runners/Joggers' : 3.0,
	'High Top' : 2.0,
	'Basketball' : 1.0,
}

LOWTOP_REL = {
	'Slip On' : 4.0,
	'Low Top' : 5.0,
	'Skaters' : 3.0,
	'Cageless' : 3.0,
	'Runners/Joggers' : 3.0,
	'High Top' : 1.0,
	'Basketball' : 3.0,
}

HIGHTOP_REL = {
	'Slip On' : 2.0,
	'Low Top' : 2.0,
	'Skaters' : 3.0,
	'Cageless' : 4.0,
	'Runners/Joggers' : 3.0,
	'High Top' : 5.0,
	'Basketball' : 4.0,
}

SKATERS_REL = {
	'Slip On' : 3.0 ,
	'Low Top' : 4.0 ,
	'Skaters' : 5.0 ,
	'Cageless' : 2.0 ,
	'Runners/Joggers' : 2.0 ,
	'High Top' : 3.0 ,
	'Basketball' : 2.0,
}

RUNNERSJOGGERS_REL = {
	'Slip On' : 2.0 ,
	'Low Top' : 4.0 ,
	'Skaters' : 3.0 ,
	'Cageless' : 4.0 ,
	'Runners/Joggers' : 5.0 ,
	'High Top' : 3.0 ,
	'Basketball' : 4.0,
}

BASKETBAL_REL = {
	'Slip On' : 1.0 ,
	'Low Top' : 3.0 ,
	'Skaters' : 2.0 ,
	'Cageless' : 4.0 ,
	'Runners/Joggers' : 4.0 ,
	'High Top' : 3.0 ,
	'Basketball' : 5.0,
}

CAGELESS_REL = {
	'Slip On' : 3.0 ,
	'Low Top' : 3.0 ,
	'Skaters' : 1.0 ,
	'Cageless' : 5.0 ,
	'Runners/Joggers' : 3.0 ,
	'High Top' : 4.0 ,
	'Basketball' : 4.0,
}

TYPEOPTS = {
	'Slip On' : SLIPON_REL ,
	'Low Top' : LOWTOP_REL ,
	'Skaters' : SKATERS_REL ,
	'Cageless' : CAGELESS_REL ,
	'Runners/Joggers' : RUNNERSJOGGERS_REL ,
	'High Top' : HIGHTOP_REL ,
	'Basketball' : BASKETBAL_REL,
}

CONDITIONOPTS = {
	'Damaged' : 1.0,
	'Well-worn' : 2.0,
	'Good Condition' : 3.0,
	'New/Little use' : 4.0,
	'Boxed Mint' : 5.0,
}

def matchType(pkSpec, dbSpec, strictList):

	if pkSpec == '' :
		return -1

	if dbSpec == '' :
		dbSpecRelValue = 5.0
	else :
		dbSpecRelValue = TYPEOPTS[pkSpec][dbSpec]

	if 'type' in strictList:
		if ((dbSpecRelValue/5.0) * 100) != 100:
			return -2

	return (dbSpecRelValue/5.0) * 100	

def matchSex(pkSpec, dbSpec, strictList):

	if pkSpec == '' or dbSpec == '':
		return -1

	if 'sex' in strictList:
		if pkSpec != dbSpec:
			return -2

	if pkSpec == dbSpec:
		return 100
	elif 'Unisex' in [pkSpec, dbSpec]:
		return 50
	else:
		return 0

def matchBrand(pkSpec, dbSpec, strictList):

	if pkSpec == '' or dbSpec == '':
		return -1

	if 'brand' in strictList:
		if pkSpec != dbSpec:
			return -2

	if pkSpec != dbSpec:
		return 0
	else:
		return 100

def matchModel(pkSpec, dbSpec, strictList):

	if pkSpec == '' or dbSpec == '':
		return -1

	if 'model' in strictList:
		if fuzz.ratio(pkSpec, dbSpec) != 100:
			return -2

	return (fuzz.partial_ratio(pkSpec, dbSpec) + fuzz.token_sort_ratio(pkSpec, dbSpec) + fuzz.ratio(pkSpec, dbSpec))/3

def matchCondition(pkSpec, dbSpec, strictList):

	if pkSpec == '':
		return -1
	else:
		pkSpecVal = CONDITIONOPTS[pkSpec]

		
	if dbSpec == '':
		dbSpecVal = 5.0
	else:
		dbSpecVal = CONDITIONOPTS[dbSpec]

	if 'condition' in strictList:
		if pkSpec != dbSpec:
			return -2

	if pkSpecVal == dbSpecVal:
		return 100
	elif (pkSpecVal > dbSpecVal):
		return 100.0 - ((pkSpecVal - dbSpecVal)/5.0 * 100.0)
	elif (pkSpecVal < dbSpecVal):
		return 100 - ((dbSpecVal - pkSpecVal)/5.0 * 100.0)

	return 0


def matchMaterial(pkSpec, dbSpec, strictList):

	if pkSpec == '' or dbSpec == '':
		return -1

	if 'material' in strictList:
		if pkSpec != dbSpec:
			return -2

	if pkSpec == dbSpec:
		return 100
	else:
		return 0

def matchColour(pkSpec, dbSpec, strictList):

	if pkSpec == '' or dbSpec == '':
		return -1

	if 'colour' in strictList:
		if fuzz.token_sort_ratio(pkSpec, dbSpec) != 100:
			return -2

	return (fuzz.token_sort_ratio(pkSpec, dbSpec))

def matchSize(pkSpec, dbSpec, strictList):

	if pkSpec == 0.0 or dbSpec == 0.0:
		return -1

	if 'size' in strictList:
		if pkSpec != dbSpec:
			return -2

	if pkSpec == dbSpec:
		return 100
	elif pkSpec > dbSpec:
		diff = pkSpec - dbSpec
		return 100.0 - (diff/13.5 * 100)
	elif pkSpec < dbSpec:
		diff = dbSpec - pkSpec
		return 100.0 - (diff/13.5 * 100)

def getStrictList(pkSpec):

	priorityList = []

	if pkSpec.type_priority == 3:
		priorityList.append('type')
	if pkSpec.type_priority == 3:
		priorityList.append('sex')
	if pkSpec.type_priority == 3:
		priorityList.append('brand')
	if pkSpec.type_priority == 3:
		priorityList.append('model')
	if pkSpec.type_priority == 3:
		priorityList.append('colour')
	if pkSpec.type_priority == 3:
		priorityList.append('condition')
	if pkSpec.type_priority == 3:
		priorityList.append('material')
	if pkSpec.type_priority == 3:
		priorityList.append('size')

	return priorityList

def setPriority(fieldPc, priorityLevel):

	if fieldPc > 0:
		if priorityLevel == 0:
			return fieldPc
		elif priorityLevel == 1:
			return fieldPc * 1.5
		elif priorityLevel == 2:
			return fieldPc * 0.5
	else:
		return fieldPc

class BuyingMatchingView(APIView):

	def get(self, request, pk, format=None):

		pkSpec = None
		dbSpecs = None

		token = request.META.get('HTTP_TOKEN');
		user = authenticate(token)
		
		if user != None:
			if user.user_admin == True:
				try:
					pkSpec = Buying.objects.get(pk=pk)
				except Buying.DoesNotExist:
					return Response({"message" : "Listing does not exists."}, status=status.HTTP_400_BAD_REQUEST)
			else:
				try:
					pkSpec = Buying.objects.get(pk=pk, user=user)
				except Buying.DoesNotExist:
					return Response({"message" : "Listing does not exists."}, status=status.HTTP_400_BAD_REQUEST)
		else:
			return Response({"message": "Please log in to start browsing."}, status=status.HTTP_401_UNAUTHORIZED)

		dbSpecs = Selling.objects.exclude(user=pkSpec.user)
		if not dbSpecs:
			return Response({"message" :"There are no listings to compare to at this time."}, status=status.HTTP_400_BAD_REQUEST)

		strictList = getStrictList(pkSpec)

		matchingVals = []

		for dbSpec in dbSpecs:
			if dbSpec.item_price <= pkSpec.max_price and dbSpec.item_price >= pkSpec.min_price:
				validFields = 8
				typePc = setPriority(matchType(pkSpec.item_type, dbSpec.item_type, strictList), pkSpec.type_priority)
				sexPc = setPriority(matchSex(pkSpec.item_sex, dbSpec.item_sex, strictList), pkSpec.sex_priority)
				brandPc = setPriority(matchBrand(pkSpec.item_brand, dbSpec.item_brand, strictList), pkSpec.brand_priority)
				modelPc = 0
				if brandPc == 100 or brandPc == -1:
					modelPc = setPriority(matchModel(pkSpec.item_model, dbSpec.item_model, strictList), pkSpec.model_priority)
				colourPc = setPriority(matchColour(pkSpec.item_colour, dbSpec.item_colour, strictList), pkSpec.colour_priority)
				conditionPc = setPriority(matchCondition(pkSpec.item_condition, dbSpec.item_condition, strictList), pkSpec.condition_priority)
				materialPc = setPriority(matchMaterial(pkSpec.item_material, dbSpec.item_material, strictList), pkSpec.material_priority)
				sizePc = setPriority(matchSize(pkSpec.item_size, dbSpec.item_size, strictList), pkSpec.size_priority)
				totalPc = 0.0
				valueList = [typePc, sexPc, brandPc, modelPc, colourPc, conditionPc, materialPc, sizePc]
				for value in valueList:
					if value == -2:
						dbSpec.item_matching = -2
						break
					if value != -1:
						totalPc = totalPc + value
					else:
						validFields = validFields - 1
				if dbSpec.item_matching != -2:
						if validFields == 0 :
							dbSpec.item_matching = 100.0
						else:
							dbSpec.item_matching = int(totalPc/validFields)
						if dbSpec.item_matching > 100.0:
							dbSpec.item_matching = 100.0
						serializer = SellingSerializer(dbSpec, context={'request':request})
						matchingVals.append(serializer.data)
		
		if not matchingVals:
			return Response({"message" : "There are no matching listings at this time."})
							
		return Response(matchingVals)

class SellingMatchingView(APIView):

	def get(self, request, pk, format=None):

		pkSpec = None
		dbSpec = None

		token = request.META.get('HTTP_TOKEN');
		user = authenticate(token)
		if user != None:
			if user.user_admin == True:
				try:
					pkSpec = Selling.objects.get(pk=pk)
				except Selling.DoesNotExist:
					return Response({"message" : "Listing does not exists."}, status=status.HTTP_400_BAD_REQUEST)
			else:
				try:
					pkSpec = Selling.objects.get(pk=pk, user=user)
				except Listing.DoesNotExist:
					return Response({"message" : "Listing does not exists."}, status=status.HTTP_400_BAD_REQUEST)
		else:
			return Response({"message" : "Please login to start browsing."}, status=status.HTTP_401_UNAUTHORIZED)

		dbSpecs = Buying.objects.exclude(user=pkSpec.user)
		if not dbSpecs:
			return Response({"message" : "There are no listings to compare to at this time."}, status=status.HTTP_400_BAD_REQUEST)

		strictList = []
		matchingVals = []

		for dbSpec in dbSpecs:
			if dbSpec.min_price <= pkSpec.item_price and dbSpec.max_price >= pkSpec.item_price:
				validFields = 8
				typePc = matchType(pkSpec.item_type, dbSpec.item_type, strictList)
				sexPc = matchSex(pkSpec.item_sex, dbSpec.item_sex, strictList)
				brandPc = matchBrand(pkSpec.item_brand, dbSpec.item_brand, strictList)
				modelPc = 0
				if brandPc == 100 or brandPc == -1:
					modelPc = matchModel(pkSpec.item_model, dbSpec.item_model, strictList)
				colourPc = matchColour(pkSpec.item_colour, dbSpec.item_colour, strictList)
				conditionPc = matchCondition(pkSpec.item_condition, dbSpec.item_condition, strictList)
				materialPc = matchMaterial(pkSpec.item_material, dbSpec.item_material, strictList)
				sizePc = matchSize(pkSpec.item_size, dbSpec.item_size, strictList)
				totalPc = 0.0
				valueList = [typePc, sexPc, brandPc, modelPc, colourPc, conditionPc, materialPc, sizePc]
				for value in valueList:
					if value == -2:
						dbSpec.item_matching = -2
						break
					if value != -1:
						totalPc = totalPc + value
					else:
						validFields = validFields - 1
				if dbSpec.item_matching != -2:
						if validFields == 0 :
							dbSpec.item_matching = 100.0
						else:
							dbSpec.item_matching = int(totalPc/validFields)
						if dbSpec.item_matching > 100.0:
							dbSpec.item_matching = 100.0

						serializer = BuyingSerializer(dbSpec, context={'request':request})
						matchingVals.append(serializer.data)

		if not matchingVals:
			return Response({"message" : "There are no matching listings at this time."})
							
		return Response(matchingVals)