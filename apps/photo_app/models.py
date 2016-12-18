from __future__ import unicode_literals

from django.db import models
from ..authentication.models import Account

class CollectionManager(models.Manager):
	def new_collection(self, data):
		print data, 'data here'

		uid = int(data['user']['id'])
		user = Account.objects.get(id=uid);
		coll = Collection()
		coll.save()
		for item in data['images_array']:
			item = str(item)
			print 'item', item, type(item)
			this_photo = Photo.objects.create(uuid=item, updated_by=user, collection=coll)

			# print data.images_array, 'this'


			print "====>" , this_photo.collection
			# this_photo.save()

class Collection(models.Model):
	name = models.CharField(max_length=200)
	description = models.CharField(max_length=255)
	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True)
	objects = CollectionManager()

	def __str__(self):
	    return str(self.id)

class Photo(models.Model):
	title = models.CharField(max_length=200)
	uuid = models.CharField(max_length=255)
	description = models.TextField()
	subject = models.TextField()
	photographer = models.CharField(max_length=200)
	architect = models.CharField(max_length=200)
	notes = models.TextField()
	rights = models.CharField(max_length=200)
	directory_name = models.CharField(max_length=200)
	file_format = models.CharField(max_length=200)
	file_name = models.CharField(max_length=200)
	has_people = models.NullBooleanField()
	provenance = models.CharField(max_length=200)
	updated_by = models.ForeignKey(Account, related_name='photos')
	collection = models.ForeignKey(Collection, related_name='photo_collection')
	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True)

	def __str__(self):
	    return self.uuid
