import { ChevronRightIcon } from '@radix-ui/react-icons'
import { redirect } from 'next/navigation'

import { getLoggedInUser } from '@/lib/appwrite/server'

export default async function Docs() {
  const isLoggedIn = await getLoggedInUser()

  if (!isLoggedIn) redirect('/signin')

  return (
    <main className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
      <div className="mx-auto w-full min-w-0">
        <div className="mb-4 flex items-center space-x-1 text-sm text-muted-foreground">
          <div className="truncate">Docs</div>
          <ChevronRightIcon className="size-4" />
          <div className="font-medium text-foreground">Introduction</div>
        </div>
      </div>
    </main>
  )
}
