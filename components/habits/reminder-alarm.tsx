'use client'

import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Bell, Clock } from "lucide-react"

interface ReminderAlarmProps {
    habitTitle: string
    isOpen: boolean
    onDismiss: () => void
    onSnooze: () => void
}

export function ReminderAlarm({ habitTitle, isOpen, onDismiss, onSnooze }: ReminderAlarmProps) {
    const [timeLeft, setTimeLeft] = useState(30)

    useEffect(() => {
        if (!isOpen) {
            setTimeLeft(30)
            return
        }

        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer)
                    onSnooze() // Auto-snooze
                    return 0
                }
                return prev - 1
            })
        }, 1000)

        return () => clearInterval(timer)
    }, [isOpen, onSnooze])

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onDismiss()}>
            <DialogContent className="sm:max-w-md border-orange-500 border-2">
                <DialogHeader>
                    <div className="mx-auto bg-orange-100 p-3 rounded-full w-fit mb-2 animate-bounce">
                        <Bell className="w-8 h-8 text-orange-600" />
                    </div>
                    <DialogTitle className="text-center text-2xl">Time for {habitTitle}!</DialogTitle>
                    <DialogDescription className="text-center">
                        Your reminder is ringing. Auto-snooze in {timeLeft}s.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex justify-center py-4">
                    <div className="text-4xl font-bold text-orange-600 tabular-nums">
                        00:{timeLeft.toString().padStart(2, '0')}
                    </div>
                </div>

                <DialogFooter className="sm:justify-center gap-2">
                    <Button variant="outline" onClick={onSnooze} className="gap-2">
                        <Clock className="w-4 h-4" />
                        Snooze (10m)
                    </Button>
                    <Button onClick={onDismiss} className="bg-green-600 hover:bg-green-700">
                        I'm doing it now!
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
