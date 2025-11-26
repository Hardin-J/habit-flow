"use client"

import { motion } from "framer-motion"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

interface HabitHeatmapProps {
    data: { date: string; count: number }[]
}

export function HabitHeatmap({ data }: HabitHeatmapProps) {
    // Generate last 365 days
    const today = new Date()
    const days = Array.from({ length: 365 }, (_, i) => {
        const d = new Date()
        d.setDate(today.getDate() - (364 - i))
        return d.toISOString().split('T')[0]
    })

    const getColor = (count: number) => {
        if (count === 0) return "bg-muted/20"
        if (count <= 1) return "bg-orange-500/20"
        if (count <= 2) return "bg-orange-500/40"
        if (count <= 3) return "bg-orange-500/60"
        if (count <= 4) return "bg-orange-500/80"
        return "bg-orange-500"
    }

    return (
        <div className="w-full overflow-x-auto pb-2">
            <div className="min-w-max">
                <div className="flex gap-1">
                    {days.map((date) => {
                        const dayData = data.find(d => d.date === date)
                        const count = dayData?.count || 0

                        return (
                            <TooltipProvider key={date}>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className={cn(
                                                "h-3 w-3 rounded-sm transition-colors",
                                                getColor(count)
                                            )}
                                        />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p className="text-xs">
                                            {date}: {count} habits
                                        </p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
