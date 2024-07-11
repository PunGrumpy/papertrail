'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { signinWithEmail } from '@/app/(auth)/signin/actions'
import { signupWithEmail } from '@/app/(auth)/signup/actions'
import { signUpWithDiscord, signUpWithGithub } from '@/lib/appwrite/oauth'
import { SignInSchema, SignUpSchema } from '@/lib/validations'
import { NewUser } from '@/types/user'

import { Icons } from '../icons'
import { Button } from '../ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '../ui/form'
import { Input } from '../ui/input'

interface AuthFormProps {
  type: 'signin' | 'signup'
}

interface ButtonProps {
  text?: string
  pending: boolean
}

function getTypeData(type: AuthFormProps['type']) {
  return type === 'signin'
    ? {
        formSchema: SignInSchema,
        defaultValues: {
          email: '',
          password: ''
        },
        buttonText: 'Login'
      }
    : {
        formSchema: SignUpSchema,
        defaultValues: {
          firstName: '',
          lastName: '',
          email: '',
          password: ''
        },
        buttonText: 'Sign up'
      }
}

export function AuthForm({ type }: AuthFormProps) {
  const router = useRouter()
  const { formSchema, defaultValues, buttonText } = getTypeData(type)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues
  })

  const [isPending, setIsPending] = useState(false)

  const onSubmit = form.handleSubmit(async data => {
    setIsPending(true)
    try {
      const formData = new FormData()
      formData.append('email', data.email)
      formData.append('password', data.password)
      if (type === 'signup') {
        formData.append('firstName', (data as NewUser).firstName)
        formData.append('lastName', (data as NewUser).lastName)
      }

      const result = await (type === 'signin'
        ? signinWithEmail(formData)
        : signupWithEmail(formData))

      if (result?.type === 'error') {
        toast.error(String(result.message))
      } else {
        toast.success(String(result.message))
        router.push('/docs')
        form.reset()
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      }
    } finally {
      setIsPending(false)
    }
  })

  return (
    <div className="grid gap-6">
      <Form {...form}>
        <form onSubmit={onSubmit}>
          <div className="grid gap-2">
            <div className="grid gap-1">
              {type === 'signup' && (
                <div className="grid grid-cols-2 gap-1">
                  <FormField
                    name="firstName"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Paper"
                            type="text"
                            autoCapitalize="words"
                            autoComplete="given-name"
                            autoCorrect="off"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="lastName"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Trail"
                            type="text"
                            autoCapitalize="words"
                            autoComplete="family-name"
                            autoCorrect="off"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="p@example.com"
                        type="email"
                        autoCapitalize="none"
                        autoComplete="email"
                        autoCorrect="off"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        autoComplete="current-password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <AuthButton pending={isPending} text={buttonText} />
          </div>
        </form>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <GitHubButton pending={isPending} />
          <DiscordButton pending={isPending} />
        </div>
      </Form>
    </div>
  )
}

function AuthButton({ pending, text }: ButtonProps) {
  return (
    <Button
      className="flex h-10 w-full text-sm"
      aria-disabled={pending}
      disabled={pending}
    >
      {pending ? <Icons.spinner className="size-6 animate-spin" /> : text}
    </Button>
  )
}

function GitHubButton({ pending }: ButtonProps) {
  return (
    <Button
      variant="outline"
      className="flex h-10 w-full items-center justify-center"
      aria-disabled={pending}
      disabled={pending}
      onClick={async () => {
        await signUpWithGithub()
      }}
    >
      {pending ? (
        <Icons.spinner className="size-6 animate-spin" />
      ) : (
        <>
          <Icons.github className="size-4" />
        </>
      )}
    </Button>
  )
}

function DiscordButton({ pending }: ButtonProps) {
  return (
    <Button
      variant="outline"
      className="flex h-10 w-full items-center justify-center"
      aria-disabled={pending}
      disabled={pending}
      onClick={async () => {
        await signUpWithDiscord()
      }}
    >
      {pending ? (
        <Icons.spinner className="size-6 animate-spin" />
      ) : (
        <>
          <Icons.discord className="size-4" />
        </>
      )}
    </Button>
  )
}
