
## API GUIDE

###### Access user list<br>
- url: http://django-env.unwf22fga6.ap-southeast-2.elasticbeanstalk.com/users/

###### Access api data list<br>
- url: TODO

## SERVER GUIDE

#### ADMIN
###### Virtual environment<br>
```
$ python3.6 -m venv myvenv
$ source myvenv/bin/activate
```
###### Required frameworks<br>
```
$ cd skyjacs_server
$ pip install -r requirements.txt
```
###### Create migrations and users<br>
```
$ python manage.py migrate
$ python manage.py createsuperuser
```
###### Deploy server<br>
```
$ eb deploy
```
