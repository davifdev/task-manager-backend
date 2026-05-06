import z from 'zod';

export const updateStatusSchema = z.object({
  status: z.string(),
});

export type UpdateStatusSchemaType = z.infer<typeof updateStatusSchema>;
