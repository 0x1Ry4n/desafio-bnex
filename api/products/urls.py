from django.urls import path

from products.views import ProductListCreateView, ProductDetailView


# Endpoint definition

urlpatterns = [
    path('products/', ProductListCreateView.as_view(), name='product-list-create'),
    path('products/<uuid:product_id>/', ProductDetailView.as_view(), name='product-detail'),
]   