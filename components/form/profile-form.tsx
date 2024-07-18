'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import React, { useCallback } from 'react'
import { ControllerRenderProps, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { profileSchema } from '@/lib/validations'

import { Button as UIButton } from '../ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '../ui/form'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'

const Button = React.memo(UIButton)

type ProfileFormValues = z.infer<typeof profileSchema>

export function ProfileForm({ user }: { user: any }) {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    mode: 'onChange',
    defaultValues: {
      ...user
    }
  })

  const onSubmit = useCallback((data: ProfileFormValues) => {
    toast.success('Profile updated successfully!', {
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      )
    })
  }, [])

  const renderNameField = useCallback(
    ({
      field
    }: {
      field: ControllerRenderProps<ProfileFormValues, 'name'>
    }) => (
      <FormItem>
        <FormLabel>Name</FormLabel>
        <FormControl>
          <Input placeholder="Paper Trail" {...field} />
        </FormControl>
        <FormDescription>
          This is your name. You can only change this once every 30 days.
        </FormDescription>
        <FormMessage />
      </FormItem>
    ),
    []
  )

  const renderEmailField = useCallback(
    ({
      field
    }: {
      field: ControllerRenderProps<ProfileFormValues, 'email'>
    }) => (
      <FormItem>
        <FormLabel>Email</FormLabel>
        <FormControl>
          <Input placeholder="p@example.com" {...field} />
        </FormControl>
        <FormDescription>
          This is your email address. You can only change this once every 30
          days.
        </FormDescription>
        <FormMessage />
      </FormItem>
    ),
    []
  )

  const renderBioField = useCallback(
    ({ field }: { field: ControllerRenderProps<ProfileFormValues, 'bio'> }) => (
      <FormItem>
        <FormLabel>Bio</FormLabel>
        <FormControl>
          <Textarea
            placeholder="Tell us a little bit about yourself"
            className="resize-none"
            {...field}
          />
        </FormControl>
        <FormDescription>
          You can <span>@mention</span> other users and organizations to link to
          them.
        </FormDescription>
        <FormMessage />
      </FormItem>
    ),
    []
  )

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={renderNameField}
        />

        <FormField
          control={form.control}
          name="email"
          render={renderEmailField}
        />

        <FormField control={form.control} name="bio" render={renderBioField} />

        <Button type="submit">Update profile</Button>
      </form>
    </Form>
  )
}
