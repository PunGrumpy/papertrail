import { ProfileForm } from '@/components/form/profile-form'
import { Separator } from '@/components/ui/separator'
import { getLoggedInUser, getUserAccount } from '@/lib/appwrite/server'

export default async function SettingPage() {
  const isLoggedIn = await getLoggedInUser()
  const account = await getUserAccount(isLoggedIn?.$id || '')

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Profile</h3>
        <p className="text-sm text-muted-foreground">
          This is how others will see you on the site.
        </p>
      </div>
      <Separator />
      <ProfileForm user={account} />
    </div>
  )
}
