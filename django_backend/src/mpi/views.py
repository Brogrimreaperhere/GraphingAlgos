from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from mpi4py import MPI
from src.utils.config import GRAPH, INFINITY
import copy

def bellman_ford_mpi(graph, src, rank, size):
    n = len(graph)
    dist = [INFINITY] * n
    dist[src] = 0

    for _ in range(n - 1):
        for u in range(n):
            for v in range(rank, n, size):
                if graph[u][v] != INFINITY and dist[u] + graph[u][v] < dist[v]:
                    dist[v] = dist[u] + graph[u][v]
    return dist

def dijkstra_mpi(graph, source=0):
    comm = MPI.COMM_WORLD
    rank = comm.Get_rank()
    size = comm.Get_size()
    n = len(graph)

    dist = [INFINITY] * n
    visited = [False] * n
    dist[source] = 0

    for _ in range(n):
        local_min = (INFINITY, -1)
        for i in range(rank, n, size):
            if not visited[i] and dist[i] < local_min[0]:
                local_min = (dist[i], i)

        global_min = comm.allreduce(local_min, op=MPI.MIN)

        u = global_min[1]
        if u == -1:
            break

        visited[u] = True
        for v in range(n):
            if not visited[v] and graph[u][v] != INFINITY:
                if dist[u] + graph[u][v] < dist[v]:
                    dist[v] = dist[u] + graph[u][v]

    all_dist = comm.gather(dist, root=0)
    if rank == 0:
        return all_dist[0]

def floyd_warshall_mpi(graph, rank, size):
    n = len(graph)
    dist = copy.deepcopy(graph)

    for k in range(n):
        for i in range(rank, n, size):
            for j in range(n):
                if dist[i][k] + dist[k][j] < dist[i][j]:
                    dist[i][j] = dist[i][k] + dist[k][j]
    return dist


class BellmanFordAPI(APIView):
    def get(self, request):
        comm = MPI.COMM_WORLD
        rank = comm.Get_rank()
        size = comm.Get_size()

        partial_result = bellman_ford_mpi(GRAPH, 0, rank, size)
        all_results = comm.gather(partial_result, root=0)

        if rank == 0:
            final = [min([all_results[i][j] for i in range(size)]) for j in range(len(GRAPH))]
            return Response({"status": "success", "result": final}, status=status.HTTP_200_OK)
        else:
            return Response({"status": "failure", "message": "Something went wrong!"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class DijkstraParallelAPI(APIView):
    def get(self, request):
        source = int(request.GET.get('source', 0))  # Get the source from the query parameters (default: 0)
        
        try:
            result = dijkstra_mpi(GRAPH, source)
            return Response({"status": "success", "result": result}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"status": "failure", "message": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class FloydWarshallAPI(APIView):
    def get(self, request):
        comm = MPI.COMM_WORLD
        rank = comm.Get_rank()
        size = comm.Get_size()

        try:
            partial_result = floyd_warshall_mpi(GRAPH, rank, size)
            all_results = comm.gather(partial_result, root=0)

            if rank == 0:
                final = [min(col) for col in zip(*all_results)]
                return Response({"status": "success", "result": final}, status=status.HTTP_200_OK)
            else:
                return Response({"status": "failure", "message": "Error in MPI process."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        except Exception as e:
            return Response({"status": "failure", "message": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
