'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { signinWithEmail } from '@/app/(auth)/sign-in/actions'
import { signupWithEmail } from '@/app/(auth)/sign-up/actions'
import { signUpWithDiscord, signUpWithGithub } from '@/lib/appwrite/oauth'
import { getMessageFromCode } from '@/lib/utils'
import { SignInSchema, SignUpSchema } from '@/lib/validations'
import { NewUser } from '@/types/user'

import { Icons } from '../icons'
import { Button } from '../ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '../ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '../ui/form'
import { Input } from '../ui/input'
import { Separator } from '../ui/separator'

interface AuthFormProps {
  type: 'sign-in' | 'sign-up'
}

interface ButtonProps {
  text?: string
  pending: boolean
}

function getTypeData(type: AuthFormProps['type']) {
  return type === 'sign-in'
    ? {
        formSchema: SignInSchema,
        defaultValues: {
          email: '',
          password: ''
        },
        title: 'Login to your account',
        description: "Welcome back! We're so excited after seeing you again!",
        buttonText: 'Login',
        link: {
          text: "Don't have an account?",
          href: '/sign-up',
          label: 'Sign up'
        }
      }
    : {
        formSchema: SignUpSchema,
        defaultValues: {
          firstName: '',
          lastName: '',
          email: '',
          password: ''
        },
        title: 'Create an account',
        description:
          "Let's get you started! Sign up now and enjoy our services!",
        buttonText: 'Sign up',
        link: {
          text: 'Already have an account?',
          href: '/sign-in',
          label: 'Login'
        }
      }
}

export function AuthForm({ type }: AuthFormProps) {
  const router = useRouter()
  const { formSchema, defaultValues, title, description, buttonText, link } =
    getTypeData(type)

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
      if (type === 'sign-up') {
        formData.append('firstName', (data as NewUser).firstName)
        formData.append('lastName', (data as NewUser).lastName)
      }

      const result = await (type === 'sign-in'
        ? signinWithEmail(formData)
        : signupWithEmail(formData))

      if (result?.type === 'error') {
        toast.error(getMessageFromCode(result.resultCode))
      } else {
        toast.success(getMessageFromCode(result?.resultCode ?? ''))
        router.push('/docs')
        form.reset()
      }
    } catch (error) {
      toast.error('An unexpected error occurred')
    } finally {
      setIsPending(false)
    }
  })

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={onSubmit} className="grid gap-4">
            {type === 'sign-up' && (
              <div className="grid grid-cols-2 gap-4">
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
            <AuthButton pending={isPending} text={buttonText} />
          </form>
          <Separator className="my-6" />
          <div className="grid grid-cols-2 gap-4">
            <GitHubButton pending={isPending} />
            <DiscordButton pending={isPending} />
          </div>
        </Form>
        <div className="mt-4 text-center text-sm text-muted-foreground">
          {link.text}{' '}
          <Link
            href={link.href}
            passHref
            className="hover:text-foreground hover:underline"
          >
            {link.label}
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

function AuthButton({ pending, text }: ButtonProps) {
  return (
    <Button
      className="my-4 flex h-10 w-full text-sm"
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
      className="flex h-10 w-full items-center justify-center text-sm"
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
          <Icons.github className="mr-2 size-4" />
        </>
      )}
    </Button>
  )
}

function DiscordButton({ pending }: ButtonProps) {
  return (
    <Button
      variant="outline"
      className="flex h-10 w-full items-center justify-center text-sm"
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
          <Icons.discord className="mr-2 size-4" />
        </>
      )}
    </Button>
  )
}
