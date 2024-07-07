import AuthForm from '@/components/form/auth-form'

export default async function SignupPage() {
  return (
    <main className="flex h-screen w-full items-center justify-center">
      <AuthForm type="sign-up" />
    </main>
  )
}
