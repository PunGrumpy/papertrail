'use server'

import { Account, Client, Databases, Users } from 'node-appwrite'

import { getCookie } from '@/app/actions'

import { SESSION_COOKIE } from '../const'

function createClient() {
  return new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!)
}

export async function createSessionClient() {
  const session = await getCookie(SESSION_COOKIE)
  if (!session || !session.value) {
    throw new Error('No session found')
  }

  const client = createClient().setSession(session.value)

  return {
    account: new Account(client)
  }
}

export async function createAdminClient() {
  const client = createClient().setKey(process.env.NEXT_APPWRITE_KEY!)

  return {
    account: new Account(client),
    database: new Databases(client),
    user: new Users(client)
  }
}

export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient()
    return await account.get()
  } catch (error) {
    return null
  }
}

export async function getUserAccount(userId: string) {
  try {
    const { user } = await createAdminClient()

    const userAccount = await user.get(userId)

    return userAccount
  } catch (error) {
    return null
  }
}
