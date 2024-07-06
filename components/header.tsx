import { GitHubLogoIcon } from '@radix-ui/react-icons'
import Link from 'next/link'

import { auth } from '@/auth'
import { Button, buttonVariants } from '@/components/ui/button'
import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'

import { CommandMenu } from './command-menu'
import { DropdownMenuClient } from './dropdown-menu'
import { MainNav } from './main-nav'
import { MobileNav } from './mobile-nav'
import { ThemeToggle } from './theme-toggle'

export async function Header() {
  const session = await auth()

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
              {!session ? (
                <>
                  <div className="hidden md:flex">
                    <Link
                      href="/login"
                      className={cn(buttonVariants({ variant: 'outline' }))}
                    >
                      Log in
                    </Link>
                  </div>
                  <Link href="/signup" className={cn(buttonVariants())}>
                    Sign up
                  </Link>
                </>
              ) : (
                <>
                  <DropdownMenuClient session={session} />
                </>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}
