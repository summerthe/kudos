from django.urls.conf import path
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from .views import UserViewSet

app_name = "apps.users"

router = DefaultRouter()
router.register(r"users", UserViewSet, basename="user")

urlpatterns = [
    path("login/", TokenObtainPairView.as_view(), name="login"),
    path("refresh-token/", TokenRefreshView.as_view(), name="refresh_token"),
    *router.urls,
]
