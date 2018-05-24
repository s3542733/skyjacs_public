# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.test import TestCase, APITestCase

from models import *
from skyjacs_app.views.users import *
from skyjacs_app.views.profiles import *
from skyjacs_app.views.rating import *
from skyjacs_app.views.buying import *
from skyjacs_app.views.selling import *
from skyjacs_app.views.recent import *
from skyjacs_app.views.matching import *
from skyjacs_app.views.auth import *

# Create your tests here.
class test_auth_class(TestCase):
    def setUpUser(self):
        user = User.objects.create(username='test', email='test@email.com', \
            password='130518', token=create_token())
        admin = User.objects.create(username='admin', email='admin@email.com',\
            password='admin123', token=create_token())
        user.save()
        admin.save()
    
    def test_user_authenticate(self, user, admin):
        test_user = authenticate(user.token)
        test_admin = authenticate(admin.token)
        self.assertNotEqual(test_user, test_admin)

        token = create_token()
        test_None = authenticate(token)
        self.assertEqual(test_None, None)

    def test_LoginView(self, user):
        url = '/api/auth/'
        data = {'username': 'test', 'password': '130518'}
        response = self.client.post(url, data, format = 'json')
        key = response.json()['token']
        self.assertEqual(key, user.token)

    def test_LogoutView():
        url = '/api/auth/'
        data = {}