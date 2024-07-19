import { IconBrandGit } from '@tabler/icons-react'
import { motion, useAnimation, useInView } from 'framer-motion'
import React, { useEffect, useState } from 'react'

import { cn, shuffleArray } from '@/lib/utils'

import { Icons } from '../../icons'
import Marquee from '../../ui/marquee'

const tools = [
  {
    name: 'Git',
    icon: <IconBrandGit className="size-full" />
  },
  {
    name: 'Docker',
    icon: <Icons.docker className="size-full" />
  },
  {
    name: 'Kubernetes',
    icon: <Icons.kubernetes className="size-full" />
  },
  {
    name: 'Helm',
    icon: <Icons.helm className="size-full" />
  },
  {
    name: 'GitHub Actions',
    icon: <Icons.githubActions className="size-full" />
  },
  {
    name: 'Travis CI',
    icon: <Icons.travisCI className="size-full" />
  },
  {
    name: 'ArgoCD',
    icon: <Icons.argoCD className="size-full" />
  },
  {
    name: 'DigitalOcean',
    icon: <Icons.digitalOcean className="size-full" />
  },
  {
    name: 'Terraform',
    icon: <Icons.terraform className="size-full" />
  },
  {
    name: 'Prometheus',
    icon: <Icons.prometheus className="size-full" />
  }
]

const DevOpsCard: React.FC<{ tool: (typeof tools)[0] }> = ({ tool }) => {
  const controls = useAnimation()
  const ref = React.useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        transition: { delay: Math.random() * 2, ease: 'easeOut', duration: 1 }
      })
    }
  }, [controls, inView])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={controls}
      className="relative size-16 cursor-pointer overflow-hidden rounded-2xl border border-border bg-background p-4"
    >
      {tool.icon}
    </motion.div>
  )
}

export const SkeletonDevOps: React.FC = () => {
  const [randomTools1, setRandomTools1] = useState<typeof tools>([])
  const [randomTools2, setRandomTools2] = useState<typeof tools>([])

  useEffect(() => {
    setRandomTools1(shuffleArray([...tools]))
    setRandomTools2(shuffleArray([...tools]))
  }, [])

  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden bg-dot-black/[0.2] dark:bg-dot-white/[0.2]">
      <Marquee
        pauseOnHover
        reverse
        className="-delay-[200ms] [--duration:30s]"
        repeat={3}
      >
        {randomTools1.map((tool, i) => (
          <DevOpsCard key={`${tool.name}-${i}`} tool={tool} />
        ))}
      </Marquee>
      <Marquee pauseOnHover className="[--duration:40s]" repeat={3}>
        {randomTools2.map((tool, i) => (
          <DevOpsCard key={`${tool.name}-${i}`} tool={tool} />
        ))}
      </Marquee>
    </div>
  )
}
