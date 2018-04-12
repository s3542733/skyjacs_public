
"""skyjacs_server URL Configuration
The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url, include
from django.conf.urls.static import static
from django.conf import settings
from django.contrib import admin
#from django.contrib.auth import views as auth_views
from django.views.generic.base import TemplateView
from skyjacs_app import views
from rest_framework import routers

# templateView : responding to a GET request and returning a response
# API is connected thorugh automatic URL routing

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'listings', views.ListingViewSet)
router.register(r'notifications', views.NotificationViewSet)
#router.register(r'specs', views.SpecViewSet)
router.register(r'images', views.ImageViewSet)

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    #url(r'^login/$', auth_views.login, {'template_name': 'login.html'}, name='login'),
    #url(r'^logout/$', auth_views.logout, {'template_name': 'logout.html'}, name='logout'),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^', include(router.urls)),
    url(r'^$', TemplateView.as_view(template_name='home.html'), name='home'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)