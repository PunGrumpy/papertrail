import AuthForm from '@/components/auth-form'

export default async function LoginPage() {
  return (
    <main className="flex flex-col">
      <AuthForm initialType="login" />
    </main>
  )
}
