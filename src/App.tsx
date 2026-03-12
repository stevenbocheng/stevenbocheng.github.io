import { useState } from 'react'
import Hero from './components/Hero'
import TechMarquee from './components/TechMarquee'
import ProjectGrid from './components/ProjectGrid'
import SideProjects from './components/SideProjects'
import Timeline from './components/Timeline'
import Contact from './components/Contact'
import Toast from './components/Toast'
import NavDots from './components/NavDots'

export default function App() {
  const [toast, setToast] = useState(false)

  const showToast = () => {
    setToast(true)
    setTimeout(() => setToast(false), 4500)
  }

  return (
    <div style={{ backgroundColor: 'var(--c-void)', minHeight: '100vh' }}>
      <Hero />
      <TechMarquee />
      <ProjectGrid />
      <SideProjects />
      <Timeline />
      <Contact onCVClick={showToast} />

      {/* AI Attribution */}
      <div
        style={{
          textAlign: 'center',
          padding: '1.25rem',
          fontSize: '0.7rem',
          color: 'var(--c-muted)',
          fontFamily: 'var(--f-mono)',
          letterSpacing: '0.04em',
          borderTop: '1px solid var(--c-border)',
        }}
      >
        // This site was optimized with AI-Augmented workflows
      </div>

      <Toast show={toast} message="履歷正在進行最後更新，歡迎直接來信索取最快資訊！" />
      <NavDots />
    </div>
  )
}
