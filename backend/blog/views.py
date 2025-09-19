from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .models import BlogPost, Comment
from .serializers import BlogPostSerializer, CommentSerializer
from .permissions import IsOwnerOrReadOnly
from rest_framework import filters

# class BlogPostViewSet(viewsets.ModelViewSet):
#     queryset = BlogPost.objects.all().order_by('-created_at')
#     serializer_class = BlogPostSerializer
#     permission_classes = [IsOwnerOrReadOnly, IsAuthenticatedOrReadOnly]
#     filter_backends = [filters.SearchFilter, filters.OrderingFilter]
#     search_fields = ['title', 'content']
#     ordering_fields = ['created_at', 'title']

#     def perform_create(self, serializer):
#         serializer.save(author=self.request.user)

from rest_framework import viewsets, permissions, filters
from .models import BlogPost
from .serializers import BlogPostSerializer
from .permissions import IsOwnerOrReadOnly

class BlogPostViewSet(viewsets.ModelViewSet):
    queryset = BlogPost.objects.all().order_by('-created_at')
    serializer_class = BlogPostSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'content']
    ordering_fields = ['created_at', 'title']

    def get_permissions(self):
        # Anyone can list/retrieve blogs
        if self.action in ['list', 'retrieve']:
            permission_classes = [permissions.AllowAny]
        # Only logged-in users can create
        elif self.action == 'create':
            permission_classes = [permissions.IsAuthenticated]
        # Only the owner can update/delete
        else:
            permission_classes = [IsOwnerOrReadOnly]
        return [permission() for permission in permission_classes]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


# blog/views.py (inside CommentViewSet)
from django.core.mail import send_mail

class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        comment = serializer.save(author=self.request.user)

        # send email to blog host/admin
        send_mail(
            "New Comment Alert",
            f"{comment.author.username} commented on '{comment.post.title}': {comment.content}",
            "no-reply@myblog.com",
            ["nisha.reetha30@gmail.com"],  # replace with your admin email
            fail_silently=True,
        )




# blog/views.py
from rest_framework import generics
from .serializers import RegisterSerializer
from .models import User
from rest_framework.permissions import AllowAny

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny] 



# blog/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .serializers import UserSerializer

class CurrentUserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)
