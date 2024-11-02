from django.apps import AppConfig

# App configurations to signals

class ProductConfig(AppConfig):
    name = 'products'
    
    def ready(self): 
        import products.signals