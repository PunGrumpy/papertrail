'use client'

import { ExitIcon } from '@radix-ui/react-icons'
import { Models } from 'node-appwrite'
import { toast } from 'sonner'

import { signout } from '@/app/(auth)/signout/actions'

import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from '../ui/dropdown-menu'

interface DropdownMenuClientProps {
  session: Models.User<Models.Preferences> | null
}

export function DropdownMenuClient({ session }: DropdownMenuClientProps) {
  const user = session

  const name = user?.name ?? 'User'
  const email = user?.email ?? 'user@example.com'
  const avatar = 'https://avatar.tobi.sh/' + name

  const avatarFallback = name.charAt(0)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar title="User avatar" className="size-8 cursor-pointer">
          <AvatarImage src={avatar} alt={name} />
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
            await signout()
            toast.success('You have been signed out, see you soon!')
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
