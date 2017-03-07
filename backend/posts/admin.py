from django.contrib import admin

from .models import  Post


class PostAdmin(admin.ModelAdmin):
    prepopulated_fields = {'slug': ('title',), }
    search_fields = ['title','body']

admin.site.register(Post, PostAdmin)
