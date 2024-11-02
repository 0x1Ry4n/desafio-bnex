from django.contrib.auth.models import User
from django.test import TestCase
from faker import Faker
from products.models import Products

# Unit test base case

class ProductTestBase(TestCase):
    def setUp(self) -> None:
        super().setUp()
        self._faker = Faker()

        # Create a user for the tests
        self._user = User.objects.create_user(
            username='testuser',  # Use a fixed username for easier identification
            password='testpassword'  # Use a fixed password
        )
        
        # Generate test data
        self._name = self._faker.word()
        self._description = self._faker.sentence()
        self._value = self._faker.pydecimal(left_digits=5, right_digits=2, positive=True)

    def make_product(self, name=None, description=None, value=None, user=None) -> Products:
        """
        Create a product with the given attributes. Defaults to test data if not provided.
        """
        return Products.objects.create(
            name=name or self._name,
            description=description or self._description,
            value=value or self._value,
            user=user or self._user
        )

    def create_user(self, username='testuser', password='testpassword'):
        """
        Create and return a user with a specified username and password.
        """
        return User.objects.create_user(username=username, password=password)
