import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Rss, Calendar } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

// ── Types ────────────────────────────────────────────────────────────────────

interface NewsArticle {
  title: string
  description: string
  date: string
  slug: string
  url: string
  image: string
  video: string
  categories: string[]
  tags: string[]
  body: string
}

interface NewsFeed {
  updated: string
  articles: NewsArticle[]
}

// ── Constants ────────────────────────────────────────────────────────────────

const ACCENT = '#60a5fa'

// ── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(dateStr: string): string {
  try {
    return new Date(dateStr).toLocaleDateString('zh-TW', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
  } catch {
    return dateStr
  }
}

// ── Animation variants ───────────────────────────────────────────────────────

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
}

const itemAnim = {
  hidden: { opacity: 0, x: 20 },
  show: { opacity: 1, x: 0, transition: { duration: 0.35, ease: 'easeOut' as const } },
}

// ── Article List Layer ───────────────────────────────────────────────────────

function NewsArticleList({
  articles,
  onSelect,
}: {
  articles: NewsArticle[]
  onSelect: (a: NewsArticle) => void
}) {
  return (
    <motion.div
      key="list"
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
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
              border: `1px solid ${ACCENT}20`,
              borderRadius: '0.75rem',
              padding: '1.1rem 1.25rem',
              cursor: 'pointer',
              display: 'grid',
              gridTemplateColumns: 'auto 1fr auto',
              gap: '1rem',
              alignItems: 'center',
            }}
          >
            {/* Index */}
            <span
              style={{
                fontFamily: 'var(--f-mono)',
                fontSize: '1.25rem',
                fontWeight: 700,
                color: `${ACCENT}50`,
                lineHeight: 1,
                minWidth: '2.5rem',
              }}
            >
              {String(i + 1).padStart(2, '0')}
            </span>

            {/* Title + description + tags */}
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
                {article.description}
              </p>
              <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap', marginTop: '0.45rem' }}>
                {article.tags.slice(0, 4).map((tag) => (
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
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                gap: '0.5rem',
                flexShrink: 0,
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--f-mono)',
                  fontSize: '0.6rem',
                  color: 'var(--c-muted)',
                  whiteSpace: 'nowrap',
                }}
              >
                {formatDate(article.date)}
              </span>
              <span style={{ fontSize: '0.75rem', color: ACCENT, fontFamily: 'var(--f-mono)' }}>→</span>
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
            // 暫無文章，執行 python src/main.py 後自動更新
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}

// ── Article Reader Layer ─────────────────────────────────────────────────────

