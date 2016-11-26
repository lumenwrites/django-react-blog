from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.generics import ListAPIView, CreateAPIView
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.views.decorators.csrf import csrf_exempt
# from rest_framework import status
# from rest_framework.views import APIView
# from rest_framework.response import Response

from .models import Post, Tag
from .serializers import PostSerializer, TagSerializer
from .utils import add_tags


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
        
        return qs



@permission_classes((IsAuthenticated, ))    
class PostCreate(CreateAPIView):
    queryset = Post.objects.all()    
    serializer_class = PostSerializer
    
    def perform_create(self, serializer):
        post = serializer.save()
        tag_string = self.request.POST.get('tags')
        if tag_string:
            post = add_tags(post, tag_string)
        post.save()


# @permission_classes((AllowAny, ))
# @permission_classes((IsAuthenticated, ))    
class PostRetrieveUpdateDestroy(RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    lookup_field = 'slug'


class TagListCreate(ListCreateAPIView):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer


class TagRetrieveUpdateDestroy(RetrieveUpdateDestroyAPIView):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    lookup_field = 'slug'    



    
