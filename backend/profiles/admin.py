from django.contrib import admin

from .models import Subscriber

class SubscriberAdmin(admin.ModelAdmin):
    search_fields = ['email']

admin.site.register(Subscriber, SubscriberAdmin)
