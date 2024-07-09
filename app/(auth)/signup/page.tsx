import { AuthForm } from '@/components/form/auth-form'

export default async function SignupPage() {
  return (
    <div className="flex flex-1 items-center justify-center">
      <AuthForm type="signup" />
    </div>
  )
}
