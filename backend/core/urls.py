from django.conf.urls import url

from .views import SettingsDetail

urlpatterns = [
    url(r'^settings/$', SettingsDetail.as_view()),
]

