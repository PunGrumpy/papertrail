'use client'

import {
  LoginLink,
  RegisterLink
} from '@kinde-oss/kinde-auth-nextjs/components'
import { CircleIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import { useFormStatus } from 'react-dom'

import { Button } from './ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from './ui/card'
import { Label } from './ui/label'

interface AuthFormProps {
  type: 'login' | 'signup'
}

export default function AuthForm({ type }: AuthFormProps) {
  const isLogin = type === 'login'

  return (
    <div className="flex min-h-screen flex-col items-center justify-center space-y-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>
            {isLogin ? 'Log in to Your Account' : 'Sign up for an Account'}
          </CardTitle>
          <CardDescription>
            {isLogin
              ? 'Please enter your email address and password'
              : 'Please fill in the details to create an account'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-4">
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
            {!isLogin && (
              <>
                <Label
                  htmlFor="username"
                  className="text-sm text-muted-foreground"
                >
                  Username
                </Label>
                <input
                  id="username"
                  type="text"
                  name="username"
                  placeholder="Enter your username"
                  required
                  className="peer block w-full rounded-md border bg-zinc-50 p-2 text-sm outline-none dark:bg-zinc-950"
                />
              </>
            )}
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
            <AuthButton isLogin={isLogin} />
          </form>
        </CardContent>
      </Card>
      <div className="flex flex-row gap-1 text-sm text-muted-foreground">
        {isLogin ? (
          <>
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="underline hover:text-foreground">
              Sign up
            </Link>
          </>
        ) : (
          <>
            Already have an account?{' '}
            <Link href="/login" className="underline hover:text-foreground">
              Log in
            </Link>
          </>
        )}
      </div>
    </div>
  )
}

function AuthButton({ isLogin }: { isLogin: boolean }) {
  const { pending } = useFormStatus()

  return (
    <Button
      className="my-4 flex h-10 w-full items-center justify-center rounded-md p-2 text-sm font-semibold"
      aria-disabled={pending}
    >
      {pending ? (
        <CircleIcon className="size-6 animate-spin" />
      ) : isLogin ? (
        // 'Log in'
        <LoginLink
          type="button"
          authUrlParams={{
            connection_id:
              process.env.NEXT_PUBLIC_KINDE_CONNECTION_EMAIL_PASSWORD || ''
          }}
        >
          Log in
        </LoginLink>
      ) : (
        // 'Sign up'
        <RegisterLink>Sign up</RegisterLink>
      )}
    </Button>
  )
}
