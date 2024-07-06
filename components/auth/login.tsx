'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useFormState } from 'react-dom'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { authenticate } from '@/app/login/actions'
import { getMessageFromCode } from '@/lib/utils'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '../ui/card'
import { Form } from '../ui/form'
import { Separator } from '../ui/separator'
import { FormSchema } from './actions'
import {
  AuthButton,
  EmailField,
  GitHubButton,
  GoogleButton,
  PasswordField
} from './form'

type FormValues = z.infer<ReturnType<typeof FormSchema>>

export default function LoginForm() {
  const router = useRouter()
  const [result, dispatch] = useFormState(authenticate, undefined)

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema(true)),
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

  const onSubmit = form.handleSubmit(data => {
    const formData = new FormData()
    formData.append('email', data.email)
    formData.append('password', data.password)
    dispatch(formData)
  })

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">Log in to Your Account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={onSubmit} className="flex flex-col gap-4">
            <EmailField control={form.control} />
            <PasswordField control={form.control} forgotPassword />
            <AuthButton isLogin={true} />
          </form>
        </Form>
        <Separator />
        <div className="mt-4 flex flex-row gap-2">
          <GitHubButton />
          <GoogleButton />
        </div>
        <div className="mt-4 text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{' '}
          <Link
            href="/signup"
            className="hover:text-foreground hover:underline"
          >
            Sign up here
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
