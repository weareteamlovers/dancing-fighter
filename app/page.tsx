import HeroSection from '@/components/hero/HeroSection'
import InputSection from '@/components/input/InputSection'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-af-yellow">
      <HeroSection />
      <InputSection />

      {/* Footer */}
      <footer className="border-t border-af-border px-6 md:px-12 py-6 flex items-center justify-between">
        <span className="font-mono text-xs text-af-red/40 tracking-tight">
          ANTIFREEZE © 2024
        </span>
        <span className="font-mono text-xs text-af-red/40 tracking-tight">
          dancingfighter.com
        </span>
      </footer>
    </main>
  )
}
