'use client'

import { useState } from "react"
import { createHabit } from "@/actions/habit-actions"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Clock } from "lucide-react"
import { toast } from "sonner" // Import toast

export function AddHabitForm() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    try {
      await createHabit(formData)
      toast.success("Habit created successfully!") // Success notification
      setOpen(false)
    } catch (error) {
      toast.error("Failed to create habit.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Habit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create a new habit</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Add a new habit to track your daily progress.
        </DialogDescription>
        <form action={handleSubmit} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Habit Name</Label>
            <Input id="name" name="name" placeholder="e.g. Read 30 mins" required />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Input id="description" name="description" placeholder="e.g. Atomic Habits" />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="goal">Goal (Target Completions)</Label>
            <Input
              id="goal"
              name="goal"
              type="number"
              min="1"
              placeholder="e.g. 30"
            />
            <p className="text-xs text-muted-foreground">Set a target number of completions to earn a badge.</p>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="reminder" className="flex items-center gap-2">
              <Clock className="w-4 h-4" /> Daily Reminder Time
            </Label>
            <Input
              id="reminder"
              name="reminderTime"
              type="time" // HTML5 Time Picker
              className="w-full"
            />
          </div>

          <DialogFooter>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save Habit"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}