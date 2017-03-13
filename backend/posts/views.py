from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.generics import ListAPIView, CreateAPIView
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.views.decorators.csrf import csrf_exempt
# from rest_framework import status
# from rest_framework.views import APIView
# from rest_framework.response import Response

from .models import Post
from tags.models import Tag
from categories.models import Category
from .serializers import PostSerializer, TagSerializer
from .utils import add_tags
from .activities import submit_post


class PostList(ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

    def get_queryset(self):
        qs = super(PostList, self).get_queryset()

        # Filter by tag
        tag = self.kwargs.get('tag')
        if tag:
            tag = Tag.objects.get(slug=tag)
            return qs.filter(tags=tag)

        # Filter by category
        category = self.kwargs.get('category')
        if category:
            category = Category.objects.get(slug=category)
            return qs.filter(category=category)
        
        return qs



@permission_classes((IsAuthenticated, ))    
class PostCreate(CreateAPIView):
    queryset = Post.objects.all()    
    serializer_class = PostSerializer
    
    def perform_create(self, serializer):
        post = serializer.save()

        # Set category
        try:
            category = str(self.request.data['category'])
        except:
            category = ""        
        if category:
            category = Category.objects.get(slug=category)
            post.category = category
        
        # Add tags
        try:
            tag_string = self.request.data['tags']
        except:
            tag_string = ""
        if tag_string:
            post = add_tags(post, tag_string)

        post.save()

        # Ignore this.
        # Experimenting with submitting posts using ActivityPub.
        try:
            submit_post(post)
        except:
            pass


# @permission_classes((IsAuthenticated, ))
# @permission_classes((AllowAny, ))
class PostRetrieveUpdateDestroy(RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    lookup_field = 'slug'

        
    def perform_update(self, serializer):
        post = serializer.save()

        # Set category
        try:
            category = str(self.request.data['category'])
        except:
            category = ""        
        if category:
            category = Category.objects.get(slug=category)
            post.category = category

        # Replace tags
        try:
            tags = str(self.request.data['tags'])
        except:
            tags = ""        
        if tags:
            post = add_tags(post, tags)

        post.save()
    

class TagListCreate(ListCreateAPIView):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer


class TagRetrieveUpdateDestroy(RetrieveUpdateDestroyAPIView):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    lookup_field = 'slug'    



    
