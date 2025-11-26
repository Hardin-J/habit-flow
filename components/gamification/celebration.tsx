"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Trophy, X } from "lucide-react"
import { useEffect, useState } from "react"

interface CelebrationProps {
    badge: string | null
    onClose: () => void
}

export function Celebration({ badge, onClose }: CelebrationProps) {
    if (!badge) return null

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.5, y: 100 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.5, y: 100 }}
                    className="relative w-full max-w-sm rounded-3xl bg-card p-8 text-center shadow-2xl border-2 border-orange-500/50"
                    onClick={(e) => e.stopPropagation()}
                >
                    <button
                        onClick={onClose}
                        className="absolute right-4 top-4 text-muted-foreground hover:text-foreground"
                    >
                        <X className="h-5 w-5" />
                    </button>

                    <motion.div
                        animate={{
                            rotate: [0, -10, 10, -10, 10, 0],
                            scale: [1, 1.1, 1.1, 1.1, 1.1, 1]
                        }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-900/30"
                    >
                        <Trophy className="h-12 w-12 text-orange-500" />
                    </motion.div>

                    <h2 className="mb-2 text-2xl font-bold text-foreground">Goal Reached!</h2>
                    <p className="mb-6 text-muted-foreground">
                        Congratulations! You've unlocked the <span className="font-bold text-orange-500">"{badge}"</span> badge.
                    </p>

                    <div className="flex justify-center gap-2">
                        {[...Array(5)].map((_, i) => (
                            <motion.div
                                key={i}
                                initial={{ y: 0, opacity: 1 }}
                                animate={{ y: -100, x: (i - 2) * 30, opacity: 0 }}
                                transition={{ duration: 1, delay: 0.5 + i * 0.1, repeat: Infinity, repeatDelay: 2 }}
                                className="h-2 w-2 rounded-full bg-orange-500"
                            />
                        ))}
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    )
}
