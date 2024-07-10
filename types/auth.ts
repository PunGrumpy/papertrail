export interface AuthResult {
  type: string
  message: string
}

export interface Result {
  type: string
  message: string | Error | null | undefined
}
