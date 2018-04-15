"""
WSGI config for skyjacs_server project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/1.11/howto/deployment/wsgi/
"""

import os
import sys

#sys.path.insert(0, 'opt/python/current/app')

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "skyjacs_server.settings")
#os.environ['DJANGO_SETTINGS_MODULE'] = 'skyjacs_server.settings'

from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()
