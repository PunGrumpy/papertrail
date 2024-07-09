'use server'

import { ID } from 'node-appwrite'

import { createAdminClient } from '@/lib/appwrite/server'
import { ResultCode } from '@/lib/utils'
import { SignUpSchema } from '@/lib/validations'
import { Result } from '@/types/auth'
import { NewUser } from '@/types/user'

import { signinWithEmail } from '../signin/actions'

export async function createUser(data: FormData): Promise<Result> {
  const userData: NewUser = {
    firstName: data.get('firstName') as string,
    lastName: data.get('lastName') as string,
    email: data.get('email') as string,
    password: data.get('password') as string
  }

  const { account } = await createAdminClient()
  await account.create(
    ID.unique(),
    userData.email,
    userData.password,
    `${userData.firstName} ${userData.lastName}`
  )

  return {
    type: 'success',
    resultCode: ResultCode.UserCreated
  }
}

export async function signupWithEmail(data: FormData) {
  const userData: NewUser = {
    firstName: data.get('firstName') as string,
    lastName: data.get('lastName') as string,
    email: data.get('email') as string,
    password: data.get('password') as string
  }

  const parsedCredentials = SignUpSchema.safeParse(userData)

  if (parsedCredentials.success) {
    try {
      const result = await createUser(data)
      if (result.resultCode === ResultCode.UserCreated) {
        await signinWithEmail(data)
      }
      return result
    } catch (error) {
      return {
        type: 'error',
        resultCode: ResultCode.UnknownError
      }
    }
  }
}
