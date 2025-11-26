"use server"

import { prisma } from "@/lib/db"
import { hash } from "bcryptjs"
import { generateVerificationToken } from "@/lib/tokens"
import { sendVerificationEmail } from "@/lib/mail"

export async function register(formData: FormData) {
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const name = formData.get("name") as string

    if (!email || !password) {
        return { error: "Email and password are required" }
    }

    const existingUser = await prisma.user.findUnique({
        where: { email },
    })

    if (existingUser) {
        return { error: "User already exists" }
    }

    const hashedPassword = await hash(password, 10)

    await prisma.user.create({
        data: {
            email,
            name,
            password: hashedPassword,
        },
    })

    const verificationToken = await generateVerificationToken(email)
    await sendVerificationEmail(verificationToken.identifier, verificationToken.token)

    return { success: "Confirmation email sent!" }
}
