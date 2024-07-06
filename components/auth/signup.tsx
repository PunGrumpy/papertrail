'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useFormState } from 'react-dom'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { signup } from '@/app/signup/actions'
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
  NameFields,
  PasswordField
} from './form'

type FormValues = z.infer<ReturnType<typeof FormSchema>>

export default function SignUpForm() {
  const router = useRouter()
  const [result, dispatch] = useFormState(signup, undefined)

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema(false)),
    defaultValues: {
      email: '',
      password: '',
      givenName: '',
      familyName: ''
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
    formData.append('givenName', data.givenName || '')
    formData.append('familyName', data.familyName || '')
    dispatch(formData)
  })

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">Register for an Account</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={onSubmit} className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <NameFields control={form.control} />
            </div>
            <EmailField control={form.control} />
            <PasswordField control={form.control} />
            <AuthButton isLogin={false} />
          </form>
        </Form>
        <Separator />
        <div className="mt-4 flex flex-row gap-2">
          <GitHubButton />
          <GoogleButton />
        </div>
        <div className="mt-4 text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link href="/login" className="hover:text-foreground hover:underline">
            Log in here
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
