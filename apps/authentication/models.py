from __future__ import unicode_literals

from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.db import models


class AccountManager(BaseUserManager):
	def create_user(self, email, password=None, **kwargs):
		print "in create_user"
		if not email:
			raise ValueError("Users must have a valid email address.")

		if not kwargs['first_name']:
			raise ValueError("Users must have a first name.")

		if not kwargs['last_name']:
			raise ValueError("Users must have a last name.")

		account = self.model(
			email=self.normalize_email(email),
			first_name=kwargs['first_name'],
			last_name=kwargs['last_name']
		)

		account.set_password(password)
		account.save()

		return account

	def create_superuser(self, email, password, **kwargs):
		account = self.create_user(email, password, **kwargs)

		account.user_level = 9
		account.save()

		return account


class Account(AbstractBaseUser):
    email = models.EmailField(unique=True)

    first_name = models.CharField(max_length=40)
    last_name = models.CharField(max_length=40)
    office = models.CharField(max_length=200, default='')

    user_level = models.IntegerField(default=0)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = AccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    def __unicode__(self):
        return self.email

    def get_full_name(self):
        return ' '.join([self.first_name, self.last_name])

    def get_short_name(self):
        return self.first_name
