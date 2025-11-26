import { Trophy, Medal, Flame, Star, Zap } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// Define our Badges
const BADGES = [
  {
    id: "beginner",
    title: "First Step",
    description: "Created your first habit",
    icon: Star,
    color: "text-yellow-500",
    condition: (habits: any[]) => habits.length >= 1
  },
  {
    id: "streak_3",
    title: "Heating Up",
    description: "Reached a 3-day streak on any habit",
    icon: Flame,
    color: "text-orange-500",
    condition: (habits: any[]) => habits.some((h: any) => h.streak >= 3)
  },
  {
    id: "streak_7",
    title: "On Fire",
    description: "Reached a 7-day streak!",
    icon: Zap,
    color: "text-red-500",
    condition: (habits: any[]) => habits.some((h: any) => h.streak >= 7)
  },
  {
    id: "pro",
    title: "Habit Master",
    description: "Managing 5+ habits simultaneously",
    icon: Trophy,
    color: "text-purple-500",
    condition: (habits: any[]) => habits.length >= 5
  }
]

export function Achievements({ habits }: { habits: any[] }) {
  // Calculate unlocked badges
  const unlockedBadges = BADGES.filter(badge => badge.condition(habits))
  const lockedBadges = BADGES.filter(badge => !badge.condition(habits))

  // Calculate progress
  const progress = Math.round((unlockedBadges.length / BADGES.length) * 100)

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="relative">
          <Trophy className="mr-2 h-4 w-4 text-yellow-600" />
          Achievements
          {/* Notification Dot */}
          {unlockedBadges.length > 0 && (
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-yellow-500"></span>
            </span>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            Your Trophy Cabinet
          </DialogTitle>
          <DialogDescription>
            Unlock badges by maintaining streaks and consistency.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          {/* Progress Bar */}
          <div className="mb-6 space-y-2">
            <div className="flex justify-between text-sm">
              <span>Level {unlockedBadges.length}</span>
              <span>{progress}% Complete</span>
            </div>
            <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-yellow-500 transition-all duration-1000"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Unlocked Badges */}
            {unlockedBadges.map((badge) => (
              <div key={badge.id} className="flex items-center p-3 border rounded-xl bg-yellow-50/50 border-yellow-100">
                <div className={cn("p-2 rounded-full bg-white shadow-sm mr-3", badge.color)}>
                  <badge.icon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm">{badge.title}</h4>
                  <p className="text-xs text-muted-foreground">{badge.description}</p>
                </div>
              </div>
            ))}

            {/* Locked Badges (Grayscale) */}
            {lockedBadges.map((badge) => (
              <div key={badge.id} className="flex items-center p-3 border rounded-xl bg-gray-50 border-gray-100 opacity-60 grayscale">
                <div className="p-2 rounded-full bg-gray-200 mr-3">
                  <badge.icon className="w-6 h-6 text-gray-500" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm">{badge.title}</h4>
                  <p className="text-xs text-muted-foreground">Locked</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}