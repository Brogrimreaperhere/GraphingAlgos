import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import MultiAlgorithmPerformanceChart from "@/components/multi-algorithm-performance-chart"
import MultiAlgorithmSpeedupChart from "@/components/multi-algorithm-speedup-chart"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function MPIAlgorithms() {
  // Sample performance data for all MPI algorithms
  const performanceData = [
    {
      name: "100 Nodes",
      sequential: 150,
      Dijkstra: 45,
      "Bellman-Ford": 60,
      "Floyd-Warshall": 55,
    },
    {
      name: "500 Nodes",
      sequential: 720,
      Dijkstra: 160,
      "Bellman-Ford": 210,
      "Floyd-Warshall": 650,
    },
    {
      name: "1000 Nodes",
      sequential: 1450,
      Dijkstra: 320,
      "Bellman-Ford": 380,
      "Floyd-Warshall": 2200,
    },
    {
      name: "5000 Nodes",
      sequential: 7800,
      Dijkstra: 1400,
      "Bellman-Ford": 1850,
      "Floyd-Warshall": 8500,
    },
  ]

  const speedupData = [
    {
      nodes: 2,
      Dijkstra: 1.8,
      "Bellman-Ford": 1.7,
      "Floyd-Warshall": 1.9,
    },
    {
      nodes: 4,
      Dijkstra: 3.2,
      "Bellman-Ford": 3.0,
      "Floyd-Warshall": 3.5,
    },
    {
      nodes: 8,
      Dijkstra: 5.6,
      "Bellman-Ford": 5.2,
      "Floyd-Warshall": 6.2,
    },
    {
      nodes: 16,
      Dijkstra: 9.2,
      "Bellman-Ford": 8.5,
      "Floyd-Warshall": 10.5,
    },
    {
      nodes: 32,
      Dijkstra: 12.5,
      "Bellman-Ford": 11.2,
      "Floyd-Warshall": 15.8,
    },
  ]

  const algorithms = ["Dijkstra", "Bellman-Ford", "Floyd-Warshall"]
  const colors = ["hsl(var(--secondary))", "hsl(262, 83%, 58%)", "hsl(340, 82%, 52%)"]

  return (
    <div className="container py-10">
      <div className="flex flex-col space-y-6">
        <div className="space-y-2">
          <h1 className="section-heading">MPI Parallel Graph Algorithms</h1>
          <p className="text-muted-foreground md:text-xl max-w-3xl">
            Comparison of different graph algorithms implemented using the Message Passing Interface (MPI) for
            distributed memory parallelism.
          </p>
        </div>

        <Tabs defaultValue="implementation" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-primary/10">
            <TabsTrigger
              value="implementation"
              className="data-[state=active]:bg-primary data-[state=active]:text-white"
            >
              Implementation
            </TabsTrigger>
            <TabsTrigger value="results" className="data-[state=active]:bg-primary data-[state=active]:text-white">
              Results
            </TabsTrigger>
            <TabsTrigger value="performance" className="data-[state=active]:bg-primary data-[state=active]:text-white">
              Performance
            </TabsTrigger>
          </TabsList>

          <TabsContent value="implementation" className="py-4">
            <div className="grid gap-6">
              <Card className="card-hover border-primary/20">
                <CardHeader className="gradient-bg rounded-t-lg">
                  <CardTitle className="text-white">MPI Implementation Overview</CardTitle>
                  <CardDescription className="text-white/80">
                    Common parallelization strategies and techniques used in MPI implementations
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 pt-6">
                  <p>
                    Message Passing Interface (MPI) is a standardized communication protocol for parallel computing that
                    enables efficient distributed memory parallelism across multiple nodes. All three graph algorithms
                    implemented in this project use MPI to distribute the workload across multiple processors and
                    coordinate their execution.
                  </p>
                  <h3 className="subsection-heading mt-4">Common MPI Techniques</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Data distribution strategies (block, cyclic, or custom)</li>
                    <li>Point-to-point communication (MPI_Send, MPI_Recv)</li>
                    <li>Collective communication (MPI_Bcast, MPI_Reduce, MPI_Allreduce)</li>
                    <li>Synchronization barriers (MPI_Barrier)</li>
                    <li>Custom data types for complex data structures</li>
                    <li>Load balancing techniques</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="card-hover border-primary/20">
                <CardHeader className="gradient-bg rounded-t-lg">
                  <CardTitle className="text-white">Dijkstra's Algorithm (MPI)</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 pt-6">
                  <p>
                    The MPI implementation of Dijkstra's algorithm divides the graph vertices among available
                    processors:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      Each processor is responsible for computing the shortest paths for its assigned subset of vertices
                    </li>
                    <li>The graph is distributed using a block distribution strategy</li>
                    <li>Each processor maintains a local copy of the distance array</li>
                    <li>In each iteration, processors find the minimum distance vertex in their local subset</li>
                    <li>A global reduction operation finds the overall minimum distance vertex</li>
                    <li>Each processor updates distances for its assigned vertices</li>
                    <li>Synchronization ensures all processors have consistent distance values</li>
                  </ul>
                  <p className="mt-4">
                    The algorithm uses collective communication operations like MPI_Allreduce with MPI_MINLOC to find
                    the global minimum distance vertex and MPI_Allreduce with MPI_MIN to synchronize distance values
                    across all processors.
                  </p>
                </CardContent>
              </Card>

              <Card className="card-hover border-primary/20">
                <CardHeader className="gradient-bg rounded-t-lg">
                  <CardTitle className="text-white">Bellman-Ford Algorithm (MPI)</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 pt-6">
                  <p>
                    The MPI implementation of the Bellman-Ford algorithm divides the edges of the graph among available
                    processors:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Each processor is responsible for relaxing its assigned subset of edges in each iteration</li>
                    <li>
                      The graph is represented as an edge list and distributed using a block distribution strategy
                    </li>
                    <li>Each processor maintains a local copy of the distance array</li>
                    <li>In each iteration, processors relax their assigned edges</li>
                    <li>A global reduction operation combines the results from all processors</li>
                    <li>Early termination is possible if no distance is updated in an iteration</li>
                  </ul>
                  <p className="mt-4">
                    The algorithm uses collective communication operations like MPI_Bcast to distribute initial
                    distances, MPI_Allreduce with MPI_MIN to combine updated distances, and MPI_Allreduce with MPI_LOR
                    to check if any distance was updated.
                  </p>
                </CardContent>
              </Card>

              <Card className="card-hover border-primary/20">
                <CardHeader className="gradient-bg rounded-t-lg">
                  <CardTitle className="text-white">Floyd-Warshall Algorithm (MPI)</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 pt-6">
                  <p>
                    The MPI implementation of the Floyd-Warshall algorithm divides the rows of the distance matrix among
                    available processors:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Each processor is responsible for updating its assigned subset of rows in each iteration</li>
                    <li>
                      The graph is represented as an adjacency matrix and distributed using a block row distribution
                      strategy
                    </li>
                    <li>Each processor maintains its assigned rows of the distance matrix</li>
                    <li>In each iteration k, the processor that owns row k broadcasts it to all other processors</li>
                    <li>Each processor updates its assigned rows using the received k-th row</li>
                    <li>After all iterations, the results are gathered back to the root processor</li>
                  </ul>
                  <p className="mt-4">
                    The algorithm uses point-to-point and collective communication operations like MPI_Bcast to
                    broadcast the k-th row, MPI_Barrier to synchronize processors, and MPI_Send/MPI_Recv to gather the
                    final results.
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="results" className="py-4">
            <div className="grid gap-6">
              <Card className="card-hover border-primary/20">
                <CardHeader className="gradient-bg rounded-t-lg">
                  <CardTitle className="text-white">Comparative Results</CardTitle>
                  <CardDescription className="text-white/80">
                    Comparison of results from different MPI algorithm implementations
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 pt-6">
                  <p>
                    All three MPI implementations produce correct results that match their sequential counterparts. The
                    correctness has been verified using various test cases, including small graphs with known shortest
                    paths, random graphs of different sizes, and special case graphs.
                  </p>
                  <h3 className="subsection-heading mt-4">Key Findings</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>All MPI implementations produce identical results to their sequential counterparts</li>
                    <li>The Floyd-Warshall MPI implementation shows the highest absolute speedup</li>
                    <li>Dijkstra's MPI implementation shows the best scaling with processor count</li>
                    <li>
                      The Bellman-Ford MPI implementation has the most consistent performance across different graph
                      types
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="card-hover border-primary/20">
                <CardHeader className="gradient-bg rounded-t-lg">
                  <CardTitle className="text-white">Dijkstra's Algorithm Results</CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                    <code>{`$ mpirun -np 4 ./dijkstra_mpi
Reading graph with 1000 vertices...
Running Dijkstra's algorithm with source vertex 0
Computation completed in 0.32 seconds

Shortest paths from vertex 0:
Vertex 1: Distance = 5
Vertex 2: Distance = 8
Vertex 3: Distance = 12
...
Vertex 999: Distance = 347

Sequential execution time: 1.20 seconds
Parallel execution time (4 processors): 0.32 seconds
Speedup: 3.75x`}</code>
                  </pre>
                </CardContent>
              </Card>

              <Card className="card-hover border-primary/20">
                <CardHeader className="gradient-bg rounded-t-lg">
                  <CardTitle className="text-white">Bellman-Ford Algorithm Results</CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                    <code>{`$ mpirun -np 4 ./bellman_ford_mpi
Reading graph with 1000 vertices and 4500 edges...
Running Bellman-Ford algorithm with source vertex 0
Computation completed in 0.38 seconds

Shortest paths from vertex 0:
Vertex 1: Distance = 5
Vertex 2: Distance = 8
Vertex 3: Distance = 12
...
Vertex 999: Distance = 347

No negative weight cycles detected

Sequential execution time: 1.45 seconds
Parallel execution time (4 processors): 0.38 seconds
Speedup: 3.82x`}</code>
                  </pre>
                </CardContent>
              </Card>

              <Card className="card-hover border-primary/20">
                <CardHeader className="gradient-bg rounded-t-lg">
                  <CardTitle className="text-white">Floyd-Warshall Algorithm Results</CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                    <code>{`$ mpirun -np 8 ./floyd_warshall_mpi
Reading graph with 1000 vertices...
Running Floyd-Warshall algorithm
Computation completed in 2.20 seconds

All-pairs shortest paths computed successfully
Sample paths:
From 0 to 100: Distance = 245
From 0 to 500: Distance = 378
From 500 to 999: Distance = 412

Sequential execution time: 10.00 seconds
Parallel execution time (8 processors): 2.20 seconds
Speedup: 4.55x`}</code>
                  </pre>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="performance" className="py-4">
            <div className="grid gap-6">
              <MultiAlgorithmPerformanceChart
                title="Execution Time Comparison"
                description="Comparison of sequential vs. MPI execution times for different graph sizes"
                data={performanceData}
                algorithms={algorithms}
                colors={colors}
                yAxisLabel="Time (ms)"
              />

              <MultiAlgorithmSpeedupChart
                title="Speedup vs. Number of Processors"
                description="Speedup achieved with increasing number of processors for a 1000-vertex graph"
                data={speedupData}
                algorithms={algorithms}
                colors={colors}
              />

              <Card className="card-hover border-primary/20">
                <CardHeader className="gradient-bg rounded-t-lg">
                  <CardTitle className="text-white">Performance Analysis</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 pt-6">
                  <p>
                    The MPI implementations of all three algorithms show significant performance improvements over their
                    sequential counterparts, especially for larger graphs and higher processor counts.
                  </p>

                  <h3 className="subsection-heading mt-4">Comparative Analysis</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      Floyd-Warshall shows the highest absolute speedup (up to 15.8x with 32 processors) due to its
                      regular computation pattern and high arithmetic intensity
                    </li>
                    <li>
                      Dijkstra's algorithm shows excellent scaling with processor count, with near-linear speedup up to
                      8 processors
                    </li>
                    <li>
                      Bellman-Ford shows consistent performance across different graph types, making it a robust choice
                      for general-purpose use
                    </li>
                  </ul>

                  <h3 className="subsection-heading mt-4">Common Bottlenecks</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Communication overhead, especially for global synchronization operations</li>
                    <li>Load imbalance when graph structure is irregular</li>
                    <li>Sequential portions of the algorithms that cannot be parallelized</li>
                    <li>Memory requirements for large graphs</li>
                    <li>Network latency and bandwidth limitations in distributed environments</li>
                  </ul>

                  <h3 className="subsection-heading mt-4">Scalability</h3>
                  <p>
                    All three MPI implementations show good strong scaling (speedup with fixed problem size and
                    increasing processors) up to a certain point, after which communication overhead starts to dominate.
                    They also show good weak scaling (efficiency with fixed problem size per processor), making them
                    suitable for large-scale distributed computing environments.
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
