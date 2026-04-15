import { z } from 'zod';

export const loginSchema = z.object({
  email: z.email('Email inválido').min(1, 'Email do usuário é obrigatório'),
  password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;
