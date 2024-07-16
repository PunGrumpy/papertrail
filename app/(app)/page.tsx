import { HeroSection } from '@/components/section/hero-section'

export default async function Page() {
  return (
    <>
      <div className="dark:bg-grid-white/[0.06] bg-grid-black/[0.04] pointer-events-none absolute inset-0 select-none [mask-image:linear-gradient(to_bottom,white_5%,transparent_50%)]"></div>
      <HeroSection />
    </>
  )
}
