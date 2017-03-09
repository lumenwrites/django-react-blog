from rest_framework.generics import RetrieveAPIView

from .models import Settings
from .serializers import SettingsSerializer

class SettingsDetail(RetrieveAPIView):
    serializer_class = SettingsSerializer

    def get_object(self):
        queryset = Settings.objects.all().first()
        return queryset


    

    
