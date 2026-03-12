import { motion } from 'framer-motion'
import { Mail, Github, Linkedin, ArrowRight } from 'lucide-react'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
}

const card = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' as const } },
}

const cardStyle = {
  backgroundColor: 'var(--c-surface)',
  border: '1px solid var(--c-border)',
  borderRadius: '1rem',
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="bg-grid relative min-h-screen flex items-center justify-center px-5 py-24 overflow-hidden"
    >
      {/* Ambient radial glow — top-left */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background:
            'radial-gradient(ellipse 55% 45% at 20% 35%, rgba(74,222,128,0.05) 0%, transparent 70%)',
        }}
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gridTemplateRows: 'auto auto',
          gap: '1rem',
          width: '100%',
          maxWidth: '1100px',
        }}
      >
        {/* ── Card 1: Name + title + CTA (col 1–2, row 1) ── */}
        <motion.div
          variants={card}
          className="card-hover"
          style={{
            ...cardStyle,
            gridColumn: '1 / 3',
            gridRow: '1 / 2',
            padding: '2.5rem',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Left accent bar */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '3px',
              height: '100%',
              background: 'linear-gradient(180deg, var(--c-neon) 0%, transparent 100%)',
              borderRadius: '0 0 0 1rem',
            }}
          />

          <div style={{ paddingLeft: '1.25rem' }}>
            <p
              style={{
                fontFamily: 'var(--f-mono)',
                fontSize: '0.7rem',
                color: 'var(--c-neon)',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                marginBottom: '1.25rem',
              }}
            >
              // data science · deep learning · computer vision
            </p>

            <h1
              style={{
                fontFamily: 'var(--f-display)',
                fontSize: 'clamp(2.8rem, 5vw, 4.5rem)',
                fontWeight: 700,
                lineHeight: 1.05,
                color: 'var(--c-text)',
                marginBottom: '0.25rem',
              }}
            >
              阮柏誠
            </h1>
            <h2
              style={{
                fontFamily: 'var(--f-display)',
                fontSize: 'clamp(1rem, 2vw, 1.5rem)',
                fontWeight: 400,
                color: 'var(--c-muted)',
                marginBottom: '1.75rem',
                letterSpacing: '0.03em',
              }}
            >
              Bo-Cheng Ruan
            </h2>

            <p
              style={{
                fontSize: '0.975rem',
                color: 'var(--c-subtle)',
                maxWidth: '38rem',
                lineHeight: 1.85,
                marginBottom: '2rem',
              }}
            >
              一位喜歡挑戰自我、追求技術深度的人，對數學、統計與程式開發充滿熱情。
              我特別著迷於機器學習與深度學習背後的數學原理與實際應用，很享受透過所學知識來解決複雜問題的過程。近期我專注於優化 AI 協作工作流，探索如何透過 Prompt Engineering 與自動化工具來提升開發效率。我渴望將這些理論知識轉化為具體的解決方案，在複雜的問題中找出最優解。
            </p>

            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <a
                href="mailto:c326387900@gmail.com"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.6rem 1.25rem',
                  backgroundColor: 'var(--c-neon)',
                  color: 'var(--c-void)',
                  borderRadius: '0.5rem',
                  fontFamily: 'var(--f-mono)',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                  transition: 'opacity 0.2s, box-shadow 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(74,222,128,0.45)'
                  e.currentTarget.style.opacity = '0.9'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = 'none'
                  e.currentTarget.style.opacity = '1'
                }}
              >
                <Mail size={13} />
                Reach out to me
              </a>

              <a
                href="https://github.com/stevenbocheng"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.6rem 1.25rem',
                  border: '1px solid var(--c-border)',
                  color: 'var(--c-text)',
                  borderRadius: '0.5rem',
                  fontFamily: 'var(--f-mono)',
                  fontSize: '0.8rem',
                  textDecoration: 'none',
                  transition: 'border-color 0.2s, color 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--c-neon)'
                  e.currentTarget.style.color = 'var(--c-neon)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--c-border)'
                  e.currentTarget.style.color = 'var(--c-text)'
                }}
              >
                <Github size={13} />
                GitHub
              </a>

              <a
                href="https://www.linkedin.com/in/%E6%9F%8F%E8%AA%A0-%E9%98%AE-a44bb7275"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.6rem 1.25rem',
                  border: '1px solid var(--c-border)',
                  color: 'var(--c-text)',
                  borderRadius: '0.5rem',
                  fontFamily: 'var(--f-mono)',
                  fontSize: '0.8rem',
                  textDecoration: 'none',
                  transition: 'border-color 0.2s, color 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--c-blue)'
                  e.currentTarget.style.color = 'var(--c-blue)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--c-border)'
                  e.currentTarget.style.color = 'var(--c-text)'
                }}
              >
                <Linkedin size={13} />
                LinkedIn
              </a>
            </div>
          </div>
        </motion.div>

        {/* ── Card 2: Photo (col 3, row 1–2) ── */}
        <motion.div
          variants={card}
          className="card-hover"
          style={{
            ...cardStyle,
            gridColumn: '3 / 4',
            gridRow: '1 / 3',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <img
            src="/profile.jpg"
            alt="阮柏誠"
            style={{
              width: '100%',
              flex: 1,
              objectFit: 'cover',
              objectPosition: 'center top',
              minHeight: '240px',
            }}
          />
          <div style={{ padding: '1.25rem', borderTop: '1px solid var(--c-border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
              <span
                style={{
                  width: '7px',
                  height: '7px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--c-neon)',
                  display: 'inline-block',
                  animation: 'pulse 2s cubic-bezier(0.4,0,0.6,1) infinite',
                }}
              />
              <span style={{ fontFamily: 'var(--f-mono)', fontSize: '0.7rem', color: 'var(--c-neon)' }}>
                Open to opportunities
              </span>
            </div>
            <p style={{ fontFamily: 'var(--f-mono)', fontSize: '0.68rem', color: 'var(--c-muted)' }}>
              高雄 · 台灣
            </p>
          </div>
        </motion.div>

        {/* ── Card 3: Background (col 1, row 2) ── */}
        <motion.div
          variants={card}
          className="card-hover"
          style={{ ...cardStyle, gridColumn: '1 / 2', gridRow: '2 / 3', padding: '1.5rem' }}
        >
          <p
            style={{
              fontFamily: 'var(--f-mono)',
              fontSize: '0.65rem',
              color: 'var(--c-muted)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: '1rem',
            }}
          >
            Background
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {[
              { label: '應用數學系', detail: '微積分 · 線代 · 數理統計' },
              { label: '中研院統計所', detail: '暑期實習生' },
              { label: '微積分助教', detail: '淡江大學 · 中山大學' },
            ].map((row) => (
              <div key={row.label} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div
                  style={{
                    width: '2px',
                    height: '1.1rem',
                    borderRadius: '1px',
                    backgroundColor: 'var(--c-neon)',
                    flexShrink: 0,
                  }}
                />
                <span style={{ fontSize: '1.15rem', fontWeight: 500, color: 'var(--c-text)' }}>
                  {row.label}
                </span>
                <span style={{ fontSize: '0.95rem', color: 'var(--c-muted)' }}>{row.detail}</span>
              </div>
            ))}
          </div>

          {/* Relevant Coursework */}
          <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--c-border)' }}>
            <p style={{ fontFamily: 'var(--f-mono)', fontSize: '0.6rem', color: 'var(--c-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.6rem' }}>
              Relevant Coursework
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              {[
                { category: '數學', courses: '微積分 · 高等微積分 · 線性代數 · 拓撲學', color: 'var(--c-neon)' },
                { category: '統計', courses: '機率論 · 數理統計 · 多變量分析 · 回歸分析 · 存活分析', color: '#38bdf8' },
                { category: 'AI', courses: '機器學習 · 深度學習 · 影像變換 · 生成式AI', color: '#a78bfa' },
              ].map(({ category, courses, color }) => (
                <div key={category} style={{ display: 'flex', gap: '0.5rem', alignItems: 'baseline' }}>
                  <span style={{ fontFamily: 'var(--f-mono)', fontSize: '0.62rem', color, flexShrink: 0, minWidth: '2rem' }}>{category}</span>
                  <span style={{ fontSize: '0.72rem', color: 'var(--c-subtle)', lineHeight: 1.5 }}>{courses}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── Card 4: Skill Bars (col 2, row 2) ── */}
        <motion.div
          variants={card}
          className="card-hover"
          style={{ ...cardStyle, gridColumn: '2 / 3', gridRow: '2 / 3', padding: '1.5rem' }}
        >
          <p
            style={{
              fontFamily: 'var(--f-mono)',
              fontSize: '0.65rem',
              color: 'var(--c-muted)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: '1.1rem',
            }}
          >
            Tech Proficiency
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {[
              { name: 'Python', level: 8, label: 'Advanced' },
              { name: 'R', level: 7, label: 'Proficient' },
              { name: 'Deep Learning', level: 7, label: 'Proficient' },
              { name: 'Vibe Coding', level: 7, label: 'AI-Augmented' },
              { name: 'Machine Learning', level: 6, label: 'Proficient' },
              { name: 'Computer Vision', level: 5, label: 'Intermediate' },
              { name: 'C++', level: 5, label: 'Intermediate' },
            ].map((skill) => (
              <div key={skill.name}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                  <span style={{ fontFamily: 'var(--f-mono)', fontSize: '0.75rem', color: 'var(--c-text)' }}>
                    {skill.name}
                  </span>
                  <span style={{ fontFamily: 'var(--f-mono)', fontSize: '0.65rem', color: 'var(--c-muted)' }}>
                    {skill.label}
                  </span>
                </div>
                <div
                  style={{
                    height: '4px',
                    borderRadius: '2px',
                    backgroundColor: 'var(--c-raised)',
                    overflow: 'hidden',
                  }}
                >
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level * 10}%` }}
                    transition={{ duration: 0.9, delay: 0.6, ease: 'easeOut' as const }}
                    style={{
                      height: '100%',
                      borderRadius: '2px',
                      background: 'linear-gradient(90deg, #4ade80 0%, rgba(74,222,128,0.45) 100%)',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.4rem',
        }}
      >
        <span style={{ fontFamily: 'var(--f-mono)', fontSize: '0.65rem', color: 'var(--c-muted)', letterSpacing: '0.1em' }}>
          SCROLL
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
        >
          <ArrowRight size={12} style={{ color: 'var(--c-muted)', transform: 'rotate(90deg)' }} />
        </motion.div>
      </motion.div>
    </section>
  )
}
