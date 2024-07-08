'use server'

import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { OAuthProvider } from 'node-appwrite'

import { createAdminClient } from './server'

type SupportedOAuthProvider = OAuthProvider.Github | OAuthProvider.Discord

async function signUpWithOAuth(provider: SupportedOAuthProvider) {
  const { account } = await createAdminClient()

  const origin = headers().get('origin')

  if (!origin) {
    throw new Error('Origin header is missing')
  }

  const redirectUrl = await account.createOAuth2Token(
    provider,
    `${origin}/oauth`,
    `${origin}/signup`
  )

  return redirect(redirectUrl)
}

export async function signUpWithGithub() {
  return signUpWithOAuth(OAuthProvider.Github)
}

export async function signUpWithDiscord() {
  return signUpWithOAuth(OAuthProvider.Discord)
}
