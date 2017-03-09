from django.db import models
from django.conf import settings


class Settings(models.Model):
    title = models.CharField(max_length=64, default="", null=True, blank=True,)
    author = models.CharField(max_length=64, default="", null=True, blank=True,)    
    about = models.TextField(default="", null=True, blank=True,
                             verbose_name="About page (markdown)")

    # Description for google search results
    description = models.TextField(max_length=512, blank=True,
                                   verbose_name="Google results description (ideally under 160 characters)")
    keywords = models.TextField(max_length=512, blank=True)

    # For facebook/twitter:
    description_social = models.TextField(max_length=512, blank=True)
    image_social = models.ImageField(upload_to = 'img/', default = '/media/img/social-card.png')

    # Analytics tracking number
    analytics = models.CharField(max_length=64, default="", null=True, blank=True,
                                 verbose_name="Google Analytics tracking nuber (UA-XXXXXXXX).")    

    
    def __str__(self):
        return self.title

    class Meta:
        verbose_name_plural = "settings"
    

        

