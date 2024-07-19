'use server'

import { Account, Client, Databases, Query, Users } from 'node-appwrite'

import { getCookie } from '@/app/actions'
import { UpdateUser } from '@/types/user'

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

export async function getUserAccount(accountId: string) {
  try {
    const { database } = await createAdminClient()

    const userAccount = await database.listDocuments(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_USER_COLLECTION_ID!,
      [Query.equal('accountId', [accountId])]
    )

    return userAccount.documents[0]
  } catch (error) {
    return null
  }
}

export async function updateUserAccount(accountId: string, data: UpdateUser) {
  const { database, user } = await createAdminClient()

  try {
    const currentUser = await user.get(accountId)
    if (currentUser.name !== data.name) {
      await user.updateName(accountId, data.name)
    }
    if (currentUser.email !== data.email) {
      await user.updateEmail(accountId, data.email)
    }

    const userAccount = await getUserAccount(accountId)
    if (!userAccount) {
      throw new Error('User account not found in database')
    }

    const updatedDatabaseUser = await database.updateDocument(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_USER_COLLECTION_ID!,
      userAccount.$id,
      {
        name: data.name,
        email: data.email,
        bio: data.bio
      }
    )

    const updatedAppwriteAccount = await user.get(accountId)

    return {
      ...updatedAppwriteAccount,
      ...updatedDatabaseUser
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to update user account ${error.message}`)
    }
    throw new Error('Failed to update user account')
  }
}
