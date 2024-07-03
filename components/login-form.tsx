'use client'

import { CircleIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import { toast } from 'sonner'

import { authenticate } from '@/app/login/actions'
import { getMessageFromCode } from '@/lib/utils'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from './ui/card'
import { Label } from './ui/label'

export default function LoginForm() {
  const router = useRouter()
  const [result, dispatch] = useFormState(authenticate, undefined)

  useEffect(() => {
    if (result) {
      if (result.type === 'error') {
        toast.error(getMessageFromCode(result.resultCode))
      } else {
        toast.success(getMessageFromCode(result.resultCode))
        router.refresh()
      }
    }
  }, [result, router])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center space-y-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Log in to Your Account</CardTitle>
          <CardDescription>
            Please enter your email address and password
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={dispatch} className="flex flex-col gap-4">
            <Label htmlFor="email" className="text-sm text-muted-foreground">
              Email Address
            </Label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email address"
              required
              className="peer block w-full rounded-md border bg-zinc-50 p-2 text-sm outline-none dark:bg-zinc-950"
            />
            <Label htmlFor="password" className="text-sm text-muted-foreground">
              Password
            </Label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Enter your password"
              required
              minLength={6}
              className="peer block w-full rounded-md border bg-zinc-50 p-2 text-sm outline-none dark:bg-zinc-950"
            />
            <LoginButton />
          </form>
        </CardContent>
      </Card>
      <div className="flex flex-row gap-1 text-sm text-muted-foreground">
        Don&apos;t have an account?{' '}
        <Link href="/signup" className="underline hover:text-foreground">
          Sign up
        </Link>
      </div>
    </div>
  )
}

function LoginButton() {
  const { pending } = useFormStatus()

  return (
    <button
      className="my-4 flex h-10 w-full items-center justify-center rounded-md bg-zinc-900 p-2 text-sm font-semibold text-zinc-100 hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
      aria-disabled={pending}
    >
      {pending ? <CircleIcon className="size-6 animate-spin" /> : 'Log in'}
    </button>
  )
}
