import { HabitCard } from "./habit-card"

type HabitListProps = {
  initialHabits: any[] // We use any here to avoid complex Prisma typing issues for the demo
}

export function HabitList({ initialHabits }: HabitListProps) {
  return (
    <div className="space-y-4">
      {initialHabits.map((habit) => (
        <HabitCard key={habit.id} habit={habit} />
      ))}
    </div>
  )
}