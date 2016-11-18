from django.shortcuts import render
from django.views.generic.base import TemplateView

from rest_framework import permissions, viewsets

from models import Account
from permissions import IsAccountOwner
from serializers import AccountSerializer


def homepage(request):
    return render(request, 'templates/index.html')

class AccountViewSet(viewsets.ModelViewSet):
    lookup_field = 'email'
    queryset = Account.objects.all()
    serializer_class = AccountSerializer

    def get_permissions(self):
        if self.request.method in permissions.SAFE_METHODS:
            return (permissions.AllowAny(),)

        if self.request.method == 'POST':
            return (permissions.AllowAny(),)

        return (permissions.IsAuthenticated(), IsAccountOwner(),)

    def create(self, request):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            Account.objects.create_user(**serializer.validated_data)

            return response(serializer.validated_data, status=status.HTTP_201_CREATED)

        return response({
            'status': 'Bad request',
            'message': 'Account could not be created with received data'
            }, status=status.HTTP_400_BAD_REQUEST)