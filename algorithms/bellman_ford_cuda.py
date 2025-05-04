import cupy as cp
import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from config import INFINITY


def bellman_ford_cuda(graph_np, source=0):
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
