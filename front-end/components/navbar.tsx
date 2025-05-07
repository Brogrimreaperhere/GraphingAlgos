"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Menu, Github } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const routes = [
  { name: "CUDA Algorithms", path: "/cuda-algorithms" },
  { name: "MPI Algorithms", path: "/mpi-algorithms" },
  { name: "Dijkstra (MPI)", path: "/dijkstra-mpi" },
  { name: "Dijkstra (CUDA)", path: "/dijkstra-cuda" },
  { name: "Bellman-Ford (MPI)", path: "/bellman-ford-mpi" },
  { name: "Bellman-Ford (CUDA)", path: "/bellman-ford-cuda" },
  { name: "Floyd-Warshall (MPI)", path: "/floyd-warshall-mpi" },
  { name: "Floyd-Warshall (CUDA)", path: "/floyd-warshall-cuda" },
]

export default function Navbar() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex flex-1">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold text-xl text-primary">Parallel Graph Algorithms</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            {routes.slice(0, 2).map((route) => (
              <Link
                key={route.path}
                href={route.path}
                className={cn(
                  "transition-colors hover:text-primary font-semibold",
                  pathname === route.path ? "text-primary" : "text-foreground/60",
                )}
              >
                {route.name}
              </Link>
            ))}
            <div className="relative group">
              <span className="cursor-pointer text-foreground/60 hover:text-primary">Individual Algorithms</span>
              <div className="absolute left-0 mt-2 w-48 bg-background border rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                {routes.slice(2).map((route) => (
                  <Link
                    key={route.path}
                    href={route.path}
                    className={cn(
                      "block px-4 py-2 text-sm hover:bg-primary/10",
                      pathname === route.path ? "text-primary font-semibold" : "text-foreground/60",
                    )}
                  >
                    {route.name}
                  </Link>
                ))}
              </div>
            </div>
          </nav>
        </div>
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="outline" size="icon" className="mr-2">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <Link href="/" className="flex items-center mb-8">
              <span className="font-bold text-lg text-primary">Parallel Graph Algorithms</span>
            </Link>
            <nav className="flex flex-col gap-4">
              {routes.map((route) => (
                <Link
                  key={route.path}
                  href={route.path}
                  className={cn(
                    "text-foreground/60 transition-colors hover:text-primary",
                    pathname === route.path ? "text-primary font-semibold" : "text-foreground/60",
                  )}
                >
                  {route.name}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex items-center justify-end space-x-2">
          <Link href="https://github.com/Brogrimreaperhere/GraphingAlgos" target="_blank" rel="noreferrer">
            <Button variant="outline" size="sm" className="animated-button text-white">
              <Github className="mr-2 h-4 w-4" />
              GitHub
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
