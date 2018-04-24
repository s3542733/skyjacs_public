from django.test import TestCase
from .models import User
from .views import *
from rest_framework.test import APIRequestFactory

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
        empty_pkSpec = matchSex('','Basketball','sex')
        self.assertEqual(empty_pkSpec, -1)
        empty_dbSpec = matchSex('Cageless','','sex')
        self.assertEqual(empty_dbSpec, -1)
        sexInList = matchSex('Runners/Joggers','Cageless','sex')
        self.assertEqual(sexInList, -2)
        sameSpec = matchSex('Basketball', 'Basketball', '')
        self.assertEqual(sameSpec, 100)
        UniSex1 = matchSex('Unisex','Cageless','')
        UniSex2 = matchSex('Cageless','Unisex','')
        self.assertEqual(UniSex1, 50)
        self.assertEqual(UniSex2, 50)
        zeroMatch = matchSex('Runners/Joggers', 'Cageless', '')
        self.assertEqual(zeroMatch, 0)
    
    def test_skyjacs_views_matchBrand(self):
        empty_pkSpec = matchBrand('','Nike','')
        self.assertEqual(empty_pkSpec, -1)
        empty_dbSpec = matchBrand('Nike','','')
        self.assertEqual(empty_dbSpec, -1)
        brandInlist = matchBrand('Nike','Addidas','brand')
        self.assertEqual(brandInlist, -2)
        brandNotEqual = matchBrand('Nike','New Balance', '')
        self.assertEqual(brandNotEqual, 0)
        brandIsEqual = matchBrand('Nike', 'Nike', '')
        self.assertEqual(brandIsEqual, 100)

    def test_skyjacs_views_matchModel(self):
        empty_pkSpec = matchModel('','model1','test')
        empty_dbSpec = matchModel('model2', '','test')
        self.assertEqual(empty_pkSpec, empty_dbSpec)
        self.assertEqual(empty_pkSpec, -1)
        modelInList = matchModel('testString', 'model1', 'model')
        self.assertEqual(modelInList, -2)
        perfectMatch = matchModel('model1','model1','model')
        self.assertEqual(perfectMatch, 100)
    
    def test_skyjacs_views_matchCondtion(self):
        empty_pkSpec = matchCondition('','New','')
        self.assertEqual(empty_pkSpec, -1)
        empty_dbSpec = matchCondition('Damaged','','')
        self.assertEqual(empty_dbSpec, 20)
        Case1 = matchCondition('Boxed Mint', 'Damaged', '')
        Case2 = matchCondition('Well-worn', 'Good Condition','')
        Case3 = matchCondition('Well-worn', 'Well-worn','')
        Case4 = matchCondition('Well-worn', 'Damaged', 'condition')
        self.assertEqual(Case1, 20)
        self.assertEqual(Case2, 80)
        self.assertEqual(Case3, 100)
        self.assertEqual(Case4, -2)

    def test_skyjacs_views_matchMaterial(self):
        empty_pkSpec = matchMaterial('','Cotton', '')
        empty_dbSpec = matchMaterial('Cotton','','')
        self.assertEqual(empty_pkSpec, -1)
        self.assertEqual(empty_pkSpec, empty_dbSpec)
        Case1 = matchMaterial('Cotton','Cotton','')
        Case2 = matchMaterial('Cotton','Carbon Fibre', 'material')
        Case3 = matchMaterial('Cotton','Carbon Fibre', '')
        self.assertEqual(Case1, 100)
        self.assertEqual(Case2, -2)
        self.assertEqual(Case3, 0)

    def test_skyjacs_views_matchColour(self):
        empty_pkSpec = matchColour('','white','')
        empty_dbSpec = matchColour('black','','')
        self.assertEqual(empty_pkSpec, -1)
        self.assertEqual(empty_dbSpec, empty_pkSpec)
        Case1 = matchColour('black','white','colour')
        self.assertEqual(Case1, -2)
        perfertMatch = matchColour('white','white','')
        self.assertEqual(perfertMatch, 100)
        partialMatch = matchColour('yellow, blue','blue','')
        self.assertLess(partialMatch, 100)
    
    def test_skyjacs_views_matchSize(self):
        empty_pkSpec = matchSize(0.0,1,'')
        empty_dbSpec = matchSize(1,0.0,'')
        self.assertEqual(empty_dbSpec, -1)
        self.assertEqual(empty_pkSpec, empty_dbSpec)
        Case1 = matchSize(1.0,2.0,'size')
        Case2 = matchSize(5.0,5.0,'')
        Case3 = matchSize(5.0,4.0,'')
        Case4 = matchSize(4.0,8.0,'')
        self.assertEqual(Case1, -2.0)
        self.assertEqual(Case2, 100.0)
        self.assertAlmostEqual(Case3, 92.59,2)
        self.assertAlmostEqual(Case4, 70.37,2)
    
    def test_skyjacs_views_getStrictList(self):
        user = self.create_user()
        testListing = Listing(user,type_strict = True)
        Case1 = getStrict(testListing)
        strictList = []
        strictList.append('type')
        self.assertEqual(Case1, strictList)
    
    def test_skyjacs_views_getPriority(self):
        user = self.create_user()
        testListing = Listing(user,type_priority = True)
        Case1 = getPriority(testListing)
        priorityList = []
        priorityList.append('type')
        self.assertEqual(Case1, priorityList)

    def test_skyjacs_views_UserViewSet(self):
        request = APIRequestFactory().get('/skyjacs_app/User')
        user = self.create_user()
        userview = UserViewSet.as_view({'get': 'retrieve'})
        response = userview(request, pk=user.pk)
        self.assertEqual(response.status_code, 200)

    def test_skyjacs_views_ListingViewSet(self):
        request = APIRequestFactory().get('/skyjacs_app/Listing')
        listingview = ListingViewSet.as_view({'get': 'retrieve'})
        user = self.create_user()
        listing = Listing.objects.create(user = user, type_strict = True)
        response = listingview(request, pk=listing.pk)
        self.assertEqual(response.status_code, 200)
    
    """def test_skyjacs_views_NotificationViewSet(self):
        request = APIRequestFactory().get('/skyjacs_app/Notification')
        user = self.create_user()
        notify = Notification(user,123,123)
        notificationview = NotificationViewSet.as_view({'get': 'retrieve'})
        response = notificationview(request, pk=notify.pk)
        self.assertEqual(response.status_code, 200)"""

class matchViewTest(TestCase):
    def setUp(self, User_name='test', email='test@email.com',user_admin='False'):
        self.user = User.objects.create(full_name=User_name,email_address=email, user_admin=user_admin)
        self.factory = APIRequestFactory()

    def test_skyjacs_views_matchView(self):
        listing1 = Listing.objects.create(user = self.user, listing_type = 'Buying')
        listing2 = Listing.objects.create(user = self.user)
        pk = listing1.pk
        self.assertEqual(response.status_code, 200)
