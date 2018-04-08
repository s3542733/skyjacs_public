#from django.contrib.auth.models import User, Group
from skyjacs_app.models import User, Listing, Notification, Spec, Image
from rest_framework import serializers

class UserSerializer(serializers.HyperlinkedModelSerializer):
	class Meta:
		model = User
		fields = ('uid', 'full_name', 'email_address', 'user_admin')

class ListingSerializer(serializers.HyperlinkedModelSerializer):
	class Meta:
		model = Listing
		fields = ('uid', 'user', 'listing_type', 'listing_title', 'listing_date')

class NotificationSerializer(serializers.HyperlinkedModelSerializer):
	class Meta:
		model = Notification
		fields = ('uid', 'user', 'user_listing_id', 'matched_listing_id')

class SpecSerializer(serializers.HyperlinkedModelSerializer):
	class Meta:
		model = Spec
		fields = ('uid', 'listing', 'item_type', 'item_brand', 'item_model', 'item_condition', 'item_colour', 
			'item_size', 'item_description')

class ImageSerializer(serializers.HyperlinkedModelSerializer):
	class Meta:
		model = Image
		fields = ('uid', 'listing', 'image_url')
