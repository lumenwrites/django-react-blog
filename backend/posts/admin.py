from django.contrib import admin

from .models import  Post, Tag


class PostAdmin(admin.ModelAdmin):
    prepopulated_fields = {'slug': ('title',), }
    search_fields = ['title','body']

class TagAdmin(admin.ModelAdmin):
    prepopulated_fields = {'slug': ('title',), }    
    search_fields = ['title']
    
admin.site.register(Post, PostAdmin)
admin.site.register(Tag, TagAdmin)
