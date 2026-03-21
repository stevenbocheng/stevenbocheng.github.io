import { motion } from 'framer-motion'
import { Github, ExternalLink } from 'lucide-react'

const SIDE_PROJECTS = [
  {
    title: 'Seoul Travel Planner',
    titleZh: '首爾旅遊規劃大師',
    desc: '由開發者主導需求與測試，與 AI 協作完成架構設計，從零打造一款專為首爾自由行設計的全端 Web App。',
    highlights: [
      '每日行程規劃，支援新增、編輯、排序景點',
      'Gemini AI 自動生成景點介紹與行程優化建議',
      '即時首爾天氣預報',
      '韓元 / 台幣匯率換算與記帳',
      'Naver Map 導航路線規劃',
      'Email 帳號登入，多用戶資料隔離',
    ],
    tags: ['React', 'TypeScript', 'Gemini AI', 'Google Apps Script', 'Tailwind CSS', 'GitHub Actions'],
    github: 'https://github.com/stevenbocheng/-app',
    demo: 'https://stevenbocheng.github.io/-app/',
    accent: '#f97316',
    vibeCodingNote: '全程 AI 協作開發，涵蓋介面設計、API 整合與錯誤處理，快速交付完整產品。',
  },
  {
    title: 'Lucky Paws Scratchers',
    titleZh: '招財貓刮刮樂',
    desc: '以 Vibe Coding 方式開發的線上即時多人刮刮樂遊戲，涵蓋完整遊戲互動、雲端同步與後台管理功能。',
    highlights: [
      '手指刮開卡牌，支援觸控與滑鼠，自動偵測刮開進度',
      '即時多人同步，防止多人同時刮同一張牌',
      '後台可自訂獎項、封面圖與音效',
      '可產生唯讀分享連結給其他人觀看',
      '手機震動回饋與背景音樂',
    ],
    tags: ['React', 'TypeScript', 'Firebase', 'Canvas API', 'Framer Motion', 'GitHub Actions'],
    github: 'https://github.com/stevenbocheng/Scratch-off-card',
    demo: 'https://stevenbocheng.github.io/Scratch-off-card/',
    accent: '#ec4899',
    vibeCodingNote: '與 AI 協作完成從構想到上線的完整開發流程，自行主導需求規劃與功能測試。',
  },
]

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
}

export default function SideProjects() {
  return (
    <section style={{ padding: '0 2rem 5rem', maxWidth: '1100px', margin: '0 auto' }}>
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          marginBottom: '1.75rem',
          paddingTop: '2rem',
          borderTop: '1px dashed var(--c-border)',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--f-mono)',
            fontSize: '0.68rem',
            color: 'var(--c-muted)',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
          }}
        >
          // side projects · vibe coded
        </p>
        <span
          style={{
            fontFamily: 'var(--f-mono)',
            fontSize: '0.6rem',
            color: '#f97316',
            padding: '0.1rem 0.5rem',
            border: '1px solid #f9731640',
            borderRadius: '0.25rem',
            backgroundColor: '#f9731608',
            letterSpacing: '0.06em',
          }}
        >
          AI-Augmented
        </span>
      </div>

      {/* Cards */}
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-40px' }}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 460px), 1fr))',
          gap: '1.25rem',
        }}
      >
        {SIDE_PROJECTS.map((proj) => (
          <motion.div
            key={proj.title}
            variants={fadeUp}
            className="card-hover"
            style={{
              backgroundColor: 'var(--c-surface)',
              border: `1px solid ${proj.accent}30`,
              borderRadius: '1rem',
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}
          >
            {/* Top row: title + badge */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.75rem' }}>
              <div>
                <h3
                  style={{
                    fontFamily: 'var(--f-display)',
                    fontSize: '1.05rem',
                    fontWeight: 700,
                    color: 'var(--c-text)',
                    marginBottom: '0.2rem',
                  }}
                >
                  {proj.title}
                </h3>
                <p style={{ fontFamily: 'var(--f-mono)', fontSize: '0.65rem', color: proj.accent }}>
                  {proj.titleZh}
                </p>
              </div>
              <span
                style={{
                  fontFamily: 'var(--f-mono)',
                  fontSize: '0.6rem',
                  color: proj.accent,
                  padding: '0.15rem 0.5rem',
                  border: `1px solid ${proj.accent}50`,
                  borderRadius: '0.25rem',
                  backgroundColor: `${proj.accent}0a`,
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                }}
              >
                Vibe Coded
              </span>
            </div>

            {/* Description */}
            <p style={{ fontSize: '0.85rem', color: 'var(--c-subtle)', lineHeight: 1.7 }}>
              {proj.desc}
            </p>

            {/* Highlights */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
              {proj.highlights.map((h) => (
                <div key={h} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div
                    style={{
                      width: '4px',
                      height: '4px',
                      borderRadius: '50%',
                      backgroundColor: proj.accent,
                      flexShrink: 0,
                    }}
                  />
                  <span style={{ fontSize: '0.78rem', color: 'var(--c-subtle)' }}>{h}</span>
                </div>
              ))}
            </div>

            {/* Tags */}
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
              {proj.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontFamily: 'var(--f-mono)',
                    fontSize: '0.65rem',
                    color: 'var(--c-muted)',
                    padding: '0.15rem 0.5rem',
                    border: '1px solid var(--c-border)',
                    borderRadius: '0.25rem',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Vibe Coding note */}
            <div
              style={{
                padding: '0.6rem 0.875rem',
                borderRadius: '0.4rem',
                backgroundColor: `${proj.accent}08`,
                borderLeft: `2px solid ${proj.accent}60`,
                fontSize: '0.75rem',
                color: 'var(--c-muted)',
                lineHeight: 1.6,
              }}
            >
              <span style={{ color: proj.accent, fontFamily: 'var(--f-mono)', fontSize: '0.65rem' }}>✦ Vibe Coding — </span>
              {proj.vibeCodingNote}
            </div>

            {/* Links */}
            <div style={{ display: 'flex', gap: '0.6rem', marginTop: 'auto' }}>
              <a
                href={proj.github}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.4rem 0.875rem',
                  border: '1px solid var(--c-border)',
                  borderRadius: '0.4rem',
                  fontFamily: 'var(--f-mono)',
                  fontSize: '0.72rem',
                  color: 'var(--c-text)',
                  textDecoration: 'none',
                  transition: 'border-color 0.2s, color 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = proj.accent
                  e.currentTarget.style.color = proj.accent
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--c-border)'
                  e.currentTarget.style.color = 'var(--c-text)'
                }}
              >
                <Github size={12} />
                GitHub
              </a>
              <a
                href={proj.demo}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.4rem 0.875rem',
                  backgroundColor: proj.accent,
                  borderRadius: '0.4rem',
                  fontFamily: 'var(--f-mono)',
                  fontSize: '0.72rem',
                  color: '#090910',
                  fontWeight: 600,
                  textDecoration: 'none',
                  transition: 'opacity 0.2s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.85' }}
                onMouseLeave={(e) => { e.currentTarget.style.opacity = '1' }}
              >
                <ExternalLink size={12} />
                Live Demo
              </a>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
