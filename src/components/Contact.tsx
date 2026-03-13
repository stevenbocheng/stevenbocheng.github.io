import { motion } from 'framer-motion'
import { Mail, Github, Linkedin, FileText } from 'lucide-react'

export default function Contact() {
  return (
    <section
      id="contact"
      className="section-padded"
      style={{
        padding: '7rem 2rem',
        borderTop: '1px solid var(--c-border)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background:
            'radial-gradient(ellipse 50% 60% at 70% 50%, rgba(74,222,128,0.04) 0%, transparent 70%)',
        }}
      />

      <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative' }}>
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" as const }}
        >
          {/* Label */}
          <p
            style={{
              fontFamily: 'var(--f-mono)',
              fontSize: '0.7rem',
              color: 'var(--c-neon)',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              marginBottom: '0.75rem',
            }}
          >
            // contact
          </p>

          {/* Heading */}
          <h2
            style={{
              fontFamily: 'var(--f-display)',
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              fontWeight: 700,
              color: 'var(--c-text)',
              lineHeight: 1.1,
              marginBottom: '1.25rem',
              maxWidth: '600px',
            }}
          >
            Currently Open to
            <br />
            <span style={{ color: 'var(--c-neon)' }}>Opportunities</span>
          </h2>

          <p
            style={{
              fontSize: '1rem',
              color: 'var(--c-subtle)',
              maxWidth: '480px',
              lineHeight: 1.8,
              marginBottom: '2.5rem',
            }}
          >
            對資料科學、數據分析、機器學習或深度學習相關職位有興趣。有合作想法或工作機會的話，歡迎直接寄信。
          </p>

          {/* Primary CTA */}
          <div style={{ display: 'flex', gap: '0.875rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
            <a
              href="mailto:c326387900@gmail.com"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
                padding: '0.8rem 1.75rem',
                backgroundColor: 'var(--c-neon)',
                color: 'var(--c-void)',
                borderRadius: '0.625rem',
                fontFamily: 'var(--f-mono)',
                fontSize: '0.875rem',
                fontWeight: 600,
                textDecoration: 'none',
                transition: 'box-shadow 0.25s, opacity 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 0 28px rgba(74,222,128,0.5)'
                e.currentTarget.style.opacity = '0.9'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'none'
                e.currentTarget.style.opacity = '1'
              }}
            >
              <Mail size={15} />
              c326387900@gmail.com
            </a>

            {/* Ghost button CV */}
            <a
              href="/Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
                padding: '0.8rem 1.75rem',
                backgroundColor: 'transparent',
                border: '1px solid var(--c-border)',
                color: 'var(--c-text)',
                borderRadius: '0.625rem',
                fontFamily: 'var(--f-mono)',
                fontSize: '0.875rem',
                cursor: 'pointer',
                transition: 'border-color 0.2s, color 0.2s',
                textDecoration: 'none',
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
              <FileText size={15} />
              Full CV
            </a>
          </div>

          {/* Social links */}
          <div
            style={{
              display: 'flex',
              gap: '1rem',
              paddingTop: '2rem',
              borderTop: '1px solid var(--c-border)',
            }}
          >
            {[
              {
                href: 'https://github.com/stevenbocheng',
                icon: <Github size={18} />,
                label: 'GitHub',
              },
              {
                href: 'https://www.linkedin.com/in/bo-cheng-a44bb7275',
                icon: <Linkedin size={18} />,
                label: 'LinkedIn',
              },
              {
                href: 'mailto:c326387900@gmail.com',
                icon: <Mail size={18} />,
                label: 'Email',
              },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                title={link.label}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '2.75rem',
                  height: '2.75rem',
                  border: '1px solid var(--c-border)',
                  borderRadius: '0.5rem',
                  color: 'var(--c-muted)',
                  textDecoration: 'none',
                  transition: 'color 0.2s, border-color 0.2s, box-shadow 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--c-neon)'
                  e.currentTarget.style.borderColor = 'var(--c-neon)'
                  e.currentTarget.style.boxShadow = '0 0 12px rgba(74,222,128,0.2)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--c-muted)'
                  e.currentTarget.style.borderColor = 'var(--c-border)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                {link.icon}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
