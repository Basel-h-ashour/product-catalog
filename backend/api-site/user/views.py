from rest_framework import generics
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.settings import api_settings

from user.serializers import UserSerializer, TokenSerializer


class CreateUserView(generics.CreateAPIView):
    """creates a new user from JSON data"""
    serializer_class = UserSerializer


class CreateTokenView(ObtainAuthToken):
    """Creates a new custom token for the user"""
    serializer_class = TokenSerializer
    renderer_classes = api_settings.DEFAULT_RENDERER_CLASSES
