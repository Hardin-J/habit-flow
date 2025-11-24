'use client'

import { useState } from "react"
import { updateHabitReminder } from "@/actions/habit-actions"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Clock, Edit2 } from "lucide-react"
import { toast } from "sonner"

interface EditReminderDialogProps {
    habitId: string
    currentReminder?: string | null
    children?: React.ReactNode
}

export function EditReminderDialog({ habitId, currentReminder, children }: EditReminderDialogProps) {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [time, setTime] = useState(currentReminder || "")

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setLoading(true)
        try {
            await updateHabitReminder(habitId, time)
            toast.success("Reminder updated!")
            setOpen(false)
        } catch (error) {
            toast.error("Failed to update reminder.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children || (
                    <div className="flex items-center gap-1 text-xs text-muted-foreground bg-gray-100 dark:bg-zinc-800 px-2 py-0.5 rounded-full border group cursor-pointer hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors"
                        title="Edit Reminder"
                    >
                        <Clock className="w-3 h-3" />
                        <span>{currentReminder || "Set"}</span>
                        <Edit2 className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Reminder Time</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="reminder-edit" className="flex items-center gap-2">
                            <Clock className="w-4 h-4" /> Daily Reminder
                        </Label>
                        <Input
                            id="reminder-edit"
                            name="reminderTime"
                            type="time"
                            className="w-full"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                        />
                        <p className="text-xs text-muted-foreground">Leave empty to disable reminder.</p>
                    </div>

                    <DialogFooter>
                        <Button type="submit" disabled={loading}>
                            {loading ? "Saving..." : "Save Changes"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
