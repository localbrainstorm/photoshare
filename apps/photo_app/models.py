from __future__ import unicode_literals

from django.db import models
from ..authentication.models import Account

class Photo(models.Model): 
    title = models.CharField(max_length=200)
    description = models.TextField()
    subject = models.TextField()
    photographer = models.CharField(max_length=200)
    architect = models.CharField(max_length=200)
    notes = models.TextField()
    rights = models.CharField(max_length=200)
    directory_name = models.CharField(max_length=200)
    file_format = models.CharField(max_length=200)
    file_name = models.CharField(max_length=200)
    has_people = models.BooleanField()
    provenance = models.CharField(max_length=200)
    updated_by = models.ForeignKey(Account, related_name='photos')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)




