from django.urls import path
from .views import BellmanFordAPI, DijkstraParallelAPI, FloydWarshallAPI

urlpatterns = [
    path('bellman_ford/', BellmanFordAPI.as_view(), name='bellman_ford'),
    path('dijkstra/', DijkstraParallelAPI.as_view(), name='dijkstra_parallel'),
    path('floyd_warshall/', FloydWarshallAPI.as_view(), name='floyd_warshall_mpi'),
]
