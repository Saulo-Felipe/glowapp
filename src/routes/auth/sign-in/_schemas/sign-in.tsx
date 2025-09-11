import { z } from 'zod'

export const SignInSchema = z.object({
  email: z.email('Digite um email válido'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
})

export type SignInSchemaType = z.infer<typeof SignInSchema>
