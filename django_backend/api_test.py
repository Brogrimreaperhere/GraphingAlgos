# test_mpi_cuda_client.py

import requests
import json

# Adjust as needed
BASE_URL = "http://127.0.0.1:8000/api"

def create_graph(size=10, density=0.3):
    """
    POST a new random graph to /graphs/, return its ID.
    """
    url = f"{BASE_URL}/graph/"
    payload = {"size": size, "density": density}
    resp = requests.post(url, json=payload)
    resp.raise_for_status()
    data = resp.json()
    # The response nests the created graph under "graph"
    graph = data.get("graph", data)
    graph_id = graph["id"]
    print(f"Created graph ID={graph_id}, size={graph['size']}, density={graph['density']}")
    return graph_id

# ------------------ MPI Tests ------------------

def test_bellman_ford_mpi(graph_id):
    url = f"{BASE_URL}/mpi/bellman_ford/{graph_id}/"
    resp = requests.get(url)
    if resp.status_code == 200:
        print("Bellman-Ford (MPI):", json.dumps(resp.json(), indent=2))
    else:
        print(f"Bellman-Ford (MPI) failed [{resp.status_code}]:", resp.text)

def test_dijkstra_mpi(graph_id):
    url = f"{BASE_URL}/mpi/dijkstra/{graph_id}/"
    resp = requests.get(url)
    if resp.status_code == 200:
        print("Dijkstra (MPI):", json.dumps(resp.json(), indent=2))
    else:
        print(f"Dijkstra (MPI) failed [{resp.status_code}]:", resp.text)

def test_floyd_warshall_mpi(graph_id):
    url = f"{BASE_URL}/mpi/floyd_warshall/{graph_id}/"
    resp = requests.get(url)
    if resp.status_code == 200:
        print("Floyd-Warshall (MPI):", json.dumps(resp.json(), indent=2))
    else:
        print(f"Floyd-Warshall (MPI) failed [{resp.status_code}]:", resp.text)

# ------------------ CUDA Tests ------------------

def test_cuda_bellman_ford(graph_id):
    url = f"{BASE_URL}/cuda/bellman_ford/{graph_id}/"
    resp = requests.get(url)
    if resp.status_code == 200:
        print("Bellman-Ford (CUDA):", json.dumps(resp.json(), indent=2))
    else:
        print(f"Bellman-Ford (CUDA) failed [{resp.status_code}]:", resp.text)

def test_cuda_dijkstra(graph_id):
    url = f"{BASE_URL}/cuda/dijkstra/{graph_id}/"
    resp = requests.get(url)
    if resp.status_code == 200:
        print("Dijkstra (CUDA):", json.dumps(resp.json(), indent=2))
    else:
        print(f"Dijkstra (CUDA) failed [{resp.status_code}]:", resp.text)

def test_cuda_floyd_warshall(graph_id):
    url = f"{BASE_URL}/cuda/floyd_warshall/{graph_id}/"
    resp = requests.get(url)
    if resp.status_code == 200:
        print("Floyd-Warshall (CUDA):", json.dumps(resp.json(), indent=2))
    else:
        print(f"Floyd-Warshall (CUDA) failed [{resp.status_code}]:", resp.text)

# ------------------ Sequential Tests ------------------

def test_sequential_bellman_ford(graph_id):
    url = f"{BASE_URL}/sequential/bellman_ford/{graph_id}/"
    resp = requests.get(url)
    if resp.status_code == 200:
        print("Bellman-Ford (CUDA):", json.dumps(resp.json(), indent=2))
    else:
        print(f"Bellman-Ford (CUDA) failed [{resp.status_code}]:", resp.text)

def test_sequential_dijkstra(graph_id):
    url = f"{BASE_URL}/sequential/dijkstra/{graph_id}/"
    resp = requests.get(url)
    if resp.status_code == 200:
        print("Dijkstra (CUDA):", json.dumps(resp.json(), indent=2))
    else:
        print(f"Dijkstra (CUDA) failed [{resp.status_code}]:", resp.text)

def test_sequential_floyd_warshall(graph_id):
    url = f"{BASE_URL}/sequential/floyd_warshall/{graph_id}/"
    resp = requests.get(url)
    if resp.status_code == 200:
        print("Floyd-Warshall (CUDA):", json.dumps(resp.json(), indent=2))
    else:
        print(f"Floyd-Warshall (CUDA) failed [{resp.status_code}]:", resp.text)

# ------------------ Run All ------------------

if __name__ == "__main__":
    # 1) create
    gid = create_graph(size=20, density=0.2)
    print()

    print("=== MPI Tests ===")
    test_sequential_bellman_ford(gid)
    test_sequential_dijkstra(gid)
    test_sequential_floyd_warshall(gid)
    print()

    print("=== MPI Tests ===")
    test_bellman_ford_mpi(gid)
    test_dijkstra_mpi(gid)
    test_floyd_warshall_mpi(gid)
    print()

    print("=== CUDA Tests ===")
    test_cuda_bellman_ford(gid)
    test_cuda_dijkstra(gid)
    test_cuda_floyd_warshall(gid)
