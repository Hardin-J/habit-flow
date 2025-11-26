"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"

interface Particle {
    id: number
    x: number
    y: number
}

export function MouseFollower() {
    const pathname = usePathname()
    const [particles, setParticles] = useState<Particle[]>([])

    // Only show on landing page ("/") and auth pages
    const isAllowed = pathname === "/" || pathname?.startsWith("/login") || pathname?.startsWith("/auth")

    useEffect(() => {
        if (!isAllowed) return

        const handleMouseMove = (e: MouseEvent) => {
            const newParticle = {
                id: Date.now() + Math.random(),
                x: e.clientX,
                y: e.clientY,
            }

            setParticles((prev) => [...prev.slice(-20), newParticle])
        }

        window.addEventListener("mousemove", handleMouseMove)
        return () => window.removeEventListener("mousemove", handleMouseMove)
    }, [])

    useEffect(() => {
    }, [isAllowed]) // Added isAllowed to dependency array to re-run effect if it changes

    useEffect(() => {
        if (!isAllowed) return // Also add early return here to prevent interval from running unnecessarily

        const interval = setInterval(() => {
            setParticles((prev) => prev.filter((p) => Date.now() - p.id < 1000))
        }, 100)
        return () => clearInterval(interval)
    }, [isAllowed]) // Added isAllowed to dependency array

    if (!isAllowed) return null

    return (
        <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
            <AnimatePresence>
                {particles.map((particle) => (
                    <motion.div
                        key={particle.id}
                        initial={{ opacity: 1, scale: 0.5, x: particle.x, y: particle.y }}
                        animate={{
                            opacity: 0,
                            scale: 0,
                            x: particle.x + (Math.random() - 0.5) * 50,
                            y: particle.y + (Math.random() - 0.5) * 50,
                        }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="absolute h-2 w-2 rounded-full bg-orange-500 blur-[1px]"
                    />
                ))}
            </AnimatePresence>
        </div>
    )
}
