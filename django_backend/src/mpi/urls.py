from django.urls import path
from .views import BellmanFordAPI, DijkstraParallelAPI, FloydWarshallAPI

urlpatterns = [
    path('bellman_ford/<int:graph_id>/', BellmanFordAPI.as_view(), name='bellman_ford'),
    path('dijkstra/<int:graph_id>/', DijkstraParallelAPI.as_view(), name='dijkstra_parallel'),
    path('floyd_warshall/<int:graph_id>/', FloydWarshallAPI.as_view(), name='floyd_warshall_mpi'),
]
