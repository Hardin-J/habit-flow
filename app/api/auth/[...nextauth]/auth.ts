
import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/db"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import { compare } from "bcryptjs"


export const { auth, handlers, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(prisma),
    session: { strategy: "jwt" },
    debug: true, // Enable NextAuth debugging
    callbacks: {
        async signIn({ user, account, profile }) {
            console.log("👉 [SignIn] User:", user.email, "Account:", account?.provider);
            return true;
        },
        async session({ session, token }) {
            console.log("👉 [Session] Token:", token);
            if (session.user && token.sub) {
                session.user.id = token.sub;
            }
            return session;
        },
        async jwt({ token, user, account }) {
            if (account && user) {
                console.log("👉 [JWT] Initial sign in");
            }
            return token;
        }
    },
    providers: [
        Google({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,
            allowDangerousEmailAccountLinking: true,
        }),
        GitHub({
            clientId: process.env.AUTH_GITHUB_ID,
            clientSecret: process.env.AUTH_GITHUB_SECRET,
            allowDangerousEmailAccountLinking: true,
        }),
        Credentials({
            async authorize(credentials) {
                const email = credentials?.email as string
                const password = credentials?.password as string

                if (!email || !password) return null

                const user = await prisma.user.findUnique({ where: { email } })
                if (!user || !user.password) return null

                const passwordsMatch = await compare(password, user.password)
                if (!passwordsMatch) return null

                return user
            }
        })
    ],
})
