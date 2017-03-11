from django.conf.urls import url

from .views import SubscriberCreate

urlpatterns = [
    # Create post
    url(r'^subscribe$', SubscriberCreate.as_view()),
]

