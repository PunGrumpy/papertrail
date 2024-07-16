import { ArrowRightIcon } from '@radix-ui/react-icons'
import Link from 'next/link'

import AnimatedShinyText from './ui/animated-shiny-text'

export function Announcement() {
  return (
    <Link
      href="/docs"
      className="group rounded-full border border-primary/10 text-base transition-all ease-in hover:cursor-pointer hover:bg-primary/5"
    >
      <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-primary hover:duration-300">
        <span>✨ Introducing Papertrial</span>
        <ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
      </AnimatedShinyText>
    </Link>
  )
}
