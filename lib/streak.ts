import { HabitLog } from "@prisma/client"

export function calculateStreak(logs: HabitLog[], streakStartDate?: Date | null): number {
  if (!logs || logs.length === 0) return 0

  // Filter logs if streakStartDate exists
  const validLogs = streakStartDate
    ? logs.filter(log => new Date(log.completedAt) >= new Date(streakStartDate))
    : logs

  if (validLogs.length === 0) return 0

  // 1. Sort logs by date (newest first)
  const sortedLogs = validLogs.sort((a, b) =>
    new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime()
  )

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)

  let streak = 0
  let currentCheckDate = today

  // 2. Check if we have a log for today (if not, we start checking from yesterday)
  // If the user hasn't done it today yet, the streak shouldn't reset to 0 immediately,
  // it should just be the streak up to yesterday.
  const hasEntryToday = sortedLogs.some(log => isSameDay(new Date(log.completedAt), today))

  if (!hasEntryToday) {
    currentCheckDate = yesterday
  }

  // 3. Iterate backwards
  for (let i = 0; i < sortedLogs.length; i++) {
    const logDate = new Date(sortedLogs[i].completedAt)

    // Check if this log matches the expected consecutive date
    if (isSameDay(logDate, currentCheckDate)) {
      streak++
      // Move check date back one day
      currentCheckDate.setDate(currentCheckDate.getDate() - 1)
    } else if (logDate < currentCheckDate) {
      // If we find a gap (log date is older than expected check date), break
      break
    }
    // If multiple logs exist on same day, ignore duplicates (loop continues)
  }

  return streak
}

// Helper to compare just the YYYY-MM-DD part
function isSameDay(d1: Date, d2: Date) {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  )
}