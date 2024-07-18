import { redirect } from 'next/navigation'

import { SettingsNav } from '@/components/nav/settings-nav'
import { Separator } from '@/components/ui/separator'
import { getLoggedInUser } from '@/lib/appwrite/server'

const sidebarNavItems = [
  {
    title: 'General',
    href: '/settings'
  }
]

interface SettingLayoutProps {
  children: React.ReactNode
}

export default async function SettingLayout({ children }: SettingLayoutProps) {
  const isLoggedIn = await getLoggedInUser()

  // if (!isLoggedIn) redirect('/signin')

  return (
    <>
      <div className="container space-y-6 p-10 pb-16 md:block">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">
            Manage your account settings and set e-mail preferences.
          </p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="lg:w-1/5">
            <SettingsNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1 lg:max-w-2xl">{children}</div>
        </div>
      </div>
    </>
  )
}
