from django.conf.urls import url

from rest_framework_nested import routers

from . import views


urlpatterns = [
    url(r'^photos/', views.index)
]