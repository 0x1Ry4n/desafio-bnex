from rest_framework.test import APITestCase
from rest_framework import status
from django.contrib.auth.models import User

class AuthUrlsTestCase(APITestCase):
    def setUp(self) -> None:
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        
    def test_jwt_create(self):
        response = self.client.post('/api/v1/auth/jwt/create/', {
            'username': 'testuser',
            'password': 'testpassword',
        }, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('access', response.data)
        self.assertIn('refresh', response.data)

    def test_jwt_refresh(self):
        create_response = self.client.post('/api/v1/auth/jwt/create/', {
            'username': 'testuser',
            'password': 'testpassword',
        }, format='json')
        refresh_token = create_response.data['refresh']

        response = self.client.post('/api/v1/auth/jwt/refresh/', {
            'refresh': refresh_token,
        }, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('access', response.data)

    def test_jwt_verify(self):
        create_response = self.client.post('/api/v1/auth/jwt/create/', {
            'username': 'testuser',
            'password': 'testpassword',
        }, format='json')
        access_token = create_response.data['access']

        response = self.client.post('/api/v1/auth/jwt/verify/', {
            'token': access_token,
        }, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_user_list(self):
        create_response = self.client.post('/api/v1/auth/jwt/create/', {
            'username': 'testuser',
            'password': 'testpassword',
        }, format='json')
        access_token = create_response.data['access']
        self.client.credentials(HTTP_AUTHORIZATION=f'JWT {access_token}')

        response = self.client.get('/api/v1/auth/users/', format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_user_create(self):
        response = self.client.post('/api/v1/auth/users/', {
            'username': 'newuser',
            'email': 'teste123@gmail.com',
            'password': 'Root123@alk',
            're_password': 'Root123@alk',
        }, format='json')  # Adicione format='json' se a view espera JSON.
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn('id', response.data)
