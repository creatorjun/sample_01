// src/presentation/components/Navbar.jsx
import { useState } from 'react'
import { useScrollSpy } from '../hooks/useScrollSpy'

const NAV_ITEMS = [
  { id: 'about',        label: 'About' },
  { id: 'career',       label: 'Career' },
  { id: 'projects',     label: 'Projects' },
  { id: 'skills',       label: 'Skills' },
  { id: 'cover-letter', label: 'Cover Letter' },
  { id: 'contact',      label: 'Contact' },
]

export default function Navbar({ theme, toggleTheme }) {
  const [open, setOpen] = useState(false)
  const active = useScrollSpy(NAV_ITEMS.map(n => n.id))

  return (
    <>
      <aside
        className="hidden md:flex fixed top-0 left-0 h-full flex-col z-40 border-r"
        style={{
          width: 'var(--sidebar-width)',
          backgroundColor: 'var(--color-surface)',
          borderColor: 'var(--color-border)',
        }}
      >
        <div className="px-6 pt-10 pb-8 border-b" style={{ borderColor: 'var(--color-divider)' }}>
          <a
            href="#"
            className="block type-brand"
            style={{ color: 'var(--color-text)' }}
          >
            홍길동
          </a>
          <p className="mt-1 type-caption" style={{ color: 'var(--color-text-muted)' }}>Portfolio</p>
        </div>

        <nav className="flex-1 px-4 py-6 flex flex-col gap-1">
          {NAV_ITEMS.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              className="px-3 py-2 rounded-md type-control transition-colors"
              style={{
                color: active === id ? 'var(--color-primary)' : 'var(--color-text-muted)',
                backgroundColor: active === id ? 'var(--color-primary-hl)' : 'transparent',
                fontWeight: active === id ? 'var(--weight-bold)' : 'var(--weight-medium)',
              }}
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="px-5 pb-8 border-t pt-5" style={{ borderColor: 'var(--color-divider)' }}>
          <button
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            className="flex items-center gap-2 type-control w-full px-3 py-2 rounded-md transition-colors"
            style={{ color: 'var(--color-text-muted)' }}
          >
            {theme === 'dark' ? (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="5"/>
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
              </svg>
            ) : (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            )}
            {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      </aside>

      <header
        className="md:hidden fixed top-0 inset-x-0 z-50 h-14 flex items-center justify-between px-5 border-b"
        style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
      >
        <a href="#" className="type-brand" style={{ color: 'var(--color-text)' }}>
          홍길동
        </a>
        <div className="flex items-center gap-3">
          <button onClick={toggleTheme} aria-label="Toggle theme" style={{ color: 'var(--color-text-muted)' }}>
            {theme === 'dark' ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="5"/>
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            )}
          </button>
          <button onClick={() => setOpen(!open)} style={{ color: 'var(--color-text-muted)' }}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {open
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12"/>
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16"/>}
            </svg>
          </button>
        </div>
      </header>

      {open && (
        <div
          className="md:hidden fixed top-14 inset-x-0 z-40 border-b px-5 py-4 flex flex-col gap-1"
          style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
        >
          {NAV_ITEMS.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              className="px-3 py-2 rounded-md type-control"
              style={{ color: 'var(--color-text-muted)' }}
              onClick={() => setOpen(false)}
            >
              {label}
            </a>
          ))}
        </div>
      )}
    </>
  )
}
