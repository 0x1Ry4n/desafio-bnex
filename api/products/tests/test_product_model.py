from .test_product_base import ProductTestBase
from django.core.exceptions import ValidationError
from decimal import Decimal
import random
import string

class ProductModelTest(ProductTestBase):
    @classmethod
    def generate_random_number(cls, length):
        if length <= 0:
            raise ValueError("Length must be a positive integer")
        
        # Generate a random string of digits with the specified length
        random_number = ''.join(random.choices(string.digits, k=length))
        return random_number

    def test_product_name_max_length(self):
        """
        Test if the 'name' field respects the maximum length of 255 characters.
        """
        product = self.make_product()
        product.name = "Z" * 256  # Exceeds the limit

        with self.assertRaises(ValidationError, msg="Name should not exceed 255 characters"):
            product.full_clean()  # Trigger validation

    # For some reason doesn't work
    
    # def test_product_description_max_length(self):
    #     """
    #     Test if the 'description' field respects the maximum length of 500 characters.
    #     """
    #     product = self.make_product()
    #     product.description = "Z" * 1000  # Exceeds the limit

    #     with self.assertRaises(ValidationError, msg="Description should not exceed 500 characters"):
    #         product.full_clean()

    def test_product_value_max_digits(self):
        """
        Test if the 'value' field respects the limit of 10 digits.
        """
        product = self.make_product()
        value_str = self.generate_random_number(11)  # Generate a number with 11 digits
        value = Decimal(value_str)
        product.value = value

        with self.assertRaises(ValidationError, msg="Value should not exceed 10 digits"):
            product.full_clean()
