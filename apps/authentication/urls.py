from django.conf.urls import url, include

from rest_framework_nested import routers

from views import AccountViewSet, homepage


router = routers.SimpleRouter()
router.register(r'accounts', AccountViewSet)

urlpatterns = [
    url(r'^', include(router.urls)),

     url(r'^.*$', homepage, name='index'),
]