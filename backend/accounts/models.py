from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db import models


def _get_profile_image_url(instance, filename):
    return f"accounts/{instance.user.id}/images/{uuid.uuid4()}{filename}"


class UserManager(BaseUserManager):
    def create_user(self, email, first_name, last_name, password=None):
        if not email:
            raise ValueError("Users must have an email address")

        user = self.model(
            email=self.normalize_email(email),
            first_name=first_name,
            last_name=last_name,
        )

        user.set_password(password)
        user.profile = Profile(user=user)
        user.save(using=self._db)
        user.profile.save()
        return user

    def create_superuser(self, email, first_name, last_name, password=None):
        user = self.create_user(
            email,
            password=password,
            first_name=first_name,
            last_name=last_name,
        )
        user.is_admin = True
        user.profile = Profile(user=user)
        user.save(using=self._db)
        user.profile.save()
        return user


class User(AbstractUser):
    email = models.EmailField(
        verbose_name="Email", max_length=255, unique=True
    )
    is_admin = models.BooleanField(default=False)
    last_seen = models.DateTimeField(
        "Last Seen", auto_now=False, auto_now_add=True
    )

    REQUIRED_FIELDS = ["first_name", "last_name"]
    USERNAME_FIELD = "email"
    objects = UserManager()

    def get_username(self):
        return self.email

    def save(self, *args, **kwargs):
        self.username = self.email
        super(User, self).save(*args, **kwargs)
        try:
            self.profile = self.profile
        except Profile.DoesNotExist:
            profile = Profile.objects.create(user=self)
            profile.save()

    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self, app_label):
        return True

    @property
    def is_staff(self):
        return self.is_admin


class Profile(models.Model):
    user = models.OneToOneField(
        User,
        verbose_name="User",
        on_delete=models.CASCADE,
        related_name="profile",
    )
    image = models.ImageField(
        "Profile Image",
        upload_to=_get_profile_image_url,
        default="/static/accounts/images/placeholders/profile_image.jpg",
    )
