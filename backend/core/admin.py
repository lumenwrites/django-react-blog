from django.contrib import admin

from .models import Settings

class SettingsAdmin(admin.ModelAdmin):
    search_fields = ['title']

admin.site.register(Settings, SettingsAdmin)

