from __future__ import unicode_literals
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import viewsets, mixins
#from django.conf import settings
#from django.shortcuts import redirect
from django.contrib.auth.hashers import make_password, check_password
#from django.contrib.auth.decorators import login_required
#from django.contrib.auth import authenticate, login, logout
#from django.contrib.auth.models import User
from skyjacs_app.models import Profile, Listing, Notification, Image, User
from skyjacs_app.serializers import UserSerializer, SensitiveUserSerializer, ProfileSerializer, ListingSerializer, NotificationSerializer, ImageSerializer, MatchingSerializer
from fuzzywuzzy import fuzz
from fuzzywuzzy import process
import uuid

SLIPON_REL = {
	'Slip On' : 5.0 ,
	'Low Top' : 4.0 ,
	'Skaters' : 4.0 ,
	'Cageless' : 3.0 ,
	'Runners/Joggers' : 3.0 ,
	'High Top' : 2.0 ,
	'Basketball' : 1.0,
}

LOWTOP_REL = {
	'Slip On' : 4.0 ,
	'Low Top' : 5.0 ,
	'Skaters' : 3.0 ,
	'Cageless' : 3.0 ,
	'Runners/Joggers' : 3.0 ,
	'High Top' : 1.0 ,
	'Basketball' : 3.0,
}

HIGHTOP_REL = {
	'Slip On' : 2.0 ,
	'Low Top' : 2.0 ,
	'Skaters' : 3.0 ,
	'Cageless' : 4.0 ,
	'Runners/Joggers' : 3.0 ,
	'High Top' : 5.0 ,
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

	if pkSpec == 0.0 or dbSpec:
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

def authenticate(username, token):
	try:
		user = User.objects.get(username=username, token=token)
		return user
	except User.DoesNotExist:
		return None

class UserViewSet(
	mixins.RetrieveModelMixin, 
	mixins.UpdateModelMixin, 
	mixins.DestroyModelMixin, 
	mixins.ListModelMixin, 
	viewsets.GenericViewSet):
	queryset = User.objects.all().order_by('uid')
	serializer_class = UserSerializer

class ProfileViewSet(viewsets.ModelViewSet):
	queryset = Profile.objects.all().order_by('uid')
	serializer_class = ProfileSerializer

class NewUserView(APIView):

	def post(self, request, format=None):

		email = request.POST.get('email')
		username = request.POST.get('username')
		first_name = request.POST.get('first_name')
		last_name = request.POST.get('last_name')
		password = make_password(request.POST.get('password'), salt=None, hasher='default')

		newUser = User.objects.create(
			email=email, 
			username=username,
			password=password)

		newUserProfile = Profile.objects.create(
			user=newUser,
			first_name=first_name,
			last_name=last_name)

		queryset = newUser
		serializer = SensitiveUserSerializer(queryset)

		return Response(serializer.data)

class LoginView(APIView):

	def post(self, request, format=None):

		username = request.POST.get('username')
		password = request.POST.get('password')

		try:
			user = User.objects.get(username=username)
			if check_password(password, user.password):
				token = uuid.uuid4().hex
				user.token = token
				user.save()

				queryset = user
				serializer = SensitiveUserSerializer(user)
				return Response(serializer.data)
		except User.DoesNotExist:
			return Response("Failed to login. Username or Password is incorrect.")

class LogoutView(APIView):

	def post(self, request, format=None):
		username = request.POST.get('username')
		token = request.POST.get('token')

		user = authenticate(username, token)
		if user != None:
			user.token = None
			user.save()
			return Response("You've been successfully logged out.")
		else:
			return Response("REDIRECT SOMEWHERE")

class ListingViewSet(viewsets.ModelViewSet):
	queryset = Listing.objects.all().order_by('uid')	
	serializer_class = ListingSerializer

class NotificationViewSet(viewsets.ModelViewSet):
	queryset = Notification.objects.all().order_by('uid')
	serializer_class = NotificationSerializer

class ImageViewSet(viewsets.ModelViewSet):
	queryset = Image.objects.all().order_by('uid')
	serializer_class = ImageSerializer

class MatchingView(APIView):

	def get(self, request, pk, format=None):
	
		pkSpec = Listing.objects.get(pk=pk)
		dbSpecs = Listing.objects.all().exclude(listing_type=pkSpec.listing_type)

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
		serializer_class = MatchingSerializer(dbSpecs, many=True)	
		return Response(serializer.data)