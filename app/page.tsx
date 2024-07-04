import { GitHubLogoIcon } from '@radix-ui/react-icons'
import Image from 'next/image'
import Link from 'next/link'

import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading
} from '@/components/page-header'
import { buttonVariants } from '@/components/ui/button'
import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'

export default async function Page() {
  return (
    <div className="container relative">
      <PageHeader>
        <PageHeaderHeading>
          A Collection of APIs for Personal Projects
        </PageHeaderHeading>
        <PageHeaderDescription>
          APIs for personal projects, open-source initiatives, and more.
          Papertrail powers cv.pungrumpy.com and other projects.
        </PageHeaderDescription>
        <PageActions>
          <Link href="/docs" className={cn(buttonVariants())}>
            Get Started
          </Link>
          <Link
            href={siteConfig.links.github}
            target="_blank"
            rel="noreferrer"
            className={cn(buttonVariants({ variant: 'outline' }))}
          >
            <GitHubLogoIcon className="size-4" />
            GitHub
          </Link>
        </PageActions>
      </PageHeader>
    </div>
  )
}
