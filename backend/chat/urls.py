from django.urls import include, path
from rest_framework.routers import DefaultRouter

from chat import views

router = DefaultRouter()
router.register("message", views.MessageViewSet)

urlpatterns = [
    path("", include(router.urls)),
    path("contacts/", views.MessageContacts.as_view()),
]
