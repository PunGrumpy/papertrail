'use client'

import { GitHubLogoIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import { Models } from 'node-appwrite'
import { useEffect, useState } from 'react'

import { buttonVariants } from '@/components/ui/button'
import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'

import { CommandMenu } from './menu/command-menu'
import { DropdownMenuClient } from './menu/dropdown-menu'
import { MainNav } from './nav/main-nav'
import { MobileNav } from './nav/mobile-nav'
import { ThemeToggle } from './theme-toggle'

interface HeaderProps {
  isLoggedIn: any
  account: Models.Document | null
}

export function Header({ isLoggedIn, account }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const headerClasses = cn(
    'sticky top-0 z-50 w-full border-b transition-all duration-200',
    isScrolled
      ? 'border-border/40 bg-background'
      : 'border-transparent bg-transparent'
  )

  return (
    <header className={headerClasses}>
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
                      href="/signin"
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
                  <DropdownMenuClient session={account} />
                </>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}
