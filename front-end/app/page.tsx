import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Cpu, Network, Github, Users, Database } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-primary/10 to-background">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="section-heading animate-float">Parallel Graph Algorithms</h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Exploring the performance gains of parallelism using MPI and CUDA for classical graph algorithms
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Link href="/dijkstra-mpi">
                <Button variant="default" size="lg" className="animated-button text-white">
                  Explore Algorithms
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="https://github.com/Brogrimreaperhere/GraphingAlgos" target="_blank">
                <Button variant="outline" size="lg" className="animated-button text-white">
                  <Github className="mr-2 h-4 w-4" />
                  View Source
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="section-heading">Project Overview</h2>
              <p className="mx-auto max-w-[800px] text-muted-foreground md:text-xl">
                This project implements and compares parallel versions of classical graph algorithms to demonstrate the
                performance gains from parallelism using different technologies.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
            <Card className="card-hover border-primary/20">
              <CardHeader className="gradient-bg rounded-t-lg">
                <CardTitle className="flex items-center text-lg font-medium text-white">
                  <Network className="h-5 w-5 mr-2" />
                  MPI
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <CardDescription className="text-sm">
                  Message Passing Interface (MPI) is a standardized communication protocol for parallel computing. It
                  enables efficient distributed memory parallelism across multiple nodes by providing routines for
                  point-to-point and collective communication. In this project, we use MPI to parallelize Dijkstra,
                  Bellman-Ford, and Floyd-Warshall algorithms.
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="card-hover border-primary/20">
              <CardHeader className="gradient-bg rounded-t-lg">
                <CardTitle className="flex items-center text-lg font-medium text-white">
                  <Cpu className="h-5 w-5 mr-2" />
                  CUDA
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <CardDescription className="text-sm">
                  Compute Unified Device Architecture (CUDA) is NVIDIA's parallel computing platform and API model. It
                  enables dramatic increases in computing performance by harnessing the power of GPUs. Our
                  implementation uses an NVIDIA RTX 2080 Super with 16GB memory to accelerate Floyd-Warshall and
                  Bellman-Ford algorithms, achieving significant speedups compared to sequential implementations.
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="card-hover border-primary/20">
              <CardHeader className="gradient-bg rounded-t-lg">
                <CardTitle className="flex items-center text-lg font-medium text-white">
                  <Database className="h-5 w-5 mr-2" />
                  Django Backend
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <CardDescription className="text-sm">
                  Our project uses Django as a robust backend to store and serve performance data, algorithm
                  implementations, and analysis results. The Django REST framework provides API endpoints that our React
                  frontend consumes to display interactive visualizations and comparisons of algorithm performance
                  across different implementations and problem sizes.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-primary/5">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="section-heading">Implemented Algorithms</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Explore the six different parallel implementations of classical graph algorithms.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
            <Link href="/dijkstra-mpi">
              <Card className="h-full transition-all hover:shadow-md card-hover border-primary/20">
                <CardHeader className="gradient-bg rounded-t-lg">
                  <CardTitle className="text-white">Dijkstra's Algorithm (MPI)</CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <CardDescription>
                    Single-source shortest path algorithm implemented with MPI for distributed parallelism. Efficiently
                    finds the shortest path from a source vertex to all other vertices in a weighted graph.
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>
            <Link href="/dijkstra-cuda">
              <Card className="h-full transition-all hover:shadow-md card-hover border-primary/20">
                <CardHeader className="gradient-bg rounded-t-lg">
                  <CardTitle className="text-white">Dijkstra's Algorithm (CUDA)</CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <CardDescription>
                    Single-source shortest path algorithm implemented with CUDA for GPU parallelism. Leverages thousands
                    of CUDA cores to find shortest paths with significant speedup over sequential implementations.
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>
            <Link href="/bellman-ford-mpi">
              <Card className="h-full transition-all hover:shadow-md card-hover border-primary/20">
                <CardHeader className="gradient-bg rounded-t-lg">
                  <CardTitle className="text-white">Bellman-Ford (MPI)</CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <CardDescription>
                    Single-source shortest path algorithm that handles negative edge weights, implemented with MPI.
                    Distributes edge relaxation operations across multiple processors for improved performance.
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>
            <Link href="/bellman-ford-cuda">
              <Card className="h-full transition-all hover:shadow-md card-hover border-primary/20">
                <CardHeader className="gradient-bg rounded-t-lg">
                  <CardTitle className="text-white">Bellman-Ford (CUDA)</CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <CardDescription>
                    Single-source shortest path algorithm implemented with CUDA for GPU parallelism. Utilizes thousands
                    of CUDA cores to parallelize edge relaxation operations.
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>
            <Link href="/floyd-warshall-mpi">
              <Card className="h-full transition-all hover:shadow-md card-hover border-primary/20">
                <CardHeader className="gradient-bg rounded-t-lg">
                  <CardTitle className="text-white">Floyd-Warshall (MPI)</CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <CardDescription>
                    All-pairs shortest path algorithm implemented with MPI for distributed parallelism. Divides the
                    distance matrix among processors to compute shortest paths between all vertex pairs.
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>
            <Link href="/floyd-warshall-cuda">
              <Card className="h-full transition-all hover:shadow-md card-hover border-primary/20">
                <CardHeader className="gradient-bg rounded-t-lg">
                  <CardTitle className="text-white">Floyd-Warshall (CUDA)</CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <CardDescription>
                    All-pairs shortest path algorithm implemented with CUDA for GPU parallelism. Leverages NVIDIA RTX
                    2080 Super with 16GB memory for massive parallelization.
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="section-heading">Meet The Team</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                The brilliant minds behind this parallel graph algorithms project.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 mt-12">
            <Card className="card-hover border-primary/20">
              <CardHeader className="gradient-bg rounded-t-lg">
                <CardTitle className="flex items-center text-lg font-medium text-white">
                  <Users className="h-5 w-5 mr-2" />
                  Mohammad Noman
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4 flex flex-col items-center">
                <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                  <Users className="h-12 w-12 text-primary" />
                </div>
                <CardDescription className="text-center">
                  Lead Developer
                  <div className="mt-2">
                    <Link href="https://github.com/Brogrimreaperhere" target="_blank">
                      <Button variant="outline" size="sm" className="animated-button text-white">
                        <Github className="mr-2 h-4 w-4" />
                        GitHub
                      </Button>
                    </Link>
                  </div>
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="card-hover border-primary/20">
              <CardHeader className="gradient-bg rounded-t-lg">
                <CardTitle className="flex items-center text-lg font-medium text-white">
                  <Users className="h-5 w-5 mr-2" />
                  Ubaid ur Rehman
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4 flex flex-col items-center">
                <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                  <Users className="h-12 w-12 text-primary" />
                </div>
                <CardDescription className="text-center">
                CUDA Implementation
                  <div className="mt-2">
                    <Link href="https://github.com/Xiron7077" target="_blank">
                      <Button variant="outline" size="sm" className="animated-button text-white">
                        <Github className="mr-2 h-4 w-4" />
                        GitHub
                      </Button>
                    </Link>
                  </div>
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="card-hover border-primary/20">
              <CardHeader className="gradient-bg rounded-t-lg">
                <CardTitle className="flex items-center text-lg font-medium text-white">
                  <Users className="h-5 w-5 mr-2" />
                  Muhammad Shaheer
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4 flex flex-col items-center">
                <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                  <Users className="h-12 w-12 text-primary" />
                </div>
                <CardDescription className="text-center">
                  Performance Analyst
                  <div className="mt-2">
                    <Link href="https://github.com/nearsigh" target="_blank">
                      <Button variant="outline" size="sm" className="animated-button text-white">
                        <Github className="mr-2 h-4 w-4" />
                        GitHub
                      </Button>
                    </Link>
                  </div>
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
