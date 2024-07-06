'use client'

import {
  CircleIcon,
  GitHubLogoIcon,
  LinkedInLogoIcon,
  VercelLogoIcon
} from '@radix-ui/react-icons'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import { toast } from 'sonner'

import { authenticate, GitHubSignIn } from '@/app/login/actions'
import { signup } from '@/app/signup/actions'
import { getMessageFromCode } from '@/lib/utils'

import { Button } from './ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from './ui/card'
import { Label } from './ui/label'
import { Separator } from './ui/separator'

interface AuthFormProps {
  initialType: 'login' | 'signup'
}

export default function AuthForm({ initialType }: AuthFormProps) {
  const router = useRouter()
  const [isLogin, setIsLogin] = useState(initialType === 'login')
  const [result, dispatch] = useFormState(
    isLogin ? authenticate : signup,
    undefined
  )

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

  const toggleForm = () => {
    setIsLogin(!isLogin)
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center space-y-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>
            {isLogin ? 'Log in to Your Account' : 'Register for an Account'}
          </CardTitle>
          <CardDescription>
            Please enter your email address and password
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={dispatch} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="email" className="text-sm text-muted-foreground">
                Email Address
              </Label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="p@example.com"
                required
                className="peer block w-full rounded-md border bg-background p-2 text-sm outline-none"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label
                htmlFor="password"
                className="text-sm text-muted-foreground"
              >
                Password
              </Label>
              <input
                id="password"
                type="password"
                name="password"
                required
                minLength={6}
                className="peer block w-full rounded-md border bg-background p-2 text-sm outline-none"
              />
            </div>
            <AuthButton isLogin={isLogin} />
          </form>
          <Separator />
          <div className="mt-4 flex flex-row gap-2">
            <GitHubButton />
          </div>
        </CardContent>
      </Card>
      <div className="flex flex-row gap-1 text-sm text-muted-foreground">
        {isLogin ? (
          <>
            Don&apos;t have an account?{' '}
            <button
              onClick={toggleForm}
              className="hover:text-foreground hover:underline"
            >
              Sign up
            </button>
          </>
        ) : (
          <>
            Already have an account?{' '}
            <button
              onClick={toggleForm}
              className="hover:text-foreground hover:underline"
            >
              Sign in
            </button>
          </>
        )}
      </div>
    </div>
  )
}

function AuthButton({ isLogin }: { isLogin: boolean }) {
  const { pending } = useFormStatus()

  return (
    <Button className="my-4 flex h-10 w-full text-sm" aria-disabled={pending}>
      {pending ? (
        <CircleIcon className="size-6 animate-spin" />
      ) : isLogin ? (
        'Continue with Email'
      ) : (
        'Create Account with Email'
      )}
    </Button>
  )
}

function GitHubButton() {
  return (
    <Button
      variant="outline"
      className="flex h-10 w-full text-sm"
      onClick={async () => {
        await GitHubSignIn()
      }}
    >
      <GitHubLogoIcon className="size-5" />
    </Button>
  )
}
