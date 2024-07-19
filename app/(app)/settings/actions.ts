import { getLoggedInUser, updateUserAccount } from '@/lib/appwrite/server'
import { UpdateUser } from '@/types/user'

export async function updateProfile(data: UpdateUser) {
  try {
    const currentUser = await getLoggedInUser()
    if (!currentUser) {
      throw new Error('User not authenticated')
    }

    const updatedUser = await updateUserAccount(currentUser.$id, data)
    if (!updatedUser) {
      throw new Error('Failed to update user profile')
    }

    return { success: true, user: updatedUser }
  } catch (error) {
    console.error('Error updating profile:', error)
    return { success: false, error: 'Failed to update profile' }
  }
}
