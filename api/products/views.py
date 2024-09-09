from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.pagination import PageNumberPagination
from .permissions import IsOwner

from products import models, serializers

class ProductPagination(PageNumberPagination):
    page_size = 10  
    page_size_query_param = 'page_size'
    max_page_size = 100

class ProductListCreateView(generics.ListCreateAPIView):
    """
        View to list all products of the authenticated user and create new products.
    """
    permission_classes = [permissions.IsAuthenticated, IsOwner]
    authentication_classes = [JWTAuthentication]
    serializer_class = serializers.ProductSerializer
    pagination_class = ProductPagination

    def get_queryset(self):
        """
            Return only the products of the authenticated user, ordered by name.
        """
        return models.Products.objects.filter(user=self.request.user).order_by('name')

    def perform_create(self, serializer):
        """
            Create a new product and assign the authenticated user as the owner.
        """
        serializer.save(user=self.request.user)

    def create(self, request, *args, **kwargs):
        """
            Respond with successful creation or validation errors.
        """
        response = super().create(request, *args, **kwargs)
        return Response({
            "message": "Product created successfully!",
            "product": response.data
        }, status=status.HTTP_201_CREATED)

    def list(self, request, *args, **kwargs):
        """
        List all products of the authenticated user with pagination.
        """
        response = super().list(request, *args, **kwargs)
        return Response({
            "message": "Products retrieved successfully!",
            "products": response.data,
            "pagination": {
                "count": self.paginator.page.paginator.count,
                "num_pages": self.paginator.page.paginator.num_pages,
                "current_page": self.paginator.page.number,
                "next_page": self.paginator.page.next_page_number() if self.paginator.page.has_next() else None,
                "previous_page": self.paginator.page.previous_page_number() if self.paginator.page.has_previous() else None,
            }
        }, status=status.HTTP_200_OK)

class ProductDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
        View to retrieve, update, or delete a specific product of the authenticated user.
    """
    permission_classes = [permissions.IsAuthenticated, IsOwner]
    authentication_classes = [JWTAuthentication]
    serializer_class = serializers.ProductSerializer

    def get_queryset(self):
        """
            Return only the products of the authenticated user.
        """
        return models.Products.objects.filter(user=self.request.user)

    def get_object(self):
        """
            Get a specific product by ID.
        """
        product_id = self.kwargs.get('product_id')
        return generics.get_object_or_404(self.get_queryset(), id=product_id)

    def retrieve(self, request, *args, **kwargs):
        """
            Retrieve a product and return a customized response.
        """
        response = super().retrieve(request, *args, **kwargs)
        return Response({
            "message": "Product retrieved successfully!",
            "product": response.data
        }, status=status.HTTP_200_OK)

    def update(self, request, *args, **kwargs):
        """
            Update a product and return a customized response.
        """
        response = super().update(request, *args, **kwargs)
        return Response({
            "message": "Product updated successfully!",
            "product": response.data
        }, status=status.HTTP_200_OK)

    def destroy(self, request, *args, **kwargs):
        """
            Delete a product and return a customized response.
        """
        product = self.get_object()
        self.perform_destroy(product)
        return Response({
            "message": "Product deleted successfully!"
        }, status=status.HTTP_200_OK)
