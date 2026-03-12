const TECH = [
  { name: 'Python',              cat: 'lang' },
  { name: 'C++',                 cat: 'lang' },
  { name: 'R',                   cat: 'lang' },
  { name: 'PyTorch',             cat: 'dl' },
  { name: 'MediaPipe',           cat: 'cv' },
  { name: 'OpenCV',              cat: 'cv' },
  { name: 'Kalman Filter',       cat: 'signal' },
  { name: 'CLAHE',               cat: 'cv' },
  { name: 'CatBoost',            cat: 'ml' },
  { name: 'LightGBM',            cat: 'ml' },
  { name: 'SHAP',                cat: 'ml' },
  { name: 'Lasso Regression',    cat: 'stats' },
  { name: 'PCA',                 cat: 'stats' },
  { name: 'SymPy',               cat: 'math' },
  { name: 'GPT-4o-mini',         cat: 'ai' },
  { name: 'AlphaFold 3',         cat: 'bio' },
  { name: 'Streamlit',           cat: 'deploy' },
  { name: 'Framer Motion',       cat: 'frontend' },
  { name: 'Prompt Engineering',  cat: 'ai' },
  { name: 'Statistical Analysis', cat: 'stats' },
  { name: 'Vibe Coding',         cat: 'paradigm' },
  { name: 'Neuro-Symbolic AI',   cat: 'ai' },
]

const catColor: Record<string, string> = {
  lang:     'var(--c-neon)',
  dl:       'var(--c-amber)',
  cv:       'var(--c-blue)',
  signal:   'var(--c-neon)',
  ml:       'var(--c-amber)',
  stats:    '#c084fc',
  math:     'var(--c-neon)',
  ai:       'var(--c-amber)',
  bio:      '#34d399',
  deploy:   'var(--c-blue)',
  frontend: 'var(--c-blue)',
  paradigm: '#fb7185',
}

// Duplicate for seamless loop
const ITEMS = [...TECH, ...TECH]

export default function TechMarquee() {
  return (
    <section
      style={{
        padding: '3rem 0',
        borderTop: '1px solid var(--c-border)',
        borderBottom: '1px solid var(--c-border)',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* fade edges */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '8rem',
          height: '100%',
          background: 'linear-gradient(90deg, var(--c-void), transparent)',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '8rem',
          height: '100%',
          background: 'linear-gradient(270deg, var(--c-void), transparent)',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />

      <div className="marquee-track" aria-hidden>
        {ITEMS.map((tech, i) => {
          const color = catColor[tech.cat] ?? 'var(--c-muted)'
          return (
            <span
              key={i}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                margin: '0 1rem',
                padding: '0.4rem 1rem',
                border: `1px solid ${color}28`,
                borderRadius: '0.375rem',
                backgroundColor: `${color}0a`,
                fontFamily: 'var(--f-mono)',
                fontSize: '0.78rem',
                color: color,
                whiteSpace: 'nowrap',
                userSelect: 'none',
              }}
            >
              <span
                style={{
                  width: '5px',
                  height: '5px',
                  borderRadius: '50%',
                  backgroundColor: color,
                  opacity: 0.7,
                  display: 'inline-block',
                  flexShrink: 0,
                }}
              />
              {tech.name}
            </span>
          )
        })}
      </div>
    </section>
  )
}
