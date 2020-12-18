from django.urls import include, path
from rest_auth.registration.views import ConfirmEmailView
from rest_framework.routers import DefaultRouter

from accounts import views

router = DefaultRouter()
router.register("user_list", views.UserListViewSet)

urlpatterns = [
    path("", include(router.urls)),
    path("", include("djoser.urls")),
    path("", include("djoser.urls.authtoken")),
    path("update_last_seen/", views.UpdateLastSeen.as_view()),
    path("rest-auth/facebook/", views.FacebookLogin.as_view(), name="fb_login"),
    path("rest-auth/google/", views.GoogleLogin.as_view(), name="google_login"),
    path(
        "rest-auth/confirm-email/",
        ConfirmEmailView.as_view(),
        name="account_confirm_email",
    ),
]
