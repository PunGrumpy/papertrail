'use server'

import { ID } from 'node-appwrite'

import { createAdminClient } from '@/lib/appwrite/server'
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

  const { account, database } = await createAdminClient()
  const newAccount = await account.create(
    ID.unique(),
    userData.email,
    userData.password,
    `${userData.firstName} ${userData.lastName}`
  )

  if (!newAccount.$id) {
    return {
      type: 'error',
      message: 'User not created, please try again later'
    }
  }

  await database.createDocument(
    process.env.APPWRITE_DATABASE_ID!,
    process.env.APPWRITE_USER_COLLECTION_ID!,
    ID.unique(),
    {
      accountId: newAccount.$id,
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      avatar: new URL(
        `https://api.dicebear.com/9.x/adventurer-neutral/png?seed=${newAccount.name}`
      )
    }
  )

  return {
    type: 'success',
    message: 'User created successfully, welcome!'
  }
}

export async function signupWithEmail(data: FormData): Promise<Result> {
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
      if (result.type === 'success') {
        await signinWithEmail(data)
      }
      return result
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
