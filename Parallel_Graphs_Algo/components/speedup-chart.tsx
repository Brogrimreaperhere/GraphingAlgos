"use client"

import { Line, LineChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"

interface SpeedupChartProps {
  title: string
  description: string
  data: {
    nodes: number
    speedup: number
  }[]
}

export default function SpeedupChart({ title, description, data }: SpeedupChartProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            speedup: {
              label: "Speedup",
              color: "hsl(var(--chart-1))",
            },
          }}
          className="aspect-[4/3] w-full"
        >
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="nodes"
              label={{ value: "Number of Nodes/Processors", position: "insideBottom", offset: -5 }}
            />
            <YAxis label={{ value: "Speedup Factor", angle: -90, position: "insideLeft" }} />
            <Tooltip content={<ChartTooltipContent />} />
            <Legend />
            <Line
              type="monotone"
              dataKey="speedup"
              stroke="var(--color-speedup)"
              activeDot={{ r: 8 }}
              name="Speedup Factor"
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
