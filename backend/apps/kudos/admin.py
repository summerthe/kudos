from apps.kudos.models import Kudo
from django.contrib import admin


@admin.register(Kudo)
class KudoAdmin(admin.ModelAdmin):
    list_display = ("sender__name", "receiver__name", "truncated_message", "created_at")
    list_filter = ("created_at", "sender", "receiver")
    search_fields = ("sender__name", "receiver__name", "message")
    ordering = ("-created_at",)

    def truncated_message(self, obj):
        return obj.message[:50] + "..." if len(obj.message) > 50 else obj.message

    truncated_message.short_description = "Message"
