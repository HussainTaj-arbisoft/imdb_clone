from django.urls import include, path
from rest_framework.routers import DefaultRouter

from accounts import views

router = DefaultRouter()
router.register("user_list", views.UserListViewSet)

urlpatterns = [
    path("", include(router.urls)),
    path("", include("djoser.urls")),
    path("", include("djoser.urls.authtoken")),
    path("update_last_seen/", views.UpdateLastSeen.as_view()),
]
