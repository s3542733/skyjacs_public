
## SKYJACS - SERVER GUIDE

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

#### DEVELOPERS
###### Virtual environment<br>
```
$ source myvenv/bin/activate
```
###### Deploy server<br>
```
$ eb deploy
```

## API GUIDE

###### Access user list<br>
- shell: $ curl -H 'Accept: application/json; indent=4' -u admin:password http://django-env.unwf22fga6.ap-southeast-2.elasticbeanstalk.com/users/
- url: http://django-env.unwf22fga6.ap-southeast-2.elasticbeanstalk.com/users/

###### Access api data list<br>
- url: TODO
