from mpi4py import MPI
import numpy as np
import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from config import GRAPH, INFINITY

def bellman_ford(graph, src, rank, size):
    n = len(graph)
    dist = [INFINITY] * n
    dist[src] = 0

    for _ in range(n - 1):
        for u in range(n):
            for v in range(rank, n, size):
                if graph[u][v] != INFINITY and dist[u] + graph[u][v] < dist[v]:
                    dist[v] = dist[u] + graph[u][v]
    return dist

def main():
    comm = MPI.COMM_WORLD
    rank = comm.Get_rank()
    size = comm.Get_size()

    partial_result = bellman_ford(GRAPH, 0, rank, size)
    all_results = comm.gather(partial_result, root=0)

    if rank == 0:
        final = [min([all_results[i][j] for i in range(size)]) for j in range(len(GRAPH))]
        print("Bellman-Ford Results:", final)

if __name__ == "__main__":
    main()
