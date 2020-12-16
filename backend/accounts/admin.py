from django.contrib import admin

from .models import Profile, User


class ProfileInline(admin.StackedInline):
    model = Profile


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    class Meta:
        model = User

    inlines = [ProfileInline]
