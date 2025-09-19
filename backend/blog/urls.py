from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import BlogPostViewSet, CommentViewSet, RegisterView, CurrentUserView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

router = DefaultRouter()
router.register(r'blog_posts', BlogPostViewSet)
router.register(r'comments', CommentViewSet)

urlpatterns = [
    path('v1/', include(router.urls)),
    path('v1/users/me/', CurrentUserView.as_view(), name='current_user'),
    path('v1/register/', RegisterView.as_view(), name='register'),
    path('v1/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('v1/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
