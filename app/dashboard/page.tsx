import { redirect } from "next/navigation"
import { prisma } from "@/lib/db"
import { HabitList } from "@/components/habits/habit-list"
import { AddHabitForm } from "@/components/habits/add-habit-form"
import { calculateStreak } from "@/lib/streak"
import { WeeklyChart } from "@/components/charts/weekly-chart"
import { StatsOverview } from "@/components/dashboard/stats-overview" // We will create this next
import { NotificationManager } from "@/components/layout/notification-manager"
import { Achievements } from "@/components/gamification/achievements"
import { Greeting } from "@/components/dashboard/greeting"
import { DailyTip } from "@/components/dashboard/daily-tip"
import { UserNav } from "@/components/user-nav"
import { auth, signOut } from "../api/auth/[...nextauth]/auth"
import { Plus, LayoutDashboard, BarChart3, Calendar, LogOut, CheckCircle2, Trophy, Flame, Settings } from "lucide-react"
import Link from "next/link" // Added for the Link component
import { Button } from "@/components/ui/button" // Added for the Button component

import { HabitHeatmap } from "@/components/dashboard/habit-heatmap"
import { AnalyticsDashboard } from "@/components/dashboard/analytics-dashboard"

export default async function DashboardPage() {
    const session = await auth()
    if (!session?.user) redirect("/login")

    // 1. Fetch Data
    const habitsData = await prisma.habit.findMany({
        where: { userId: session.user.id },
        include: {
            logs: { orderBy: { completedAt: 'desc' } }
        },
        orderBy: { createdAt: "desc" }
    })

    // 2. Transform for Habit List & Stats
    let totalStreak = 0
    let totalCompletedToday = 0
    let totalLogs = 0

    const habits = habitsData.map(habit => {
        const today = new Date()
        today.setHours(0, 0, 0, 0)

        const completedToday = habit.logs.some(log => {
            const logDate = new Date(log.completedAt)
            logDate.setHours(0, 0, 0, 0)
            return logDate.getTime() === today.getTime()
        })

        if (completedToday) totalCompletedToday++
        totalLogs += habit.logs.length

        const streak = calculateStreak(habit.logs, habit.streakStartDate)
        totalStreak += streak

        return {
            ...habit,
            completedToday,
            streak
        }
    })

    // SORTING: Incomplete first, then by creation date
    habits.sort((a: any, b: any) => {
        if (a.completedToday === b.completedToday) return 0;
        return a.completedToday ? 1 : -1;
    });

    // Calculate Level (Simple Gamification Logic)
    const level = Math.floor(totalLogs / 10) + 1

    // 3. Transform for Weekly Chart (Last 7 Days)
    const last7Days = Array.from({ length: 7 }, (_, i) => {
        const d = new Date()
        d.setDate(d.getDate() - i)
        d.setHours(0, 0, 0, 0)
        return d
    }).reverse()

    const chartData = last7Days.map(date => {
        const totalCompletions = habitsData.reduce((acc, habit) => {
            const count = habit.logs.filter(log => {
                const logDate = new Date(log.completedAt)
                logDate.setHours(0, 0, 0, 0)
                return logDate.getTime() === date.getTime()
            }).length
            return acc + count
        }, 0)

        return {
            day: date.toLocaleDateString('en-US', { weekday: 'short' }),
            total: totalCompletions
        }
    })

    // 4. Transform for Heatmap (Last 365 Days)
    const heatmapData = habitsData.reduce((acc: { date: string; count: number }[], habit) => {
        habit.logs.forEach(log => {
            const date = new Date(log.completedAt).toISOString().split('T')[0]
            const existing = acc.find(d => d.date === date)
            if (existing) {
                existing.count++
            } else {
                acc.push({ date, count: 1 })
            }
        })
        return acc
    }, [])

    return (
        <div className="flex md:h-screen md:overflow-hidden flex-col bg-gray-50/50 dark:bg-zinc-950 transition-colors duration-500">
            <div className="flex-1 flex flex-col space-y-8 p-4 pt-6 md:p-6 md:overflow-hidden">
                {/* Mount the Manager here with data */}
                <NotificationManager habits={habits} />

                {/* Header Section - Fixed at top */}
                <div className="flex-none flex flex-col gap-4 md:flex-row md:items-center md:justify-between animate-in fade-in slide-in-from-top-4 duration-700">
                    <Greeting userName={session.user.name} />

                    <div className="flex items-center gap-3 self-end md:self-auto">
                        <Achievements habits={habits} />
                        <AddHabitForm />
                        <UserNav user={session.user} />
                    </div>
                </div>

                {/* Stats Overview - Fixed */}
                <div className="flex-none animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
                    <StatsOverview
                        totalHabits={habits.length}
                        totalCompletedToday={totalCompletedToday}
                        totalStreak={totalStreak}
                        level={level}
                    />
                </div>



                {/* Main Content Grid - Scrollable Area */}
                <div className="flex-1 grid gap-4 md:grid-cols-1 lg:grid-cols-7 min-h-0 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
                    {/* Left Column: Habits List - SCROLLABLE */}
                    <div className="col-span-4 flex flex-col min-h-0">
                        <div className="flex-none flex items-center justify-between mb-4">
                            <h3 className="font-bold text-xl tracking-tight">Your Habits</h3>
                            <span className="text-sm text-muted-foreground">{habits.length} active</span>
                        </div>

                        <div className="flex-1 md:overflow-y-auto pr-2 space-y-4 scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-zinc-800">
                            {habits.length === 0 ? (
                                <div className="rounded-2xl border border-dashed p-12 text-center animate-in zoom-in-95 duration-500">
                                    <div className="mx-auto h-12 w-12 text-muted-foreground/50">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M12 4.5v15m7.5-7.5h-15"
                                            />
                                        </svg>
                                    </div>
                                    <h3 className="mt-4 text-lg font-semibold">No habits yet</h3>
                                    <p className="mb-4 text-sm text-muted-foreground">
                                        Start your journey by adding your first habit.
                                    </p>
                                    <AddHabitForm />
                                </div>
                            ) : (
                                <HabitList initialHabits={habits} />
                            )}
                        </div>
                    </div>

                    {/* Right Column: Analytics & Motivation - SCROLLABLE if needed, or fixed */}
                    <div className="col-span-3 flex flex-col gap-6 md:overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-zinc-800">
                        <div className="space-y-4">
                            <AnalyticsDashboard habits={habits} />
                        </div>

                        {/* Dynamic Daily Tip */}
                        <DailyTip />
                    </div>
                </div>
            </div>
        </div>
    )
}