import requests

from django.http import HttpResponse, JsonResponse

from .models import Post

# Experimenting with ActivityPub (https://www.w3.org/TR/activitypub/)
# Want to "decentralize" this blog. 

def posts_stream(request):
    posts = Post.objects.all()

    stream = []
    for post in posts:
        data = {}
        data['@context'] = 'http://digitalmind.io/feed/posts/new'
        data['id'] = post.get_absolute_url()
        data['type'] = 'Article'
        data['name'] = post.title
        data['content'] = post.body
        data['attributedTo'] = 'http://digitalmind.io/@rayalez'
        stream.append(data)
    
    # return HttpResponse(stream)
    return JsonResponse(stream, safe=False)


def submit_post(post):
    # Generate post object(activity)
    data = {}
    data['@context'] = 'http://digitalmind.io/feed/posts/new'
    data['id'] = post.get_absolute_url()
    data['type'] = 'Article'
    data['name'] = post.title
    data['content'] = post.body
    data['attributedTo'] = 'http://digitalmind.io/@rayalez'

    response = requests.post('http://nexy.io/inbox', data=data)
    content = response.content    


