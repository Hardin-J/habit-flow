"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Zap, ArrowLeft, Github, Mail } from "lucide-react"
import Link from "next/link"
import { signIn } from "next-auth/react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { register } from "@/actions/register"
import { toast } from "sonner"

export function LoginUI({
    onGoogleSignIn,
    onGithubSignIn
}: {
    onGoogleSignIn: () => Promise<void>,
    onGithubSignIn: () => Promise<void>
}) {
    const [hoveredProvider, setHoveredProvider] = useState<string | null>(null)
    const [isRegistering, setIsRegistering] = useState(false)

    return (
        <div className="flex min-h-screen w-full">
            {/* Left Side - Animated Branding */}
            <div className="hidden lg:flex w-1/2 bg-black relative overflow-hidden items-center justify-center">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-900/40 via-black to-black" />
                <div className="absolute inset-0 bg-[radial-gradient(#444_1px,transparent_1px)] [background-size:16px_16px] opacity-20" />

                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="relative z-10 flex flex-col items-center text-white space-y-6"
                >
                    <motion.div
                        animate={{
                            boxShadow: ["0 0 20px rgba(249, 115, 22, 0.2)", "0 0 50px rgba(249, 115, 22, 0.5)", "0 0 20px rgba(249, 115, 22, 0.2)"]
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="p-6 rounded-3xl bg-white/5 backdrop-blur-2xl border border-white/10"
                    >
                        <Zap className="h-20 w-20 text-orange-500" />
                    </motion.div>

                    <div className="text-center space-y-2">
                        <h1 className="text-5xl font-bold tracking-tighter">HabitFlow</h1>
                        <p className="text-xl text-gray-400 font-light tracking-wide">Build habits that stick.</p>
                    </div>
                </motion.div>

                {/* Floating Elements */}
                {[...Array(5)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute rounded-full bg-orange-500/10 blur-xl"
                        style={{
                            width: (i + 1) * 50 + 50,
                            height: (i + 1) * 50 + 50,
                            left: `${(i * 20) + 10}%`,
                            top: `${(i * 15) + 10}%`,
                        }}
                        animate={{
                            y: [0, (i % 2 === 0 ? 50 : -50)],
                            x: [0, (i % 2 === 0 ? 50 : -50)],
                            opacity: [0.3, 0.6, 0.3],
                        }}
                        transition={{
                            duration: 10 + i * 2,
                            repeat: Infinity,
                            repeatType: "reverse",
                        }}
                    />
                ))}
            </div>

            {/* Right Side - Login Form */}
            <div className="flex-1 flex flex-col items-center justify-center p-8 bg-background relative">
                <Link href="/" className="absolute top-8 left-8 text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 group">
                    <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                    <span>Back</span>
                </Link>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="w-full max-w-sm space-y-8"
                >
                    <div className="space-y-2 text-center lg:text-left">
                        <h2 className="text-3xl font-bold tracking-tight">Welcome back</h2>
                        <p className="text-muted-foreground">Login to access your dashboard.</p>
                    </div>

                    <div className="space-y-4">
                        {/* Credentials Form */}
                        <form
                            onSubmit={async (e) => {
                                e.preventDefault()
                                if (isRegistering) {
                                    // Handle Register
                                    const formData = new FormData(e.currentTarget)
                                    const res = await register(formData)
                                    if (res.error) {
                                        // Show error
                                        toast.error(res.error)
                                    } else {
                                        // Show success and switch to login or auto-login
                                        toast.success("Account created! Please log in.")
                                        setIsRegistering(false)
                                    }
                                } else {
                                    // Handle Login
                                    const formData = new FormData(e.currentTarget)
                                    const email = formData.get("email")
                                    const password = formData.get("password")

                                    try {
                                        const result = await signIn("credentials", {
                                            email,
                                            password,
                                            redirect: false,
                                        })

                                        if (result?.error) {
                                            toast.error("Invalid credentials")
                                        } else {
                                            toast.success("Logged in successfully!")
                                            window.location.href = "/dashboard"
                                        }
                                    } catch (error) {
                                        toast.error("Something went wrong")
                                    }
                                }
                            }}
                            className="space-y-4"
                        >
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" name="email" type="email" placeholder="m@example.com" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <Input id="password" name="password" type="password" required />
                            </div>
                            {isRegistering && (
                                <div className="space-y-2">
                                    <Label htmlFor="name">Name</Label>
                                    <Input id="name" name="name" type="text" placeholder="John Doe" />
                                </div>
                            )}
                            <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                                {isRegistering ? "Create Account" : "Sign In with Email"}
                            </Button>
                        </form>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-background px-2 text-muted-foreground">
                                    Or continue with
                                </span>
                            </div>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onHoverStart={() => setHoveredProvider('google')}
                            onHoverEnd={() => setHoveredProvider(null)}
                            onClick={() => onGoogleSignIn()}
                            className="w-full relative group overflow-hidden rounded-xl border bg-card p-4 flex items-center justify-center gap-3 transition-colors hover:bg-accent"
                        >
                            <div className={cn(
                                "absolute inset-0 bg-gradient-to-r from-blue-500/10 via-transparent to-transparent opacity-0 transition-opacity duration-500",
                                hoveredProvider === 'google' && "opacity-100"
                            )} />
                            <svg className="h-5 w-5" viewBox="0 0 24 24">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                            </svg>
                            <span className="font-medium">Continue with Google</span>
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onHoverStart={() => setHoveredProvider('github')}
                            onHoverEnd={() => setHoveredProvider(null)}
                            onClick={() => onGithubSignIn()}
                            className="w-full relative group overflow-hidden rounded-xl border bg-card p-4 flex items-center justify-center gap-3 transition-colors hover:bg-accent"
                        >
                            <div className={cn(
                                "absolute inset-0 bg-gradient-to-r from-gray-500/10 via-transparent to-transparent opacity-0 transition-opacity duration-500",
                                hoveredProvider === 'github' && "opacity-100"
                            )} />
                            <Github className="h-5 w-5" />
                            <span className="font-medium">Continue with GitHub</span>
                        </motion.button>
                    </div>

                    <div className="text-center">
                        <button
                            onClick={() => setIsRegistering(!isRegistering)}
                            className="text-sm text-muted-foreground hover:text-primary underline"
                        >
                            {isRegistering ? "Already have an account? Sign in" : "Don't have an account? Sign up"}
                        </button>
                    </div>

                    <p className="text-center text-sm text-muted-foreground">
                        By clicking continue, you agree to our{" "}
                        <Link href="/terms" className="underline hover:text-primary">Terms</Link> and{" "}
                        <Link href="/privacy" className="underline hover:text-primary">Privacy Policy</Link>.
                    </p>
                </motion.div>
            </div>
        </div>
    )
}
