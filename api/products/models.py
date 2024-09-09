from django.db import models
from django.conf import settings 
from uuid import uuid4

class Products(models.Model):
    """
        Define the Products Model.
    """
    id = models.UUIDField(
        primary_key=True, 
        default=uuid4, 
        null=False, 
        blank=True, 
        editable=False,
        verbose_name="Product ID"
    )
    name = models.CharField(
        max_length=255, 
        null=False, 
        blank=False,
        verbose_name="Product Name",
        help_text="Enter the name of the product."
    )
    description = models.TextField(
        max_length=500, 
        null=False, 
        blank=False,
        verbose_name="Product Description",
        help_text="Enter a brief description of the product."
    )
    value = models.DecimalField(
        max_digits=10, 
        decimal_places=4, 
        null=False, 
        blank=False,
        verbose_name="Product Value",
        help_text="Enter the value of the product."
    )
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        on_delete=models.CASCADE,
        verbose_name="User",
        help_text="The user who owns this product."
    )

    class Meta:
        verbose_name = "Product"
        verbose_name_plural = "Products"
        indexes = [
            models.Index(fields=['user']),
        ]

    def __str__(self):
        return f"{self.name} (ID: {self.id})"
