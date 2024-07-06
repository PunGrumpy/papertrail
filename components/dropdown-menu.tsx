'use client'

import { ExitIcon } from '@radix-ui/react-icons'
import { Session } from 'next-auth'
import { signOut } from 'next-auth/react'

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

interface DropdownMenuClientProps {
  session: Session
}

export function DropdownMenuClient({ session }: DropdownMenuClientProps) {
  const user = session?.user

  const name = user?.name ?? 'User'
  const email = user?.email ?? 'user@example.com'
  const image = user?.image ?? 'user-avatar'

  const avatarFallback = name.charAt(0)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar title="User avatar" className="size-8 cursor-pointer">
          <AvatarImage src={image} alt={name} />
          <AvatarFallback>{avatarFallback}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" sideOffset={8}>
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <span className="text-base">{name}</span>
            <span className="text-sm font-light text-muted-foreground">
              {email}
            </span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={async () => {
            await signOut()
          }}
          className="cursor-pointer"
        >
          Sign out
          <DropdownMenuShortcut>
            <ExitIcon className="size-4" />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
