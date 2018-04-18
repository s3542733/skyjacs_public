# Generated by Django 2.0.4 on 2018-04-11 08:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('skyjacs_app', '0004_remove_image_file_name'),
    ]

    operations = [
        migrations.AddField(
            model_name='spec',
            name='item_matching',
            field=models.FloatField(null=True),
        ),
        migrations.AddField(
            model_name='spec',
            name='item_material',
            field=models.CharField(default='Plastic/Synthetic', max_length=64),
        ),
        migrations.AlterField(
            model_name='spec',
            name='item_sex',
            field=models.CharField(default='Unisex', max_length=8),
        ),
    ]