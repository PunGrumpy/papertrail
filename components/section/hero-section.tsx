'use client'

import Link from 'next/link'

import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'

import { Announcement } from '../announcement'
import { buttonVariants } from '../ui/button'
import ShinyButton from '../ui/shiny-button'

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative mx-auto mt-32 max-w-7xl px-6 text-center md:px-8"
    >
      <div className="animate-fade-in inline-flex h-6 items-center opacity-0 backdrop-blur transition-all ease-in">
        <Announcement />
      </div>
      <h1 className="animate-fade-in -translate-y-4 text-balance bg-gradient-to-br from-primary from-30% to-primary/40 bg-clip-text py-6 text-5xl font-medium leading-none tracking-tighter text-transparent opacity-0 [--animation-delay:200ms] sm:text-6xl md:text-7xl lg:text-8xl">
        Innovative Personal Projects Showcase
      </h1>
      <p className="animate-fade-in mb-12 -translate-y-4 text-balance text-lg tracking-tight text-muted-foreground opacity-0 [--animation-delay:400ms] md:text-xl">
        Explore a diverse portfolio of cutting-edge projects I&apos;ve crafted
        over the years.
        <br className="hidden md:block" />
        From powerful open-source libraries to feature-rich applications,
        discover my passion for innovation.
      </p>
      <div className="animate-fade-in -translate-y-4 space-x-2 opacity-0 [--animation-delay:600ms]">
        <Link href="/docs" className={cn(buttonVariants())}>
          Explore Projects
        </Link>
        <Link href={siteConfig.links.github} target="_blank" rel="noreferrer">
          <ShinyButton text="GitHub" />
        </Link>
      </div>
    </section>
  )
}
