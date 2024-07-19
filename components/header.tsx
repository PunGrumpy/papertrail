'use client'

import { GitHubLogoIcon } from '@radix-ui/react-icons'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { Models } from 'node-appwrite'
import { useEffect, useState } from 'react'

import { buttonVariants } from '@/components/ui/button'
import { siteConfig } from '@/config/site'
import { getLoggedInUser, getUserAccount } from '@/lib/appwrite/server'
import { cn } from '@/lib/utils'

import { CommandMenu } from './menu/command-menu'
import { DropdownMenuClient } from './menu/dropdown-menu'
import { MainNav } from './nav/main-nav'
import { MobileNav } from './nav/mobile-nav'
import { ThemeToggle } from './theme-toggle'

export function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [account, setAccount] = useState<Models.Document | null>(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const { scrollY } = useScroll()
  const headerOpacity = useTransform(scrollY, [0, 50], [1, 1])

  const fetchUserData = async () => {
    try {
      const user = await getLoggedInUser()
      setIsLoggedIn(!!user)
      if (user) {
        const accountData = await getUserAccount(user.$id)
        setAccount(accountData)
      } else {
        setAccount(null)
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to fetch user data: ${error.message}`)
      }
      setIsLoggedIn(false)
      setAccount(null)
    }
  }

  useEffect(() => {
    fetchUserData()

    const handleLoginEvent = () => {
      fetchUserData()
    }

    window.addEventListener('user-logged-in', handleLoginEvent)

    return () => {
      window.removeEventListener('user-logged-in', handleLoginEvent)
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const headerClasses = cn(
    'sticky top-0 z-50 w-full border-b transition-all duration-200',
    isScrolled
      ? 'border-border/40 backdrop-blur'
      : 'border-transparent bg-transparent'
  )

  return (
    <motion.header
      className={headerClasses}
      style={{
        opacity: headerOpacity,
        backgroundColor: useTransform(
          scrollY,
          [0, 50],
          ['rgba(var(--background), 0)', 'rgba(var(--background), 0.9)']
        )
      }}
    >
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
    </motion.header>
  )
}
