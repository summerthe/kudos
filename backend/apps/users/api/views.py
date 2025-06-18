from apps.users.api.serializers import UserSerializer
from django.contrib.auth import get_user_model
from rest_framework import mixins, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

User = get_user_model()


class UserViewSet(viewsets.GenericViewSet, mixins.ListModelMixin):
    serializer_class = UserSerializer
    queryset = User.objects.all()

    def get_queryset(self):
        return self.queryset.filter(
            organization=self.request.user.organization,
        ).exclude(pk=self.request.user.id)

    @action(detail=False, methods=["get"])
    def me(self, request):
        serializer = self.get_serializer(request.user)
        return Response(serializer.data)
