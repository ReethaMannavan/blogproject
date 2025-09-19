# blog/admin.py
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User, Profile, BlogPost, Comment


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    list_display = ("username", "email", "is_staff", "is_superuser")
    search_fields = ("username", "email")


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ("user",)
    search_fields = ("user__username", "user__email")


from django.utils.html import format_html

@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    list_display = ("title", "author", "created_at", "updated_at", "image_tag")
    search_fields = ("title", "content", "author__username")
    list_filter = ("created_at",)

    def image_tag(self, obj):
        if obj.image:
            return format_html('<img src="{}" width="50" />', obj.image.url)
        return "-"
    image_tag.short_description = "Image"


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ("post", "author", "created_at")
    search_fields = ("post__title", "author__username", "content")
    list_filter = ("created_at",)
