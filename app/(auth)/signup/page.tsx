import { ChevronLeftIcon } from '@radix-ui/react-icons'
import { Metadata } from 'next'
import Link from 'next/link'

import { AuthForm } from '@/components/form/auth-form'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Sign Up',
  description: 'Create an account to access your account',
  robots: 'noindex, nofollow'
}

export default async function SignupPage() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Link
        href="/"
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'absolute left-4 top-4 md:left-8 md:top-8'
        )}
      >
        <ChevronLeftIcon className="mr-2 size-4" />
        Back
      </Link>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Create an account
          </h1>
          <p className="text-sm text-muted-foreground">
            Let&apos;s get you started and enjoy our services!
          </p>
        </div>
        <AuthForm type="signup" />
        <div className="mt-4 text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link
            href="/signin"
            className="hover:text-foreground hover:underline"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  )
}
