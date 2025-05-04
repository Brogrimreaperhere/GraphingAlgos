import cupy as cp
import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from config import INFINITY


def floyd_warshall_cuda(graph_np):
    graph = cp.array(graph_np)
    n = graph.shape[0]

    for k in range(n):
        i = cp.arange(n).reshape(-1, 1)
        j = cp.arange(n)
        graph = cp.minimum(graph, graph[i, k] + graph[k, j])
    return cp.asnumpy(graph)
