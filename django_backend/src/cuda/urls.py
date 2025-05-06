from django.urls import path
from .views import (
    CudaBellmanFordAPIView,
    CudaDijkstraAPIView,
    CudaFloydWarshallAPIView
)

urlpatterns = [
    path('bellman_ford/', CudaBellmanFordAPIView.as_view(), name='cuda_bellman_ford'),
    path('dijkstra/', CudaDijkstraAPIView.as_view(), name='cuda_dijkstra'),
    path('floyd_warshall/', CudaFloydWarshallAPIView.as_view(), name='cuda_floyd_warshall'),
]
