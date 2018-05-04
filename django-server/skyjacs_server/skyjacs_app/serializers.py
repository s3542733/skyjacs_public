from skyjacs_app.models import User, Profile, Rating, Buying, Selling, Recent
from rest_framework import serializers

class UserSerializer(serializers.HyperlinkedModelSerializer):
	class Meta:
		model = User
		fields = ('uid', 'username', 'email', 'password', 'token', 'user_admin', 'date_joined')

class ProfileSerializer(serializers.ModelSerializer):
	class Meta:
		model = Profile
		fields = ('user', 'first_name', 'last_name', 'user_rating')

class RatingSerializer(serializers.ModelSerializer):
	class Meta:
		model = Rating
		fields = ('uid', 'rated_user', 'rating_user', 'rating_value')

class RecentSerializer(serializers.ModelSerializer):
	class Meta:
		model = Recent
		fields = ('uid', 'user', 'recent_buyings', 'recent_sellings')

class BuyingSerializer(serializers.ModelSerializer):
	class Meta:
		model = Buying
		fields = ('uid', 'user', 'listing_title', 'listing_date', 'listing_type', 'min_price', 'max_price', 'item_type', 'type_priority', 'item_sex',
			'sex_priority', 'type_priority', 'item_brand', 'brand_priority', 'item_model', 'model_priority', 
			'item_condition', 'condition_priority', 'item_colour', 'colour_priority', 'item_material', 
			'material_priority', 'item_size', 'size_priority', 'item_notes', 'item_matching', 'image_url')

class SellingSerializer(serializers.ModelSerializer):
	class Meta:
		model = Selling
		fields = ('uid', 'user', 'listing_title', 'listing_date', 'listing_type', 'item_price', 'item_type', 'item_sex',  
			'item_brand', 'item_model', 'item_condition', 'item_colour', 'item_material', 
			'item_size', 'item_notes', 'item_matching', 'image_url')