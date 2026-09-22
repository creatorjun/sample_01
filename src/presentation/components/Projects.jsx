// src/presentation/components/Projects.jsx
import { useState, useCallback } from 'react'
import { useInView } from '../hooks/useInView'
import { usePortfolio } from '../contexts/PortfolioContext'
import ProjectCard from './projects/ProjectCard'
import ProjectLightbox from './projects/ProjectLightbox'

export default function Projects() {
  const { ref, inView } = useInView()
  const { projects } = usePortfolio()
  const [selected, setSelected] = useState(null)

  const handleCardClick = useCallback((project) => setSelected(project), [])
  const handleClose = useCallback(() => setSelected(null), [])

  return (
    <section
      id="projects"
      className="py-24 px-6 md:px-12 border-b"
      style={{ borderColor: 'var(--color-border)' }}
    >
      <div className="max-w-5xl mx-auto">
        <div
          ref={ref}
          className={`transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <p className="type-eyebrow mb-3" style={{ color: 'var(--color-primary)' }}>
            Projects
          </p>
          <h2
            className="type-section mb-12"
            style={{ color: 'var(--color-text)' }}
          >
            프로젝트
          </h2>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onCardClick={handleCardClick}
              />
            ))}
          </div>
        </div>
      </div>

      {selected && (
        <ProjectLightbox
          project={selected}
          onClose={handleClose}
        />
      )}
    </section>
  )
}
