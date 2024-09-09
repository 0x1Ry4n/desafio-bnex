from rest_framework.test import APITestCase
from rest_framework import status
from django.contrib.auth.models import User
from products.models import Products
from decimal import Decimal
from rest_framework_simplejwt.tokens import RefreshToken
from django.urls import reverse

class ProductAPITestCase(APITestCase):
    def setUp(self) -> None:
        # Create a user and generate an access token for authentication
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        self.token = RefreshToken.for_user(self.user).access_token
        self.client.credentials(HTTP_AUTHORIZATION=f'JWT {self.token}')
        
        # Ensure the database is clean and create a sample product for testing
        Products.objects.all().delete()
        self.product = Products.objects.create(
            name='Test Product',
            description='A test product description',
            value=Decimal('19.99'),
            user=self.user
        )

    def test_list_products(self):
        """
        Test the endpoint for listing products.
        """
        url = reverse('product-list-create')
        response = self.client.get(url)
        print("List Products Response:", response.status_code, response.data) 
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('message', response.data)
        self.assertIn('products', response.data)
        self.assertEqual(len(response.data['products']), 4)

    def test_create_product(self):
        """
        Test the endpoint for creating a new product.
        """
        url = reverse('product-list-create')
        data = {
            'name': 'New Product',
            'description': 'Description for new product',
            'value': '29.99'
        }
        response = self.client.post(url, data, format='json')
        print("Create Product Response:", response.status_code, response.data)  # Debug
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['message'], 'Product created successfully!')
        self.assertIn('product', response.data)
        self.assertEqual(response.data['product']['name'], 'New Product')

    def test_retrieve_product(self):
        """
        Test the endpoint for retrieving a single product.
        """
        url = reverse('product-detail', kwargs={'product_id': str(self.product.id)})
        response = self.client.get(url)
        print("Retrieve Product Response:", response.status_code, response.data)  
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['message'], 'Product retrieved successfully!')
        self.assertEqual(response.data['product']['name'], 'Test Product')

    def test_update_product(self):
        """
        Test the endpoint for updating an existing product.
        """
        url = reverse('product-detail', kwargs={'product_id': str(self.product.id)})
        data = {
            'name': 'Updated Product',
            'description': 'Updated description',
            'value': '39.99'
        }
        response = self.client.put(url, data, format='json')
        print("Update Product Response:", response.status_code, response.data) 
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['message'], 'Product updated successfully!')
        self.assertEqual(response.data['product']['name'], 'Updated Product')

    def test_delete_product(self):
        """
        Test the endpoint for deleting a product.
        """
        url = reverse('product-detail', kwargs={'product_id': str(self.product.id)})
        response = self.client.delete(url)
        print("Delete Product Response:", response.status_code, response.data)  # Debug
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['message'], 'Product deleted successfully!')
