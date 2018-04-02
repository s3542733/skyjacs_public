
## INSTALLATION GUIDE

git clone [Github - SKYJACS](https://github.com/rmit-s3562437-james-huang/skyjacs.git)

```diff
ADMIN
```
**virtual environment**<br>
$ python3.6 -m venv myvenv<br>
$ source myvenv/bin/activate<br>

**required frameworks**<br>
$ cd skyjacs_server<br>
$ pip install -r requirements.txt<br>

**create migrations and users**<br>
$ python manage.py migrate<br>
$ python manage.py createsuperuser<br>

**start server**<br>
$ python manage.py runserver

#### DEVELOPERS
**virtual environment**<br>
$ source myvenv/bin/activate<br>

**start server**<br>
$ python manage.py runserver

**exit server**<br>
$ deactivate

## API GUIDE

**access user list**<br>
- shell: $ curl -H 'Accept: application/json; indent=4' -u admin:password http://127.0.0.1:8000/users/
- url: http://127.0.0.1:8000/users/

**access api data list**
- url: http://127.0.0.1:8000/api/list
