# -*- coding: utf-8 -*-
# Generated by Django 1.9.2 on 2019-03-06 17:42
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('student', '0022_remove_personaltimetable_time_updated'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='student',
            name='gender',
        ),
    ]
