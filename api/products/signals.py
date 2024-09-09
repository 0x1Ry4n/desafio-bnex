from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from products.models import Products
import logging

logger = logging.getLogger(__name__)

@receiver(post_save, sender=Products)
def product_post_save(sender, instance, created, **kwargs):
    """
        Log the creation or update of a product.
    """
    try:
        if created:
            logger.info(f'Product created: ID={instance.id}, Name={instance.name}')
        else:
            logger.info(f'Product updated: ID={instance.id}, Name={instance.name}')
    except Exception as e:
        logger.error(f'Error logging product save event: {e}')

@receiver(post_delete, sender=Products)
def product_post_delete(sender, instance, **kwargs):
    """
        Log the deletion of a product.
    """
    try:
        logger.info(f'Product deleted: ID={instance.id}, Name={instance.name}')
    except Exception as e:
        logger.error(f'Error logging product delete event: {e}')
