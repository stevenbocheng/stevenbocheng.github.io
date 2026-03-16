import { motion } from 'framer-motion'
import type { Article } from '../lib/useMarkdownContent'

interface Category {
  key: string
  label: string
  labelZh: string
  accent: string
}

const CATEGORIES: Category[] = [
  { key: 'ai-tech',     label: 'AI 技術',           labelZh: 'AI TECH',      accent: '#4ade80' },
  { key: 'vibe-coding', label: 'VibeCoding使用框架', labelZh: 'VIBE CODING',  accent: '#f97316' },
  { key: 'math-stats',  label: '數學與統計',         labelZh: 'MATH & STATS', accent: '#60a5fa' },
  { key: 'misc',        label: '其他',               labelZh: 'MISC',         accent: '#a78bfa' },
]

interface Props {
  articleMap: Map<string, Article[]>
  onSelect: (category: string) => void
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
}

export default function KBCategoryBento({ articleMap, onSelect }: Props) {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-40px' }}
      className="kb-bento-grid"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '1.25rem',
      }}
    >
      {CATEGORIES.map((cat) => {
        const articles = articleMap.get(cat.key) ?? []
        const latestDate = articles[0]?.date ?? '—'

        return (
          <motion.div
            key={cat.key}
            variants={fadeUp}
            className="card-hover"
            onClick={() => onSelect(cat.key)}
            style={{
              backgroundColor: 'var(--c-surface)',
              border: `1px solid ${cat.accent}30`,
              borderTop: `3px solid ${cat.accent}`,
              borderRadius: '0.875rem',
              padding: '1.5rem 1.75rem',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.875rem',
              minHeight: '160px',
            }}
          >
            {/* Header: labelZh + badge */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <p
                style={{
                  fontFamily: 'var(--f-mono)',
                  fontSize: '0.62rem',
                  color: cat.accent,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                }}
              >
                {cat.labelZh}
              </p>
              <span
                style={{
                  fontFamily: 'var(--f-mono)',
                  fontSize: '0.6rem',
                  color: cat.accent,
                  padding: '0.1rem 0.45rem',
                  border: `1px solid ${cat.accent}40`,
                  borderRadius: '0.25rem',
                  backgroundColor: `${cat.accent}0a`,
                }}
              >
                {articles.length} 篇
              </span>
            </div>

            {/* Title */}
            <h3
              style={{
                fontFamily: 'var(--f-display)',
                fontSize: '1.4rem',
                fontWeight: 700,
                color: 'var(--c-text)',
                lineHeight: 1.2,
              }}
            >
              {cat.label}
            </h3>

            {/* Preview articles */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              {articles.slice(0, 2).map((a) => (
                <div key={a.slug} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div
                    style={{
                      width: '3px',
                      height: '3px',
                      borderRadius: '50%',
                      backgroundColor: cat.accent,
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{
                      fontSize: '0.82rem',
                      color: 'var(--c-subtle)',
                      lineHeight: 1.4,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {a.title}
                  </span>
                </div>
              ))}
              {articles.length === 0 && (
                <span style={{ fontSize: '0.75rem', color: 'var(--c-muted)', fontStyle: 'italic' }}>
                  尚無文章
                </span>
              )}
            </div>

            {/* Footer */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontFamily: 'var(--f-mono)', fontSize: '0.6rem', color: 'var(--c-muted)' }}>
                最新：{latestDate}
              </span>
              <span style={{ fontSize: '0.7rem', color: cat.accent, fontFamily: 'var(--f-mono)' }}>
                → 查看
              </span>
            </div>
          </motion.div>
        )
      })}
    </motion.div>
  )
}
