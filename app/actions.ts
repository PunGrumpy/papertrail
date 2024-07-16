'use server'

import { cookies } from 'next/headers'

interface CookieOptions {
  name: string
  value?: string
  path?: string
  httpOnly?: boolean
  sameSite?: 'strict' | 'lax' | 'none'
  secure?: boolean
  maxAge?: number
  parse?: boolean
}

const defaultOptions: Partial<CookieOptions> = {
  path: '/',
  httpOnly: true,
  sameSite: 'strict',
  secure: process.env.NODE_ENV === 'production',
  maxAge: 60 * 60 * 24 * 7 // 1 week
}

function getCookieStore() {
  return cookies()
}

export async function setCookie(options: CookieOptions): Promise<void> {
  const cookieStore = getCookieStore()
  const mergedOptions = { ...defaultOptions, ...options }

  cookieStore.set(mergedOptions.name, mergedOptions.value ?? '', {
    path: mergedOptions.path,
    httpOnly: mergedOptions.httpOnly,
    sameSite: mergedOptions.sameSite,
    secure: mergedOptions.secure,
    maxAge: mergedOptions.maxAge
  })
}

export async function getCookie(
  name: string
): Promise<CookieOptions | undefined> {
  try {
    const cookieStore = getCookieStore()
    const cookie = cookieStore.get(name)

    if (!cookie) return undefined

    return { name: cookie.name, value: cookie.value }
  } catch (error) {
    console.error(`Error retrieving cookie ${name}:`, error)
    return undefined
  }
}

export async function deleteCookie(name: string): Promise<void> {
  const cookieStore = getCookieStore()
  cookieStore.delete(name)
}

export async function onScroll(): Promise<boolean> {
  // check if the user has scrolled
  if (typeof window === 'undefined') return false
  return window.scrollY > 0
}
