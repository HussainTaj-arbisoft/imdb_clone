import stripe
from django.conf import settings
from django.http import HttpResponse
from django.shortcuts import get_object_or_404
from django.utils import timezone
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from rest_framework.views import APIView

from accounts.models import User
from movies.models import Movie
from payments.models import Order

stripe.api_key = "sk_test_51HyMdNA2mXrNBb00pzzVXwTxE2FRfmsKWvjNfu9zY43acRHaJiTBXFSw4KZXl05Q6bzfZhhQNerBx2LUTMLJGqIZ007NMiMDJV"


class CreatePaymentSessionAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        movie_id = request.data.get("movie_id")
        movie = get_object_or_404(Movie, pk=movie_id)
        MY_DOMAIN = f"http://localhost:3000/movie/{movie_id}/"

        order = Order.objects.filter(movie_id=movie_id, user=self.request.user).first()

        if order is None:
            order = Order(movie_id=movie_id, user=self.request.user)

        if order.completed:
            return Response(JSONRenderer().render({"detail": "Already Bought."}))

        try:
            checkout_session = stripe.checkout.Session.create(
                payment_method_types=["card"],
                line_items=[
                    {
                        "price_data": {
                            "currency": "usd",
                            "unit_amount_decimal": movie.price * 100,
                            "product_data": {
                                "name": movie.title,
                                "images": ["https://i.imgur.com/EHyR2nP.png"],
                            },
                        },
                        "quantity": 1,
                    },
                ],
                mode="payment",
                success_url=MY_DOMAIN + "?success=true",
                cancel_url=MY_DOMAIN + "?canceled=true",
            )
            order.price = movie.price
            order.session_id = checkout_session.id
            order.save()
            return Response(JSONRenderer().render({"id": checkout_session.id}))
        except Exception as e:
            return Response(
                JSONRenderer().render({"error": str(e)}),
                status=status.HTTP_403_FORBIDDEN,
            )


class UserOwnsMovieAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        movie_id = request.data.get("movie_id")
        order = Order.objects.filter(movie_id=movie_id, user=request.user).first()

        if order is not None and order.completed:
            return Response(JSONRenderer().render({"owned": "yes"}))

        return Response(JSONRenderer().render({"owned": "no"}))


# Set your secret key. Remember to switch to your live secret key in production!
# See your keys here: https://dashboard.stripe.com/account/apikeys
stripe.api_key = "sk_test_51HyMdNA2mXrNBb00pzzVXwTxE2FRfmsKWvjNfu9zY43acRHaJiTBXFSw4KZXl05Q6bzfZhhQNerBx2LUTMLJGqIZ007NMiMDJV"
endpoint_secret = "whsec_TsRwG2dBQpqUgLtvY4M7s2zxKILyacWx"


@csrf_exempt
def stripe_webhook(request):
    payload = request.body
    sig_header = request.META["HTTP_STRIPE_SIGNATURE"]
    event = None
    try:
        event = stripe.Webhook.construct_event(payload, sig_header, endpoint_secret)
    except ValueError as e:
        # Invalid payload
        return HttpResponse(status=400, content=str(e))
    except stripe.error.SignatureVerificationError as e:
        # Invalid signature
        return HttpResponse(status=400, content=str(e))

    if event["type"] == "checkout.session.completed":
        session = event["data"]["object"]
        # Fulfill the purchase...
        order = Order.objects.filter(session_id=session.id).first()
        order.completed = True
        order.completed_time = timezone.now()
        order.save()

    # Passed signature verification
    return HttpResponse(status=200)
