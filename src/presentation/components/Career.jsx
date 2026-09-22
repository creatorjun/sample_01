// src/presentation/components/Career.jsx
import { useInView } from '../hooks/useInView'
import { usePortfolio } from '../contexts/PortfolioContext'

export default function Career() {
  const { ref, inView } = useInView()
  const { careers } = usePortfolio()

  return (
    <section id="career" className="py-24 px-6 md:px-12 border-b" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface)' }}>
      <div className="max-w-5xl mx-auto">
        <div ref={ref} className={`transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="type-eyebrow mb-3" style={{ color: 'var(--color-primary)' }}>Career</p>
          <h2
            className="type-section mb-12"
            style={{ color: 'var(--color-text)' }}
          >
            경력
          </h2>

          <div className="space-y-3">
            {careers.map((c, i) => (
              <div
                key={i}
                className="grid md:grid-cols-[160px_1fr] gap-4 md:gap-8 p-5 md:p-6 rounded-lg border"
                style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)' }}
              >
                <div className="pt-0.5">
                  <span
                    className="type-caption type-mono block"
                    style={{ color: 'var(--color-text-muted)' }}
                  >
                    {c.period}
                  </span>
                </div>

                <div>
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:flex-wrap gap-1 mb-3">
                    <h3 className="type-title" style={{ color: 'var(--color-text)' }}>{c.company}</h3>
                    <span className="hidden sm:block type-caption mx-2" style={{ color: 'var(--color-text-faint)' }}>—</span>
                    <span className="type-supporting type-label" style={{ color: 'var(--color-primary)' }}>{c.role}</span>
                  </div>
                  <ul className="space-y-1.5">
                    {c.achievements.map((a, j) => (
                      <li key={j} className="flex items-start gap-2.5 type-body" style={{ color: 'var(--color-text-muted)' }}>
                        <span className="mt-2 w-1 h-1 rounded-full flex-shrink-0" style={{ backgroundColor: 'var(--color-primary)' }} />
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
