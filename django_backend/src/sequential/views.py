from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from src.utils.timing import timeit
from src.graph.models import Graph
import numpy as np
import heapq


class BellmanFordCPU(APIView):
    def get(self, request, graph_id):
        try:
            graph_obj = Graph.objects.get(id=graph_id)
            graph = graph_obj.get_graph()

            (distances, elapsed) = self._bellman_ford_timed(graph)
            return Response({
                "algorithm": "bellman_ford",
                "distances": distances,
                "time_seconds": elapsed
            })
        except Graph.DoesNotExist:
            return Response({"message": "Graph not found"}, status=status.HTTP_404_NOT_FOUND)

    @timeit
    def _bellman_ford_timed(self, graph: np.ndarray):
        n = graph.shape[0]
        dist = [float('inf')] * n
        dist[0] = 0

        # relax edges repeatedly
        for _ in range(n - 1):
            for u in range(n):
                for v in range(n):
                    w = graph[u][v]
                    if w != float('inf') and dist[u] + w < dist[v]:
                        dist[v] = dist[u] + w

        # negative-cycle detection
        for u in range(n):
            for v in range(n):
                w = graph[u][v]
                if w != float('inf') and dist[u] + w < dist[v]:
                    raise ValueError("Negative cycle detected")

        return dist


class DijkstraCPU(APIView):
    def get(self, request, graph_id):
        try:
            graph_obj = Graph.objects.get(id=graph_id)
            graph = graph_obj.get_graph()

            (distances, elapsed) = self._dijkstra_timed(graph)
            return Response({
                "algorithm": "dijkstra",
                "distances": distances,
                "time_seconds": elapsed
            })
        except Graph.DoesNotExist:
            return Response({"message": "Graph not found"}, status=status.HTTP_404_NOT_FOUND)

    @timeit
    def _dijkstra_timed(self, graph: np.ndarray):
        n = graph.shape[0]
        dist = [float('inf')] * n
        dist[0] = 0
        visited = set()
        heap = [(0, 0)]

        while heap:
            d_u, u = heapq.heappop(heap)
            if u in visited:
                continue
            visited.add(u)

            for v in range(n):
                w = graph[u][v]
                if w != float('inf'):
                    nd = d_u + w
                    if nd < dist[v]:
                        dist[v] = nd
                        heapq.heappush(heap, (nd, v))

        return dist


class FloydWarshallCPU(APIView):
    def get(self, request, graph_id):
        try:
            graph_obj = Graph.objects.get(id=graph_id)
            graph = graph_obj.get_graph()

            (dist_matrix, elapsed) = self._floyd_warshall_timed(graph)
            return Response({
                "algorithm": "floyd_warshall",
                "distances": dist_matrix.tolist(),
                "time_seconds": elapsed
            })
        except Graph.DoesNotExist:
            return Response({"message": "Graph not found"}, status=status.HTTP_404_NOT_FOUND)

    @timeit
    def _floyd_warshall_timed(self, graph: np.ndarray):
        n = graph.shape[0]
        dist = graph.copy()

        for k in range(n):
            for i in range(n):
                for j in range(n):
                    if dist[i][k] + dist[k][j] < dist[i][j]:
                        dist[i][j] = dist[i][k] + dist[k][j]

        return dist
