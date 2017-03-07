from rest_framework.generics import ListAPIView

from .models import Category
from .serializers import CategorySerializer


class CategoryList(ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

