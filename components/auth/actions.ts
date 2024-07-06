import { z } from 'zod'

export const FormSchema = (isLogin: boolean) =>
  z.object({
    email: z.string().email(),
    password: z.string().min(6, {
      message: 'Password must be at least 6 characters long'
    }),
    givenName: isLogin ? z.string().optional() : z.string().min(1),
    familyName: isLogin ? z.string().optional() : z.string().min(1)
  })
