from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AlgorithmViewSet, PerformanceDataViewSet, SpeedupDataViewSet

router = DefaultRouter()
router.register(r'algorithms', AlgorithmViewSet)
router.register(r'performance', PerformanceDataViewSet)
router.register(r'speedup', SpeedupDataViewSet)

urlpatterns = [
    path('  PerformanceDataViewSet)
router.register(r'speedup', SpeedupDataViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
