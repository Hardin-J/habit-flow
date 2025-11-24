"use client"

import { useState, useEffect, useRef } from "react"
import { Play, Pause, RotateCcw, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

type FocusTimerProps = {
    habitTitle: string
}

export function FocusTimer({ habitTitle }: FocusTimerProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [timeLeft, setTimeLeft] = useState(25 * 60) // 25 minutes in seconds
    const [isActive, setIsActive] = useState(false)
    const timerRef = useRef<NodeJS.Timeout | null>(null)

    useEffect(() => {
        if (isActive && timeLeft > 0) {
            timerRef.current = setInterval(() => {
                setTimeLeft((prev) => prev - 1)
            }, 1000)
        } else if (timeLeft === 0) {
            // Timer finished
            setIsActive(false)
            if (timerRef.current) clearInterval(timerRef.current)
            // Play sound
            const audio = new Audio("https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3")
            audio.play().catch(() => { })
        }

        return () => {
            if (timerRef.current) clearInterval(timerRef.current)
        }
    }, [isActive, timeLeft])

    const toggleTimer = () => setIsActive(!isActive)

    const resetTimer = () => {
        setIsActive(false)
        setTimeLeft(25 * 60)
    }

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
    }

    // Fullscreen & Visibility Logic
    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.hidden && isActive) {
                setIsActive(false)
                toast.warning("Focus lost! Timer paused.", {
                    description: "Get back to work! 😤"
                })
            }
        }

        document.addEventListener("visibilitychange", handleVisibilityChange)

        if (isActive) {
            // Enter Fullscreen
            document.documentElement.requestFullscreen().catch((e) => {
                console.error("Failed to enter fullscreen:", e)
            })
        } else {
            // Exit Fullscreen if not active (and we are in fullscreen)
            if (document.fullscreenElement) {
                document.exitFullscreen().catch((e) => {
                    console.error("Failed to exit fullscreen:", e)
                })
            }
        }

        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange)
        }
    }, [isActive])

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (document.fullscreenElement) {
                document.exitFullscreen().catch(() => { })
            }
        }
    }, [])

    return (
        <Dialog open={isOpen} onOpenChange={(open) => {
            if (!open) {
                // Ensure we exit fullscreen if dialog closes
                if (document.fullscreenElement) document.exitFullscreen().catch(() => { })
            }
            setIsOpen(open)
        }}>
            <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-indigo-500 hover:bg-indigo-50">
                    <Play className="w-4 h-4" />
                </Button>
            </DialogTrigger>
            <DialogContent
                className="h-screen w-screen max-w-none rounded-none border-none bg-black p-0 flex items-center justify-center focus:ring-0 outline-none"
                onInteractOutside={(e) => e.preventDefault()}
                onEscapeKeyDown={(e) => e.preventDefault()}
            >
                <div className="flex flex-col items-center gap-12 animate-in fade-in zoom-in duration-500">
                    <DialogHeader className="space-y-4">
                        <DialogTitle className="text-3xl font-light tracking-wide text-center text-white/80">
                            Focusing on <span className="font-bold text-white">{habitTitle}</span>
                        </DialogTitle>
                    </DialogHeader>

                    {/* Timer Display */}
                    <div className={cn(
                        "text-9xl font-mono font-bold tracking-tighter tabular-nums transition-all duration-300",
                        isActive ? "text-white scale-110 drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]" : "text-white/30"
                    )}>
                        {formatTime(timeLeft)}
                    </div>

                    {/* Controls */}
                    <div className="flex items-center gap-8">
                        <Button
                            size="lg"
                            className={cn(
                                "h-20 w-48 text-xl rounded-full transition-all duration-300 shadow-lg hover:shadow-white/20 hover:scale-105 border-2",
                                isActive
                                    ? "bg-transparent border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-white"
                                    : "bg-white text-black border-white hover:bg-gray-200"
                            )}
                            onClick={toggleTimer}
                        >
                            {isActive ? (
                                <>
                                    <Pause className="mr-3 h-8 w-8" /> Pause
                                </>
                            ) : (
                                <>
                                    <Play className="mr-3 h-8 w-8" /> Start
                                </>
                            )}
                        </Button>

                        <Button
                            variant="outline"
                            size="icon"
                            className="h-20 w-20 rounded-full border-2 border-white/20 bg-transparent text-white/50 hover:text-white hover:border-white hover:bg-white/10 transition-all"
                            onClick={() => {
                                resetTimer()
                                setIsOpen(false)
                            }}
                        >
                            <X className="h-8 w-8" />
                        </Button>

                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-16 w-16 rounded-full text-white/30 hover:text-white hover:bg-white/10"
                            onClick={resetTimer}
                        >
                            <RotateCcw className="h-6 w-6" />
                        </Button>
                    </div>

                    <p className="text-lg text-white/50 animate-pulse">
                        {isActive ? "Don't break the flow." : "Ready to enter the zone?"}
                    </p>
                </div>
            </DialogContent>
        </Dialog>
    )
}
