import requests

# URL of your local Django server
base_url = "http://127.0.0.1:8000/api/mpi"

# Bellman-Ford API test
def test_bellman_ford():
    url = f"{base_url}/bellman_ford/"
    response = requests.get(url)
    
    if response.status_code == 200:
        print("Bellman-Ford API Response:")
        print(response.json())  # This prints the result returned by the API
    else:
        print("Bellman-Ford API failed with status code:", response.status_code)

# Dijkstra API test
def test_dijkstra():
    url = f"{base_url}/dijkstra/"
    response = requests.get(url)
    
    if response.status_code == 200:
        print("Dijkstra API Response:")
        print(response.json())  # This prints the result returned by the API
    else:
        print("Dijkstra API failed with status code:", response.status_code)

# Floyd-Warshall API test
def test_floyd_warshall():
    url = f"{base_url}/floyd_warshall/"
    response = requests.get(url)
    
    if response.status_code == 200:
        print("Floyd-Warshall API Response:")
        print(response.json())  # This prints the result returned by the API
    else:
        print("Floyd-Warshall API failed with status code:", response.status_code)

# Run all the tests
if __name__ == "__main__":
    print("Running Bellman-Ford API Test...")
    test_bellman_ford()
    
    print("\nRunning Dijkstra API Test...")
    test_dijkstra()
    
    print("\nRunning Floyd-Warshall API Test...")
    test_floyd_warshall()
