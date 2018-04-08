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
	listing_type = models.CharField(max_length=16)
	listing_title = models.CharField(max_length=255)
	listing_date = models.DateTimeField(auto_now_add=True)

class Notification(models.Model):
	uid = models.AutoField(primary_key=True)
	#user_id = models.IntegerField()
	user = models.ForeignKey(User, on_delete=models.CASCADE)
	user_listing_id = models.IntegerField()
	matched_listing_id = models.IntegerField()

class Spec(models.Model):
	uid = models.AutoField(primary_key=True)
	#listing_id = models.IntegerField()
	listing = models.ForeignKey(Listing, on_delete=models.CASCADE)
	item_type = models.IntegerField()
	item_sex = models.CharField(max_length=6, default='unisex')
	item_brand = models.CharField(max_length=255)
	item_model = models.CharField(max_length=255)
	item_condition = models.IntegerField()
	item_colour = models.CharField(max_length=255)
	item_size = models.FloatField()
	item_notes = models.TextField()

class Image(models.Model):
	uid = models.AutoField(primary_key=True)
	#user_id = models.IntegerField()
	#user = models.ForeignKey(User, on_delete=models.CASCADE)
	#listing_id = models.IntegerField()
	listing = models.ForeignKey(Listing, on_delete=models.CASCADE)
	image_url = models.ImageField(blank=True, null=True, upload_to='images')