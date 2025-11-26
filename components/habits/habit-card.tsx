'use client'

import { useOptimistic, startTransition, useState, useEffect } from "react"
import { toggleHabitAction, deleteHabit } from "@/actions/habit-actions"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import { Trash2, Flame, Clock, Edit2 } from "lucide-react"
import { FocusTimer } from "./focus-timer"
import { ReminderAlarm } from "./reminder-alarm"
import { EditReminderDialog } from "./edit-reminder-dialog"
import { Celebration } from "@/components/gamification/celebration"
import { HabitDetailsDialog } from "./habit-details-dialog"

type HabitProps = {
  habit: {
    id: string
    name: string
    description?: string | null
    goal?: number | null
    streak: number
    completedToday: boolean
    reminderTime?: string | null
    logs: { id: string }[]
  }
}

export function HabitCard({ habit }: HabitProps) {
  const [optimisticHabit, setOptimisticHabit] = useOptimistic(
    { completed: habit.completedToday, streak: habit.streak },
    (state, newStatus: boolean) => ({
      completed: newStatus,
      // Optimistic logic: If checking, add 1. If unchecking, subtract 1.
      streak: newStatus ? state.streak + 1 : Math.max(0, state.streak - 1)
    })
  )

  const [isRinging, setIsRinging] = useState(false)
  const [nextReminder, setNextReminder] = useState<Date | null>(null)

  // Check for reminder
  useEffect(() => {
    if (!habit.reminderTime || optimisticHabit.completed) return

    const checkInterval = setInterval(() => {
      const now = new Date()
      const currentTime = now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' })

      // Simple check: if current time matches reminder time exactly
      // In a real app, you'd want more robust scheduling (e.g., checking if we just passed it)
      if (currentTime === habit.reminderTime && !isRinging) {
        // Prevent multiple triggers in the same minute
        const lastTriggered = sessionStorage.getItem(`reminder-${habit.id}-last-triggered`)
        if (lastTriggered !== currentTime) {
          setIsRinging(true)
          sessionStorage.setItem(`reminder-${habit.id}-last-triggered`, currentTime)
        }
      }
    }, 1000)

    return () => clearInterval(checkInterval)
  }, [habit.reminderTime, habit.id, isRinging, optimisticHabit.completed])

  // Handle Snooze (10 mins)
  const handleSnooze = () => {
    setIsRinging(false)
    toast.info(`Snoozed ${habit.name} for 10 minutes`)

    // Set a timeout to ring again in 10 mins
    setTimeout(() => {
      setIsRinging(true)
    }, 10 * 60 * 1000)
  }

  const [badge, setBadge] = useState<string | null>(null)

  const handleToggle = async (checked: boolean) => {
    // 1. Optimistic UI Update
    startTransition(() => {
      setOptimisticHabit(checked)
    })

    // 2. Server Action
    try {
      const result = await toggleHabitAction(habit.id)

      // 3. Notification (Only on completion)
      if (checked) {
        toast.success("Great job! Habit completed.", {
          description: "Keep the streak alive! 🔥"
        })
        setIsRinging(false) // Stop ringing if completed

        // 4. Check for Badge
        if (result && result.badge) {
          setBadge(result.badge)
        }
      }
    } catch (error) {
      toast.error("Something went wrong.")
    }
  }

  const [showDetails, setShowDetails] = useState(false)

  return (
    <>
      <Celebration badge={badge} onClose={() => setBadge(null)} />

      <HabitDetailsDialog
        habit={{
          id: habit.id,
          name: habit.name,
          description: habit.description,
          goal: habit.goal,
          reminderTime: habit.reminderTime
        }}
        open={showDetails}
        onOpenChange={setShowDetails}
      />

      <ReminderAlarm
        habitTitle={habit.name}
        isOpen={isRinging}
        onDismiss={() => setIsRinging(false)}
        onSnooze={handleSnooze}
      />

      <div
        onClick={() => setShowDetails(true)}
        className={cn(
          "flex items-center justify-between p-5 border rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-md cursor-pointer",
          // FIX 1: Use semantic colors for backgrounds
          optimisticHabit.completed
            ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800" // Green state (Light vs Dark)
            : "bg-card hover:bg-accent/50 border-border" // Normal state (matches theme)
        )}>
        {/* Left Side */}
        <div className="flex items-center gap-4">
          <div onClick={(e) => e.stopPropagation()}>
            <Checkbox
              checked={optimisticHabit.completed}
              onCheckedChange={handleToggle}
              className="w-6 h-6 transition-all data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
            />
          </div>

          <div className="flex flex-col gap-1">
            {/* Title */}
            <h4 className={cn(
              "font-medium text-lg leading-none transition-all",
              optimisticHabit.completed && "line-through text-muted-foreground"
            )}>
              {habit.name}
            </h4>

            {/* Meta Row: Streak + Reminder */}
            <div className="flex items-center gap-3">

              {/* Streak Badge */}
              <div className="flex items-center gap-1">
                <Flame className={cn("w-4 h-4", optimisticHabit.streak > 0 ? "text-orange-500 fill-orange-500" : "text-gray-300")} />
                <span className={cn("text-xs font-bold", optimisticHabit.streak > 0 ? "text-orange-600" : "text-muted-foreground")}>
                  {optimisticHabit.streak} Day Streak
                </span>
              </div>

              {/* Reminder Badge (Conditional) */}
              {habit.reminderTime && (
                <div onClick={(e) => e.stopPropagation()}>
                  <EditReminderDialog habitId={habit.id} currentReminder={habit.reminderTime}>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground bg-gray-100 dark:bg-zinc-800 px-2 py-0.5 rounded-full border group cursor-pointer hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors"
                      title="Edit Reminder"
                    >
                      <Clock className="w-3 h-3" />
                      <span>{habit.reminderTime}</span>
                      <Edit2 className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </EditReminderDialog>
                </div>
              )}

            </div>
          </div>
        </div>

        {/* Right Side: Actions */}
        <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
          {/* Focus Timer Button */}
          <FocusTimer habitTitle={habit.name} />

          {/* Delete Button */}
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-red-500 hover:bg-red-50"
            onClick={() => deleteHabit(habit.id)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </>
  )
}