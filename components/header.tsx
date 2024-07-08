import { GitHubLogoIcon } from '@radix-ui/react-icons'
import Link from 'next/link'

import { buttonVariants } from '@/components/ui/button'
import { siteConfig } from '@/config/site'
import { getLoggedInUser } from '@/lib/appwrite/server'
import { cn } from '@/lib/utils'

import { CommandMenu } from './menu/command-menu'
import { DropdownMenuClient } from './menu/dropdown-menu'
import { MainNav } from './nav/main-nav'
import { MobileNav } from './nav/mobile-nav'
import { ThemeToggle } from './theme-toggle'

export async function Header() {
  const isLoggedIn = await getLoggedInUser()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <MainNav />
        <MobileNav />
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <CommandMenu />
          </div>
          <nav className="flex items-center space-x-2">
            <div className="items-center md:flex">
              <Link
                href={siteConfig.links.github}
                target="_blank"
                rel="noreferrer"
              >
                <div
                  className={cn(
                    buttonVariants({
                      variant: 'ghost'
                    }),
                    'w-9 px-0'
                  )}
                >
                  <GitHubLogoIcon className="size-5" />
                  <span className="sr-only">GitHub</span>
                </div>
              </Link>
              <ThemeToggle />
            </div>
            <div className="flex items-center space-x-2">
              {!isLoggedIn ? (
                <>
                  <div className="hidden md:flex">
                    <Link
                      href="/sign-in"
                      className={cn(buttonVariants({ variant: 'outline' }))}
                    >
                      Log in
                    </Link>
                  </div>
                  <Link href="/sign-up" className={cn(buttonVariants())}>
                    Sign up
                  </Link>
                </>
              ) : (
                <>
                  <DropdownMenuClient session={isLoggedIn} />
                </>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}
