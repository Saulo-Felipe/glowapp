import { z } from 'zod'

export const SignUpSchema = z
  .object({
    email: z.email('Digite um email válido'),
    password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
    confirmPassword: z.string().min(6, 'Confirmar senha deve ter pelo menos 6 caracteres'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'], // mostra o erro nesse campo
    message: 'As senhas não coincidem',
  })

export type SignUpSchemaType = z.infer<typeof SignUpSchema>
