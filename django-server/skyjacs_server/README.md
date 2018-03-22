
## INSTALLATION GUIDE

git clone [Github](https://github.com/rmit-s3562437-james-huang/skyjacs.git)

*myvenv - virtual environment: making changes to one website won't affect any others while you're also developing* <br>
$ python3 -m venv myvenv
$ source myvenv/bin/activate

*required frameworks*
$ cd skyjacs_server
$ pip install -r requirements.txt

*create migrations and users*
$ python manage.py migrate
$ python manage.py createsuperuser

*start server*
$ python manage.py runserver


## API GUIDE

*to access user list*
$ curl -H 'Accept: application/json; indent=4' -u admin:password http://127.0.0.1:8000/users/

*direct though browser* http://127.0.0.1:8000/users/

*to access api data list*

