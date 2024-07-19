'use server'

import { getLoggedInUser, updateUserAccount } from '@/lib/appwrite/server'
import { UpdateUser } from '@/types/user'

export async function updateProfile(data: UpdateUser) {
  try {
    const currentUser = await getLoggedInUser()
    if (!currentUser) {
      return { success: false, error: 'User not authenticated' }
    }

    const updatedUser = await updateUserAccount(currentUser.$id, data)
    return { success: true, user: updatedUser }
  } catch (error) {
    console.error('Error updating profile:', error)
    if (error instanceof Error) {
      return {
        success: false,
        error: `Failed to update profile ${error.message}`
      }
    }
    return {
      success: false,
      error: 'Failed to update profile. Please try again later.'
    }
  }
}
