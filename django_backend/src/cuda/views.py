from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import numpy as np
import cupy as cp
from src.config.main import GRAPH, INFINITY


class CudaBellmanFordAPIView(APIView):
    def get(self, request):
        try:
            graph_np = np.array(GRAPH, dtype=np.float32)
            result = self.bellman_ford_cuda(graph_np)
            return Response({
                "status": "success",
                "result": result.tolist()
            }, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({
                "status": "error",
                "message": str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def bellman_ford_cuda(self, graph_np, source=0):
        n = graph_np.shape[0]
        graph = cp.array(graph_np)
        dist = cp.full(n, INFINITY, dtype=cp.float32)
        dist[source] = 0

        for _ in range(n - 1):
            for u in range(n):
                for v in range(n):
                    if graph[u][v] != INFINITY:
                        dist[v] = cp.minimum(dist[v], dist[u] + graph[u][v])
        return cp.asnumpy(dist)


class CudaDijkstraAPIView(APIView):
    def get(self, request):
        try:
            graph_np = np.array(GRAPH, dtype=np.float32)
            result = self.dijkstra_cuda(graph_np)
            return Response({
                "status": "success",
                "result": result.tolist()
            }, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({
                "status": "error",
                "message": str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def dijkstra_cuda(self, graph_np, source=0):
        n = graph_np.shape[0]
        graph = cp.array(graph_np)
        visited = cp.zeros(n, dtype=bool)
        dist = cp.full(n, INFINITY, dtype=cp.float32)
        dist[source] = 0

        for _ in range(n):
            mask = cp.where(~visited, dist, INFINITY)
            u = cp.argmin(mask)
            visited[u] = True

            for v in range(n):
                if not visited[v] and graph[u][v] != INFINITY:
                    dist[v] = cp.minimum(dist[v], dist[u] + graph[u][v])

        return cp.asnumpy(dist)


class CudaFloydWarshallAPIView(APIView):
    def get(self, request):
        try:
            graph_np = np.array(GRAPH, dtype=np.float32)
            result = self.floyd_warshall_cuda(graph_np)
            return Response({
                "status": "success",
                "result": result.tolist()
            }, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({
                "status": "error",
                "message": str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def floyd_warshall_cuda(self, graph_np):
        n = graph_np.shape[0]
        dist = cp.array(graph_np, dtype=cp.float32)

        for k in range(n):
            ik = dist[:, k].reshape((n, 1))
            kj = dist[k, :].reshape((1, n))
            dist = cp.minimum(dist, ik + kj)

        return cp.asnumpy(dist)
