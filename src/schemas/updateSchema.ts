import z from 'zod';

export const updateTaskSchema = z.object({
  title: z.string(),
  time: z.enum(['morning', 'afternoon', 'evening']),
  status: z.enum(['pending', 'in_progress', 'completed']),
  description: z.string(),
});

export type UpdateSchemaType = z.infer<typeof updateTaskSchema>;
