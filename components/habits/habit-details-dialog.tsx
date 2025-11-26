"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { updateHabit } from "@/actions/habit-actions"
import { toast } from "sonner"
import { Pencil, Save, X } from "lucide-react"

interface HabitDetailsDialogProps {
    habit: {
        id: string
        name: string
        description?: string | null
        goal?: number | null
        reminderTime?: string | null
    }
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function HabitDetailsDialog({ habit, open, onOpenChange }: HabitDetailsDialogProps) {
    const [isEditing, setIsEditing] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    async function handleSubmit(formData: FormData) {
        setIsLoading(true)
        try {
            const result = await updateHabit(habit.id, formData)
            if (result?.message) {
                toast.info(result.message) // "Streak reset due to goal change"
            } else {
                toast.success("Habit updated successfully")
            }
            setIsEditing(false)
            onOpenChange(false)
        } catch (error) {
            toast.error("Failed to update habit")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{isEditing ? "Edit Habit" : habit.name}</DialogTitle>
                    {!isEditing && habit.description && (
                        <DialogDescription>{habit.description}</DialogDescription>
                    )}
                </DialogHeader>

                {isEditing ? (
                    <form action={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" name="name" defaultValue={habit.name} required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea id="description" name="description" defaultValue={habit.description || ""} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="goal">Goal (Target Completions)</Label>
                            <Input
                                id="goal"
                                name="goal"
                                type="number"
                                defaultValue={habit.goal || ""}
                                placeholder="e.g. 30"
                            />
                            <p className="text-xs text-red-500">Warning: Changing the goal will reset your streak.</p>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="reminderTime">Reminder Time</Label>
                            <Input
                                id="reminderTime"
                                name="reminderTime"
                                type="time"
                                defaultValue={habit.reminderTime || ""}
                            />
                        </div>
                        <DialogFooter className="gap-2">
                            <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
                                Cancel
                            </Button>
                            <Button type="submit" disabled={isLoading}>
                                {isLoading ? "Saving..." : "Save Changes"}
                            </Button>
                        </DialogFooter>
                    </form>
                ) : (
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <span className="font-semibold text-muted-foreground">Goal:</span>
                                <p>{habit.goal ? `${habit.goal} completions` : "No goal set"}</p>
                            </div>
                            <div>
                                <span className="font-semibold text-muted-foreground">Reminder:</span>
                                <p>{habit.reminderTime || "No reminder set"}</p>
                            </div>
                        </div>

                        <Button className="w-full" onClick={() => setIsEditing(true)}>
                            <Pencil className="w-4 h-4 mr-2" />
                            Edit Habit
                        </Button>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    )
}
