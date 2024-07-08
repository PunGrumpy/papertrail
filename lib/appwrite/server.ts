'use server'

import { cookies } from 'next/headers'
import { Account, Client } from 'node-appwrite'

export async function createSessionClient() {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!)

  const session = cookies().get('appwrite-session')
  if (!session || !session.value) {
    throw new Error('No session found')
  }

  client.setSession(session.value)

  return {
    get account() {
      return new Account(client)
    }
  }
}

export async function createAdminClient() {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!)
    .setKey(process.env.APPWRITE_API_KEY!)

  return {
    get account() {
      return new Account(client)
    }
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
