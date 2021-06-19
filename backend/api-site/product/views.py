from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import viewsets, mixins, status
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

from core.models import Product

from product import serializers


class ProductViewSet(viewsets.GenericViewSet,
                            mixins.ListModelMixin,
                            mixins.CreateModelMixin,
                            mixins.RetrieveModelMixin,
                            mixins.UpdateModelMixin):
    """exposes endpoints for creating and listing products"""

    queryset = Product.objects.all()
    serializer_class = serializers.ProductSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    
    def get_queryset(self):
        """filters the products by query params if available"""
        queryset = self.queryset

        name = self.request.query_params.get('name')
        if name:
            queryset = queryset.filter(name__icontains=name)

        price_gte = self.request.query_params.get('price_gte')
        if price_gte:
            queryset = queryset.filter(price__gte=price_gte)

        price_lte = self.request.query_params.get('price_lte')
        if price_lte:
            queryset = queryset.filter(price__lte=price_lte)

        expiry_date_gte = self.request.query_params.get('expiry_date_gte')
        if expiry_date_gte:
            queryset = queryset.filter(expiry_date__gte=expiry_date_gte)

        expiry_date_lte = self.request.query_params.get('expiry_date_lte')
        if expiry_date_lte:
            queryset = queryset.filter(expiry_date__lte=expiry_date_lte)

        return queryset
