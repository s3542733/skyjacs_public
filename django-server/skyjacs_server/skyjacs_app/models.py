from __future__ import unicode_literals
# from django.contrib.auth.models import User
from django.db import models

class User(models.Model):
	uid = models.AutoField(primary_key=True)
	full_name = models.CharField(max_length=255)
	email_address =  models.EmailField(unique=True)
	user_admin = models.BooleanField()

class Listing(models.Model):
	uid = models.AutoField(primary_key=True)
	#user_id = models.IntegerField()
	user = models.ForeignKey(User, on_delete=models.CASCADE)
	listing_type = models.CharField(max_length=16, default='Unknown')
	listing_title = models.CharField(max_length=255, default='Unknown')
	listing_date = models.DateTimeField(auto_now_add=True)
	item_type = models.CharField(max_length=255, default='Unknown')
	type_priority = models.BooleanField(default=False)
	type_strict = models.BooleanField(default=False)
	item_sex = models.CharField(max_length=8, default='Unknown')
	sex_priority = models.BooleanField(default=False)
	sex_strict = models.BooleanField(default=False)
	item_brand = models.CharField(max_length=255, default='Unknown')
	brand_priority = models.BooleanField(default=False)
	brand_strict = models.BooleanField(default=False)
	item_model = models.CharField(max_length=255, default='Unknown')
	model_priority = models.BooleanField(default=False)
	model_strict = models.BooleanField(default=False)
	item_colour = models.CharField(max_length=255, default='Unknown')
	colour_priority = models.BooleanField(default=False)
	priority_strict = models.BooleanField(default=False)
	item_condition = models.CharField(max_length=64, default='Unknown')
	condition_priority = models.BooleanField(default=False)
	condition_strict = models.BooleanField(default=False)
	item_material = models.CharField(max_length=64, default='Unknown')
	material_priority = models.BooleanField(default=False)
	material_strict = models.BooleanField(default=False)
	item_size = models.FloatField(default='0.0')
	size_priority = models.BooleanField(default=False)
	size_strict = models.BooleanField(default=False)
	item_notes = models.TextField(default='No notes have been left!')
	item_matching = models.FloatField(null=True)

class Notification(models.Model):
	uid = models.AutoField(primary_key=True)
	#user_id = models.IntegerField()
	user = models.ForeignKey(User, on_delete=models.CASCADE)
	user_listing_id = models.IntegerField()
	matched_listing_id = models.IntegerField()


#class Spec(models.Model):
#	uid = models.AutoField(primary_key=True)
#	#listing_id = models.IntegerField()
#	listing = models.ForeignKey(Listing, on_delete=models.CASCADE)
#	item_type = models.CharField(max_length=255)
#	item_sex = models.CharField(max_length=8, default='Unisex')
#	item_brand = models.CharField(max_length=255)
#	item_model = models.CharField(max_length=255)
#	item_condition = models.CharField(max_length=64)
#	item_material = models.CharField(max_length=64, default='Plastic/Synthetic	')
#	item_size = models.FloatField()
#	item_notes = models.TextField()
#	item_matching = models.FloatField(null=True)

class Image(models.Model):
	uid = models.AutoField(primary_key=True)
	#user_id = models.IntegerField()
	#user = models.ForeignKey(User, on_delete=models.CASCADE)
	#listing_id = models.IntegerField()
	listing = models.ForeignKey(Listing, on_delete=models.CASCADE)
	image_url = models.ImageField(blank=True, null=True, upload_to='images')