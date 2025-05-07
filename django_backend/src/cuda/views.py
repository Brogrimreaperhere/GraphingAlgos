from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import numpy as np
import cupy as cp
from src.utils.config import INFINITY
from src.graph.models import Graph
from src.utils.timing import timeit


class CudaBellmanFordAPI(APIView):
    def get(self, request, graph_id):
        try:
            graph_obj = Graph.objects.get(id=graph_id)
            graph_np = graph_obj.get_graph().astype(np.float32)

            result, elapsed = self.bellman_ford_cuda(graph_np)
            return Response({
                "algorithm": "cuda_bellman_ford",
                "distances": result.tolist(),
                "time_seconds": elapsed
            }, status=status.HTTP_200_OK)

        except Graph.DoesNotExist:
            return Response({
                "status": "failure",
                "message": "Graph not found"
            }, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({
                "status": "error",
                "message": str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    @timeit
    def bellman_ford_cuda(self, graph_np, source=0):
        n = graph_np.shape[0]
        graph_gpu = cp.array(graph_np)
        dist = cp.full(n, INFINITY, dtype=cp.float32)
        dist[source] = 0

        for _ in range(n - 1):
            # relax all edges in parallel
            for u in range(n):
                row_u = graph_gpu[u]  # all weights from u
                dist = cp.minimum(dist, dist[u] + row_u)

        return cp.asnumpy(dist)


class CudaDijkstraAPI(APIView):
    def get(self, request, graph_id):
        try:
            graph_obj = Graph.objects.get(id=graph_id)
            graph_np = graph_obj.get_graph().astype(np.float32)
            source = int(request.GET.get('source', 0))

            result, elapsed = self.dijkstra_cuda(graph_np, source)
            return Response({
                "algorithm": "cuda_dijkstra",
                "distances": result.tolist(),
                "time_seconds": elapsed
            }, status=status.HTTP_200_OK)

        except Graph.DoesNotExist:
            return Response({
                "status": "failure",
                "message": "Graph not found"
            }, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({
                "status": "error",
                "message": str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    @timeit
    def dijkstra_cuda(self, graph_np, source=0):
        n = graph_np.shape[0]
        graph_gpu = cp.array(graph_np)
        visited = cp.zeros(n, dtype=bool)
        dist = cp.full(n, INFINITY, dtype=cp.float32)
        dist[source] = 0

        for _ in range(n):
            # select the unvisited node with min dist
            mask = cp.where(~visited, dist, INFINITY)
            u = int(cp.argmin(mask))
            if mask[u] == INFINITY:
                break
            visited[u] = True

            # relax neighbors of u in parallel
            w_row = graph_gpu[u]
            not_visited = ~visited
            candidate = dist[u] + w_row
            dist = cp.where((not_visited & (w_row != INFINITY) & (candidate < dist)),
                            candidate, dist)

        return cp.asnumpy(dist)


class CudaFloydWarshallAPI(APIView):
    def get(self, request, graph_id):
        try:
            graph_obj = Graph.objects.get(id=graph_id)
            graph_np = graph_obj.get_graph().astype(np.float32)

            result, elapsed = self.floyd_warshall_cuda(graph_np)
            return Response({
                "algorithm": "cuda_floyd_warshall",
                "distances": result.tolist(),
                "time_seconds": elapsed
            }, status=status.HTTP_200_OK)

        except Graph.DoesNotExist:
            return Response({
                "status": "failure",
                "message": "Graph not found"
            }, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({
                "status": "error",
                "message": str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    @timeit
    def floyd_warshall_cuda(self, graph_np):
        n = graph_np.shape[0]
        dist = cp.array(graph_np)

        for k in range(n):
            # broadcast k-th row and column
            ik = dist[:, k].reshape((n, 1))
            kj = dist[k, :].reshape((1, n))
            dist = cp.minimum(dist, ik + kj)

        return cp.asnumpy(dist)
