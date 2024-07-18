'use client'

import { IconGitBranch, IconPalette, IconServer } from '@tabler/icons-react'
import React from 'react'

import { cn } from '@/lib/utils'
import { SkillItem } from '@/types/components'

import { BentoGrid, BentoGridItem } from '../ui/bento-grid'
import { SkeletonBackend } from './skills/skeleton-backend'
import { SkeletonDevOps } from './skills/skeleton-devops'
import { SkeletonFrontend } from './skills/skeleton-frontend'

const skillItems: SkillItem[] = [
  {
    title: 'Frontend',
    description: (
      <span className="text-sm">
        Proficient in Next.js, Tailwind CSS, and Radix UI for building modern,
        responsive web applications with ease and speed in mind
      </span>
    ),
    className: 'md:col-span-2',
    header: <SkeletonFrontend />,
    icon: <IconPalette className="size-4" />
  },
  {
    title: 'Backend',
    description: (
      <span className="text-sm">
        Skilled in Prisma, Appwrite, and Express.js for robust server-side
      </span>
    ),
    className: 'md:col-span-1',
    header: <SkeletonBackend />,
    icon: <IconServer className="size-4" />
  },
  {
    title: 'DevOps',
    description: (
      <span className="text-sm">
        Experienced in DevOps practices, integrating development and operations
        for efficient software delivery. Proficient in CI/CD pipelines,
        containerization with Docker, and orchestration using Kubernetes.
        Skilled in automating infrastructure with IaC principles and cloud
        platforms like DigitalOcean.
      </span>
    ),
    className: 'md:col-span-3',
    header: <SkeletonDevOps />,
    icon: <IconGitBranch className="size-4" />
  }
]

export function SkillSection() {
  return (
    <section id="skills" className="mx-auto my-24 max-w-7xl px-6 md:px-8">
      <BentoGrid className="mx-auto max-w-4xl animate-fade-in opacity-0 transition-all ease-in md:auto-rows-[20rem]">
        {skillItems.map((item, i) => (
          <BentoGridItem
            key={i}
            title={item.title}
            description={item.description}
            header={item.header}
            className={cn('[&>p:text-lg]', item.className)}
            icon={item.icon}
          />
        ))}
      </BentoGrid>
    </section>
  )
}
