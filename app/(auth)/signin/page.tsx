import { AuthForm } from '@/components/form/auth-form'

export default async function SigninPage() {
  return (
    <div className="flex flex-1 items-center justify-center">
      <AuthForm type="signin" />
    </div>
  )
}
