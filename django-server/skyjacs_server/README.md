
## INSTALLATION GUIDE

git clone [Github](https://github.com/rmit-s3562437-james-huang/skyjacs.git)

**virtual environment**<br>
$ python3 -m venv myvenv<br>
$ source myvenv/bin/activate<br>

**required frameworks**<br>
$ cd skyjacs_server<br>
$ pip install -r requirements.txt<br>

**create migrations and users**<br>
$ python manage.py migrate<br>
$ python manage.py createsuperuser<br>

**start server**<br>
$ python manage.py runserver


## API GUIDE

**access user list**<br>
- shell: $ curl -H 'Accept: application/json; indent=4' -u admin:password http://127.0.0.1:8000/users/
- url: http://127.0.0.1:8000/users/

**to access api data list**

