import { useState, useEffect } from 'react'

const SECTIONS = [
  { id: 'hero',       label: 'Intro' },
  { id: 'projects',   label: 'Projects' },
  { id: 'ai-news',    label: 'AI News' },
  { id: 'knowledge',  label: 'Notes' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact',    label: 'Contact' },
]

export default function NavDots() {
  const [active, setActive] = useState('hero')
  const [hovered, setHovered] = useState<string | null>(null)

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id) },
        { threshold: 0.35 },
      )
      obs.observe(el)
      observers.push(obs)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  return (
    <nav
      aria-label="Page sections"
      className="nav-dots"
      style={{
        position: 'fixed',
        right: '1.75rem',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 200,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 0,
      }}
    >
      {SECTIONS.map(({ id, label }, i) => {
        const isActive = active === id
        const isHovered = hovered === id

        return (
          <div
            key={id}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          >
            {/* Connector line above (not for first) */}
            {i > 0 && (
              <div
                style={{
                  width: '1px',
                  height: '2rem',
                  backgroundColor: isActive ? 'var(--c-neon)' : 'var(--c-border)',
                  transition: 'background-color 0.3s',
                }}
              />
            )}

            {/* Dot + label row */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                cursor: 'pointer',
                position: 'relative',
              }}
              onMouseEnter={() => setHovered(id)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => {
                document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              {/* Label (appears on hover, to the left of dot) */}
              <span
                style={{
                  fontFamily: 'var(--f-mono)',
                  fontSize: '0.65rem',
                  color: 'var(--c-neon)',
                  letterSpacing: '0.08em',
                  whiteSpace: 'nowrap',
                  opacity: isHovered ? 1 : 0,
                  transform: isHovered ? 'translateX(0)' : 'translateX(6px)',
                  transition: 'opacity 0.2s, transform 0.2s',
                  pointerEvents: 'none',
                }}
              >
                {label}
              </span>

              {/* Dot */}
              <div
                style={{
                  width: isActive ? '8px' : '6px',
                  height: isActive ? '8px' : '6px',
                  borderRadius: '50%',
                  backgroundColor: isActive ? 'var(--c-neon)' : 'var(--c-border)',
                  border: isActive ? '0px' : '1px solid var(--c-muted)',
                  boxShadow: isActive ? '0 0 8px rgba(74,222,128,0.6)' : 'none',
                  transition: 'all 0.25s ease',
                  flexShrink: 0,
                }}
              />
            </div>
          </div>
        )
      })}
    </nav>
  )
}
