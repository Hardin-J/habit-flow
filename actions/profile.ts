"use server"

import { auth } from "@/app/api/auth/[...nextauth]/auth"
import { prisma } from "@/lib/db"

import { revalidatePath } from "next/cache"

export async function updateProfile(formData: FormData) {
    const session = await auth()
    if (!session?.user?.id) {
        return { error: "Unauthorized" }
    }

    const name = formData.get("name") as string
    const dateOfBirthStr = formData.get("dateOfBirth") as string
    const imageFile = formData.get("image") as File

    let imagePath = undefined
    if (imageFile && imageFile.size > 0) {
        // Convert file to base64
        const buffer = await imageFile.arrayBuffer()
        const base64 = Buffer.from(buffer).toString("base64")
        imagePath = `data:${imageFile.type};base64,${base64}`
    }

    try {
        await prisma.user.update({
            where: { id: session.user.id },
            data: {
                name,
                dateOfBirth: dateOfBirthStr ? new Date(dateOfBirthStr) : null,
                ...(imagePath && { image: imagePath })
            },
        })
        revalidatePath("/dashboard/settings")
        return { success: "Profile updated successfully!" }
    } catch (error) {
        return { error: "Failed to update profile" }
    }
}

export async function toggleTwoFactor(isEnabled: boolean) {
    const session = await auth()
    if (!session?.user?.id) {
        return { error: "Unauthorized" }
    }

    try {
        await prisma.user.update({
            where: { id: session.user.id },
            data: { isTwoFactorEnabled: isEnabled },
        })
        revalidatePath("/dashboard/settings")
        return { success: `2FA ${isEnabled ? "enabled" : "disabled"} successfully!` }
    } catch (error) {
        return { error: "Failed to update 2FA settings" }
    }
}
