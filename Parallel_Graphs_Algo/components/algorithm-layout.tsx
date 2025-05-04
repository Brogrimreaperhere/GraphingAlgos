import type { ReactNode } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface AlgorithmLayoutProps {
  title: string
  description: string
  implementation: ReactNode
  results: ReactNode
  performance: ReactNode
  code: ReactNode
}

export default function AlgorithmLayout({
  title,
  description,
  implementation,
  results,
  performance,
  code,
}: AlgorithmLayoutProps) {
  return (
    <div className="container py-10">
      <div className="flex flex-col space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{title}</h1>
          <p className="text-muted-foreground md:text-xl max-w-3xl">{description}</p>
        </div>

        <Tabs defaultValue="implementation" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="implementation">Implementation</TabsTrigger>
            <TabsTrigger value="results">Results</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="code">Code</TabsTrigger>
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
          <TabsContent value="code" className="py-4">
            {code}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
