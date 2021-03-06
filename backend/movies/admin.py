from django.contrib import admin

from .models import Movie, MovieCrew, MovieImage, MovieTrailer, UserMovieRating


class MovieTrailerInline(admin.TabularInline):
    model = MovieTrailer


class MovieImageInline(admin.TabularInline):
    model = MovieImage


class MovieCrewInline(admin.TabularInline):
    model = MovieCrew


@admin.register(Movie)
class MovieAdmin(admin.ModelAdmin):
    inlines = [MovieTrailerInline, MovieImageInline, MovieCrewInline]


admin.site.register(UserMovieRating)
