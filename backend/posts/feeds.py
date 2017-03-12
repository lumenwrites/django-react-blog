from markdown import Markdown
from django.contrib.syndication.views import Feed
from django.utils.feedgenerator import Atom1Feed

from .models import Post
from core.models import Settings

class MainFeed(Feed):
    try:
        settings = Settings.objects.all().first()

        base_url = "http://digitalmind.io"
    
        title = settings.title + " latest posts"
        link = base_url
        description = settings.description
        # feed_type = Atom1Feed
    
        def items(self):
            return Post.objects.filter(published=True).order_by('-pub_date')[:25]
    
        def item_title(self, item):
            return item.title
    
        def item_link(self, item):
            return self.base_url + "/post/" + item.slug
    
        def item_pubdate(self, item):
            return item.pub_date
    
        def item_description(self, item):
            md = Markdown()
            return md.convert(item.body)
    except:
        pass




    
