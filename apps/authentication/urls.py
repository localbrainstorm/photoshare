from django.conf.urls import url, include

from rest_framework_nested import routers

from views import AccountViewSet


# router = routers.SimpleRouter()
# router.register(r'register', AccountViewSet)

urlpatterns = [
    # url(r'^', include(router.urls)),
	url(r'register', AccountViewSet.as_view({
		'post': 'create',
	})),
    url(r'^.*$', AccountViewSet.as_view({
		'get':'index'
	})),
]
