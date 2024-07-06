'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { authenticate, GitHubSignIn } from '@/app/login/actions'
import { signup } from '@/app/signup/actions'
import { getMessageFromCode } from '@/lib/utils'

import { Icons } from './icons'
import { Button } from './ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from './ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from './ui/form'
import { Input } from './ui/input'
import { Separator } from './ui/separator'

interface AuthFormProps {
  initialType: 'login' | 'signup'
}

const FormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters long'
  })
})

export default function AuthForm({ initialType }: AuthFormProps) {
  const router = useRouter()
  const [isLogin, setIsLogin] = useState(initialType === 'login')
  const [result, dispatch] = useFormState(
    isLogin ? authenticate : signup,
    undefined
  )

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

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
          <Form {...form}>
            <form action={dispatch} className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="p@example.com" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        placeholder="Password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <AuthButton isLogin={isLogin} />
            </form>
          </Form>
          <Separator />
          <div className="mt-4 flex flex-row gap-2">
            <GitHubButton />
            <GoogleButton />
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
        <Icons.spinner className="size-6 animate-spin" />
      ) : isLogin ? (
        'Log In with Email'
      ) : (
        'Create Account with Email'
      )}
    </Button>
  )
}

function GitHubButton() {
  const { pending } = useFormStatus()

  return (
    <Button
      variant="outline"
      className="flex h-10 w-full text-sm"
      onClick={async () => {
        await GitHubSignIn()
      }}
    >
      {pending ? (
        <Icons.spinner className="size-5 animate-spin" />
      ) : (
        <Icons.github className="size-5" />
      )}
    </Button>
  )
}

function GoogleButton() {
  const { pending } = useFormStatus()

  return (
    <Button
      variant="outline"
      className="flex h-10 w-full text-sm"
      onClick={async () => {
        toast.error('Google Sign In is not implemented yet')
      }}
    >
      {pending ? (
        <Icons.spinner className="size-5 animate-spin" />
      ) : (
        <Icons.google className="size-5" />
      )}
    </Button>
  )
}
