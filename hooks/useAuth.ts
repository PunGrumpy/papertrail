import { useEffect, useState } from 'react'

import { getLoggedInUser } from '@/lib/appwrite/server'

const AUTH_CACHE_KEY = 'auth_status'
const AUTH_CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

  useEffect(() => {
    const checkAuth = async () => {
      const cachedAuth = localStorage.getItem(AUTH_CACHE_KEY)
      if (cachedAuth) {
        const { status, timestamp } = JSON.parse(cachedAuth)
        if (Date.now() - timestamp < AUTH_CACHE_DURATION) {
          setIsAuthenticated(status)
          return
        }
      }

      try {
        const user = await getLoggedInUser()
        const status = !!user
        setIsAuthenticated(status)
        localStorage.setItem(
          AUTH_CACHE_KEY,
          JSON.stringify({ status, timestamp: Date.now() })
        )
      } catch (error) {
        console.error('Error checking authentication:', error)
        setIsAuthenticated(false)
        localStorage.removeItem(AUTH_CACHE_KEY)
      }
    }

    checkAuth()
  }, [])

  return isAuthenticated
}
