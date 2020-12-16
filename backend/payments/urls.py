from django.urls import include, path

from payments import views

urlpatterns = [
    path(
        "create_session_id/",
        views.CreatePaymentSessionAPIView.as_view(),
    ),
    path(
        "user_owns_movie/",
        views.UserOwnsMovieAPIView.as_view(),
    ),
    path("webhook/", views.stripe_webhook),
]
