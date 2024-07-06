import { useFormStatus } from 'react-dom'
import { toast } from 'sonner'

import { GitHubSignIn } from '@/app/login/actions'

import { Icons } from '../icons'
import { Button } from '../ui/button'

interface ButtonProps {
  isLogin?: boolean
  isDisable?: boolean
}

export function AuthButton({ isLogin, isDisable }: ButtonProps) {
  const { pending } = useFormStatus()

  return (
    <Button
      className="my-4 flex h-10 w-full text-sm"
      aria-disabled={pending}
      disabled={isDisable}
    >
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

export function GitHubButton({ isDisable }: ButtonProps) {
  const { pending } = useFormStatus()

  return (
    <Button
      variant="outline"
      className="flex h-10 w-full text-sm"
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

export function GoogleButton({ isDisable }: ButtonProps) {
  const { pending } = useFormStatus()

  return (
    <Button
      variant="outline"
      className="flex h-10 w-full text-sm"
      onClick={async () => {
        toast.error('Google Sign In is not implemented yet')
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
