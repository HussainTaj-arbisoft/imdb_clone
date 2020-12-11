from channels.routing import ProtocolTypeRouter, URLRouter
from django.core.asgi import get_asgi_application

from .channels_middleware import TokenAuthMiddleware
import chat.routing

application = ProtocolTypeRouter(
    {
        "http": get_asgi_application(),
        "websocket": TokenAuthMiddleware(
            URLRouter(chat.routing.websocket_urlpatterns)
        ),
    }
)
