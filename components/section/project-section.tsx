'use client'

import { IconLogs, IconSettings, IconTable } from '@tabler/icons-react'
import { motion, Variants } from 'framer-motion'
import React from 'react'

import { cn } from '@/lib/utils'

import { BentoGrid, BentoGridItem } from '../ui/bento-grid'

interface ProjectItem {
  title: string
  description: React.ReactNode
  header: React.ReactNode
  className: string
  icon: React.ReactNode
  href: string
}

interface LogEntryProps {
  variants: Variants
  color: string
  text: string
  isReversed?: boolean
}

const containerVariants: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants: Variants = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  hover: { scale: 1.05, transition: { duration: 0.2 } }
}

const cellVariants: Variants = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  hover: { scale: 1.1, transition: { duration: 0.2 } }
}

const LogEntry: React.FC<LogEntryProps> = ({
  variants,
  color,
  text,
  isReversed = false
}) => (
  <motion.div
    variants={variants}
    className={`flex flex-row items-center space-x-2 rounded-full border border-border bg-background p-2 ${isReversed ? 'ml-auto w-3/4' : ''}`}
  >
    {!isReversed && (
      <div
        className={`size-6 shrink-0 rounded-full bg-gradient-to-r ${color}`}
      />
    )}
    <span className="truncate font-mono text-xs">{text}</span>
    {isReversed && (
      <div
        className={`size-6 shrink-0 rounded-full bg-gradient-to-r ${color}`}
      />
    )}
  </motion.div>
)

const SkeletonOne: React.FC = () => {
  const variants: Variants = {
    initial: { x: 0 },
    animate: { x: 10, rotate: 5, transition: { duration: 0.2 } }
  }
  const variantsSecond: Variants = {
    initial: { x: 0 },
    animate: { x: -10, rotate: -5, transition: { duration: 0.2 } }
  }

  return (
    <motion.div
      initial="initial"
      whileHover="animate"
      className="flex size-full min-h-24 flex-1 flex-col space-y-2 bg-dot-black/[0.2] dark:bg-dot-white/[0.2]"
    >
      <LogEntry
        variants={variants}
        color="from-lime-500 to-green-500"
        text="INFO 8ms GET / 200"
      />
      <LogEntry
        variants={variantsSecond}
        color="from-red-500 to-violet-500"
        text="ERROR 1ms POST /login 401"
        isReversed
      />
      <LogEntry
        variants={variants}
        color="from-yellow-500 to-orange-500"
        text="WARN 4ms GET /api/user 403"
      />
    </motion.div>
  )
}

const SkeletonTwo: React.FC = () => {
  const lines = [
    '$HOME/RiceInstaller.sh',
    '📦 Installing dependencies...',
    '📦 Installing Application...',
    '👋 Thank you for using my script!'
  ]

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className="flex size-full min-h-24 flex-1 flex-col space-y-2 p-4 font-mono text-sm bg-dot-black/[0.2] dark:bg-dot-white/[0.2]"
    >
      {lines.map((line, i) => (
        <motion.div
          key={`skeleton-two-${i}`}
          variants={itemVariants}
          whileHover="hover"
          className={
            line.startsWith('$')
              ? 'font-bold text-blue-700 dark:text-blue-500'
              : 'text-green-700 dark:text-green-500'
          }
        >
          {line}
        </motion.div>
      ))}
    </motion.div>
  )
}

const SkeletonThree: React.FC = () => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
  const hours = [
    '9:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00'
  ]

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className="grid grid-cols-6 gap-0.5 rounded-lg p-2 font-mono text-xs bg-dot-black/[0.2] dark:bg-dot-white/[0.2]"
    >
      <div className="col-span-1"></div>
      {days.map(day => (
        <motion.div
          key={day}
          variants={cellVariants}
          className="text-center font-bold"
        >
          {day}
        </motion.div>
      ))}
      {hours.map(hour => (
        <React.Fragment key={hour}>
          <motion.div variants={cellVariants} className="pr-1 text-right">
            {hour}
          </motion.div>
          {days.map(day => (
            <motion.div
              key={`${day}-${hour}`}
              variants={cellVariants}
              whileHover="hover"
              className="relative"
            >
              <motion.div
                className={cn(
                  'size-full rounded-sm',
                  Math.random() > 0.7
                    ? 'bg-orange-500 dark:bg-orange-700'
                    : 'bg-accent/50 backdrop-blur-sm'
                )}
              ></motion.div>
            </motion.div>
          ))}
        </React.Fragment>
      ))}
    </motion.div>
  )
}

const projectItems: ProjectItem[] = [
  {
    title: 'Logixlysia',
    description: (
      <span className="text-sm">
        A beautiful and simple logging middleware for ElysiaJS with colors
      </span>
    ),
    header: <SkeletonOne />,
    className: 'md:col-span-1',
    icon: <IconLogs className="size-4" />,
    href: 'https://github.com/PunGrumpy/logixlysia'
  },
  {
    title: 'Kali Linux Dotfiles',
    description: (
      <span className="text-sm">
        Rich and beautiful dotfiles for Kali Linux with Fish, Starship and
        Neovim
      </span>
    ),
    header: <SkeletonTwo />,
    className: 'md:col-span-1',
    icon: <IconSettings className="size-4" />,
    href: 'https://github.com/PunGrumpy/kali-dotfiles'
  },
  {
    title: 'KMITL Wizard',
    description: (
      <span className="text-sm">
        A schedule table Chrome extension for KMITL students with a beautiful UI
      </span>
    ),
    header: <SkeletonThree />,
    className: 'md:col-span-1',
    icon: <IconTable className="size-4" />,
    href: 'https://github.com/PunGrumpy/kmitl-wizard'
  }
]

export function ProjectSection() {
  return (
    <section id="projects" className="mx-auto my-24 max-w-7xl px-6 md:px-8">
      <BentoGrid className="mx-auto max-w-4xl animate-fade-in opacity-0 transition-all ease-in md:auto-rows-[20rem]">
        {projectItems.map((item, i) => (
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
