import { prisma } from "@/lib/db"
import { sendReminderEmail } from "@/lib/mail"
import { NextResponse } from "next/server"

// This forces the route to be dynamic (not cached)
export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const now = new Date()
    // Get current time in HH:MM format
    // NOTE: In production, you must handle Timezones (store user TZ). 
    // For this local demo, we assume Server Time = User Time.
    const currentCallbackTime = now.toLocaleTimeString('en-GB', { 
        hour: '2-digit', 
        minute: '2-digit', 
        hour12: false 
    })
    
    console.log(`⚡️ Cron running. Checking for reminders at: ${currentCallbackTime}`)

    // Find habits that match this time AND are not completed today
    const habitsToRemind = await prisma.habit.findMany({
      where: {
        reminderTime: currentCallbackTime,
        // Optimization: In a real app, filtering 'completed' here is complex in Prisma 
        // without raw SQL, so we filter in JS below for simplicity.
      },
      include: {
        user: true, // Need email
        logs: {
            where: {
                completedAt: {
                    gte: new Date(new Date().setHours(0,0,0,0)) // Today's logs
                }
            }
        }
      }
    })

    let sentCount = 0

    for (const habit of habitsToRemind) {
        // Only send if NOT completed today
        if (habit.logs.length === 0 && habit.user.email) {
            await sendReminderEmail(habit.user.email, habit.title)
            sentCount++
        }
    }

    return NextResponse.json({ success: true, emailsSent: sentCount, timeChecked: currentCallbackTime })

  } catch (error) {
    console.error(error)
    return NextResponse.json({ success: false, error: "Cron failed" }, { status: 500 })
  }
}