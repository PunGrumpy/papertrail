import {
  LoginLink,
  LogoutLink,
  RegisterLink
} from '@kinde-oss/kinde-auth-nextjs/components'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { ExitIcon, GitHubLogoIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import * as React from 'react'

import { Button, buttonVariants } from '@/components/ui/button'
import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'

import { CommandMenu } from './command-menu'
import { MainNav } from './main-nav'
import { MobileNav } from './mobile-nav'
import { ThemeToggle } from './theme-toggle'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from './ui/dropdown-menu'

export async function Header() {
  const session = getKindeServerSession()
  const isAuthenticated = await session.isAuthenticated()
  const user = await session.getUser()

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
            <div className="hidden items-center md:flex">
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
            {!isAuthenticated ? (
              <div className="flex items-center space-x-2">
                <Button title="Log in" variant="outline">
                  <LoginLink>Log in</LoginLink>
                </Button>
                <Button title="Sign up" variant="default">
                  <RegisterLink>Sign up</RegisterLink>
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Avatar
                      title="User profile"
                      className="size-8 cursor-pointer"
                    >
                      <AvatarImage
                        src={user?.picture || 'https://github.com/shadcn.png'}
                        alt={user?.id}
                      />
                      <AvatarFallback>
                        {`${user?.given_name?.[0] || ''}${user?.family_name?.[0] || ''}`}
                      </AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="w-56"
                    align="end"
                    sideOffset={8}
                  >
                    <DropdownMenuLabel>
                      <div className="flex flex-col space-y-1">
                        <span className="text-base">
                          {user?.given_name} {user?.family_name}
                        </span>
                        <span className="text-sm font-light text-muted-foreground">
                          {user?.email}
                        </span>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <LogoutLink className="flex w-full items-center space-x-2">
                        Log out
                        <DropdownMenuShortcut>
                          <ExitIcon className="size-4" />
                        </DropdownMenuShortcut>
                      </LogoutLink>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}
