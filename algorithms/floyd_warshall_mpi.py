from mpi4py import MPI
import numpy as np
import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from config import GRAPH, INFINITY
import copy

def floyd_warshall_mpi(graph, rank, size):
    n = len(graph)
    dist = copy.deepcopy(graph)

    for k in range(n):
        for i in range(rank, n, size):
            for j in range(n):
                if dist[i][k] + dist[k][j] < dist[i][j]:
                    dist[i][j] = dist[i][k] + dist[k][j]
    return dist

def main():
    comm = MPI.COMM_WORLD
    rank = comm.Get_rank()
    size = comm.Get_size()

    partial_result = floyd_warshall_mpi(GRAPH, rank, size)
    all_results = comm.gather(partial_result, root=0)

    if rank == 0:
        final = [min(col) for col in zip(*all_results)]
        print("Floyd-Warshall Results:")
        for row in final:
            print(row)

if __name__ == "__main__":
    main()
