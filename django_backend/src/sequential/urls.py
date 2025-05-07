from django.urls import path
from .views import BellmanFordCPU, DijkstraCPU, FloydWarshallCPU

urlpatterns = [
    path('bellman_ford/<int:graph_id>/', BellmanFordCPU.as_view(), name='bellman_ford'),
    path('dijkstra/<int:graph_id>/', DijkstraCPU.as_view(), name='dijkstra'),
    path('floyd_warshall/<int:graph_id>/', FloydWarshallCPU.as_view(), name='floyd_warshall'),
]
