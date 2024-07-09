import { z } from 'zod'

export const SignUpSchema = z.object({
  firstName: z.string().min(2, { message: 'First name is too short' }),
  lastName: z.string().min(2, { message: 'Last name is too short' }),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(8, { message: 'Password is too short' })
})

export const SignInSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(8, { message: 'Password is too short' })
})

export const profileSchema = z.object({
  firstName: z.string().min(2, { message: 'First name is too short' }),
  lastName: z.string().min(2, { message: 'Last name is too short' }),
  email: z.string().email({ message: 'Invalid email address' }),
  bio: z
    .string()
    .max(200, { message: 'Bio is too long' })
    .min(2, { message: 'Bio is too short' })
    .optional()
})
