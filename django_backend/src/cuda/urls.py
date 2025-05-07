from django.urls import path
from .views import (
    CudaBellmanFordAPI,
    CudaDijkstraAPI,
    CudaFloydWarshallAPI
)

urlpatterns = [
    path('bellman_ford/<int:graph_id>/', CudaBellmanFordAPI.as_view(), name='cuda_bellman_ford'),
    path('dijkstra/<int:graph_id>/', CudaDijkstraAPI.as_view(), name='cuda_dijkstra'),
    path('floyd_warshall/<int:graph_id>/', CudaFloydWarshallAPI.as_view(), name='cuda_floyd_warshall'),
]
