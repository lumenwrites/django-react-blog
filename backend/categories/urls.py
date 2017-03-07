from django.conf.urls import url

from .views import CategoryList

urlpatterns = [
    # List categories
    url(r'^categories/$', CategoryList.as_view()),
]

