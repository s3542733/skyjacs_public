# Generated by Django 2.0.4 on 2018-04-06 03:51

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Listing',
            fields=[
                ('uid', models.AutoField(primary_key=True, serialize=False)),
                ('listing_type', models.CharField(max_length=16)),
                ('listing_title', models.CharField(max_length=255)),
                ('listing_date', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='Notification',
            fields=[
                ('uid', models.AutoField(primary_key=True, serialize=False)),
                ('user_listing_id', models.IntegerField()),
                ('matched_listing_id', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='Spec',
            fields=[
                ('uid', models.AutoField(primary_key=True, serialize=False)),
                ('item_type', models.IntegerField()),
                ('item_brand', models.CharField(max_length=255)),
                ('item_model', models.CharField(max_length=255)),
                ('item_condition', models.IntegerField()),
                ('item_colour', models.CharField(max_length=255)),
                ('item_size', models.FloatField()),
                ('item_description', models.TextField()),
                ('listing', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='skyjacs_app.Listing')),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('uid', models.AutoField(primary_key=True, serialize=False)),
                ('full_name', models.CharField(max_length=255)),
                ('email_address', models.EmailField(max_length=254, unique=True)),
                ('user_admin', models.BooleanField()),
            ],
        ),
        migrations.AddField(
            model_name='notification',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='skyjacs_app.User'),
        ),
        migrations.AddField(
            model_name='listing',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='skyjacs_app.User'),
        ),
    ]
