from __future__ import unicode_literals
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import viewsets
#from django.contrib.auth.models import User
from skyjacs_app.models import User, Listing, Notification, Image
from skyjacs_app.serializers import UserSerializer, ListingSerializer, NotificationSerializer, ImageSerializer, MatchingSerializer
from fuzzywuzzy import fuzz
from fuzzywuzzy import process

SLIPON_REL = {
	'Slip On' : 5 ,
	'Low Top' : 4 ,
	'Skaters' : 4 ,
	'Cageless' : 3 ,
	'Runners/Joggers' : 3 ,
	'High Top' : 2 ,
	'Basketball' : 1,
}

LOWTOP_REL = {
	'Slip On' : 4 ,
	'Low Top' : 5 ,
	'Skaters' : 3 ,
	'Cageless' : 3 ,
	'Runners/Joggers' : 3 ,
	'High Top' : 1 ,
	'Basketball' : 3,
}

HIGHTOP_REL = {
	'Slip On' : 2 ,
	'Low Top' : 2 ,
	'Skaters' : 3 ,
	'Cageless' : 4 ,
	'Runners/Joggers' : 3 ,
	'High Top' : 5 ,
	'Basketball' : 4,
}

SKATERS_REL = {
	'Slip On' : 3 ,
	'Low Top' : 4 ,
	'Skaters' : 5 ,
	'Cageless' : 2 ,
	'Runners/Joggers' : 2 ,
	'High Top' : 3 ,
	'Basketball' : 2,
}

RUNNERSJOGGERS_REL = {
	'Slip On' : 2 ,
	'Low Top' : 4 ,
	'Skaters' : 3 ,
	'Cageless' : 4 ,
	'Runners/Joggers' : 5 ,
	'High Top' : 3 ,
	'Basketball' : 4,
}

BASKETBAL_REL = {
	'Slip On' : 1 ,
	'Low Top' : 3 ,
	'Skaters' : 2 ,
	'Cageless' : 4 ,
	'Runners/Joggers' : 4 ,
	'High Top' : 3 ,
	'Basketball' : 5,
}

CAGELESS_REL = {
	'Slip On' : 3 ,
	'Low Top' : 3 ,
	'Skaters' : 1 ,
	'Cageless' : 5 ,
	'Runners/Joggers' : 3 ,
	'High Top' : 4 ,
	'Basketball' : 4,
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
	'Damaged' : 1,
	'Well-worn' : 2,
	'Good Condition' : 3,
	'New/Little use' : 4,
	'Boxed Mint' : 5,
}

def matchType(pkSpec, dbSpec, strictList):

	if pkSpec == '' :
		return -1

	if dbSpec == '' :
		dbSpecRelValue = 5
	else :
		dbSpecRelValue = TYPEOPTS[pkSpec][dbSpec]

	if 'type' in strictList:
		if ((dbSpecRelValue/5) * 100) != 100:
			return -2

	return (dbSpecRelValue/5) * 100	

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
		dbSpecVal = 5
	else:
		dbSpecVal = CONDITIONOPTS[dbSpec]

	if 'condition' in strictList:
		if pkSpec != dbSpec:
			return -2

	if pkSpecVal == dbSpecVal:
		return 100
	elif (pkSpecVal > dbSpecVal):
		return 100 - ((pkSpecVal - dbSpecVal)/5 * 100)
	elif (pkSpecVal < dbSpecVal):
		return 100 - ((dbSpecVal - pkSpecVal)/5 * 100)

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

	if pkSpec == 0.0 or dbSpec:
		return -1

	if 'size' in strictList:
		if pkSpec != dbSpec:
			return -2

	if pkSpec == dbSpec:
		return 100
	elif pkSpec > dbSpec:
		diff = pkSpec - dbSpec
		return 100 - (diff/13.5 * 100)
	elif pkSpec < dbSpec:
		diff = dbSpec - pkSpec
		return 100 - (diff/13.5 * 100)

