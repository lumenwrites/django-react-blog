from django.conf.urls import url

from .views import PostList, PostCreate, PostRetrieveUpdateDestroy
from .views import TagListCreate, TagRetrieveUpdateDestroy

from .feeds import MainFeed
from .activities import posts_stream

urlpatterns = [
    # List posts
    url(r'^posts/$', PostList.as_view(), name='post_list'),
    # List posts filtered by tag
    url(r'^tag/(?P<tag>[^\.]+)/$', PostList.as_view()),
    url(r'^category/(?P<category>[^\.]+)/$', PostList.as_view()),

    # Create post
    url(r'^post/new$', PostCreate.as_view(), name='post_create'),

    # Retreive/Update/Delete Post
    url(r'post/(?P<slug>[^\.]+)/$',
        PostRetrieveUpdateDestroy.as_view(),
        name='post_detail'),

    url(r'^tags/$', TagListCreate.as_view(), name='tag_list'),    
    url(r'tag/(?P<slug>[^\.]+)/$', TagRetrieveUpdateDestroy.as_view(), name='tag_detail'),

    # Atom Feed
    url(r'^feed/rss$', MainFeed()),
    # Activities
    url(r'^feed/posts/new$', posts_stream),
    
]

