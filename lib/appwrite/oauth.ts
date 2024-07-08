'use server'

import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { OAuthProvider } from 'node-appwrite'

import { createAdminClient } from './server'

export async function signUpWithGithub() {
  const { account } = await createAdminClient()

  const origin = headers().get('origin')

  const redirectUrl = await account.createOAuth2Token(
    OAuthProvider.Github,
    `${origin}/oauth`,
    `${origin}/signup`
  )

  return redirect(redirectUrl)
}
