import numpy as np
from config import GRAPH_SIZE, INFINITY

def generate_random_graph(size=GRAPH_SIZE, density=0.3):
    graph = np.full((size, size), INFINITY)
    np.fill_diagonal(graph, 0)

    for i in range(size):
        for j in range(size):
            if i != j and np.random.rand() < density:
                graph[i][j] = np.random.randint(1, 100)
    return graph
