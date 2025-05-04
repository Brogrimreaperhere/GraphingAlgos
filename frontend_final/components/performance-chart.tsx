"use client"

import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

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
    <Card className="w-full card-hover">
      <CardHeader className="bg-gradient-to-r from-teal-light to-teal-medium rounded-t-lg">
        <CardTitle>{title}</CardTitle>
        <CardDescription className="text-foreground/80">{description}</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#93B1B5" opacity={0.3} />
              <XAxis dataKey="name" tick={{ fill: "#4F7C82" }} axisLine={{ stroke: "#93B1B5" }} />
              <YAxis
                label={{
                  value: yAxisLabel,
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
              />
              <Legend
                wrapperStyle={{ paddingTop: "10px" }}
                formatter={(value) => <span style={{ color: "#0B2E33" }}>{value}</span>}
              />
              <Bar
                dataKey="sequential"
                name="Sequential"
                fill="#4F7C82"
                radius={[4, 4, 0, 0]}
                animationDuration={1500}
              />
              <Bar
                dataKey="parallel"
                name="Parallel"
                fill="#B8E3E9"
                radius={[4, 4, 0, 0]}
                animationDuration={1500}
                animationBegin={300}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
