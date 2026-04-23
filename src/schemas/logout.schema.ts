import z from 'zod';

export const logoutSchema = z.object({
  token: z.string().min(1),
});

export type LogoutSchemaType = z.infer<typeof logoutSchema>;
