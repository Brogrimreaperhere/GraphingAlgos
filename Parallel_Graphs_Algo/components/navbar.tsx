"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const routes = [
  { name: "Home", path: "/" },
  { name: "Dijkstra (MPI)", path: "/dijkstra-mpi" },
  { name: "Bellman-Ford (MPI)", path: "/bellman-ford-mpi" },
  { name: "Floyd-Warshall (MPI)", path: "/floyd-warshall-mpi" },
  { name: "Floyd-Warshall (CUDA)", path: "/floyd-warshall-cuda" },
  { name: "Bellman-Ford (CUDA)", path: "/bellman-ford-cuda" },
]

export default function Navbar() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold text-xl">Parallel Graph Algorithms</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {routes.map((route) => (
              <Link
                key={route.path}
                href={route.path}
                className={cn(
                  "transition-colors hover:text-foreground/80",
                  pathname === route.path ? "text-foreground font-semibold" : "text-foreground/60",
                )}
              >
                {route.name}
              </Link>
            ))}
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
              <span className="font-bold text-lg">Parallel Graph Algorithms</span>
            </Link>
            <nav className="flex flex-col gap-4">
              {routes.map((route) => (
                <Link
                  key={route.path}
                  href={route.path}
                  className={cn(
                    "text-foreground/60 transition-colors hover:text-foreground",
                    pathname === route.path ? "text-foreground font-semibold" : "text-foreground/60",
                  )}
                >
                  {route.name}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <Link href="https://github.com" target="_blank" rel="noreferrer">
            <Button variant="outline" size="sm">
              GitHub
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
