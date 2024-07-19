export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  password: string
  avatar: string
  bio: string
}

export interface NewUser {
  firstName: string
  lastName: string
  email: string
  password: string
}

export interface LoginUser {
  email: string
  password: string
}

export interface UpdateUser {
  name: string
  email: string
  // password: string
  // avatar: string
  bio?: string | null
}
