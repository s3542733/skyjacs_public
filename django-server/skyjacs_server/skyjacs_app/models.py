from __future__ import unicode_literals
from django.db import models

class User(models.Model):
	uid = models.AutoField(primary_key=True)
	username = models.CharField(max_length=64, unique=True)
	email = models.EmailField(unique=True)
	password = models.CharField(max_length=255)
	token = models.CharField(max_length=255, null=True)
	date_joined = models.DateTimeField(auto_now_add=True)

class Profile(models.Model):
	uid = models.AutoField(primary_key=True)
	user = models.ForeignKey(User, on_delete=models.CASCADE)
	first_name = models.CharField(max_length=64)
	last_name = models.CharField(max_length=64)
	user_rating = models.FloatField(default=0.0)
	user_num_ratings = models.IntegerField(default=0.0)
	user_banned = models.BooleanField(default=False)
	user_admin = models.BooleanField(default=False)

class Listing(models.Model):
	uid = models.AutoField(primary_key=True)
	user = models.ForeignKey(User, on_delete=models.CASCADE)
	listing_type = models.CharField(max_length=16, default='')
	listing_title = models.CharField(max_length=255, default='')
	listing_date = models.DateTimeField(auto_now_add=True)
	item_type = models.CharField(max_length=255, default='')
	type_priority = models.BooleanField(default=False)
	type_strict = models.BooleanField(default=False)
	item_sex = models.CharField(max_length=8, default='')
	sex_priority = models.BooleanField(default=False)
	sex_strict = models.BooleanField(default=False)
	item_brand = models.CharField(max_length=255, default='')
	brand_priority = models.BooleanField(default=False)
	brand_strict = models.BooleanField(default=False)
	item_model = models.CharField(max_length=255, default='')
	model_priority = models.BooleanField(default=False)
	model_strict = models.BooleanField(default=False)
	item_colour = models.CharField(max_length=255, default='')
	colour_priority = models.BooleanField(default=False)
	colour_strict = models.BooleanField(default=False)
	item_condition = models.CharField(max_length=64, default='')
	condition_priority = models.BooleanField(default=False)
	condition_strict = models.BooleanField(default=False)
	item_material = models.CharField(max_length=64, default='')
	material_priority = models.BooleanField(default=False)
	material_strict = models.BooleanField(default=False)
	item_size = models.FloatField(default='0.0')
	size_priority = models.BooleanField(default=False)
	size_strict = models.BooleanField(default=False)
	item_notes = models.TextField(default='No notes have been left!')
	item_matching = models.FloatField(null=True)

class Notification(models.Model):
	uid = models.AutoField(primary_key=True)
	user = models.ForeignKey(User, on_delete=models.CASCADE)
	user_listing_id = models.IntegerField()
	matched_listing_id = models.IntegerField()

class Image(models.Model):
	uid = models.AutoField(primary_key=True)
	listing = models.ForeignKey(Listing, on_delete=models.CASCADE)
	image_url = models.ImageField(blank=True, null=True, upload_to='images')