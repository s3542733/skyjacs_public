from django.test import TestCase
from .models import User

class ModelTestCase(TestCase):
    #

    def setUp(self):
        #
        self.User_name = "test"
        self.email = "test@email.com"
        self.user_admin = 'False'
        self.user = User(full_name=self.User_name,email_address=self.email, user_admin=self.user_admin)

    def test_model_create_user(self):
        #
        old_count = User.objects.count()
        self.user.save()
        new_count = User.objects.count()
        self.assertNotEqual(old_count, new_count)

    def test_model_check_created_user(self):
        self.assertEqual(self.User_name, self.email, self.user_admin)