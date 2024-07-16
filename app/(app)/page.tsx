import Link from 'next/link'

import { Announcement } from '@/components/announcement'
import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading
} from '@/components/page-header'
import { buttonVariants } from '@/components/ui/button'
import GradualSpacing from '@/components/ui/gradual-spacing'
import ShinyButton from '@/components/ui/shiny-button'
import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'

export default async function Page() {
  return (
    <div className="container relative">
      <PageHeader>
        <Announcement />
        <PageHeaderHeading>
          <GradualSpacing
            text="A Collection of Personal Projects"
            className="hidden -tracking-widest md:block"
          />
          <span className="md:hidden">A Collection of Personal Projects</span>
        </PageHeaderHeading>
        <PageHeaderDescription>
          A collection of personal projects that I&apos;ve built over the years.
          These projects range from open-source libraries to full-blown
          applications.
        </PageHeaderDescription>
        <PageActions>
          <Link href="/docs" className={cn(buttonVariants())}>
            Get Started
          </Link>
          <Link href={siteConfig.links.github} target="_blank" rel="noreferrer">
            <ShinyButton text="GitHub" />
          </Link>
        </PageActions>
      </PageHeader>
    </div>
  )
}
