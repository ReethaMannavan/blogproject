from rest_framework import serializers
from .models import BlogPost, Comment

class CommentSerializer(serializers.ModelSerializer):
    author_username = serializers.ReadOnlyField(source='author.username')
    
    class Meta:
        model = Comment
        fields = ['id', 'author', 'author_username', 'post', 'content', 'created_at']
        read_only_fields = ['author'] 

class BlogPostSerializer(serializers.ModelSerializer):
    comments = CommentSerializer(many=True, read_only=True)
    author_username = serializers.ReadOnlyField(source='author.username')
    author = serializers.ReadOnlyField(source='author.id') 
    image = serializers.ImageField(required=False)  
    
    class Meta:
        model = BlogPost
        fields = ['id', 'title', 'content', 'author', 'author_username', 'image', 'created_at', 'updated_at', 'comments']




from .models import User

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ["username", "email", "password"]

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data["username"],
            email=validated_data["email"],
            password=validated_data["password"],
        )

        # Send confirmation email
        from django.core.mail import send_mail
        send_mail(
            "Welcome to Blog Platform",
            f"Hi {user.username}, thanks for registering!",
            "no-reply@myblog.com",
            [user.email],
            fail_silently=True,
        )

        return user



# blog/serializers.py
from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email"]
