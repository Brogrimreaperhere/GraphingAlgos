from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from src.graph.models import Graph
import numpy as np
import heapq

class BellmanFordCPU(APIView):
    def get(self, request, graph_id):
        try:
            # Fetch the graph from the database using its ID
            graph_obj = Graph.objects.get(id=graph_id)
            graph = graph_obj.get_graph()  # Deserialize the graph back into a NumPy array
            size = graph.shape[0]
            dist = [float('inf')] * size
            dist[0] = 0

            # Bellman-Ford algorithm
            for _ in range(size - 1):
                for u in range(size):
                    for v in range(size):
                        if graph[u][v] != float('inf') and dist[u] + graph[u][v] < dist[v]:
                            dist[v] = dist[u] + graph[u][v]

            return Response({
                "algorithm": "bellman_ford",
                "distances": dist
            })
        except Graph.DoesNotExist:
            return Response({
                "message": "Graph not found"
            }, status=status.HTTP_404_NOT_FOUND)


class DijkstraCPU(APIView):
    def get(self, request, graph_id):
        try:
            # Fetch the graph from the database using its ID
            graph_obj = Graph.objects.get(id=graph_id)
            graph = graph_obj.get_graph()  # Deserialize the graph back into a NumPy array
            size = graph.shape[0]
            dist = [float('inf')] * size
            dist[0] = 0
            visited = set()
            min_heap = [(0, 0)]

            # Dijkstra's algorithm
            while min_heap:
                cur_dist, u = heapq.heappop(min_heap)
                if u in visited:
                    continue
                visited.add(u)

                for v in range(size):
                    if graph[u][v] != float('inf'):
                        new_dist = dist[u] + graph[u][v]
                        if new_dist < dist[v]:
                            dist[v] = new_dist
                            heapq.heappush(min_heap, (new_dist, v))

            return Response({
                "algorithm": "dijkstra",
                "distances": dist
            })
        except Graph.DoesNotExist:
            return Response({
                "message": "Graph not found"
            }, status=status.HTTP_404_NOT_FOUND)


class FloydWarshallCPU(APIView):
    def get(self, request, graph_id):
        try:
            # Fetch the graph from the database using its ID
            graph_obj = Graph.objects.get(id=graph_id)
            graph = graph_obj.get_graph()  # Deserialize the graph back into a NumPy array
            size = graph.shape[0]
            dist = graph.copy()

            # Floyd-Warshall algorithm
            for k in range(size):
                for i in range(size):
                    for j in range(size):
                        if dist[i][k] + dist[k][j] < dist[i][j]:
                            dist[i][j] = dist[i][k] + dist[k][j]

            return Response({
                "algorithm": "floyd_warshall",
                "distances": dist.tolist()
            })
        except Graph.DoesNotExist:
            return Response({
                "message": "Graph not found"
            }, status=status.HTTP_404_NOT_FOUND)
