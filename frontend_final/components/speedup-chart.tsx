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
    <Card className="w-full card-hover">
      <CardHeader className="bg-gradient-to-r from-teal-light to-teal-medium rounded-t-lg">
        <CardTitle>{title}</CardTitle>
        <CardDescription className="text-foreground/80">{description}</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#93B1B5" opacity={0.3} />
              <XAxis
                dataKey="nodes"
                label={{
                  value: "Number of Nodes/Processors",
                  position: "insideBottom",
                  offset: -10,
                  style: { fill: "#4F7C82" },
                }}
                tick={{ fill: "#4F7C82" }}
                axisLine={{ stroke: "#93B1B5" }}
              />
              <YAxis
                label={{
                  value: "Speedup Factor",
                  angle: -90,
                  position: "insideLeft",
                  style: { fill: "#4F7C82" },
                }}
                tick={{ fill: "#4F7C82" }}
                axisLine={{ stroke: "#93B1B5" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#F8FDFE",
                  borderColor: "#93B1B5",
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                }}
                formatter={(value) => [`${value}x`, "Speedup Factor"]}
                labelFormatter={(value) => `${value} Nodes/Processors`}
              />
              <Legend
                wrapperStyle={{ paddingTop: "10px" }}
                formatter={(value) => <span style={{ color: "#0B2E33" }}>{value}</span>}
              />
              <Line
                type="monotone"
                dataKey="speedup"
                stroke="#0B2E33"
                strokeWidth={2}
                activeDot={{ r: 8, fill: "#4F7C82" }}
                dot={{ r: 4, fill: "#4F7C82" }}
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
