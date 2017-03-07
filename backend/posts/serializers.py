from rest_framework import serializers

from .models import Post
from tags.models import Tag


class TagSlugSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = (
            'slug',
        )

        

class PostSerializer(serializers.ModelSerializer):
    # Include the whole tag object into the post(use for comments):
    # tags = TagSlugSerializer(read_only=True, many=True)
    # Include just the tag's slugs:
    tags = serializers.SlugRelatedField(
        many=True,
        read_only=True,
        slug_field='slug')    

    class Meta:
        model = Post
        fields = (
            'title',
            'slug',
            'body',
            'tags'
        )

        lookup_field = 'slug'


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = (
            'title',
            'slug',
        )

        

