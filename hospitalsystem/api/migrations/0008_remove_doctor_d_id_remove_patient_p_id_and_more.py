# Generated by Django 4.2.2 on 2023-07-09 16:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0007_rename_department_appointment_department_and_more"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="doctor",
            name="d_id",
        ),
        migrations.RemoveField(
            model_name="patient",
            name="p_id",
        ),
        migrations.AlterField(
            model_name="doctor",
            name="id",
            field=models.IntegerField(primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name="patient",
            name="id",
            field=models.IntegerField(primary_key=True, serialize=False),
        ),
    ]
