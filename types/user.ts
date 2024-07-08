export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  password: string
  avatar: string | URL
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
  firstName: string
  lastName: string
  email: string
  password: string
  avatar: string | URL
  bio: string
}
