import { HeroSection } from '@/components/section/hero-section'
import { SkillSection } from '@/components/section/skill-section'

export default async function Page() {
  return (
    <>
      <div className="pointer-events-none absolute inset-0 select-none bg-grid-black/[0.04] [mask-image:linear-gradient(to_bottom,white_5%,transparent_50%)] dark:bg-grid-white/[0.06]"></div>
      <HeroSection />
      <SkillSection />
    </>
  )
}
