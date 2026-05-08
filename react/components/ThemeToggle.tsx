import React, { useEffect, useState } from 'react'

type Theme = 'dark' | 'light' | 'auto'

interface ThemeToggleProps {
  defaultTheme?: Theme
  persist?: boolean
  className?: string
}

const CYCLE: Theme[] = ['dark', 'light', 'auto']
const LABELS: Record<Theme, string> = { dark: '☀ Light', light: '◑ Auto', auto: '◑ Dark' }
const NEXT_LABEL: Record<Theme, string> = { dark: 'light', light: 'auto', auto: 'dark' }

export function ThemeToggle({ defaultTheme = 'dark', persist = true, className = '' }: ThemeToggleProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (persist && typeof window !== 'undefined') {
      return (localStorage.getItem('bp-theme') as Theme) ?? defaultTheme
    }
    return defaultTheme
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-bp-theme', theme)
    if (persist) localStorage.setItem('bp-theme', theme)
  }, [theme, persist])

  const cycle = () => setTheme(t => CYCLE[(CYCLE.indexOf(t) + 1) % CYCLE.length])

  return (
    <button
      onClick={cycle}
      className={['bp-btn bp-btn-secondary bp-btn-sm', className].filter(Boolean).join(' ')}
      aria-label={`Switch to ${NEXT_LABEL[theme]} mode`}
    >
      {LABELS[theme]}
    </button>
  )
}

// Hook — use when you need the theme value in other components
export function useTheme(defaultTheme: Theme = 'dark', persist = true) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (persist && typeof window !== 'undefined') {
      return (localStorage.getItem('bp-theme') as Theme) ?? defaultTheme
    }
    return defaultTheme
  })

  const cycle = () => {
    const next = CYCLE[(CYCLE.indexOf(theme) + 1) % CYCLE.length]
    setTheme(next)
    document.documentElement.setAttribute('data-bp-theme', next)
    if (persist) localStorage.setItem('bp-theme', next)
  }

  useEffect(() => {
    document.documentElement.setAttribute('data-bp-theme', theme)
  }, [])

  return { theme, cycle, isDark: theme === 'dark', isLight: theme === 'light', isAuto: theme === 'auto' }
}
