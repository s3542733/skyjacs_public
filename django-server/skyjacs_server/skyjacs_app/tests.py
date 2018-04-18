from django.test import TestCase
from .models import User
from .views import *

class SkyjacsTestCase(TestCase):
    #testing user model

    def create_user(self, User_name='test', email='test@email.com',user_admin='False'):
        #setup testing user object
        return User.objects.create(full_name=User_name,email_address=email, user_admin=user_admin)

    def test_model_create_user(self):
        #check if user object is created
        old_count = User.objects.count()
        self.user = self.create_user()
        self.user.save()
        new_count = User.objects.count()
        self.assertNotEqual(old_count, new_count)

    def test_model_check_created_user(self):
        #
        newUser = self.create_user()
        self.assertTrue(isinstance(newUser, User))
        self.assertEqual('test@email.com', newUser.email_address)
        self.assertEqual('test',newUser.full_name)
        self.assertEqual('False',newUser.user_admin)

    def test_skyjacs_views_matchType(self):
        #testing users view
        empty_pkSpec = matchType('','something','type')
        self.assertEqual(empty_pkSpec, -1)
        empty_dbSpec = matchType('something','','type')
        self.assertEqual(empty_dbSpec, 100)
        match1 = matchType('Runners/Joggers','Runners/Joggers','type')
        self.assertEqual(match1, 100)
        match2 = matchType('Basketball','Cageless','type')
        self.assertLessEqual(match2, 100)

    def test_skyjacs_views_matchSex(self):
        empty_pkSpec = matchSex('','','sex')
        self.assertEqual(empty_pkSpec, -1)