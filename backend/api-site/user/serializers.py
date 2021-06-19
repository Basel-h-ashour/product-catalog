from django.contrib.auth import get_user_model, authenticate

from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    """serializes user data and objects"""

    class Meta:
        model = get_user_model()
        fields = ('email', 'password', 'name')
        extra_kwargs = {
        'password': {'write_only': True, 'style': {'input_type': 'password'}}
        }

    def create(self, validated_data):
        """creates a new user with encrypted password"""
        return get_user_model().objects.create_user(**validated_data)


class TokenSerializer(serializers.Serializer):
    """serializes a user token"""
    email = serializers.CharField()
    password = serializers.CharField(style={'input_type': 'password'},)

    def validate(self, attrs):
        """validates the serializer data"""
        email = attrs.get('email')
        password = attrs.get('password')

        user = authenticate(
            request=self.context.get('request'), 
            username=email,
            password=password
            )
        
        if not user:
            raise serializers.ValidationError(
                'email and password was not entered correctly',
                code='authentication',
                )
        
        attrs['user'] = user

        return attrs