function NewsArticleReader({
  article,
  onBack,
}: {
  article: NewsArticle
  onBack: () => void
}) {
  const [readProgress, setReadProgress] = useState(0)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onBack()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onBack])

  useEffect(() => {
    const el = contentRef.current
    if (!el) return
    const container = el.closest('[data-news-scroll]') as HTMLElement | null
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
            backgroundColor: ACCENT,
            borderRadius: '1px',
            boxShadow: `0 0 8px ${ACCENT}80`,
            transition: 'height 0.1s linear',
          }}
        />
      </div>

      {/* Content */}
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
            e.currentTarget.style.borderColor = ACCENT
            e.currentTarget.style.color = ACCENT
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
        <div
          style={{
            marginBottom: '2rem',
            paddingBottom: '1.25rem',
            borderBottom: `1px solid ${ACCENT}20`,
          }}
        >
          {/* Featured media：影片優先，無影片則顯示圖片 */}
          {article.video ? (
            <div
              style={{
                width: '100%',
                borderRadius: '0.75rem',
                overflow: 'hidden',
                backgroundColor: 'var(--c-raised)',
                marginBottom: '1.25rem',
              }}
            >
              <video
                src={article.video}
                poster={article.image || undefined}
                controls
                style={{ width: '100%', display: 'block', maxHeight: '400px', objectFit: 'cover' }}
                onError={(e) => {
                  ;(e.target as HTMLVideoElement).parentElement!.style.display = 'none'
                }}
              />
            </div>
          ) : article.image ? (
            <div
              style={{
                width: '100%',
                aspectRatio: '16/9',
                borderRadius: '0.75rem',
                overflow: 'hidden',
                backgroundColor: 'var(--c-raised)',
                marginBottom: '1.25rem',
              }}
            >
              <img
                src={article.image}
                alt={article.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={(e) => {
                  ;(e.target as HTMLImageElement).parentElement!.style.display = 'none'
                }}
              />
            </div>
          ) : null}

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

          <div
            style={{
              display: 'flex',
              gap: '0.75rem',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <Calendar size={11} color="var(--c-muted)" />
              <span style={{ fontFamily: 'var(--f-mono)', fontSize: '0.65rem', color: 'var(--c-muted)' }}>
                {formatDate(article.date)}
              </span>
            </div>
            {article.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontFamily: 'var(--f-mono)',
                  fontSize: '0.6rem',
                  color: ACCENT,
                  padding: '0.1rem 0.4rem',
                  border: `1px solid ${ACCENT}40`,
                  borderRadius: '0.25rem',
                  backgroundColor: `${ACCENT}0a`,
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {article.description && (
            <p
              style={{
                marginTop: '0.75rem',
                fontSize: '1rem',
                color: 'var(--c-subtle)',
                lineHeight: 1.7,
                fontStyle: 'italic',
                paddingLeft: '0.75rem',
                borderLeft: `2px solid ${ACCENT}50`,
              }}
            >
              {article.description}
            </p>
          )}
        </div>

        {/* Body */}
        {article.body ? (
          <div className="kb-prose">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
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
                      borderBottom: `1px solid ${ACCENT}25`,
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
                      color: ACCENT,
                      marginTop: '1.5rem',
                      marginBottom: '0.5rem',
                      textTransform: 'uppercase' as const,
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
                a: ({ href, children }) => (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: ACCENT, textDecoration: 'underline', textUnderlineOffset: '2px' }}
                  >
                    {children}
                  </a>
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
                        color: ACCENT,
                        backgroundColor: `${ACCENT}10`,
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
                ul: ({ children }) => (
                  <ul style={{ paddingLeft: '1.25rem', marginBottom: '1rem' }}>{children}</ul>
                ),
                ol: ({ children }) => (
                  <ol style={{ paddingLeft: '1.25rem', marginBottom: '1rem' }}>{children}</ol>
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
                blockquote: ({ children }) => (
                  <blockquote
                    style={{
                      paddingLeft: '1rem',
                      borderLeft: `3px solid ${ACCENT}60`,
                      margin: '1rem 0',
                      color: 'var(--c-muted)',
                      fontStyle: 'italic',
                    }}
                  >
                    {children}
                  </blockquote>
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
                      color: ACCENT,
                      fontWeight: 600,
                      borderBottom: `1px solid ${ACCENT}30`,
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
              }}
            >
              {article.body}
            </ReactMarkdown>
          </div>
        ) : (
          /* Fallback for old articles without body */
          <div
            style={{
              padding: '2rem',
              borderRadius: '0.75rem',
              backgroundColor: 'var(--c-surface)',
              border: `1px solid ${ACCENT}20`,
              textAlign: 'center',
            }}
          >
            <p style={{ color: 'var(--c-subtle)', fontSize: '0.85rem', marginBottom: '1rem' }}>
              此篇文章的完整內容尚未同步。
            </p>
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: 'var(--f-mono)',
                fontSize: '0.72rem',
                color: ACCENT,
                textDecoration: 'none',
              }}
            >
              前往原文閱讀 →
            </a>
          </div>
        )}
      </div>
    </motion.div>
  )
}

// ── Main Component ───────────────────────────────────────────────────────────

