from django.template.defaultfilters import slugify
from .models import Tag


# Add tags to the post
def add_tags(post, tag_string="Programming, Startups, My News"):
    tags = tag_string.split(",")
    for tag in tags:
        tag_title = tag.strip()
        tag_slug = slugify(tag_title)
        try:
            tag = Tag.objects.get(slug=tag_slug)
        except:
            # Create tag if it doesn't exist
            tag = Tag(title=tag_title)
            tag.save()
            
        post.tags.add(tag)

    return post


