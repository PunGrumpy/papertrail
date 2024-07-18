import { motion } from 'framer-motion'

import { Icons } from '../../icons'

export const SkeletonFrontend: React.FC = () => {
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
        <Icons.nextJs className="size-10" />
        <p className="mt-4 text-center text-xs font-semibold text-muted-foreground sm:text-sm">
          Next.js is the best framework
        </p>
        <p className="mt-4 rounded-full border border-red-500 bg-red-100 px-2 py-0.5 text-xs text-red-600 dark:bg-red-900/20">
          Powerful
        </p>
      </motion.div>
      <motion.div className="relative z-20 flex h-full w-1/3 flex-col items-center justify-center rounded-2xl border border-border bg-background p-4">
        <Icons.tailwind className="size-10" />
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
        <Icons.radix className="size-10" />
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
