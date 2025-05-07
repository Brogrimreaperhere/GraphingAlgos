"use client"

import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface AlgorithmData {
  name: string
  sequential: number
  [key: string]: number | string
}

interface MultiAlgorithmPerformanceChartProps {
  title: string
  description: string
  data: AlgorithmData[]
  algorithms: string[]
  colors: string[]
  yAxisLabel?: string
}

export default function MultiAlgorithmPerformanceChart({
  title,
  description,
  data,
  algorithms,
  colors,
  yAxisLabel = "Time (ms)",
}: MultiAlgorithmPerformanceChartProps) {
  return (
    <Card className="w-full card-hover border-primary/20">
      <CardHeader className="gradient-bg rounded-t-lg">
        <CardTitle className="text-white">{title}</CardTitle>
        <CardDescription className="text-white/80">{description}</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--primary))" opacity={0.2} />
              <XAxis
                dataKey="name"
                tick={{ fill: "hsl(var(--foreground))" }}
                axisLine={{ stroke: "hsl(var(--border))" }}
              />
              <YAxis
                label={{
                  value: yAxisLabel,
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
              />
              <Legend
                wrapperStyle={{ paddingTop: "10px" }}
                formatter={(value) => <span style={{ color: "hsl(var(--foreground))" }}>{value}</span>}
              />
              <Bar
                dataKey="sequential"
                name="Sequential"
                fill="hsl(var(--primary))"
                radius={[4, 4, 0, 0]}
                animationDuration={1500}
              />
              {algorithms.map((algo, index) => (
                <Bar
                  key={algo}
                  dataKey={algo}
                  name={algo}
                  fill={colors[index % colors.length]}
                  radius={[4, 4, 0, 0]}
                  animationDuration={1500}
                  animationBegin={300 + index * 150}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
