import z from 'zod';

export const updateStatusSchema = z.object({
  status: z.enum(['pending', 'in_progress', 'completed']),
});

export type UpdateStatusSchemaType = z.infer<typeof updateStatusSchema>;
