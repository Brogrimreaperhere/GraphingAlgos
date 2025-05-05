from mpi4py import MPI
import numpy as np
import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from config import GRAPH, INFINITY

def dijkstra_parallel(graph, source=0):
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

