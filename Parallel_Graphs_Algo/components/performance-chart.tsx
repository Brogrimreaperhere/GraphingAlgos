"use client"

import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"

interface PerformanceChartProps {
  title: string
  description: string
  data: {
    name: string
    sequential: number
    parallel: number
  }[]
  yAxisLabel?: string
}

export default function PerformanceChart({
  title,
  description,
  data,
  yAxisLabel = "Time (ms)",
}: PerformanceChartProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            sequential: {
              label: "Sequential",
              color: "hsl(var(--chart-1))",
            },
            parallel: {
              label: "Parallel",
              color: "hsl(var(--chart-2))",
            },
          }}
          className="aspect-[4/3] w-full"
        >
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" />
            <YAxis label={{ value: yAxisLabel, angle: -90, position: "insideLeft" }} />
            <Tooltip content={<ChartTooltipContent />} />
            <Legend />
            <Bar dataKey="sequential" fill="var(--color-sequential)" name="Sequential" />
            <Bar dataKey="parallel" fill="var(--color-parallel)" name="Parallel" />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
