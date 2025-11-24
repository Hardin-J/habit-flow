'use server'

import { auth } from "@/app/api/auth/[...nextauth]/auth"
import { prisma } from "@/lib/db" // Make sure you have the db.ts singleton
import { habitSchema } from "@/lib/schemas"
import { revalidatePath } from "next/cache"

// --- Create Habit ---
export async function createHabit(formData: FormData) {
    const session = await auth()
    if (!session?.user?.id) throw new Error("Unauthorized")

    const reminderTime = formData.get("reminderTime") as string | null

    const rawData = {
        title: formData.get("title"),
        description: formData.get("description"),
        frequency: formData.get("frequency") || "daily",
        reminderTime: reminderTime === "" ? undefined : reminderTime
    }

    const validated = habitSchema.parse(rawData)

    await prisma.habit.create({
        data: {
            ...validated,
            userId: session.user.id,
        },
    })

    revalidatePath("/dashboard")
}

// --- Toggle Habit ---
export async function toggleHabitAction(habitId: string) {
    const session = await auth()
    if (!session?.user?.id) throw new Error("Unauthorized")

    const today = new Date()
    today.setHours(0, 0, 0, 0) // Start of today
    const endOfToday = new Date()
    endOfToday.setHours(23, 59, 59, 999) // End of today

    // Check if completed today
    const existingLog = await prisma.habitLog.findFirst({
        where: {
            habitId,
            completedAt: {
                gte: today,
                lte: endOfToday
            }
        }
    })

    if (existingLog) {
        // Untoggle (Delete)
        await prisma.habitLog.delete({ where: { id: existingLog.id } })
    } else {
        // Toggle (Create)
        await prisma.habitLog.create({
            data: {
                habitId,
                completedAt: new Date(),
                status: "completed"
            }
        })
    }

    revalidatePath("/dashboard")
}

// --- Delete Habit ---
export async function deleteHabit(habitId: string) {
    const session = await auth()
    if (!session?.user?.id) throw new Error("Unauthorized")

    await prisma.habit.delete({
        where: {
            id: habitId,
            userId: session.user.id // Ensure ownership
        }
    })

    revalidatePath("/dashboard")
}

// --- Update Habit Reminder ---
export async function updateHabitReminder(habitId: string, reminderTime: string | null) {
    const session = await auth()
    if (!session?.user?.id) throw new Error("Unauthorized")

    await prisma.habit.update({
        where: {
            id: habitId,
            userId: session.user.id
        },
        data: {
            reminderTime: reminderTime === "" ? null : reminderTime
        }
    })

    revalidatePath("/dashboard")
}