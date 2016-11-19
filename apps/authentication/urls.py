from django.conf.urls import url, include

from rest_framework_nested import routers

from views import AccountViewSet, LoginView, IndexView


router = routers.SimpleRouter()
router.register(r'register', AccountViewSet, base_name="register")

urlpatterns = [
    url(r'^login/$', LoginView.as_view(), name='login'),
    url(r'^', include(router.urls)),
    url('^.*$', IndexView.as_view(), name='index'),
]
