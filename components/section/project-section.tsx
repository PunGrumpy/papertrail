'use client'

import { IconLogs } from '@tabler/icons-react'
import { motion } from 'framer-motion'

import { cn } from '@/lib/utils'

import { BentoGrid, BentoGridItem } from '../ui/bento-grid'

const SkeletonOne = () => {
  const variants = {
    initial: {
      x: 0
    },
    animate: {
      x: 10,
      rotate: 5,
      transition: {
        duration: 0.2
      }
    }
  }
  const variantsSecond = {
    initial: {
      x: 0
    },
    animate: {
      x: -10,
      rotate: -5,
      transition: {
        duration: 0.2
      }
    }
  }

  return (
    <motion.div
      initial="initial"
      whileHover="animate"
      className="flex size-full min-h-24 flex-1 flex-col space-y-2 bg-dot-black/[0.2] dark:bg-dot-white/[0.2]"
    >
      <motion.div
        variants={variants}
        className="flex flex-row items-center space-x-2 rounded-full border border-border bg-background p-2"
      >
        <div className="size-6 shrink-0 rounded-full bg-gradient-to-r from-lime-500 to-green-500" />
        <span className="truncate font-mono text-xs">INFO 8ms GET / 200</span>
      </motion.div>
      <motion.div
        variants={variantsSecond}
        className="ml-auto flex w-3/4 flex-row items-center space-x-2 rounded-full border border-border bg-background p-2"
      >
        <span className="truncate font-mono text-xs">
          ERROR 1ms POST /login 401
        </span>
        <div className="size-6 shrink-0 rounded-full bg-gradient-to-r from-red-500 to-violet-500" />
      </motion.div>
      <motion.div
        variants={variants}
        className="flex flex-row items-center space-x-2 rounded-full border border-border bg-background p-2"
      >
        <div className="size-6 shrink-0 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500" />
        <span className="truncate font-mono text-xs">
          WARN 4ms GET /api/user 403
        </span>
      </motion.div>
    </motion.div>
  )
}

const items = [
  {
    title: 'Logixlysia',
    description: (
      <span className="text-sm">
        A beautiful and simple logging middleware for ElysiaJS with colors and
        timestamps
      </span>
    ),
    header: <SkeletonOne />,
    className: 'md:col-span-1',
    icon: <IconLogs className="size-4" />,
    href: 'https://github.com/PunGrumpy/logixlysia'
  }
]

export function ProjectSection() {
  return (
    <section id="projects" className="mx-auto my-24 max-w-7xl px-6 md:px-8">
      <BentoGrid className="mx-auto max-w-4xl md:auto-rows-[20rem]">
        {items.map((item, i) => (
          <BentoGridItem
            key={i}
            title={item.title}
            description={item.description}
            header={item.header}
            className={cn('[&>p:text-lg]', item.className)}
            icon={item.icon}
            href={item.href}
          />
        ))}
      </BentoGrid>
    </section>
  )
}
