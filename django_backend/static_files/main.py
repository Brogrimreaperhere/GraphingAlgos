import os

def run_algorithm(script_name):
    os.system(f"mpiexec -n 4 python algorithms/{script_name}")

def main():
    print("Choose an algorithm to run:")
    print("1. Dijkstra")
    print("2. Floyd-Warshall")
    print("3. Bellman-Ford")

    choice = input("Enter choice: ")


    if choice == "1":
        run_algorithm("dijkstra_mpi.py")
    elif choice == "2":
        run_algorithm("floyd_warshall_mpi.py")
    elif choice == "3":
        run_algorithm("bellman_ford_mpi.py")
    else:
        print("Invalid choice.")

if __name__ == "__main__":
    main()

    
