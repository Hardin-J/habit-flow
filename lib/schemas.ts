// import { z } from "zod";

// export const habitSchema = z.object({
//   title: z.string().min(1, "Title is required").max(50, "Title is too long"),
//   description: z.string().optional(),
//   frequency: z.enum(["daily", "weekly"]).default("daily"),
// });

// export type HabitFormValues = z.infer<typeof habitSchema>;

import { z } from "zod";

export const habitSchema = z.object({
  title: z.string().min(1).max(50),
  description: z.string().optional(),
  frequency: z.enum(["daily", "weekly"]).default("daily"),
  reminderTime: z.string().optional(), // New field
});