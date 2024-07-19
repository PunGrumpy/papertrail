'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { updateProfile } from '@/app/actions'
import { profileSchema } from '@/lib/validations'
import { UpdateUser } from '@/types/user'

import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
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

  const onSubmit = async (data: ProfileFormValues) => {
    const updateData: UpdateUser = {
      name: data.name,
      email: data.email,
      bio: data.bio === '' ? null : data.bio
    }

    const result = await updateProfile(updateData)

    if (result.success) {
      toast.success('Profile updated successfully!')
    } else {
      toast.error('Failed to update profile', {
        description: result.error
      })
    }
  }

  const handleChangeAvatar = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    toast.error('This feature is not available yet.')
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card className="shadow-none">
          <CardHeader>
            <CardTitle>Avatar</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <Avatar
                title="User avatar"
                className="size-20 border [border:0_-20px_80px_-20px_#ffffff1f_inset] [box-shadow:1px_solid_rgba(255,255,255,.1)]"
              >
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>
                  {user.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleChangeAvatar}
                >
                  Change avatar
                </Button>
                <FormDescription className="text-sm">
                  Click on the avatar to upload a custom one from your files.
                  <br />
                  You can only change this once every 30 days.
                </FormDescription>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your Name" {...field} />
                </FormControl>
                <FormDescription>
                  You can only change this once every 30 days.
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
                  <Input placeholder="your@email.com" {...field} />
                </FormControl>
                <FormDescription>
                  You can only change this once every 30 days.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

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

        <Button type="submit" className="w-full md:w-auto">
          Update profile
        </Button>
      </form>
    </Form>
  )
}
