import AuthForm from '@/components/auth-form'

export default async function SignupPage() {
  return (
    <main className="flex flex-col">
      <AuthForm initialType="signup" />
    </main>
  )
}
