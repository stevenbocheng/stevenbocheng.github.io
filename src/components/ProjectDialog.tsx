import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Github, ExternalLink } from 'lucide-react'

/* ─── Types ──────────────────────────────────────────── */
export interface ProjectData {
  id: number
  title: string
  subtitle: string
  accentColor: string
  github?: string
  demo?: string
  body: React.ReactNode
}

interface Props {
  project: ProjectData | null
  open: boolean
  onClose: () => void
}

/* ─── Section label ──────────────────────────────────── */
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        fontFamily: 'var(--f-mono)',
        fontSize: '0.65rem',
        color: 'var(--c-muted)',
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        marginBottom: '0.875rem',
      }}
    >
      {children}
    </p>
  )
}

/* ─── Stat badge ─────────────────────────────────────── */
export function StatBadge({ label, value, color }: { label: string; value: string; color?: string }) {
  const c = color ?? 'var(--c-neon)'
  return (
    <div
      style={{
        padding: '0.75rem 1rem',
        border: `1px solid ${c}28`,
        borderRadius: '0.5rem',
        backgroundColor: `${c}08`,
      }}
    >
      <p style={{ fontFamily: 'var(--f-mono)', fontSize: '1.25rem', fontWeight: 700, color: c }}>
        {value}
      </p>
      <p style={{ fontSize: '0.75rem', color: 'var(--c-muted)', marginTop: '0.2rem' }}>{label}</p>
    </div>
  )
}

/* ─── Highlight row ──────────────────────────────────── */
export function Highlight({
  icon,
  title,
  desc,
  color,
}: {
  icon?: string
  title: string
  desc: string
  color?: string
}) {
  const c = color ?? 'var(--c-neon)'
  return (
    <div
      style={{
        display: 'flex',
        gap: '0.875rem',
        padding: '0.875rem 1rem',
        borderRadius: '0.5rem',
        backgroundColor: 'var(--c-raised)',
        border: '1px solid var(--c-border)',
        borderLeft: `2px solid ${c}`,
      }}
    >
      {icon && <span style={{ fontSize: '1.1rem', flexShrink: 0 }}>{icon}</span>}
      <div>
        <p style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--c-text)', marginBottom: '0.2rem' }}>
          {title}
        </p>
        <p style={{ fontSize: '0.8rem', color: 'var(--c-subtle)', lineHeight: 1.6 }}>{desc}</p>
      </div>
    </div>
  )
}

/* ─── Modal ──────────────────────────────────────────── */
export default function ProjectDialog({ project, open, onClose }: Props) {
  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, onClose])

  const modal = (
    <AnimatePresence>
      {open && project && (
        <>
          {/* ── Backdrop ── */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(9,9,16,0.85)',
              backdropFilter: 'blur(8px)',
              zIndex: 9000,
            }}
          />

          {/* ── Centering shell (pointer-events:none so clicks pass through to backdrop) ── */}
          <div
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9001,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1.5rem',
              pointerEvents: 'none',
            }}
          >
            {/* ── Dialog box (re-enable pointer events) ── */}
            <motion.div
              key="modal"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.28, ease: 'easeOut' as const }}
              onClick={(e) => e.stopPropagation()}
              style={{
                pointerEvents: 'auto',
                width: '100%',
                maxWidth: '920px',
                maxHeight: '86vh',
                overflowY: 'auto',
                backgroundColor: 'var(--c-surface)',
                border: `1px solid ${project.accentColor}50`,
                borderRadius: '1.25rem',
                boxShadow: `0 24px 80px rgba(0,0,0,0.6), 0 0 40px ${project.accentColor}10`,
                outline: 'none',
              }}
            >
              {/* ── Sticky header ── */}
              <div
                style={{
                  position: 'sticky',
                  top: 0,
                  zIndex: 10,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '1rem',
                  padding: '1.25rem 1.75rem',
                  backgroundColor: 'var(--c-surface)',
                  borderBottom: '1px solid var(--c-border)',
                  borderRadius: '1.25rem 1.25rem 0 0',
                }}
              >
                <div style={{ minWidth: 0 }}>
                  <h2
                    style={{
                      fontFamily: 'var(--f-display)',
                      fontSize: '1.3rem',
                      fontWeight: 700,
                      color: 'var(--c-text)',
                      lineHeight: 1.2,
                    }}
                  >
                    {project.title}
                  </h2>
                  <p style={{ fontSize: '0.8rem', color: 'var(--c-muted)', marginTop: '0.2rem' }}>
                    {project.subtitle}
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexShrink: 0 }}>
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        padding: '0.45rem 0.875rem',
                        border: '1px solid var(--c-border)',
                        borderRadius: '0.5rem',
                        fontFamily: 'var(--f-mono)',
                        fontSize: '0.75rem',
                        color: 'var(--c-text)',
                        textDecoration: 'none',
                        transition: 'border-color 0.2s',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.borderColor = project.accentColor)}
                      onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--c-border)')}
                    >
                      <Github size={13} />
                      GitHub
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        padding: '0.45rem 0.875rem',
                        backgroundColor: project.accentColor,
                        borderRadius: '0.5rem',
                        fontFamily: 'var(--f-mono)',
                        fontSize: '0.75rem',
                        color: 'var(--c-void)',
                        fontWeight: 600,
                        textDecoration: 'none',
                      }}
                    >
                      <ExternalLink size={13} />
                      Live Demo
                    </a>
                  )}

                  {/* Close button */}
                  <button
                    onClick={onClose}
                    aria-label="關閉"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '2rem',
                      height: '2rem',
                      borderRadius: '0.5rem',
                      border: '1px solid var(--c-border)',
                      background: 'transparent',
                      color: 'var(--c-muted)',
                      cursor: 'pointer',
                      transition: 'color 0.2s, border-color 0.2s',
                      flexShrink: 0,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = 'var(--c-text)'
                      e.currentTarget.style.borderColor = 'var(--c-text)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'var(--c-muted)'
                      e.currentTarget.style.borderColor = 'var(--c-border)'
                    }}
                  >
                    <X size={14} />
                  </button>
                </div>
              </div>

              {/* ── Body ── */}
              <div style={{ padding: '1.75rem' }}>
                {project.body}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )

  return createPortal(modal, document.body)
}

export { SectionLabel }
