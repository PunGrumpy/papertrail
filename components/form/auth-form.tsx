'use client'

import { getLoggedInUser } from '@/lib/appwrite/server'

interface AuthFormProps {
  type: 'sign-in' | 'sign-up'
}

export async function AuthForm({ type }: AuthFormProps) {
  const isLoggedIn = await getLoggedInUser()

  return <div>{type} form</div>
}
