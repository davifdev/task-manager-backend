import z from 'zod';

export const refreshTokenSchema = z.object({
  refreshToken: z.string().min(1),
});

export type RefreshTokenSchemaType = z.infer<typeof refreshTokenSchema>;
