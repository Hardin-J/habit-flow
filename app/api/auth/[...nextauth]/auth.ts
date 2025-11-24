
import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
// import { prisma } from "@/lib/db"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      // 👇 ADD THIS LINE
      allowDangerousEmailAccountLinking: true,
    }),
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
      // 👇 ADD THIS LINE
      allowDangerousEmailAccountLinking: true,
    }),
    // ... email provider
  ],
})
