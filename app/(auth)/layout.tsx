import { redirect } from 'next/navigation'

import { getLoggedInUser } from '@/lib/appwrite/server'

interface AuthLayoutProps {
  children: React.ReactNode
}

export default async function AuthLayout({ children }: AuthLayoutProps) {
  const isLoggedIn = await getLoggedInUser()
  if (isLoggedIn) redirect('/docs')

  return <div className="min-h-screen">{children}</div>
}
