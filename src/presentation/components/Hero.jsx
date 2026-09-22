// src/presentation/components/Hero.jsx
import { usePortfolio } from '../contexts/PortfolioContext'
import { useInView } from '../hooks/useInView'

export default function Hero() {
  const { profile } = usePortfolio()
  const { ref, inView } = useInView()

  return (
    <section
      id="hero"
      className="pt-14 md:pt-0 min-h-screen flex items-center border-b"
      style={{ borderColor: 'var(--color-border)' }}
    >
      <div
        ref={ref}
        className={`w-full max-w-5xl mx-auto px-6 md:px-12 py-20 md:py-28 grid lg:grid-cols-[1fr_auto] gap-12 md:gap-16 items-center transition-all duration-700 ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >
        <div className="min-w-0">
          <div
            className="inline-flex items-center gap-2 type-caption px-3 py-1.5 rounded-full border mb-8"
            style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-muted)' }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ backgroundColor: 'var(--color-primary)' }}
            />
            {profile.status} · {profile.location}
          </div>

          <h1
            className="type-hero mb-4"
            style={{
              color: 'var(--color-text)',
            }}
          >
            {profile.nameKo}
          </h1>

          <p
            className="type-lead mb-3"
            style={{ color: 'var(--color-primary)' }}
          >
            {profile.title}
          </p>

          <p
            className="type-body mb-10 max-w-md"
            style={{ color: 'var(--color-text-muted)' }}
          >
            {profile.subtitle}<br />
            {profile.description}
          </p>

          <div className="flex gap-3 flex-wrap">
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md type-control transition-colors"
              style={{
                backgroundColor: 'var(--color-primary)',
                color: 'var(--color-on-primary)',
              }}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
              GitHub
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md type-control border transition-colors"
              style={{
                borderColor: 'var(--color-border)',
                color: 'var(--color-text-muted)',
              }}
            >
              Contact
            </a>
          </div>
        </div>

        <div
          className="hidden lg:flex flex-col items-start gap-3 p-6 rounded-xl border min-w-[200px]"
          style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
        >
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center type-brand mb-2"
            style={{ backgroundColor: 'var(--color-primary-hl)', color: 'var(--color-primary)' }}
          >
            {profile.nameKo?.[0] ?? 'P'}
          </div>
          <p className="type-supporting type-label" style={{ color: 'var(--color-text)' }}>{profile.nameKo}</p>
          <p className="type-caption" style={{ color: 'var(--color-text-muted)' }}>{profile.title}</p>
          <div className="w-full h-px my-1" style={{ backgroundColor: 'var(--color-divider)' }} />
          {profile.stats?.slice(0, 3).map(s => (
            <div key={s.label}>
              <p className="type-metric-compact" style={{ color: 'var(--color-text)' }}>{s.value}</p>
              <p className="type-caption" style={{ color: 'var(--color-text-faint)' }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
