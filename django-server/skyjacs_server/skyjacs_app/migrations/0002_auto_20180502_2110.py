# Generated by Django 2.0.4 on 2018-05-02 11:10

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('skyjacs_app', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='buying',
            name='item_type',
        ),
        migrations.RemoveField(
            model_name='selling',
            name='item_type',
        ),
    ]
