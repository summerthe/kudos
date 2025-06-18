from apps.kudos.api.serializers import KudoSerializer
from apps.kudos.models import Kudo
from django.db.models import Q
from rest_framework import mixins, viewsets


class KudoViewSet(
    mixins.CreateModelMixin,
    mixins.ListModelMixin,
    viewsets.GenericViewSet,
):
    serializer_class = KudoSerializer
    queryset = Kudo.objects.all()

    def get_queryset(self):
        user = self.request.user
        direction = self.request.query_params.get("direction")

        queryset = self.queryset.filter(
            Q(sender=user) | Q(receiver=user),
        ).select_related("sender", "receiver")

        if direction == "given":
            queryset = queryset.filter(sender=user)
        else:
            # received from other users
            queryset = queryset.filter(receiver=user)

        return queryset

    def perform_create(self, serializer):
        serializer.save(sender=self.request.user)
