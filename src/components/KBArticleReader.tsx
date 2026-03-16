import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import rehypeHighlight from 'rehype-highlight'
import type { Article } from '../lib/useMarkdownContent'

const CATEGORY_META: Record<string, { accent: string }> = {
  'ai-tech':     { accent: '#4ade80' },
  'vibe-coding': { accent: '#f97316' },
  'math-stats':  { accent: '#60a5fa' },
  'misc':        { accent: '#a78bfa' },
}

interface Props {
  article: Article
  onBack: () => void
}

export default function KBArticleReader({ article, onBack }: Props) {
  const accent = CATEGORY_META[article.category]?.accent ?? '#4ade80'
  const [readProgress, setReadProgress] = useState(0)
  const contentRef = useRef<HTMLDivElement>(null)

  // Escape key to go back
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onBack()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onBack])

  // Scroll progress tracking
  useEffect(() => {
    const el = contentRef.current
    if (!el) return
    const container = el.closest('[data-kb-scroll]') as HTMLElement | null
    const scrollEl = container ?? window

    const handleScroll = () => {
      const scrollTop = container ? container.scrollTop : window.scrollY
      const scrollHeight = container
        ? container.scrollHeight - container.clientHeight
        : document.documentElement.scrollHeight - window.innerHeight
      setReadProgress(scrollHeight > 0 ? Math.min(scrollTop / scrollHeight, 1) : 0)
    }

    scrollEl.addEventListener('scroll', handleScroll, { passive: true })
    return () => scrollEl.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.div
      key="reader"
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      style={{ display: 'flex', gap: '1.5rem' }}
    >
      {/* Left progress bar */}
      <div
        style={{
          flexShrink: 0,
          width: '2px',
          borderRadius: '1px',
          backgroundColor: 'var(--c-border)',
          position: 'relative',
          alignSelf: 'stretch',
          minHeight: '120px',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: `${readProgress * 100}%`,
            backgroundColor: accent,
            borderRadius: '1px',
            boxShadow: `0 0 8px ${accent}80`,
            transition: 'height 0.1s linear',
          }}
        />
      </div>

      {/* Main content */}
      <div ref={contentRef} style={{ flex: 1, minWidth: 0 }}>
        {/* Back button */}
        <button
          onClick={onBack}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.3rem 0.75rem',
            border: '1px solid var(--c-border)',
            borderRadius: '0.375rem',
            backgroundColor: 'transparent',
            color: 'var(--c-subtle)',
            fontFamily: 'var(--f-mono)',
            fontSize: '0.7rem',
            cursor: 'pointer',
            marginBottom: '1.5rem',
            transition: 'border-color 0.2s, color 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = accent
            e.currentTarget.style.color = accent
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'var(--c-border)'
            e.currentTarget.style.color = 'var(--c-subtle)'
          }}
        >
          <ArrowLeft size={12} />
          返回列表
          <span style={{ color: 'var(--c-muted)', marginLeft: '0.25rem' }}>[Esc]</span>
        </button>

        {/* Article header */}
        <div style={{ marginBottom: '2rem', paddingBottom: '1.25rem', borderBottom: `1px solid ${accent}20` }}>
          <h2
            style={{
              fontFamily: 'var(--f-display)',
              fontSize: '1.85rem',
              fontWeight: 700,
              color: 'var(--c-text)',
              lineHeight: 1.3,
              marginBottom: '0.75rem',
            }}
          >
            {article.title}
          </h2>
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <span style={{ fontFamily: 'var(--f-mono)', fontSize: '0.65rem', color: 'var(--c-muted)' }}>
              {article.date}
            </span>
            {article.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontFamily: 'var(--f-mono)',
                  fontSize: '0.6rem',
                  color: accent,
                  padding: '0.1rem 0.4rem',
                  border: `1px solid ${accent}40`,
                  borderRadius: '0.25rem',
                  backgroundColor: `${accent}0a`,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
          {article.summary && (
            <p
              style={{
                marginTop: '0.75rem',
                fontSize: '1rem',
                color: 'var(--c-subtle)',
                lineHeight: 1.7,
                fontStyle: 'italic',
                paddingLeft: '0.75rem',
                borderLeft: `2px solid ${accent}50`,
              }}
            >
              {article.summary}
            </p>
          )}
        </div>

        {/* Markdown body */}
        <div className="kb-prose">
          <ReactMarkdown
            remarkPlugins={[remarkGfm, remarkMath]}
            rehypePlugins={[rehypeKatex, rehypeHighlight]}
            components={{
              h2: ({ children }) => (
                <h2
                  style={{
                    fontFamily: 'var(--f-display)',
                    fontSize: '1.35rem',
                    fontWeight: 700,
                    color: 'var(--c-text)',
                    marginTop: '2rem',
                    marginBottom: '0.75rem',
                    paddingBottom: '0.4rem',
                    borderBottom: `1px solid ${accent}25`,
                  }}
                >
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3
                  style={{
                    fontFamily: 'var(--f-display)',
                    fontSize: '1.05rem',
                    fontWeight: 600,
                    color: accent,
                    marginTop: '1.5rem',
                    marginBottom: '0.5rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                  }}
                >
                  {children}
                </h3>
              ),
              p: ({ children }) => (
                <p
                  style={{
                    fontSize: '1rem',
                    color: 'var(--c-subtle)',
                    lineHeight: 1.9,
                    marginBottom: '1.1rem',
                  }}
                >
                  {children}
                </p>
              ),
              strong: ({ children }) => (
                <strong style={{ color: 'var(--c-text)', fontWeight: 600 }}>{children}</strong>
              ),
              code: ({ inline, children, ...props }: { inline?: boolean; children?: React.ReactNode }) =>
                inline ? (
                  <code
                    style={{
                      fontFamily: 'var(--f-mono)',
                      fontSize: '0.9rem',
                      color: accent,
                      backgroundColor: `${accent}10`,
                      padding: '0.1rem 0.3rem',
                      borderRadius: '0.25rem',
                    }}
                  >
                    {children}
                  </code>
                ) : (
                  <code style={{ fontFamily: 'var(--f-mono)', fontSize: '0.875rem' }} {...props}>
                    {children}
                  </code>
                ),
              pre: ({ children }) => (
                <pre
                  style={{
                    backgroundColor: 'var(--c-raised)',
                    border: '1px solid var(--c-border)',
                    borderRadius: '0.5rem',
                    padding: '1rem 1.25rem',
                    overflowX: 'auto',
                    marginBottom: '1.25rem',
                    fontFamily: 'var(--f-mono)',
                    fontSize: '0.875rem',
                    lineHeight: 1.6,
                  }}
                >
                  {children}
                </pre>
              ),
              table: ({ children }) => (
                <div style={{ overflowX: 'auto', marginBottom: '1.25rem' }}>
                  <table
                    style={{
                      width: '100%',
                      borderCollapse: 'collapse',
                      fontFamily: 'var(--f-mono)',
                      fontSize: '0.875rem',
                    }}
                  >
                    {children}
                  </table>
                </div>
              ),
              th: ({ children }) => (
                <th
                  style={{
                    padding: '0.5rem 0.875rem',
                    textAlign: 'left',
                    color: accent,
                    fontWeight: 600,
                    borderBottom: `1px solid ${accent}30`,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {children}
                </th>
              ),
              td: ({ children }) => (
                <td
                  style={{
                    padding: '0.45rem 0.875rem',
                    color: 'var(--c-subtle)',
                    borderBottom: '1px solid var(--c-border)',
                    fontSize: '0.875rem',
                  }}
                >
                  {children}
                </td>
              ),
              li: ({ children }) => (
                <li
                  style={{
                    fontSize: '1rem',
                    color: 'var(--c-subtle)',
                    lineHeight: 1.8,
                    marginBottom: '0.4rem',
                  }}
                >
                  {children}
                </li>
              ),
              ul: ({ children }) => (
                <ul style={{ paddingLeft: '1.25rem', marginBottom: '1rem' }}>{children}</ul>
              ),
              ol: ({ children }) => (
                <ol style={{ paddingLeft: '1.25rem', marginBottom: '1rem' }}>{children}</ol>
              ),
              blockquote: ({ children }) => (
                <blockquote
                  style={{
                    paddingLeft: '1rem',
                    borderLeft: `3px solid ${accent}60`,
                    margin: '1rem 0',
                    color: 'var(--c-muted)',
                    fontStyle: 'italic',
                  }}
                >
                  {children}
                </blockquote>
              ),
            }}
          >
            {article.body}
          </ReactMarkdown>
        </div>
      </div>
    </motion.div>
  )
}
