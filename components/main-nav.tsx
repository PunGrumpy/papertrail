'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'
import * as React from 'react'

import { cn } from '@/lib/utils'

export function MainNav() {
  const pathname = usePathname()
  const { theme, systemTheme } = useTheme()
  const currentTheme = theme === 'system' ? systemTheme || 'light' : theme

  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <Image
          src={currentTheme === 'dark' ? '/logo-dark.png' : '/logo-light.png'}
          alt="Papertrail"
          width={128}
          height={128}
        />
      </Link>
      <nav className="flex items-center gap-4 text-sm lg:gap-6">
        <Link
          href="/docs"
          className={cn(
            'transition-colors hover:text-foreground/80',
            pathname === '/docs' ? 'text-foreground' : 'text-foreground/60'
          )}
        >
          Docs
        </Link>
      </nav>
    </div>
  )
}
