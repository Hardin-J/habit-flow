'use client'

import { useEffect, useRef } from "react"
import { toast } from "sonner"

type HabitData = {
  id: string
  title: string
  reminderTime?: string | null
  completedToday: boolean
}

// Simple beep sound (Base64 to avoid external file issues)
const NOTIFICATION_SOUND = "data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU" // Shortened for brevity, use a real URL in prod
// Let's use a real public URL for a nice sound:
const SOUND_URL = "https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3"

export function NotificationManager({ habits }: { habits: HabitData[] }) {
  const lastPlayedRef = useRef<string | null>(null) // Prevent double playing in the same minute

  useEffect(() => {
    // Function to check time
    const checkReminders = () => {
      const now = new Date()
      // Format current time as "HH:MM" (24-hour format)
      const currentTime = now.toLocaleTimeString('en-GB', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false 
      })

      habits.forEach(habit => {
        // Conditions:
        // 1. Reminder time matches current time
        // 2. Habit is NOT completed yet
        // 3. We haven't played the sound for this specific time/habit yet
        if (
          habit.reminderTime === currentTime && 
          !habit.completedToday &&
          lastPlayedRef.current !== `${habit.id}-${currentTime}`
        ) {
          // A. Play Sound
          const audio = new Audio(SOUND_URL)
          audio.play().catch(e => console.log("Audio play failed (interaction needed first)"))

          // B. Show Toast
          toast("⏰ Time to " + habit.title, {
            description: "It's " + habit.reminderTime + "! Don't break your streak.",
            action: {
              label: "Mark Done",
              onClick: () => console.log("User clicked toast") // In real app, could trigger toggle
            },
            duration: 10000, // Stay for 10 seconds
          })

          // C. Lock this reminder so it doesn't loop for the whole minute
          lastPlayedRef.current = `${habit.id}-${currentTime}`
        }
      })
    }

    // Run check every 30 seconds
    const interval = setInterval(checkReminders, 30 * 1000)
    
    // Run immediately on mount
    checkReminders()

    return () => clearInterval(interval)
  }, [habits])

  return null // Render nothing
}