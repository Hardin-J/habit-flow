import { Trophy, Zap, Target, CheckCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

type StatsOverviewProps = {
    totalHabits: number
    totalCompletedToday: number
    totalStreak: number
    level: number
}

export function StatsOverview({ totalHabits, totalCompletedToday, totalStreak, level }: StatsOverviewProps) {
    const completionRate = totalHabits > 0 ? (totalCompletedToday / totalHabits) * 100 : 0

    return (
        <div className="grid gap-4 md:grid-cols-3">
            {/* Card 1: Level (Green Theme) */}
            <Card className="relative overflow-hidden border bg-white dark:bg-[#09090b] border-gray-200 dark:border-zinc-800 text-card-foreground shadow-sm transition-all hover:scale-[1.02] hover:shadow-md">
                {/* Glow effect works in both themes */}
                <div className="absolute right-0 top-0 h-32 w-32 -translate-y-8 translate-x-8 rounded-full bg-green-500/10 blur-3xl" />

                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Current Level</CardTitle>
                    <Trophy className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-3xl font-bold">{level}</div>
                    <p className="text-xs text-muted-foreground">Keep crushing it!</p>
                </CardContent>
            </Card>

            {/* Card 2: Completed Today (Orange Theme) */}
            <Card className="relative overflow-hidden border bg-white dark:bg-[#09090b] border-gray-200 dark:border-zinc-800 text-card-foreground shadow-sm transition-all hover:scale-[1.02] hover:shadow-md">
                <div className="absolute right-0 top-0 h-32 w-32 -translate-y-8 translate-x-8 rounded-full bg-orange-500/10 blur-3xl" />

                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Completed Today</CardTitle>
                    <Zap className="h-4 w-4 text-orange-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-3xl font-bold">{totalCompletedToday}</div>
                    <p className="text-xs text-muted-foreground">Habits finished today</p>
                </CardContent>
            </Card>

            {/* Card 3: Completion (Blue Theme) */}
            <Card className="relative overflow-hidden border bg-white dark:bg-[#09090b] border-gray-200 dark:border-zinc-800 text-card-foreground shadow-sm transition-all hover:scale-[1.02] hover:shadow-md">
                <div className="absolute right-0 top-0 h-32 w-32 -translate-y-8 translate-x-8 rounded-full bg-blue-500/10 blur-3xl" />

                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Daily Completion</CardTitle>
                    <Target className="h-4 w-4 text-blue-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-3xl font-bold">{Math.round(completionRate)}%</div>
                    <Progress
                        value={completionRate}
                        className="mt-2 h-1.5 bg-gray-100 dark:bg-zinc-800"
                        indicatorClassName="bg-blue-500"
                    />
                </CardContent>
            </Card>
        </div>
    )
}
