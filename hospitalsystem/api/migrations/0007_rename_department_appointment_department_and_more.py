# Generated by Django 4.2.2 on 2023-07-08 07:55

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0006_appointment_department"),
    ]

    operations = [
        migrations.RenameField(
            model_name="appointment",
            old_name="department",
            new_name="Department",
        ),
        migrations.RenameField(
            model_name="doctor",
            old_name="department",
            new_name="Department",
        ),
    ]
