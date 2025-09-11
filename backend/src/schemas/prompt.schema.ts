import { z } from "zod";

export const CreatePromptSchema = z.object({
  userId: z.number().int().positive(),
  categoryId: z.number().int().positive(),
  subcategoryId: z.number().int().positive(),
  prompt: z.string().min(5).max(2000),
});

export type CreatePromptInput = z.infer<typeof CreatePromptSchema>;
