'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { updateProfile } from '@/app/(app)/settings/actions'
import { profileSchema } from '@/lib/validations'
import { UpdateUser } from '@/types/user'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '../ui/alert-dialog'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '../ui/card'
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
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

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

  const handleDeleteAccount = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setIsDeleteDialogOpen(false)
    toast.error('This feature is not available yet.')
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Avatar</CardTitle>
            <CardDescription>
              An avatar is optional but strongly recommended.
            </CardDescription>
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

        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>
              Update your profile information here.
            </CardDescription>
          </CardHeader>
          <CardContent>
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
                      You can <span>@mention</span> other users and
                      organizations to link to them.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6 border-destructive">
          <CardHeader>
            <CardTitle>Dangerous Zone</CardTitle>
            <CardDescription className="">
              Actions in this zone can have severe consequences.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm text-muted-foreground">
              Once you delete your account, there is no going back. Please be
              certain.
            </p>
            <AlertDialog
              open={isDeleteDialogOpen}
              onOpenChange={setIsDeleteDialogOpen}
            >
              <AlertDialogTrigger asChild>
                <Button
                  variant="destructive"
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90 dark:bg-red-900 dark:text-red-100 dark:hover:bg-red-900/90"
                >
                  Delete Account
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="border-destructive">
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDeleteAccount}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90 dark:bg-red-900 dark:text-red-100 dark:hover:bg-red-900/90"
                  >
                    Delete Account
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardContent>
        </Card>

        <Button type="submit" className="w-full md:w-auto">
          Update profile
        </Button>
      </form>
    </Form>
  )
}
