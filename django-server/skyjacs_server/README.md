
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
###### Start server<br>
```
$ python manage.py runserver
```
###### Exit server
```
$ deactivate
```
## API GUIDE

###### Access user list<br>
- shell: $ curl -H 'Accept: application/json; indent=4' -u admin:password http://127.0.0.1:8000/users/
- url: http://127.0.0.1:8000/users/

###### Access api data list<br>
- url: http://127.0.0.1:8000/api/list
