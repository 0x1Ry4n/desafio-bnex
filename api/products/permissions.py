from rest_framework import permissions

# Permission middleware 

class IsOwner(permissions.BasePermission):
    """
        Check if the user making the request is the owner of the user object
    """
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            # Allow read-only methods for everyone
            return True
        return obj.user == request.user