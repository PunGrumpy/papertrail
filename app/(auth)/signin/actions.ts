'use server'

import { setCookie } from '@/app/actions'
import { createAdminClient } from '@/lib/appwrite/server'
import { SESSION_COOKIE } from '@/lib/const'
import { SignInSchema } from '@/lib/validations'
import { Result } from '@/types/auth'
import { LoginUser } from '@/types/user'

export async function signinWithEmail(data: FormData): Promise<Result> {
  const userData: LoginUser = {
    email: data.get('email') as string,
    password: data.get('password') as string
  }

  const parsedCredentials = SignInSchema.safeParse(userData)

  if (parsedCredentials.success) {
    try {
      const { account } = await createAdminClient()
      const session = await account.createEmailPasswordSession(
        userData.email,
        userData.password
      )

      setCookie({
        name: SESSION_COOKIE,
        value: session.secret
      })

      return {
        type: 'success',
        message: 'User logged in successfully, take a look around!'
      }
    } catch (error) {
      if (error instanceof Error) {
        return {
          type: 'error',
          message: error.message
        }
      }
    }
  }

  return {
    type: 'error',
    message: 'Invalid credentials, please try again'
  }
}
