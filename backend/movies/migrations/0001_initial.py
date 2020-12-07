# Generated by Django 3.1.4 on 2020-12-07 09:00

from django.db import migrations, models
import django.db.models.deletion
import movies.models
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('celebrities', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Movie',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=500, verbose_name='Title')),
                ('tagline', models.CharField(max_length=1024, verbose_name='Title')),
                ('rating', models.CharField(choices=[('G', 'G - General Audiences'), ('PG', 'PG - Parental Guidance Suggested'), ('PG-13', 'PG-13 - Parents Strongly Cautioned'), ('R', 'R - Restricted Children Under 17'), ('NC-17', 'NC-17 - No One 17 and Under')], max_length=100, verbose_name='Rating')),
                ('synopsis', models.TextField(verbose_name='Synopsis')),
                ('release_date', models.DateTimeField(verbose_name='Release Date')),
                ('cover_image', models.ImageField(max_length=2048, upload_to=movies.models._get_movie_cover_image_url, verbose_name='Cover Image')),
                ('poster_image', models.ImageField(max_length=2048, upload_to=movies.models._get_movie_poster_image_url, verbose_name='Poster Image')),
            ],
            options={
                'ordering': ('-release_date',),
            },
        ),
        migrations.CreateModel(
            name='MovieTrailer',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=500, verbose_name='Title')),
                ('video', models.FileField(max_length=2048, upload_to=movies.models._get_movie_trailer_video_url, verbose_name='Video')),
                ('duration', models.DurationField(verbose_name='Duration')),
                ('movie', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='trailers', to='movies.movie')),
            ],
        ),
        migrations.CreateModel(
            name='MovieImage',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('caption', models.CharField(max_length=500, verbose_name='Caption')),
                ('image', models.ImageField(max_length=2048, upload_to=movies.models._get_movie_image_url, verbose_name='Image')),
                ('movie', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='images', to='movies.movie')),
            ],
        ),
        migrations.CreateModel(
            name='MovieCrew',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('role', models.CharField(choices=[('Cast', 'Cast'), ('Director', 'Director'), ('Writer', 'Writer'), ('Producer', 'Producer'), ('Animator', 'Animator')], max_length=50, verbose_name='Role')),
                ('celebrity', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='movies', to='celebrities.celebrity')),
                ('movie', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='crew', to='movies.movie')),
            ],
        ),
    ]