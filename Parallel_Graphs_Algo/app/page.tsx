import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Cpu, Gauge, Network } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                Parallel Graph Algorithms
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Exploring the performance gains of parallelism using MPI and CUDA for classical graph algorithms
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/dijkstra-mpi">
                <Button>
                  Explore Algorithms
                  <ArrowRight className="ml-2 h-4 w-4" />
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
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Project Overview</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                This project implements and compares parallel versions of classical graph algorithms to demonstrate the
                performance gains from parallelism.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-medium">MPI</CardTitle>
                <Network className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm">
                  Message Passing Interface for distributed memory parallelism across multiple nodes.
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-medium">CUDA</CardTitle>
                <Cpu className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm">
                  Compute Unified Device Architecture for GPU-based parallelism with thousands of cores.
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-medium">Performance</CardTitle>
                <Gauge className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm">
                  Comparative analysis of algorithm performance across different parallel implementations.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Implemented Algorithms</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Explore the five different parallel implementations of classical graph algorithms.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
            <Link href="/dijkstra-mpi">
              <Card className="h-full transition-all hover:shadow-md">
                <CardHeader>
                  <CardTitle>Dijkstra's Algorithm (MPI)</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Single-source shortest path algorithm implemented with MPI for distributed parallelism.
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>
            <Link href="/bellman-ford-mpi">
              <Card className="h-full transition-all hover:shadow-md">
                <CardHeader>
                  <CardTitle>Bellman-Ford (MPI)</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Single-source shortest path algorithm that handles negative edge weights, implemented with MPI.
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>
            <Link href="/floyd-warshall-mpi">
              <Card className="h-full transition-all hover:shadow-md">
                <CardHeader>
                  <CardTitle>Floyd-Warshall (MPI)</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    All-pairs shortest path algorithm implemented with MPI for distributed parallelism.
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>
            <Link href="/floyd-warshall-cuda">
              <Card className="h-full transition-all hover:shadow-md">
                <CardHeader>
                  <CardTitle>Floyd-Warshall (CUDA)</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    All-pairs shortest path algorithm implemented with CUDA for GPU parallelism.
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>
            <Link href="/bellman-ford-cuda">
              <Card className="h-full transition-all hover:shadow-md">
                <CardHeader>
                  <CardTitle>Bellman-Ford (CUDA)</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Single-source shortest path algorithm implemented with CUDA for GPU parallelism.
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
