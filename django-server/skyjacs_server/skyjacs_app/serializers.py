from skyjacs_app.models import User, Profile, Listing, Image
from rest_framework import serializers

class UserSerializer(serializers.HyperlinkedModelSerializer):
	class Meta:
		model = User
		fields = ('uid', 'username', 'email', 'password', 'token', 'user_admin', 'date_joined')

class ProfileSerializer(serializers.ModelSerializer):
	class Meta:
		model = Profile
		fields = ('first_name', 'last_name', 'user_rating', 'user_num_ratings', 
			'user_banned')

class ListingSerializer(serializers.HyperlinkedModelSerializer):
	class Meta:
		model = Listing
		fields = ('uid', 'user', 'listing_type', 'listing_title', 'listing_date',
			'item_sex', 'sex_priority', 'sex_strict', 'item_type', 'type_priority', 'type_strict', 
			'item_brand', 'brand_priority', 'brand_strict', 'item_model', 'model_priority', 
			'model_strict', 'item_condition', 'condition_priority', 'condition_strict', 
			'item_colour', 'colour_priority', 'colour_strict', 'item_material', 'material_priority', 
			'material_strict', 'item_size', 'size_priority', 'size_strict', 'item_notes', 'item_matching')

class ImageSerializer(serializers.HyperlinkedModelSerializer):
	class Meta:
		model = Image
		fields = ('uid', 'listing', 'image_url')

class MatchingSerializer(serializers.ModelSerializer):
	class Meta:
		model = Listing
		fields = ('uid', 'user', 'listing_type', 'listing_title', 'listing_date',
			'item_sex', 'sex_priority', 'sex_strict', 'item_type', 'type_priority', 'type_strict', 
			'item_brand', 'brand_priority', 'brand_strict', 'item_model', 'model_priority', 
			'model_strict', 'item_condition', 'condition_priority', 'condition_strict', 
			'item_colour', 'colour_priority', 'colour_strict', 'item_material', 'material_priority', 
			'material_strict', 'item_size', 'size_priority', 'size_strict', 'item_notes', 'item_matching')