def getStrict(pkSpec):

	strictList = []

	if pkSpec.type_strict == True:
		strictList.append('type')
	if pkSpec.sex_strict == True:
		strictList.append('sex')
	if pkSpec.brand_strict  == True:
		strictList.append('brand')
	if pkSpec.model_strict  == True:
		strictList.append('model')
	if pkSpec.colour_strict  == True:
		strictList.append('colour')
	if pkSpec.condition_strict  == True:
		strictList.append('condition')
	if pkSpec.material_strict  == True:
		strictList.append('material')
	if pkSpec.size_strict  == True:
		strictList.append('size')

	return strictList

def getPriority(pkSpec):

	priorityList = []

	if pkSpec.type_priority == True:
		priorityList.append('type')
	if pkSpec.sex_priority == True:
		priorityList.append('sex')
	if pkSpec.brand_priority  == True:
		priorityList.append('brand')
	if pkSpec.model_priority  == True:
		priorityList.append('model')
	if pkSpec.colour_priority  == True:
		priorityList.append('colour')
	if pkSpec.condition_priority  == True:
		priorityList.append('condition')
	if pkSpec.material_priority  == True:
		priorityList.append('material')
	if pkSpec.size_priority  == True:
		priorityList.append('size')

	return priorityList

def prioritiseField(field):

	return field * 1.5

class UserViewSet(viewsets.ModelViewSet):
	queryset = User.objects.all().order_by('uid')
	serializer_class = UserSerializer

class ListingViewSet(viewsets.ModelViewSet):
	queryset = Listing.objects.all().order_by('uid')
	serializer_class = ListingSerializer

class NotificationViewSet(viewsets.ModelViewSet):
	queryset = Notification.objects.all().order_by('uid')
	serializer_class = NotificationSerializer

#class SpecViewSet(viewsets.ModelViewSet):
#	queryset = Spec.objects.all().order_by('uid')
#	serializer_class = SpecSerializer

class ImageViewSet(viewsets.ModelViewSet):
	queryset = Image.objects.all().order_by('uid')
	serializer_class = ImageSerializer

class MatchingView(APIView):

	def get(self, request, pk, format=None):
	
		pkSpec = Listing.objects.get(pk=pk)
		dbSpecs = Listing.objects.all()

		strictList = []
		priorityList = []

		if pkSpec.listing_type == "Buying":

			strictList = getStrict(pkSpec)
			priorityList = getPriority(pkSpec)

		for dbSpec in dbSpecs:
			if dbSpec.uid != pkSpec.uid:
				if dbSpec.listing_type != pkSpec.listing_type:
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
					valueList = [typePc, sexPc, brandPc, modelPc, colourPc, conditionPc, materialPc, sizePc]
					print(valueList)
					totalPc = 0
					if priorityList != []:
						for priority in priorityList:
							if priority == 'type' and typePc != -1:
								typePc = prioritiseField(typePc)
							elif priority == 'sex' and sexPc != -1:
								sexPc = prioritiseField(sexPc)
							elif priority == 'brand' and brandPc != -1:
								brandPc = prioritiseField(brandPc)
							elif priority == 'model' and modelPc != -1:
								modelPc = prioritiseField(modelPc)
							elif priority == 'colour' and colourPc != -1:
								colourPc = prioritiseField(colourPc)
							elif priority == 'condition' and conditionPc != -1:
								conditionPc = prioritiseField(conditionPc)
							elif priority == 'material' and materialPc != -1:
								materialPc = prioritiseField(materialPc)
							elif priority == 'size' and sizePc != -1:
								sizePc = prioritiseField(sizePc)

					for value in valueList:
						if value == -2:
							dbSpec.item_matching = None
							break
						if value != -1:
							totalPc = totalPc + value
						else:
							validFields = validFields - 1
					#totalPc = (typePc + sexPc + brandPc + modelPc + 
					#colourPc + conditionPc + materialPc + sizePc)/validFields
					if dbSpec.item_matching != -2:
						if validFields == 0 :
							dbSpec.item_matching = 100.0
						else:
							dbSpec.item_matching = totalPc/validFields

						if dbSpec.item_matching > 100.0:
							dbSpec.item_matching = 100.0

		queryset = dbSpecs
		serializer = MatchingSerializer(dbSpecs, many=True)	
		return Response(serializer.data)
