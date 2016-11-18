from django.shortcuts import render
from django.views.generic.base import TemplateView

from rest_framework import permissions, viewsets, status
from rest_framework.response import Response

from models import Account
from permissions import IsAccountOwner
from serializers import AccountSerializer


class AccountViewSet(viewsets.ModelViewSet):
	lookup_field = 'email'
	queryset = Account.objects.all()
	serializer_class = AccountSerializer

	def index(self, request):
		print "in index method"
		return render(request, 'templates/index.html')

	def get_permissions(self):
		print "in get_permissions"
		print self.request.method
		print permissions.SAFE_METHODS
		if self.request.method in permissions.SAFE_METHODS:
			print "in safe methods"
			return (permissions.AllowAny(),)

		if self.request.method == 'POST':
			print "this is a POST request!"
			return (permissions.AllowAny(),)

		return (permissions.IsAuthenticated(), IsAccountOwner(),)

	def create(self, request):
		print "in create method"
		print request.data
		serializer = self.serializer_class(data=request.data)
		print serializer

		if serializer.is_valid():
			Account.objects.create_user(**serializer.validated_data)
			return Response(serializer.validated_data, status=status.HTTP_201_CREATED)

		return Response({
			'status': 'Bad request',
			'message': 'Account could not be created with received data'
		}, status=status.HTTP_400_BAD_REQUEST)
