import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import type { Article } from '../lib/useMarkdownContent'

const CATEGORY_META: Record<string, { label: string; accent: string; icon: string }> = {
  'ai-tech':     { label: 'AI 技術',     accent: '#4ade80', icon: '🧠' },
  'vibe-coding': { label: 'VibeCoding使用框架', accent: '#f97316', icon: '⚡' },
  'math-stats':  { label: '數學與統計',  accent: '#60a5fa', icon: '∑'  },
  'misc':        { label: '其他',        accent: '#a78bfa', icon: '✦'  },
}

interface Props {
  category: string
  articles: Article[]
  onBack: () => void
  onSelect: (article: Article) => void
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
}

const itemAnim = {
  hidden: { opacity: 0, x: 20 },
  show: { opacity: 1, x: 0, transition: { duration: 0.35, ease: 'easeOut' as const } },
}

export default function KBArticleList({ category, articles, onBack, onSelect }: Props) {
  const meta = CATEGORY_META[category] ?? { label: category, accent: '#4ade80', icon: '✦' }

  return (
    <motion.div
      key="list"
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.75rem' }}>
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
            transition: 'border-color 0.2s, color 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = meta.accent
            e.currentTarget.style.color = meta.accent
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'var(--c-border)'
            e.currentTarget.style.color = 'var(--c-subtle)'
          }}
        >
          <ArrowLeft size={12} />
          返回
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '1.1rem' }}>{meta.icon}</span>
          <h3
            style={{
              fontFamily: 'var(--f-display)',
              fontSize: '1.1rem',
              fontWeight: 700,
              color: meta.accent,
            }}
          >
            {meta.label}
          </h3>
          <span
            style={{
              fontFamily: 'var(--f-mono)',
              fontSize: '0.6rem',
              color: meta.accent,
              padding: '0.1rem 0.4rem',
              border: `1px solid ${meta.accent}40`,
              borderRadius: '0.25rem',
              backgroundColor: `${meta.accent}0a`,
            }}
          >
            {articles.length} 篇
          </span>
        </div>
      </div>

      {/* Article list */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}
      >
        {articles.map((article, i) => (
          <motion.div
            key={article.slug}
            variants={itemAnim}
            className="card-hover"
            onClick={() => onSelect(article)}
            style={{
              backgroundColor: 'var(--c-surface)',
              border: `1px solid ${meta.accent}20`,
              borderRadius: '0.75rem',
              padding: '1.1rem 1.25rem',
              cursor: 'pointer',
              display: 'grid',
              gridTemplateColumns: 'auto 1fr auto',
              gap: '1rem',
              alignItems: 'center',
            }}
          >
            {/* Index number */}
            <span
              style={{
                fontFamily: 'var(--f-mono)',
                fontSize: '1.25rem',
                fontWeight: 700,
                color: `${meta.accent}50`,
                lineHeight: 1,
                minWidth: '2.5rem',
              }}
            >
              {String(i + 1).padStart(2, '0')}
            </span>

            {/* Title + summary */}
            <div style={{ minWidth: 0 }}>
              <p
                style={{
                  fontFamily: 'var(--f-display)',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  color: 'var(--c-text)',
                  marginBottom: '0.25rem',
                  lineHeight: 1.4,
                }}
              >
                {article.title}
              </p>
              <p
                style={{
                  fontSize: '0.78rem',
                  color: 'var(--c-muted)',
                  lineHeight: 1.5,
                  overflow: 'hidden',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical' as const,
                }}
              >
                {article.summary}
              </p>
              {/* Tags */}
              <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap', marginTop: '0.45rem' }}>
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontFamily: 'var(--f-mono)',
                      fontSize: '0.6rem',
                      color: 'var(--c-muted)',
                      padding: '0.1rem 0.4rem',
                      border: '1px solid var(--c-border)',
                      borderRadius: '0.25rem',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Date + arrow */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem', flexShrink: 0 }}>
              <span
                style={{
                  fontFamily: 'var(--f-mono)',
                  fontSize: '0.6rem',
                  color: 'var(--c-muted)',
                  whiteSpace: 'nowrap',
                }}
              >
                {article.date}
              </span>
              <span style={{ fontSize: '0.75rem', color: meta.accent, fontFamily: 'var(--f-mono)' }}>→</span>
            </div>
          </motion.div>
        ))}

        {articles.length === 0 && (
          <div
            style={{
              padding: '2.5rem',
              textAlign: 'center',
              color: 'var(--c-muted)',
              fontFamily: 'var(--f-mono)',
              fontSize: '0.78rem',
              border: '1px dashed var(--c-border)',
              borderRadius: '0.75rem',
            }}
          >
            // 這個分類還沒有文章
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}
