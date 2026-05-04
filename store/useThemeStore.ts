import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Theme = 'yellow' | 'white' | 'dark'

interface ThemeStore {
  theme: Theme
  setTheme: (theme: Theme) => void
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      theme: 'yellow',
      setTheme: (theme) => set({ theme }),
    }),
    { name: 'af-theme' }
  )
)
