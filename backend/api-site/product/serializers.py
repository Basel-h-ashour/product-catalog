from rest_framework import serializers
from core.models import Product


class ProductSerializer(serializers.ModelSerializer):
    """serializes product data and objects"""

    class Meta:
        model = Product
        fields = ('id', 'name', 'is_expire', 'expiry_date', \
                  'price', 'discount_price', 'cover_image')
        read_only_fields = ('id',)

