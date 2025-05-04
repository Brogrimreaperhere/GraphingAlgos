import matplotlib.pyplot as plt
import networkx as nx

def draw_graph(adjacency_matrix, path_matrix=None):
    G = nx.Graph()
    n = len(adjacency_matrix)
    for i in range(n):
        for j in range(n):
            if adjacency_matrix[i][j] != float('inf') and i != j:
                G.add_edge(i, j, weight=adjacency_matrix[i][j])

    pos = nx.spring_layout(G)
    edge_labels = nx.get_edge_attributes(G, 'weight')

    nx.draw(G, pos, with_labels=True, node_color='lightblue', node_size=1000, font_size=14)
    nx.draw_networkx_edge_labels(G, pos, edge_labels=edge_labels)
    plt.title("Graph Visualization")
    plt.show()
