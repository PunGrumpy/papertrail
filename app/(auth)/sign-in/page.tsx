import AuthForm from '@/components/form/auth-form'

export default async function SigninPage() {
  return (
    <main className="flex h-screen w-full items-center justify-center">
      <AuthForm type="sign-in" />
    </main>
  )
}
