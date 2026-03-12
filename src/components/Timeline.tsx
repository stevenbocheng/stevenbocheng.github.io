import { useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ZoomIn } from 'lucide-react'

const EXPERIENCES = [
  {
    period: '2024 夏',
    role: '統計所暑期實習生',
    org: '中央研究院統計科學研究所',
    orgEn: 'Academia Sinica · Institute of Statistical Science',
    desc: '探索高血壓相關基因變異如何改變蛋白質 3D 結構。建立端到端自動化分析流程，涵蓋 1,491 位台灣人體生物資料庫參與者。產出書面報告、海報及成果簡報。',
    tags: ['AlphaFold 3', 'SHAPEIT4', 'ANNOVAR', 'R', 'Python'],
    accent: 'var(--c-neon)',
    highlight: true,
  },
  {
    period: '2023',
    role: '微積分助教',
    org: '國立中山大學',
    orgEn: 'National Sun Yat-sen University',
    desc: '協助教授批改作業、解答學生問題，將抽象微積分理論口語化，培養將複雜理論簡明解說的能力。',
    tags: ['微積分', '線性代數', '數學教學'],
    accent: 'var(--c-muted)',
    highlight: false,
  },
  {
    period: '2022',
    role: '微積分助教',
    org: '淡江大學',
    orgEn: 'Tamkang University',
    desc: '協助大一新生建立微積分直覺，設計解題思路引導，強化複雜理論的口語化表達能力。',
    tags: ['微積分', '數學教學', '解題引導'],
    accent: 'var(--c-muted)',
    highlight: false,
  },

  {
    period: '2022',
    role: '全國智慧大數據分析競賽 · 入圍決賽',
    org: '教育部',
    orgEn: 'Ministry of Education · National Smart Big Data Analytics Competition',
    desc: '代表隊伍入圍 2022 全國智慧大數據分析競賽決賽，展現資料分析與機器學習實戰能力。',
    tags: ['大數據分析', '機器學習', '競賽'],
    accent: '#f59e0b',
    highlight: true,
  }
]

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
}

