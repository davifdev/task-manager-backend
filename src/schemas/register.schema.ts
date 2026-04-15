import { z } from 'zod';

export const registerSchema = z.object({
  username: z.string().min(1, 'Nome do usuário é obrigatório'),
  email: z.email().min(1, 'Email do usuário é obrigatório'),
  password: z.string().min(3, 'A senha deve ter no mínimo 3 caracteres'),
});

export type RegisterSchema = z.infer<typeof registerSchema>;
