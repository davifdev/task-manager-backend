import z from 'zod';

export const createTaskSchema = z.object({
  title: z.string(),
  time: z.enum(['morning', 'afternoon', 'evening']),
  status: z.enum(['pending', 'in_progress', 'completed']),
  description: z.string(),
});

export type CreateSchemaType = z.infer<typeof createTaskSchema>;
