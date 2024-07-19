import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { getLoggedInUser, getUserAccount } from '@/lib/appwrite/server'

interface AppLayoutProps {
  children: React.ReactNode
}

export default async function AppLayout({ children }: AppLayoutProps) {
  const isLoggedIn = await getLoggedInUser()
  const account = await getUserAccount(isLoggedIn?.$id ?? '')

  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  )
}
