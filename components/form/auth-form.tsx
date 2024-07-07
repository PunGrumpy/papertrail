'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { authenticate, GitHubSignIn } from '@/app/(auth)/sign-in/actions'
import { signup } from '@/app/(auth)/sign-up/actions'
import { getMessageFromCode } from '@/lib/utils'

import { Icons } from '../icons'
import { Button } from '../ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '../ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form'
import { Input } from '../ui/input'
import { Separator } from '../ui/separator'

interface AuthFormProps {
  type: 'sign-in' | 'sign-up'
}

interface ButtonProps {
  text?: string
  isDisable?: boolean
}

function authFormSchema(type: AuthFormProps['type']) {
  const isSignin = type === 'sign-in'

  return z.object({
    email: z.string().email(),
    password: z.string().min(6, {
      message: 'Password must be at least 6 characters long'
    }),
    givenName: isSignin
      ? z.string().optional()
      : z.string().min(1, {
          message: 'First name is required'
        }),
    familyName: isSignin
      ? z.string().optional()
      : z.string().min(1, {
          message: 'Last name is required'
        })
  })
}

function getTypeData(type: AuthFormProps['type']) {
  return type === 'sign-in'
    ? {
        formSchema: authFormSchema(type),
        defaultValues: {
          email: '',
          password: ''
        },
        title: 'Sign in to your account',
        description: "Welcome back! We're so excited to see you again!",
        buttonText: 'Sign In',
        link: {
          text: "Don't have an account?",
          href: '/sign-up',
          linkText: 'Register here'
        }
      }
    : {
        formSchema: authFormSchema(type),
        defaultValues: {
          email: '',
          password: '',
          givenName: '',
          familyName: ''
        },
        title: 'Register for an Account',
        description: "Let's get you all set up! Enter your details below",
        buttonText: 'Sign Up',
        link: {
          text: 'Already have an account?',
          href: '/sign-in',
          linkText: 'Log in here'
        }
      }
}

export default function AuthForm({ type }: AuthFormProps) {
  const router = useRouter()
  const [result, dispatch] = useFormState(
    type === 'sign-in' ? authenticate : signup,
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

  const { formSchema, defaultValues, title, description, buttonText, link } =
    getTypeData(type)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues
  })

  const onSubmit = form.handleSubmit(async data => {
    try {
      if (type === 'sign-in') {
        const formData = new FormData()
        formData.append('email', data.email)
        formData.append('password', data.password)
        dispatch(formData)
      }

      if (type === 'sign-up') {
        const formData = new FormData()
        formData.append('email', data.email)
        formData.append('password', data.password)
        formData.append('givenName', data.givenName || '')
        formData.append('familyName', data.familyName || '')
        dispatch(formData)
      }
    } catch (error) {
      if (result) {
        toast.error(getMessageFromCode(result.resultCode))
      }
    }
  })

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={onSubmit} className="grid gap-4">
            {type === 'sign-up' && (
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  name="givenName"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="text"
                          name="First Name"
                          placeholder="Peter"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  name="familyName"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="text"
                          name="Last Name"
                          placeholder="Parker"
                        />
                      </FormControl>
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
                      type="email"
                      name="Email"
                      placeholder="p@example.com"
                    />
                  </FormControl>
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
                    <Input {...field} type="password" name="Password" />
                  </FormControl>
                </FormItem>
              )}
            />
            <AuthButton
              text={buttonText}
              isDisable={form.formState.isSubmitting}
            />
          </form>
        </Form>
        <Separator />
        <div className="mt-4 flex flex-row gap-2">
          <GitHubButton isDisable={form.formState.isSubmitting} />
          <GoogleButton isDisable={form.formState.isSubmitting} />
        </div>
        <div className="mt-4 text-center text-sm text-muted-foreground">
          {link.text}{' '}
          <Link
            href={link.href}
            className="hover:text-foreground hover:underline"
          >
            {link.linkText}
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

function AuthButton({ text, isDisable }: ButtonProps) {
  const { pending } = useFormStatus()

  return (
    <Button
      className="my-4 flex h-10 w-full text-sm"
      aria-disabled={pending}
      disabled={isDisable}
    >
      {pending ? <Icons.spinner className="size-6 animate-spin" /> : text}
    </Button>
  )
}

function GitHubButton({ isDisable }: ButtonProps) {
  const { pending } = useFormStatus()

  return (
    <Button
      variant="outline"
      className="flex h-10 w-full text-sm"
      aria-disabled={pending}
      onClick={async () => {
        await GitHubSignIn()
      }}
      disabled={isDisable}
    >
      {pending ? (
        <Icons.spinner className="size-5 animate-spin" />
      ) : (
        <Icons.github className="size-5" />
      )}
    </Button>
  )
}

function GoogleButton({ isDisable }: ButtonProps) {
  const { pending } = useFormStatus()

  return (
    <Button
      variant="outline"
      className="flex h-10 w-full text-sm"
      aria-disabled={pending}
      onClick={async () => {
        // await GoogleSignIn()
        toast.error('Google Sign In is not yet implemented')
      }}
      disabled={isDisable}
    >
      {pending ? (
        <Icons.spinner className="size-5 animate-spin" />
      ) : (
        <Icons.google className="size-5" />
      )}
    </Button>
  )
}
