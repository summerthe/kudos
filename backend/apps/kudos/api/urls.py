from rest_framework.routers import DefaultRouter

from .views import KudoViewSet

app_name = "apps.kudos"

router = DefaultRouter()
router.register(r"kudos", KudoViewSet, basename="kudo")

urlpatterns = [*router.urls]
