import uuid
import os

from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, \
                                        PermissionsMixin


def product_image_file_path(instance, filename):
    """generate filepath for newly uploaded image"""
    extension = filename.split('.')[-1]
    filename = f'{uuid.uuid4()}.{extension}'

    return os.path.join('uploads/product/', filename)


class UserManager(BaseUserManager):

    def create_user(self, email, password=None, **extra_fields):
        """creates a new user"""
        if not email:
            raise ValueError('user must have an email address')

        user = self.model(email=self.normalize_email(email), **extra_fields)
        user.set_password(password)

        user.save(using=self._db)

        return user

    def create_superuser(self, email, password):
        """creates a superuser through CLI"""
        
        user = self.create_user(email, password)
        user.is_staff = True
        user.is_superuser = True

        user.save(using=self._db)

        return user


class User(AbstractBaseUser, PermissionsMixin):
    """custom user model"""

    email = models.EmailField(max_length=255, unique=True)
    name = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'email'


class Product(models.Model):
    """database model for product objects"""

    name = models.CharField(max_length=255)
    is_expire = models.BooleanField(default=False)
    expiry_date = models.DateField()
    price = models.FloatField()
    discount_price = models.FloatField()
    cover_image = models.ImageField(null=True, \
                                    upload_to=product_image_file_path)
