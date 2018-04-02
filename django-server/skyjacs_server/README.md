
## INSTALLATION GUIDE

git clone [Github - SKYJACS](https://github.com/rmit-s3562437-james-huang/skyjacs.git)

#### ADMIN
###### Virtual environment<br>
```
$ python3.6 -m venv myvenv<br>
$ source myvenv/bin/activate<br>
```
###### Required frameworks<br>
```
$ cd skyjacs_server<br>
$ pip install -r requirements.txt<br>
```
###### Create migrations and users<br>
```
$ python manage.py migrate<br>
$ python manage.py createsuperuser<br>
```

#### DEVELOPERS
###### Virtual environment<br>
```
$ source myvenv/bin/activate<br>
```
###### Start server<br>
```
$ python manage.py runserver
```
###### Exit server<br>
```
$ deactivate
```
## API GUIDE

###### Access user list<br>
- shell: $ curl -H 'Accept: application/json; indent=4' -u admin:password http://127.0.0.1:8000/users/
- url: http://127.0.0.1:8000/users/

###### Access api data list<br>
- url: http://127.0.0.1:8000/api/list
