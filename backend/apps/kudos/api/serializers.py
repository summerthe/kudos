from apps.kudos.models import Kudo
from rest_framework import serializers


class KudoSerializer(serializers.ModelSerializer):
    sender_name = serializers.CharField(source="sender.name", read_only=True)
    receiver_name = serializers.CharField(source="receiver.name", read_only=True)

    class Meta:
        model = Kudo
        fields = [
            "id",
            "sender",
            "receiver",
            "message",
            "receiver_name",
            "sender_name",
            "created_at",
        ]
        read_only_fields = ["sender"]

    def validate(self, attrs):
        response = super().validate(attrs)

        sender = self.context["request"].user
        receiver = attrs["receiver"]
        if sender == receiver:
            raise serializers.ValidationError(
                {"detail": "You cannot give kudos to yourself."},
            )

        if sender.organization != receiver.organization:
            raise serializers.ValidationError(
                {"detail": "You can only give kudos to users in your organization."},
            )

        if not sender.can_give_kudo():
            raise serializers.ValidationError(
                {"detail": "You have no kudos available to give."},
            )

        return response
