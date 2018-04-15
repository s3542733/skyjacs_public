# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2018-04-13 07:27
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('skyjacs_app', '0003_auto_20180412_1402'),
    ]

    operations = [
        migrations.RenameField(
            model_name='listing',
            old_name='priority_strict',
            new_name='colour_strict',
        ),
        migrations.AlterField(
            model_name='listing',
            name='item_brand',
            field=models.CharField(default='', max_length=255),
        ),
        migrations.AlterField(
            model_name='listing',
            name='item_colour',
            field=models.CharField(default='', max_length=255),
        ),
        migrations.AlterField(
            model_name='listing',
            name='item_condition',
            field=models.CharField(default='', max_length=64),
        ),
        migrations.AlterField(
            model_name='listing',
            name='item_material',
            field=models.CharField(default='', max_length=64),
        ),
        migrations.AlterField(
            model_name='listing',
            name='item_model',
            field=models.CharField(default='', max_length=255),
        ),
        migrations.AlterField(
            model_name='listing',
            name='item_sex',
            field=models.CharField(default='', max_length=8),
        ),
        migrations.AlterField(
            model_name='listing',
            name='item_type',
            field=models.CharField(default='', max_length=255),
        ),
    ]
