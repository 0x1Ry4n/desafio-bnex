from django.apps import AppConfig

class ProductConfig(AppConfig):
    name = 'products'
    
    def ready(self): 
        import products.signals