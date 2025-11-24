"use client"

import { useEffect, useState } from "react"
import { Lightbulb, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

const TIPS = [
    "Consistency is not about perfection. It's about simply not giving up.",
    "Small steps every day add up to big results over time.",
    "Focus on the process, not just the outcome.",
    "The best way to predict the future is to create it.",
    "Motivation gets you started. Habit keeps you going.",
    "Don't break the chain! Keep your streak alive.",
    "Success is the sum of small efforts, repeated day in and day out.",
    "Your future is created by what you do today, not tomorrow.",
    "Believe you can and you're halfway there.",
    "Discipline is choosing between what you want now and what you want most."
]

export function DailyTip() {
    const [tip, setTip] = useState(TIPS[0])

    useEffect(() => {
        // Pick a random tip on mount (client-side only to avoid hydration mismatch)
        const randomTip = TIPS[Math.floor(Math.random() * TIPS.length)]
        setTip(randomTip)
    }, [])

    return (
        <div className="group relative overflow-hidden h-1/2 rounded-2xl border bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 p-6 shadow-sm transition-all hover:shadow-md dark:from-indigo-900/20 dark:via-purple-900/20 dark:to-pink-900/20">
            {/* Background Decor */}
            <div className="absolute -right-4 -top-2 h-12 w-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 opacity-10 blur-2xl transition-all group-hover:opacity-20" />

            <div className="relative h-16 flex flex-col gap-3">
                <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
                    <div className="rounded-full bg-indigo-100 p-1.5 dark:bg-indigo-900/50">
                        <Sparkles className="h-4 w-4" />
                    </div>
                    <h4 className="font-bold text-sm uppercase tracking-wider">Daily Wisdom</h4>
                </div>

                <p className="text-sm font-medium leading-relaxed text-foreground/90 italic">
                    "{tip}"
                </p>
            </div>
        </div>
    )
}
