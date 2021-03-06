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
from django.views.generic.base import TemplateView
from skyjacs_app import views
from rest_framework import routers

# templateView : responding to a GET request and returning a response
# API is connected thorugh automatic URL routing

router = routers.DefaultRouter()
router.register(r'users', views.users.UserViewSet)
router.register(r'profiles', views.profiles.ProfileViewSet)
router.register(r'buyings', views.buying.BuyingViewSet)
router.register(r'sellings', views.selling.SellingViewSet)
router.register(r'recents', views.recent.RecentViewSet)
#router.register(r'ratings', views.rating.RatingViewSet)

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^', include(router.urls)),
    url(r'^$', TemplateView.as_view(template_name='home.html'), name='home'),
    url(r'^buyingmatches/(?P<pk>[0-9]+)$', views.matching.BuyingMatchingView.as_view()),
    url(r'^sellingmatches/(?P<pk>[0-9]+)$', views.matching.SellingMatchingView.as_view()),
    url(r'^register/', views.users.RegisterView.as_view()),
    url(r'^login/', views.auth.LoginView.as_view()),
    url(r'^logout/', views.auth.LogoutView.as_view()),
    url(r'^buying/$', views.buying.BuyingListViewSet.as_view()),
    url(r'^buying/(?P<pk>[0-9]+)$', views.buying.BuyingDetailViewSet.as_view()),
    url(r'^selling/$', views.selling.SellingListViewSet.as_view()),
    url(r'^selling/(?P<pk>[0-9]+)$', views.selling.SellingDetailViewSet.as_view()),
    url(r'^recent/$', views.recent.RecentView.as_view()),
    url(r'^rating/$', views.rating.RatingView.as_view()),
    url(r'^getprofile/(?P<pk>[0-9]+)$', views.profiles.GetProfileView.as_view()),
    url(r'^getuser/$', views.users.GetUserView.as_view()),
    url(r'^getlistings/$', views.profiles.GetListings.as_view()),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
