import { IconBrandGit } from '@tabler/icons-react'
import { motion, useAnimation, useInView } from 'framer-motion'
import React from 'react'

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { cn, shuffleArray } from '@/lib/utils'

import { Icons } from '../../icons'
import Marquee from '../../ui/marquee'

export const SkeletonDevOps: React.FC = () => {
  const tools = React.useMemo(
    () => [
      {
        name: 'Git',
        icon: <IconBrandGit className="size-full" />,
        bg: 'from-orange-500 to-yellow-600'
      },
      {
        name: 'Docker',
        icon: <Icons.docker className="size-full" />,
        bg: 'from-blue-500 to-cyan-600'
      },
      {
        name: 'Kubernetes',
        icon: <Icons.kubernetes className="size-full" />,
        bg: 'from-indigo-500 to-purple-600'
      },
      {
        name: 'Helm',
        icon: <Icons.helm className="size-full" />,
        bg: 'from-sky-500 to-blue-600'
      },
      {
        name: 'GitHub Actions',
        icon: <Icons.githubActions className="size-full" />,
        bg: 'from-teal-500 to-blue-600'
      },
      {
        name: 'Travis CI',
        icon: <Icons.travisCI className="size-full" />,
        bg: 'from-amber-500 to-orange-800'
      },
      {
        name: 'ArgoCD',
        icon: <Icons.argoCD className="size-full" />,
        bg: 'from-orange-500 to-blue-500'
      },
      {
        name: 'DigitalOcean',
        icon: <Icons.digitalOcean className="size-full" />,
        bg: 'from-blue-500 to-blue-500'
      },
      {
        name: 'Terraform',
        icon: <Icons.terraform className="size-full" />,
        bg: 'from-purple-500 to-purple-600'
      },
      {
        name: 'Prometheus',
        icon: <Icons.prometheus className="size-full" />,
        bg: 'from-red-500 to-red-600'
      }
    ],
    []
  )

  const DevOpsCard: React.FC<{ tool: (typeof tools)[0] }> = ({ tool }) => {
    const controls = useAnimation()
    const ref = React.useRef<HTMLDivElement>(null)
    const inView = useInView(ref, { once: true })

    React.useEffect(() => {
      if (inView) {
        controls.start({
          opacity: 1,
          transition: { delay: Math.random() * 2, ease: 'easeOut', duration: 1 }
        })
      }
    }, [controls, inView])

    return (
      // <motion.div
      //   ref={ref}
      //   initial={{ opacity: 0 }}
      //   animate={controls}
      //   className={cn(
      //     'relative size-16 cursor-pointer overflow-hidden rounded-2xl border p-4',
      //     'bg-background',
      //     'transform-gpu [border:0_-20px_80px_-20px_#ffffff1f_inset] [box-shadow:1px_solid_rgba(255,255,255,.1)]'
      //   )}
      // >
      //   {tool.icon}
      //   <div
      //     className={`pointer-events-none absolute left-1/2 top-1/2 size-1/2 -translate-x-1/2 -translate-y-1/2 overflow-visible rounded-full bg-gradient-to-r ${tool.bg} opacity-70 blur-xl`}
      //   />
      // </motion.div>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="relative size-16 transform-gpu cursor-pointer overflow-hidden rounded-2xl border bg-background p-4 [border:0_-20px_80px_-20px_#ffffff1f_inset] [box-shadow:1px_solid_rgba(255,255,255,.1)]">
            {tool.icon}
            <div
              className={`pointer-events-none absolute left-1/2 top-1/2 size-1/2 -translate-x-1/2 -translate-y-1/2 overflow-visible rounded-full bg-gradient-to-r ${tool.bg} opacity-70 blur-xl`}
            />
          </div>
        </TooltipTrigger>
        <TooltipContent>{tool.name}</TooltipContent>
      </Tooltip>
    )
  }

  const [randomTools, setRandomTools] = React.useState<typeof tools>([])
  const [randomTools2, setRandomTools2] = React.useState<typeof tools>([])

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      setRandomTools(shuffleArray([...tools]))
      setRandomTools2(shuffleArray([...tools]))
    }
  }, [tools])

  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden bg-dot-black/[0.2] dark:bg-dot-white/[0.2]">
      <Marquee
        pauseOnHover
        reverse
        className="-delay-[200ms] [--duration:10s]"
        repeat={5}
      >
        {randomTools.map((tool, i) => (
          <DevOpsCard key={i} tool={tool} />
        ))}
      </Marquee>
      <Marquee pauseOnHover reverse className="[--duration:25s]" repeat={5}>
        {randomTools2.map((tool, i) => (
          <DevOpsCard key={i} tool={tool} />
        ))}
      </Marquee>
    </div>
  )
}
