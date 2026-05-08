import React, { useEffect, useState } from 'react'

type Theme = 'dark' | 'light'

interface ThemeToggleProps {
  defaultTheme?: Theme
  persist?: boolean
  className?: string
}

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

  const toggle = () => setTheme(t => t === 'dark' ? 'light' : 'dark')

  return (
    <button
      onClick={toggle}
      className={['bp-btn bp-btn-secondary bp-btn-sm', className].filter(Boolean).join(' ')}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === 'dark' ? '☀ Light' : '◑ Dark'}
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

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    document.documentElement.setAttribute('data-bp-theme', next)
    if (persist) localStorage.setItem('bp-theme', next)
  }

  useEffect(() => {
    document.documentElement.setAttribute('data-bp-theme', theme)
  }, [])

  return { theme, toggle, isDark: theme === 'dark', isLight: theme === 'light' }
}
