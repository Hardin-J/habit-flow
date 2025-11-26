import { z } from "zod";

export const habitSchema = z.object({
    name: z.string().min(1).max(50),
    description: z.string().optional(),
    frequency: z.enum(["daily", "weekly"]).default("daily"),
    reminderTime: z.string().optional(),
    goal: z.number().min(1).optional(), // New field
  });