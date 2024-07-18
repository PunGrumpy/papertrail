'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { profileSchema } from '@/lib/validations'

import { Button } from '../ui/button'
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

type ProfileFormValues = z.infer<typeof profileSchema>

export function ProfileForm({ user }: { user: any }) {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    mode: 'onChange',
    defaultValues: {
      ...user,
      bio: user.bio ?? ''
    }
  })

  const onSubmit = (data: ProfileFormValues) => {
    const submissionData = {
      ...data,
      bio: data.bio === '' ? null : data.bio
    }
    toast.success('Profile updated successfully!', {
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">
            {JSON.stringify(submissionData, null, 2)}
          </code>
        </pre>
      )
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormItem>
          <FormLabel>Avatar</FormLabel>
          <FormControl>
            <div className="flex items-center space-x-4">
              <Image
                src={user.avatar}
                alt="User avatar"
                className="size-16 rounded-full"
                width={64}
                height={64}
              />
              <Button variant="ghost" disabled>
                Change avatar
              </Button>
            </div>
          </FormControl>
          <FormDescription>
            This is your avatar. You can only change this once every 30 days.
          </FormDescription>
          <FormMessage />
        </FormItem>

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
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
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="p@example.com" {...field} />
              </FormControl>
              <FormDescription>
                This is your email address. You can only change this once every
                30 days.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about yourself"
                  className="resize-none"
                  {...field}
                  value={field.value ?? ''}
                  onChange={e => {
                    const value = e.target.value
                    field.onChange(value === '' ? null : value)
                  }}
                />
              </FormControl>
              <FormDescription>
                You can <span>@mention</span> other users and organizations to
                link to them.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Update profile</Button>
      </form>
    </Form>
  )
}
