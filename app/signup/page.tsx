import AuthForm from '@/components/auth/auth'

export default async function SignupPage() {
  return (
    <main className="flex flex-col">
      <AuthForm initialType="signup" />
    </main>
  )
}
