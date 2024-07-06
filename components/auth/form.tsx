import { Control } from 'react-hook-form'

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '../ui/form'
import { Input } from '../ui/input'

interface FieldProps {
  control: Control<{
    email: string
    password: string
    givenName?: string
    familyName?: string
  }>
}

export function EmailField({ control }: FieldProps) {
  return (
    <FormField
      control={control}
      name="email"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Email Address</FormLabel>
          <FormControl>
            <Input {...field} placeholder="p@example.com" />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export function PasswordField({ control }: FieldProps) {
  return (
    <FormField
      control={control}
      name="password"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Password</FormLabel>
          <FormControl>
            <Input {...field} type="password" placeholder="Password" />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export function NameFields({ control }: FieldProps) {
  return (
    <>
      <FormField
        control={control}
        name="givenName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>First Name</FormLabel>
            <FormControl>
              <Input {...field} placeholder="John" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="familyName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Last Name</FormLabel>
            <FormControl>
              <Input {...field} placeholder="Doe" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  )
}

export { AuthButton, GitHubButton, GoogleButton } from './button'
