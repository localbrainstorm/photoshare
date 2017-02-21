from django.conf.urls import url, include

from rest_framework_nested import routers
from django.views.decorators.csrf import csrf_exempt

from views import IndexView, HandleS3View, CollectionView, TagView

# router = routers.SimpleRouter()
# router.register(r's3', csrf_exempt(HandleS3View.as_view()), base_name="s3")


urlpatterns = [
    url(r'^tags/', TagView.as_view(), name='tags'),
    url(r'^photos/', IndexView.as_view(), name='index'),
    url(r'^collections/$', CollectionView.as_view(), name='collection'),
    url(r'^s3', csrf_exempt(HandleS3View.as_view()), name='post'),
    url(r'^s3/success', csrf_exempt(HandleS3View.as_view()), name='success_redirect_endpoint')

]
