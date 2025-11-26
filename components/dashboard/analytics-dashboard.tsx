"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { HabitHeatmap } from "@/components/dashboard/habit-heatmap"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { BarChart3, LayoutGrid } from "lucide-react"
import { cn } from "@/lib/utils"

interface AnalyticsDashboardProps {
    habits: any[]
}


export function AnalyticsDashboard({ habits }: AnalyticsDashboardProps) {
    const [timeRange, setTimeRange] = useState("7d")
    const [chartType, setChartType] = useState<"bar" | "heatmap">("bar")

    // Process data based on timeRange
    const processData = (range: string) => {
        const now = new Date()
        let days = 7
        if (range === "30d") days = 30
        if (range === "prev-month") days = 30 // Simplified for now

        const data = []
        for (let i = days - 1; i >= 0; i--) {
            const date = new Date()
            date.setDate(now.getDate() - i)
            const dateStr = date.toISOString().split('T')[0]

            let count = 0
            habits.forEach(habit => {
                if (habit.logs.some((log: any) => {
                    const logDate = new Date(log.completedAt).toISOString().split('T')[0]
                    return logDate === dateStr
                })) {
                    count++
                }
            })

            data.push({
                date: date.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric' }),
                fullDate: dateStr,
                count
            })
        }
        return data
    }

    const chartData = processData(timeRange)
    // Heatmap always needs more data to look good, so we fetch 365d for it, 
    // but we could filter it if the user really wants to see a small heatmap.
    // Usually heatmaps are for long-term trends.
    const heatmapData = processData("365d").map(d => ({ date: d.fullDate, count: d.count }))

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                {/* Left: Chart Type Switcher */}
                <div className="flex items-center bg-muted/50 p-1 rounded-lg border">
                    <button
                        onClick={() => setChartType("bar")}
                        className={cn(
                            "flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md transition-all",
                            chartType === "bar"
                                ? "bg-background text-foreground shadow-sm"
                                : "text-muted-foreground hover:text-foreground"
                        )}
                    >
                        <BarChart3 className="w-4 h-4" />
                        <span className="hidden sm:inline">Bar Chart</span>
                    </button>
                    <button
                        onClick={() => setChartType("heatmap")}
                        className={cn(
                            "flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md transition-all",
                            chartType === "heatmap"
                                ? "bg-background text-foreground shadow-sm"
                                : "text-muted-foreground hover:text-foreground"
                        )}
                    >
                        <LayoutGrid className="w-4 h-4" />
                        <span className="hidden sm:inline">Heatmap</span>
                    </button>
                </div>

                {/* Right: Time Range Filter */}
                <Tabs value={timeRange} onValueChange={setTimeRange}>
                    <TabsList>
                        <TabsTrigger value="7d">7 Days</TabsTrigger>
                        <TabsTrigger value="30d">30 Days</TabsTrigger>
                        <TabsTrigger value="prev-month">Last Month</TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>
                        {chartType === "bar" ? "Completion Trends" : "Consistency Heatmap"}
                    </CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                    {chartType === "bar" ? (
                        <ResponsiveContainer width="100%" height={200}>
                            <BarChart data={chartData}>
                                <XAxis
                                    dataKey="date"
                                    stroke="#888888"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                />
                                <YAxis
                                    stroke="#888888"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                    tickFormatter={(value) => `${value}`}
                                />
                                <Tooltip
                                    contentStyle={{ background: '#333', border: 'none', borderRadius: '8px', color: '#fff' }}
                                    cursor={{ fill: 'transparent' }}
                                />
                                <Bar dataKey="count" fill="#f97316" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="pt-4">
                            <HabitHeatmap data={heatmapData} />
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
