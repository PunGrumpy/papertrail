import { redirect } from 'next/navigation'

import { auth } from '@/auth'
import SignupForm from '@/components/signup-form'
import { Session } from '@/types/user'

export default async function SignupPage() {
  const session = (await auth()) as Session

  if (session) {
    redirect('/docs')
  }

  return (
    <main className="flex flex-col p-4">
      <SignupForm />
    </main>
  )
}
