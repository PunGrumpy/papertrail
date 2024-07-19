import { NextRequest, NextResponse } from 'next/server'
import { ID } from 'node-appwrite'

import {
  createAdminClient,
  getLoggedInUser,
  getUserAccount
} from '@/lib/appwrite/server'
import { SESSION_COOKIE } from '@/lib/const'

import { setCookie } from '../../actions'

export async function GET(request: NextRequest) {
  try {
    const userId = request.nextUrl.searchParams.get('userId')
    const secret = request.nextUrl.searchParams.get('secret')

    if (!userId || !secret) {
      return NextResponse.json(
        { error: 'Missing userId or secret' },
        { status: 400 }
      )
    }

    const { account, database } = await createAdminClient()

    const session = await account.createSession(userId, secret)

    if (!session?.secret) {
      return NextResponse.json(
        { error: 'Failed to create session' },
        { status: 500 }
      )
    }

    setCookie({
      name: SESSION_COOKIE,
      value: session.secret
    })

    try {
      const user = await getLoggedInUser()

      const existingAccount = await getUserAccount(session.userId)
      if (!existingAccount) {
        await database.createDocument(
          process.env.APPWRITE_DATABASE_ID!,
          process.env.APPWRITE_USER_COLLECTION_ID!,
          ID.unique(),
          {
            accountId: userId,
            name: user?.name,
            email: user?.email,
            avatar: new URL(
              `https://api.dicebear.com/9.x/adventurer-neutral/png?seed=${user?.name}`
            )
          }
        )
      }
    } catch (error) {
      console.error('Error saving user account:', error)
    }

    return NextResponse.redirect(`${request.nextUrl.origin}`)
  } catch (error) {
    console.error('Error in OAuth callback:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
