import requests

# URL of your local Django server
mpi_base_url = "http://127.0.0.1:8000/api/mpi"
cuda_base_url = "http://127.0.0.1:8000/api/cuda"

# ------------------ MPI Tests ------------------

def test_bellman_ford():
    url = f"{mpi_base_url}/bellman_ford/"
    response = requests.get(url)
    if response.status_code == 200:
        print("Bellman-Ford (MPI) API Response:")
        print(response.json())
    else:
        print("Bellman-Ford (MPI) API failed with status code:", response.status_code)
        print("Error:", response.json())

def test_dijkstra():
    url = f"{mpi_base_url}/dijkstra/"
    response = requests.get(url)
    if response.status_code == 200:
        print("Dijkstra (MPI) API Response:")
        print(response.json())
    else:
        print("Dijkstra (MPI) API failed with status code:", response.status_code)
        print("Error:", response.json())

def test_floyd_warshall():
    url = f"{mpi_base_url}/floyd_warshall/"
    response = requests.get(url)
    if response.status_code == 200:
        print("Floyd-Warshall (MPI) API Response:")
        print(response.json())
    else:
        print("Floyd-Warshall (MPI) API failed with status code:", response.status_code)
        print("Error:", response.json())

# ------------------ CUDA Tests ------------------

def test_cuda_bellman_ford():
    url = f"{cuda_base_url}/bellman_ford/"
    response = requests.get(url)
    if response.status_code == 200:
        print("Bellman-Ford (CUDA) API Response:")
        print(response.json())
    else:
        print("Bellman-Ford (CUDA) API failed with status code:", response.status_code)
        print("Error:", response.json())

def test_cuda_dijkstra():
    url = f"{cuda_base_url}/dijkstra/"
    response = requests.get(url)
    if response.status_code == 200:
        print("Dijkstra (CUDA) API Response:")
        print(response.json())
    else:
        print("Dijkstra (CUDA) API failed with status code:", response.status_code)
        print("Error:", response.json())

def test_cuda_floyd_warshall():
    url = f"{cuda_base_url}/floyd_warshall/"
    response = requests.get(url)
    if response.status_code == 200:
        print("Floyd-Warshall (CUDA) API Response:")
        print(response.json())
    else:
        print("Floyd-Warshall (CUDA) API failed with status code:", response.status_code)
        print("Error:", response.json())

# ------------------ Run All Tests ------------------

if __name__ == "__main__":
    print("=== Running MPI Algorithm API Tests ===")
    test_bellman_ford()
    print()
    test_dijkstra()
    print()
    test_floyd_warshall()

    print("\n=== Running CUDA Algorithm API Tests ===")
    test_cuda_bellman_ford()
    print()
    test_cuda_dijkstra()
    print()
    test_cuda_floyd_warshall()
