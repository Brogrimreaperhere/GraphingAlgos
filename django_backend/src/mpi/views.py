from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from mpi4py import MPI
from src.graph.models import Graph
from src.utils.config import INFINITY
from src.utils.timing import timeit
import copy

@timeit
def bellman_ford_mpi(graph, src, rank, size):
    n = len(graph)
    dist = [INFINITY] * n
    dist[src] = 0

    for _ in range(n - 1):
        for u in range(n):
            for v in range(rank, n, size):
                w = graph[u][v]
                if w != INFINITY and dist[u] + w < dist[v]:
                    dist[v] = dist[u] + w
    return dist


class BellmanFordAPI(APIView):
    def get(self, request, graph_id):
        comm = MPI.COMM_WORLD
        rank = comm.Get_rank()
        size = comm.Get_size()

        try:
            graph_obj = Graph.objects.get(id=graph_id)
            graph = graph_obj.get_graph()

            local, elapsed = bellman_ford_mpi(graph, 0, rank, size)
            all_parts = comm.gather(local, root=0)

            if rank == 0:
                # take min over each column
                final = [min(part[j] for part in all_parts) for j in range(len(graph))]
                return Response({
                    "result": final,
                    "time_seconds": elapsed
                }, status=status.HTTP_200_OK)
            else:
                # non-root processes return nothing; root handles response
                return Response(status=status.HTTP_204_NO_CONTENT)
        except Graph.DoesNotExist:
            return Response({"status": "failure", "message": "Graph not found"},
                            status=status.HTTP_404_NOT_FOUND)

@timeit
def dijkstra_mpi(graph, source, rank, size):
    n = len(graph)
    dist = [INFINITY] * n
    visited = [False] * n
    dist[source] = 0

    for _ in range(n):
        # each rank finds its local min
        local_min = (INFINITY, -1)
        for i in range(rank, n, size):
            if not visited[i] and dist[i] < local_min[0]:
                local_min = (dist[i], i)

        # global reduce to find overall min
        global_min = MPI.COMM_WORLD.allreduce(local_min, op=MPI.MIN)
        u = global_min[1]
        if u < 0:
            break

        visited[u] = True
        for v in range(n):
            w = graph[u][v]
            if not visited[v] and w != INFINITY:
                nd = dist[u] + w
                if nd < dist[v]:
                    dist[v] = nd

    # gather the full dist array at root
    results = MPI.COMM_WORLD.gather(dist, root=0)
    if MPI.COMM_WORLD.Get_rank() == 0:
        return results[0]


class DijkstraParallelAPI(APIView):
    def get(self, request, graph_id):
        comm = MPI.COMM_WORLD
        rank = comm.Get_rank()
        size = comm.Get_size()
        source = int(request.GET.get('source', 0))

        try:
            graph_obj = Graph.objects.get(id=graph_id)
            graph = graph_obj.get_graph()

            result, elapsed = dijkstra_mpi(graph, source, rank, size)
            if rank == 0:
                return Response({
                    "result": result,
                    "time_seconds": elapsed
                }, status=status.HTTP_200_OK)
            else:
                return Response(status=status.HTTP_204_NO_CONTENT)
        except Graph.DoesNotExist:
            return Response({"status": "failure", "message": "Graph not found"},
                            status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"status": "failure", "message": str(e)},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@timeit
def floyd_warshall_mpi(graph, rank, size):
    n = len(graph)
    dist = copy.deepcopy(graph)

    for k in range(n):
        for i in range(rank, n, size):
            for j in range(n):
                if dist[i][k] + dist[k][j] < dist[i][j]:
                    dist[i][j] = dist[i][k] + dist[k][j]
    return dist


class FloydWarshallAPI(APIView):
    def get(self, request, graph_id):
        comm = MPI.COMM_WORLD
        rank = comm.Get_rank()
        size = comm.Get_size()

        try:
            graph_obj = Graph.objects.get(id=graph_id)
            graph = graph_obj.get_graph()

            local, elapsed = floyd_warshall_mpi(graph, rank, size)
            all_parts = comm.gather(local, root=0)

            if rank == 0:
                # reconstruct final matrix by taking min across partitions
                final = [min(col) for col in zip(*all_parts)]
                return Response({
                    "result": final,
                    "time_seconds": elapsed
                }, status=status.HTTP_200_OK)
            else:
                return Response(status=status.HTTP_204_NO_CONTENT)
        except Graph.DoesNotExist:
            return Response({"status": "failure", "message": "Graph not found"},
                            status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"status": "failure", "message": str(e)},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)
