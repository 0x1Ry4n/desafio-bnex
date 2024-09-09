from rest_framework import serializers
from products import models

class ProductSerializer(serializers.ModelSerializer):
    """
        Serializes Products Model
    """
    class Meta:
        model = models.Products
        fields = ['id', 'name', 'description', 'value']

        def validate(self, data):
            """
                Validate that the product name does not exceed 255 characters.
                Validate that the product value is positive.
                Validate that the description does not exceed 500 characters.
            """
            if data['value'] <= 0:
                raise serializers.ValidationError("Product value must be greater than zero.")
            
            if len(data['name']) > 255:
                raise serializers.ValidationError("Username should not exceed 255 characters.")

            if len(data['description']) > 500:
                raise serializers.ValidationError("Description should not exceed 500 characters.")

            return data

        def to_representation(self, instance):
            """
                Customize the representation of the product instance.
            """
            representation = super().to_representation(instance)
            representation['value'] = f"${representation['value']:.2f}"  # Format the value as a currency
            
            return representation
        
        