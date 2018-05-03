from skyjacs_app.models import User, Profile, Buying, Selling
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

class BuyingSerializer(serializers.HyperlinkedModelSerializer):
	class Meta:
		model = Buying
		fields = ('uid', 'user', 'listing_title', 'listing_date', 'min_price', 'max_price', 'item_type', 'type_priority', 'item_sex',
			'sex_priority', 'type_priority', 'item_brand', 'brand_priority', 'item_model', 'model_priority', 
			'item_condition', 'condition_priority', 'item_colour', 'colour_priority', 'item_material', 
			'material_priority', 'item_size', 'size_priority', 'item_notes', 'item_matching', 'image_url')

class SellingSerializer(serializers.HyperlinkedModelSerializer):
	class Meta:
		model = Selling
		fields = ('uid', 'user', 'listing_title', 'listing_date', 'item_price', 'item_type', 'item_sex',  
			'item_brand', 'item_model', 'item_condition', 'item_colour', 'item_material', 
			'item_size', 'item_notes', 'item_matching', 'image_url')