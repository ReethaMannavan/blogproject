# blog/signals.py
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.conf import settings
from .models import Profile

User = settings.AUTH_USER_MODEL  # for readability in receiver signature


@receiver(post_save)
def create_profile_for_new_user(sender, instance, created, **kwargs):
    # Only react to your project's User model, not every post_save anywhere
    from django.contrib.auth import get_user_model
    if sender is get_user_model() and created:
        Profile.objects.create(user=instance)
