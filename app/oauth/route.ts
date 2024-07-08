import { NextRequest, NextResponse } from 'next/server'

import { createAdminClient } from '@/lib/appwrite/server'
import { SESSION_COOKIE } from '@/lib/const'

import { setCookie } from '../actions'

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

    const { account } = await createAdminClient()

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

    return NextResponse.redirect(new URL('/', request.url))
  } catch (error) {
    console.error('Error in OAuth callback:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
