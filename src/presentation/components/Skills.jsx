// src/presentation/components/Skills.jsx
import { useInView } from '../hooks/useInView'
import { usePortfolio } from '../contexts/PortfolioContext'

export default function Skills() {
  const { ref, inView } = useInView()
  const { skills } = usePortfolio()

  return (
    <section
      id="skills"
      className="py-24 px-6 md:px-12 border-b"
      style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface)' }}
    >
      <div className="max-w-5xl mx-auto">
        <div
          ref={ref}
          className={`transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <p className="type-eyebrow mb-3" style={{ color: 'var(--color-primary)' }}>
            Skills
          </p>
          <h2
            className="type-section mb-12"
            style={{ color: 'var(--color-text)' }}
          >
            기술 스택
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map(g => (
              <div key={g.label}>
                <h3
                  className="type-title mb-3"
                  style={{ color: 'var(--color-text)' }}
                >
                  {g.label}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {g.items.map(item => (
                    <span
                      key={item}
                      className="px-3 py-1 type-caption rounded-md border transition-colors"
                      style={{
                        color: 'var(--color-text-muted)',
                        borderColor: 'var(--color-border)',
                        backgroundColor: 'var(--color-bg)',
                      }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
