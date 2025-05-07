"use client"

import { Line, LineChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

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
    <Card className="w-full card-hover border-primary/20">
      <CardHeader className="gradient-bg rounded-t-lg">
        <CardTitle className="text-white">{title}</CardTitle>
        <CardDescription className="text-white/80">{description}</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--primary))" opacity={0.2} />
              <XAxis
                dataKey="nodes"
                label={{
                  value: "Number of Nodes/Processors",
                  position: "insideBottom",
                  offset: -10,
                  style: { fill: "hsl(var(--foreground))" },
                }}
                tick={{ fill: "hsl(var(--foreground))" }}
                axisLine={{ stroke: "hsl(var(--border))" }}
              />
              <YAxis
                label={{
                  value: "Speedup Factor",
                  angle: -90,
                  position: "insideLeft",
                  style: { fill: "hsl(var(--foreground))" },
                }}
                tick={{ fill: "hsl(var(--foreground))" }}
                axisLine={{ stroke: "hsl(var(--border))" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--background))",
                  borderColor: "hsl(var(--border))",
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                }}
                formatter={(value) => [`${value}x`, "Speedup Factor"]}
                labelFormatter={(value) => `${value} Nodes/Processors`}
              />
              <Legend
                wrapperStyle={{ paddingTop: "10px" }}
                formatter={(value) => <span style={{ color: "hsl(var(--foreground))" }}>{value}</span>}
              />
              <Line
                type="monotone"
                dataKey="speedup"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                activeDot={{ r: 8, fill: "hsl(var(--secondary))" }}
                dot={{ r: 4, fill: "hsl(var(--secondary))" }}
                name="Speedup Factor"
                animationDuration={2000}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
