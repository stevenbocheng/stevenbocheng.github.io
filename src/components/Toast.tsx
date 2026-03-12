import { motion, AnimatePresence } from 'framer-motion'
import { Info } from 'lucide-react'

interface Props {
  show: boolean
  message: string
}

export default function Toast({ show, message }: Props) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.97 }}
          transition={{ duration: 0.3, ease: "easeOut" as const }}
          style={{
            position: 'fixed',
            bottom: '2rem',
            right: '2rem',
            zIndex: 100,
            display: 'flex',
            alignItems: 'flex-start',
            gap: '0.75rem',
            padding: '1rem 1.25rem',
            maxWidth: '22rem',
            backgroundColor: 'var(--c-raised)',
            border: '1px solid var(--c-neon)',
            borderRadius: '0.875rem',
            boxShadow: '0 8px 32px rgba(0,0,0,0.4), 0 0 20px rgba(74,222,128,0.08)',
          }}
        >
          <Info
            size={16}
            style={{ color: 'var(--c-neon)', flexShrink: 0, marginTop: '0.1rem' }}
          />
          <p
            style={{
              fontSize: '0.85rem',
              color: 'var(--c-subtle)',
              lineHeight: 1.6,
              flex: 1,
            }}
          >
            {message}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