export default function AINewsFeed() {
  const [articles, setArticles] = useState<NewsArticle[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [selected, setSelected] = useState<NewsArticle | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/stevenbocheng/AI-NEWS-Teams/main/public/ai-news.json')
      .then((r) => {
        if (!r.ok) throw new Error('fetch failed')
        return r.json() as Promise<NewsFeed>
      })
      .then((data) => {
        setArticles(data.articles ?? [])
        setLoading(false)
      })
      .catch(() => {
        setError(true)
        setLoading(false)
      })
  }, [])

  const allTags = Array.from(new Set(articles.flatMap((a) => a.tags))).slice(0, 15)
  const filteredArticles = articles.filter((a) => {
    const q = searchQuery.toLowerCase()
    const matchSearch = !q || a.title.toLowerCase().includes(q) || a.description.toLowerCase().includes(q)
    const matchTag = !selectedTag || a.tags.includes(selectedTag)
    return matchSearch && matchTag
  })

  return (
    <section id="ai-news" style={{ padding: '5rem 2rem', maxWidth: '1100px', margin: '0 auto' }}>
      {/* Section header */}
      <div style={{ marginBottom: '3rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.6rem' }}>
          <p
            style={{
              fontFamily: 'var(--f-mono)',
              fontSize: '0.7rem',
              color: ACCENT,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
            }}
          >
            // ai-curated news
          </p>
          <span
            style={{
              fontFamily: 'var(--f-mono)',
              fontSize: '0.6rem',
              color: ACCENT,
              padding: '0.1rem 0.5rem',
              border: `1px solid ${ACCENT}40`,
              borderRadius: '0.25rem',
              backgroundColor: `${ACCENT}08`,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.3rem',
            }}
          >
            <Rss size={9} />
            每日自動更新
          </span>
        </div>
        <h2
          style={{
            fontFamily: 'var(--f-display)',
            fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
            fontWeight: 700,
            color: 'var(--c-text)',
            marginBottom: '0.5rem',
          }}
        >
          AI 科技新聞
        </h2>
        <p style={{ fontSize: '0.85rem', color: 'var(--c-subtle)', lineHeight: 1.7 }}>
          由 8 個 AI 代理協作，每日自動收集、深度研究、撰寫並發布繁體中文科技新聞。
        </p>
      </div>

      {/* Content layers */}
      <div data-news-scroll style={{ position: 'relative', overflowX: 'hidden' }}>
        {/* Loading skeleton */}
        {loading && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                style={{
                  backgroundColor: 'var(--c-surface)',
                  border: '1px solid var(--c-border)',
                  borderRadius: '0.75rem',
                  height: '88px',
                  opacity: 0.35,
                }}
              />
            ))}
          </div>
        )}

        {/* Error state */}
        {error && !loading && (
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
            // 暫無文章，執行 python src/main.py 後自動更新
          </div>
        )}

        {/* Search + Tag filter（只在列表層顯示）*/}
        {!loading && !error && selected === null && articles.length > 0 && (
          <div style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
            <input
              type="text"
              placeholder="搜尋文章標題或描述..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '0.5rem 0.875rem',
                backgroundColor: 'var(--c-surface)',
                border: `1px solid ${searchQuery ? ACCENT + '60' : 'var(--c-border)'}`,
                borderRadius: '0.5rem',
                color: 'var(--c-text)',
                fontFamily: 'var(--f-mono)',
                fontSize: '0.78rem',
                outline: 'none',
                boxSizing: 'border-box' as const,
                transition: 'border-color 0.2s',
              }}
            />
            {allTags.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem', alignItems: 'center' }}>
                <span style={{ fontFamily: 'var(--f-mono)', fontSize: '0.58rem', color: 'var(--c-muted)', marginRight: '0.15rem' }}>
                  tag:
                </span>
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                    style={{
                      fontFamily: 'var(--f-mono)',
                      fontSize: '0.6rem',
                      padding: '0.1rem 0.5rem',
                      borderRadius: '0.25rem',
                      border: `1px solid ${selectedTag === tag ? ACCENT + '80' : 'var(--c-border)'}`,
                      backgroundColor: selectedTag === tag ? `${ACCENT}15` : 'transparent',
                      color: selectedTag === tag ? ACCENT : 'var(--c-muted)',
                      cursor: 'pointer',
                      transition: 'all 0.15s',
                    }}
                  >
                    {tag}
                  </button>
                ))}
                {(searchQuery || selectedTag) && (
                  <button
                    onClick={() => { setSearchQuery(''); setSelectedTag(null) }}
                    style={{
                      fontFamily: 'var(--f-mono)',
                      fontSize: '0.6rem',
                      padding: '0.1rem 0.5rem',
                      borderRadius: '0.25rem',
                      border: '1px solid var(--c-border)',
                      backgroundColor: 'transparent',
                      color: 'var(--c-muted)',
                      cursor: 'pointer',
                      marginLeft: '0.2rem',
                    }}
                  >
                    ✕ 清除
                  </button>
                )}
                {(searchQuery || selectedTag) && (
                  <span style={{ fontFamily: 'var(--f-mono)', fontSize: '0.58rem', color: 'var(--c-muted)', marginLeft: '0.25rem' }}>
                    {filteredArticles.length} / {articles.length} 篇
                  </span>
                )}
              </div>
            )}
          </div>
        )}

        {/* Two-layer navigation */}
        {!loading && !error && (
          <AnimatePresence mode="wait">
            {selected === null ? (
              <NewsArticleList
                key="list"
                articles={filteredArticles}
                onSelect={(a) => setSelected(a)}
              />
            ) : (
              <NewsArticleReader
                key="reader"
                article={selected}
                onBack={() => setSelected(null)}
              />
            )}
          </AnimatePresence>
        )}
      </div>

      {/* Pipeline info bar（只在列表層顯示）*/}
      {!loading && !error && selected === null && filteredArticles.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          style={{
            marginTop: '1.5rem',
            padding: '0.75rem 1rem',
            borderRadius: '0.6rem',
            backgroundColor: `${ACCENT}06`,
            border: `1px solid ${ACCENT}15`,
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            flexWrap: 'wrap',
          }}
        >
          <span style={{ fontFamily: 'var(--f-mono)', fontSize: '0.6rem', color: ACCENT, flexShrink: 0 }}>
            ✦ Pipeline —
          </span>
          {['Researcher', 'Deep Researcher', 'Writer', 'Manager', 'Publisher'].map((agent, i, arr) => (
            <span key={agent} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontFamily: 'var(--f-mono)', fontSize: '0.62rem', color: 'var(--c-subtle)' }}>
                {agent}
              </span>
              {i < arr.length - 1 && (
                <span style={{ color: 'var(--c-muted)', fontSize: '0.6rem' }}>→</span>
              )}
            </span>
          ))}
          <span
            style={{
              marginLeft: 'auto',
              fontFamily: 'var(--f-mono)',
              fontSize: '0.6rem',
              color: 'var(--c-muted)',
            }}
          >
            LangChain · LangGraph · GPT-4o
          </span>
        </motion.div>
      )}
    </section>
  )
}
