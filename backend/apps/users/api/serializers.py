from django.contrib.auth import get_user_model
from rest_framework import serializers

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    organization_name = serializers.CharField(source="organization.name")

    class Meta:
        model = User
        fields = ["id", "name", "email", "organization_name", "kudos_available"]