const fadeLeft = {
  hidden: { opacity: 0, x: -24 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
}

export default function Timeline() {
  return (
    <section
      id="experience"
      className="section-padded"
      style={{
        padding: '6rem 2rem',
        borderTop: '1px solid var(--c-border)',
        background: `linear-gradient(180deg, var(--c-void) 0%, var(--c-surface)30 100%)`,
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '3.5rem' }}>
          <p
            style={{
              fontFamily: 'var(--f-mono)',
              fontSize: '0.7rem',
              color: 'var(--c-neon)',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              marginBottom: '0.6rem',
            }}
          >
            // experience & credentials
          </p>
          <h2
            style={{
              fontFamily: 'var(--f-display)',
              fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
              fontWeight: 700,
              color: 'var(--c-text)',
            }}
          >
            經歷與背書
          </h2>
        </div>

        <div className="timeline-main-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'start' }}>
          {/* Left: Timeline */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
          >
            <div style={{ position: 'relative' }}>
              {/* Vertical line */}
              <div
                style={{
                  position: 'absolute',
                  left: '0.65rem',
                  top: '1.25rem',
                  bottom: '1rem',
                  width: '1px',
                  backgroundColor: 'var(--c-border)',
                }}
              />

              <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                {EXPERIENCES.map((exp) => (
                  <motion.div
                    key={exp.org}
                    variants={fadeLeft}
                    style={{ display: 'flex', gap: '1.5rem', position: 'relative' }}
                  >
                    {/* Node */}
                    <div style={{ flexShrink: 0, position: 'relative', zIndex: 1, paddingTop: '0.15rem' }}>
                      <div
                        style={{
                          width: '1.35rem',
                          height: '1.35rem',
                          borderRadius: '50%',
                          backgroundColor: exp.highlight ? 'var(--c-void)' : 'var(--c-surface)',
                          border: `2px solid ${exp.highlight ? 'var(--c-neon)' : 'var(--c-border)'}`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        {exp.highlight && (
                          <div
                            style={{
                              width: '5px',
                              height: '5px',
                              borderRadius: '50%',
                              backgroundColor: 'var(--c-neon)',
                            }}
                          />
                        )}
                      </div>
                    </div>

                    {/* Content */}
                    <div>
                      <p
                        style={{
                          fontFamily: 'var(--f-mono)',
                          fontSize: '0.7rem',
                          color: exp.highlight ? 'var(--c-neon)' : 'var(--c-muted)',
                          marginBottom: '0.3rem',
                        }}
                      >
                        {exp.period}
                      </p>
                      <h3
                        style={{
                          fontFamily: 'var(--f-display)',
                          fontSize: '1.05rem',
                          fontWeight: 600,
                          color: 'var(--c-text)',
                          marginBottom: '0.15rem',
                        }}
                      >
                        {exp.role}
                      </h3>
                      <p style={{ fontSize: '0.82rem', color: 'var(--c-muted)', marginBottom: '0.6rem' }}>
                        {exp.org}
                        <span style={{ fontFamily: 'var(--f-mono)', marginLeft: '0.5rem', fontSize: '0.68rem' }}>
                          {exp.orgEn}
                        </span>
                      </p>
                      <p style={{ fontSize: '0.83rem', color: 'var(--c-subtle)', lineHeight: 1.75, marginBottom: '0.75rem' }}>
                        {exp.desc}
                      </p>
                      <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                        {exp.tags.map((tag) => (
                          <span
                            key={tag}
                            style={{
                              fontFamily: 'var(--f-mono)',
                              fontSize: '0.65rem',
                              padding: '0.15rem 0.5rem',
                              border: '1px solid var(--c-border)',
                              borderRadius: '0.25rem',
                              color: 'var(--c-muted)',
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Awards */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, ease: "easeOut" as const }}
          >
            <p
              style={{
                fontFamily: 'var(--f-mono)',
                fontSize: '0.65rem',
                color: 'var(--c-muted)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginBottom: '1.25rem',
              }}
            >
              Honors & Certificates
            </p>

            <div className="two-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.875rem' }}>
              {[
                {
                  src: '/award_data.png',
                  label: '2022 數據分析競賽',
                  detail: '獎狀',
                  realSrc: true,
                },
                {
                  src: '/award_sinica.jpg',
                  label: '中研院實習',
                  detail: '正式證明書',
                  realSrc: true,
                },
                {
                  src: '/award_math_excellence.png',
                  label: '數學系成績優良',
                  detail: '獎狀',
                  realSrc: true,
                },
                {
                  src: '/award_math_progress.png',
                  label: '數學系成績進步',
                  detail: '獎狀',
                  realSrc: true,
                },
              ].map((award, i) => (
                <AwardCard key={i} {...award} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ── Lightbox ──────────────────────────────────────────── */
function Lightbox({ src, label, onClose }: { src: string; label: string; onClose: () => void }) {
  return createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9500,
          backgroundColor: 'rgba(9,9,16,0.92)',
          backdropFilter: 'blur(10px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.92 }}
          transition={{ duration: 0.25, ease: 'easeOut' as const }}
          onClick={(e) => e.stopPropagation()}
          style={{ position: 'relative', maxWidth: '90vw', maxHeight: '88vh' }}
        >
          <img
            src={src}
            alt={label}
            style={{
              maxWidth: '100%',
              maxHeight: '82vh',
              objectFit: 'contain',
              borderRadius: '0.75rem',
              boxShadow: '0 32px 80px rgba(0,0,0,0.7)',
              display: 'block',
            }}
          />
          {/* Label bar */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              padding: '0.6rem 1rem',
              background: 'linear-gradient(transparent, rgba(9,9,16,0.85))',
              borderRadius: '0 0 0.75rem 0.75rem',
              fontFamily: 'var(--f-mono)',
              fontSize: '0.75rem',
              color: 'var(--c-muted)',
            }}
          >
            {label}
          </div>
          {/* Close button */}
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '-1rem',
              right: '-1rem',
              width: '2.25rem',
              height: '2.25rem',
              borderRadius: '50%',
              border: '1px solid var(--c-border)',
              backgroundColor: 'var(--c-surface)',
              color: 'var(--c-text)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <X size={14} />
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body,
  )
}

/* ── Award card ────────────────────────────────────────── */
function AwardCard({ src, label, detail }: { src: string; label: string; detail: string }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div
        className="card-hover"
        onClick={() => setOpen(true)}
        style={{
          border: '1px solid var(--c-border)',
          borderRadius: '0.75rem',
          overflow: 'hidden',
          backgroundColor: 'var(--c-surface)',
          cursor: 'zoom-in',
        }}
      >
        {/* Fixed-height thumbnail — object-fit:contain shows full image */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '160px',
            backgroundColor: 'var(--c-raised)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          <img
            src={src}
            alt={label}
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
              objectFit: 'contain',
              display: 'block',
            }}
          />
          {/* Hover zoom hint */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(9,9,16,0)',
              transition: 'background-color 0.2s',
              color: 'var(--c-neon)',
              opacity: 0,
            }}
            className="award-zoom-hint"
          >
            <ZoomIn size={24} />
          </div>
        </div>

        <div style={{ padding: '0.55rem 0.75rem', borderTop: '1px solid var(--c-border)' }}>
          <p style={{ fontSize: '0.78rem', fontWeight: 500, color: 'var(--c-text)' }}>{label}</p>
          <p style={{ fontFamily: 'var(--f-mono)', fontSize: '0.65rem', color: 'var(--c-muted)' }}>{detail}</p>
        </div>
      </div>

      {open && <Lightbox src={src} label={label} onClose={() => setOpen(false)} />}
    </>
  )
}
