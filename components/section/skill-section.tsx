'use client'

import {
  IconBrandNextjs,
  IconBrandRadixUi,
  IconBrandTailwind,
  IconCode,
  IconGitBranch,
  IconPalette,
  IconServer
} from '@tabler/icons-react'
import { motion } from 'framer-motion'
import React from 'react'

import { cn } from '@/lib/utils'
import { SkillItem } from '@/types/components'

import { BentoGrid, BentoGridItem } from '../ui/bento-grid'
import Marquee from '../ui/marquee'

interface SkillCardProps {
  icon: React.ReactNode
  title: string
  skills: string[]
}

const SkeletonFrontend: React.FC = () => {
  const first = {
    initial: { x: 20, rotate: -5 },
    hover: { x: 0, rotate: 0 }
  }
  const second = {
    initial: { x: -20, rotate: 5 },
    hover: { x: 0, rotate: 0 }
  }
  return (
    <motion.div
      initial="initial"
      animate="animate"
      whileHover="hover"
      className="flex size-full min-h-24 flex-1 flex-row space-x-2 bg-dot-black/[0.2] dark:bg-dot-white/[0.2]"
    >
      <motion.div
        variants={first}
        className="flex h-full w-1/3 flex-col items-center justify-center rounded-2xl border border-border bg-background p-4"
      >
        <IconBrandNextjs className="size-10" />
        <p className="mt-4 text-center text-xs font-semibold text-muted-foreground sm:text-sm">
          Next.js is the best framework
        </p>
        <p className="mt-4 rounded-full border border-red-500 bg-red-100 px-2 py-0.5 text-xs text-red-600 dark:bg-red-900/20">
          Powerful
        </p>
      </motion.div>
      <motion.div className="relative z-20 flex h-full w-1/3 flex-col items-center justify-center rounded-2xl border border-border bg-background p-4">
        <IconBrandTailwind className="size-10" />
        <p className="mt-4 text-center text-xs font-semibold text-muted-foreground sm:text-sm">
          Tailwind CSS is cool, you know
        </p>
        <p className="mt-4 rounded-full border border-green-500 bg-green-100 px-2 py-0.5 text-xs text-green-600 dark:bg-green-900/20">
          Flexible
        </p>
      </motion.div>
      <motion.div
        variants={second}
        className="flex h-full w-1/3 flex-col items-center justify-center rounded-2xl border border-border bg-background p-4"
      >
        <IconBrandRadixUi className="size-10" />
        <p className="mt-4 text-center text-xs font-semibold text-muted-foreground sm:text-sm">
          UI components are the best
        </p>
        <p className="mt-4 rounded-full border border-orange-500 bg-orange-100 px-2 py-0.5 text-xs text-orange-600 dark:bg-orange-900/20">
          Beautiful
        </p>
      </motion.div>
    </motion.div>
  )
}

const SkeletonBackend: React.FC = () => {
  const files = [
    {
      name: 'server.ts',
      language: 'typescript',
      body: `import express from 'express'
import { PrismaClient } from '@prisma/client'

const app = express()
const prisma = new PrismaClient()
`
    },
    {
      name: 'routes.ts',
      language: 'typescript',
      body: `app.get('/api', (req, res) => {
    res.json({ message: 'Hello, world!' })
}
`
    },
    {
      name: 'prisma.schema',
      language: 'prisma',
      body: `model User {
    id Int @id @default(autoincrement())
    email String @unique
    name String?
}
`
    },
    {
      name: 'appwrite.ts',
      language: 'typescript',
      body: `import { Appwrite } from 'appwrite'

const client = new Appwrite()
client.setEndpoint('http://localhost/v1').setProject('project')
`
    }
  ]

  return (
    <motion.div
      initial="initial"
      animate="animate"
      whileHover="hover"
      className="relative flex size-full min-h-24 flex-1 flex-row space-x-2 overflow-hidden bg-dot-black/[0.2] dark:bg-dot-white/[0.2]"
    >
      <Marquee
        pauseOnHover
        className="[--duration:30s] [mask-image:linear-gradient(to_top,transparent_1%,#000_100%)]"
      >
        {files.map((file, i) => (
          <motion.figure
            key={i}
            className="flex flex-col items-start justify-start rounded-lg border border-border bg-background p-3 transition-shadow hover:shadow-md"
            whileHover={{ scale: 1.02 }}
          >
            <figcaption className="mb-2 text-sm font-semibold text-foreground">
              {file.name}
            </figcaption>
            <pre className="w-full overflow-x-auto text-xs text-muted-foreground">
              <code lang={file.language}>{file.body}</code>
            </pre>
          </motion.figure>
        ))}
      </Marquee>
    </motion.div>
  )
}

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
