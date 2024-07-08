import { ResultCode } from '@/lib/utils'

export interface AuthResult {
  type: string
  message: string
}

export interface Result {
  type: string
  resultCode: ResultCode
}
