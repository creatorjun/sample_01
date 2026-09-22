// src/App.jsx
import { useState, useEffect } from 'react'
import { PortfolioProvider } from './presentation/contexts/PortfolioContext'
import Navbar from './presentation/components/Navbar'
import Hero from './presentation/components/Hero'
import About from './presentation/components/About'
import Career from './presentation/components/Career'
import Projects from './presentation/components/Projects'
import Skills from './presentation/components/Skills'
import CoverLetter from './presentation/components/CoverLetter'
import Contact from './presentation/components/Contact'

export default function App() {
  const [theme, setTheme] = useState(() => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark')

  return (
    <PortfolioProvider>
      <div className="flex min-h-screen" style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}>
        <Navbar theme={theme} toggleTheme={toggleTheme} />
        <main className="min-w-0 flex-1 md:ml-[var(--sidebar-width)]">
          <Hero />
          <About />
          <Career />
          <Projects />
          <Skills />
          <CoverLetter />
          <Contact />
        </main>
      </div>
    </PortfolioProvider>
  )
}
