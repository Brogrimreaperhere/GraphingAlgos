import type { ReactNode } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface AlgorithmLayoutProps {
  title: string
  description: string
  implementation: ReactNode
  results: ReactNode
  performance: ReactNode
}

export default function AlgorithmLayout({
  title,
  description,
  implementation,
  results,
  performance,
}: AlgorithmLayoutProps) {
  return (
    <div className="container py-10">
      <div className="flex flex-col space-y-6">
        <div className="space-y-2">
          <h1 className="section-heading">{title}</h1>
          <p className="text-muted-foreground md:text-xl max-w-3xl">{description}</p>
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
            {implementation}
          </TabsContent>
          <TabsContent value="results" className="py-4">
            {results}
          </TabsContent>
          <TabsContent value="performance" className="py-4">
            {performance}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
