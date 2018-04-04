from __future__ import unicode_literals
from django.contrib.auth.models import User
from django.db import models

#TODO

# class Listing(models.Model):


# class Notification(models.Model):


# class Spec(models.Model):


# class Image(models.Model):


class Shoe(models.Model):
	date_added = models.DateTimeField(auto_now_add=True)
	title = models.CharField(max_length=100, blank=True, default='')
	photo = models.ImageField(upload_to="shoes/photos/", null=True, blank=True)

	def __str__(self):
		return self.name