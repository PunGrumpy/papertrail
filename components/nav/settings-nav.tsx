'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'
import { SettingsNavItem } from '@/types/nav'

import { buttonVariants } from '../ui/button'
import { ScrollArea, ScrollBar } from '../ui/scroll-area'

export function SettingsNav({ className, items, ...props }: SettingsNavItem) {
  const pathname = usePathname()

  return (
    <ScrollArea>
      <div
        className={cn(
          'flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1',
          className
        )}
        {...props}
      >
        {items.map(item => (
          <Link
            key={item.href}
            href={item.href || '/'}
            className={cn(
              buttonVariants({ variant: 'ghost' }),
              pathname === item.href
                ? 'bg-muted hover:bg-muted/50'
                : 'hover:bg-muted/50',
              'justify-start'
            )}
          >
            {item.title}
          </Link>
        ))}
      </div>
      <ScrollBar orientation="horizontal" className="invisible" />
    </ScrollArea>
  )
}
