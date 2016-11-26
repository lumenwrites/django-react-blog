from django.conf.urls import url

from .views import PostList, PostCreate, PostRetrieveUpdateDestroy
from .views import TagListCreate, TagRetrieveUpdateDestroy

urlpatterns = [
    # List posts
    url(r'^posts/$', PostList.as_view(), name='post_list'),
    # List posts filtered by tag
    url(r'^posts/(?P<tag>[^\.]+)/$', PostList.as_view()),

    # Create post
    url(r'^post/new$', PostCreate.as_view(), name='post_create'),

    # Retreive/Update/Delete Post
    url(r'post/(?P<slug>[^\.]+)/$',
        PostRetrieveUpdateDestroy.as_view(),
        name='post_detail'),

    url(r'^tags/$', TagListCreate.as_view(), name='tag_list'),    
    url(r'tag/(?P<slug>[^\.]+)/$', TagRetrieveUpdateDestroy.as_view(), name='tag_detail'),
]

