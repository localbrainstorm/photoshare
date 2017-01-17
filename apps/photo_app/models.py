from __future__ import unicode_literals

from django.db import models
from ..authentication.models import Account

import json

class CollectionManager(models.Manager):
	def new_collection(self, data):
		# TO DO: check if user is logged in first
		uid = int(data['user']['id'])
		try:
			user = Account.objects.get(id=uid);
		except Exception as e:
			print e
		collection = Collection.objects.create(updated_by=user)
		# TODO: separate this out 
		for item in data['images_array']:
			item = str(item)
			try:
				this_photo = Photo.objects.create(uuid=item, updated_by=user, collection=collection)
			except Exception as e:
				print e

		data["collection"] = collection.id
		return data

	def update_collection(self, collection, name, description):
		try:
			updated_collection = collection.update(name=name, description=description)
			return updated_collection
		except Exception as e:
			print e, "collection error"
			return e

	def get_collection_query_set(self, collection_id):
		return Collection.objects.filter(id=collection_id)


class PhotoManager(models.Manager):
	def update_all(self, collection, name, description, tags):
		photo_list_to_return = []
		photos = Photo.objects.filter(collection=collection)
		photos.update(title=name, description=description)
		for photo in photos:
			for tag in tags:
				tag.photos.add(photo)
			photo_list_to_return.append(photo.id)
		return photo_list_to_return
		


class TagManager(models.Manager):
	def create_or_update(self, tags, collection_id):
		list_of_tags = []

		for tag in tags:
			if self.tag_already_exists(tag):
				db_tag = self.get_tag(tag['id'])
			else:
				db_tag = Tag(name=tag['text'])
				db_tag.save()

			db_tag.collections.add(collection_id)
			list_of_tags.append(db_tag)
		return list_of_tags
				
	def tag_already_exists(self, tag):
		if tag.has_key("id"):
			return True
		else:
			return False

	def get_tag(self, tag_id):
		return Tag.objects.get(id=tag_id)


class Collection(models.Model):
	name = models.CharField(max_length=200)
	description = models.CharField(max_length=255)
	updated_by = models.ForeignKey(Account, related_name='collections', null=True)
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
	objects = PhotoManager()

	def __str__(self):
	    return self.uuid


class Tag(models.Model):
	name = models.CharField(max_length=200)
	photos = models.ManyToManyField(Photo)
	collections = models.ManyToManyField(Collection)
	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True)
	objects = TagManager()

	def __str__(self):
		return str(self.name)
