'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useFormState } from 'react-dom'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { authenticate } from '@/app/login/actions'
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

interface AuthFormProps {
  initialType: 'login' | 'signup'
}

type FormValues = z.infer<ReturnType<typeof FormSchema>>

export default function AuthForm({ initialType }: AuthFormProps) {
  const router = useRouter()
  const [isLogin, setIsLogin] = useState(initialType === 'login')
  const [result, dispatch] = useFormState(
    isLogin ? authenticate : signup,
    undefined
  )

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema(isLogin)),
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

  const toggleForm = () => {
    setIsLogin(!isLogin)
    form.reset({
      email: '',
      password: '',
      givenName: '',
      familyName: ''
    })
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
              <EmailField control={form.control} />
              <PasswordField control={form.control} />
              {!isLogin && <NameFields control={form.control} />}
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
