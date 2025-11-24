"use client"

import { useEffect, useState } from "react"

export function Greeting({ userName }: { userName?: string | null }) {
    const [greeting, setGreeting] = useState("Welcome back")

    useEffect(() => {
        const hour = new Date().getHours()
        if (hour < 12) setGreeting("Good morning")
        else if (hour < 18) setGreeting("Good afternoon")
        else setGreeting("Good evening")
    }, [])

    return (
        <div className="space-y-1">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl animate-in fade-in slide-in-from-left-4 duration-700">
                {greeting}, <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">{userName || "Habit Builder"}</span>! 👋
            </h2>
            <p className="text-muted-foreground animate-in fade-in slide-in-from-left-5 duration-1000 delay-200">
                Ready to crush your goals today?
            </p>
        </div>
    )
}
