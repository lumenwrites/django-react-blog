from rest_framework.generics import CreateAPIView
from rest_framework.decorators import permission_classes
from rest_framework.permissions import AllowAny

from .models import Subscriber
from .serializers import SubscriberSerializer


@permission_classes((AllowAny, ))    
class SubscriberCreate(CreateAPIView):
    queryset = Subscriber.objects.all()    
    serializer_class = SubscriberSerializer

