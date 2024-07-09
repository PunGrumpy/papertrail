'use server'

import { redirect } from 'next/navigation'

import { deleteCookie } from '@/app/actions'
import { createSessionClient } from '@/lib/appwrite/server'
import { SESSION_COOKIE } from '@/lib/const'

export async function signout() {
  const { account } = await createSessionClient()
  await deleteCookie(SESSION_COOKIE)
  await account.deleteSession('current')

  redirect('/signin')
}
