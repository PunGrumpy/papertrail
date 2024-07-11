import { Footer } from '@/components/footer'
import { Header } from '@/components/header'

interface AppLayoutProps {
  children: React.ReactNode
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <>
      <div className="flex h-screen flex-col">
        <Header />
        <main className="flex flex-1 items-center justify-center">
          {children}
        </main>
        <Footer />
      </div>
    </>
  )
}
