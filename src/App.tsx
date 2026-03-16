import Hero from './components/Hero'
import TechMarquee from './components/TechMarquee'
import ProjectGrid from './components/ProjectGrid'
import SideProjects from './components/SideProjects'
import KnowledgeBase from './components/KnowledgeBase'
import Timeline from './components/Timeline'
import Contact from './components/Contact'
import NavDots from './components/NavDots'

export default function App() {
  return (
    <div style={{ backgroundColor: 'var(--c-void)', minHeight: '100vh' }}>
      <Hero />
      <TechMarquee />
      <ProjectGrid />
      <SideProjects />
      <KnowledgeBase />
      <Timeline />
      <Contact />

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

      <NavDots />
    </div>
  )
}
