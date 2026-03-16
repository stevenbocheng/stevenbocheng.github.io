import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { useMarkdownContent, type Article } from '../lib/useMarkdownContent'
import KBCategoryBento from './KBCategoryBento'
import KBArticleList from './KBArticleList'
import KBArticleReader from './KBArticleReader'

type Layer = 'bento' | 'list' | 'reader'

export default function KnowledgeBase() {
  const articleMap = useMarkdownContent()
  const [layer, setLayer] = useState<Layer>('bento')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null)

  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category)
    setLayer('list')
  }

  const handleSelectArticle = (article: Article) => {
    setSelectedArticle(article)
    setLayer('reader')
  }

  const handleBackToList = () => {
    setSelectedArticle(null)
    setLayer('list')
  }

  const handleBackToBento = () => {
    setSelectedArticle(null)
    setSelectedCategory(null)
    setLayer('bento')
  }

  return (
    <section
      id="knowledge"
      className="section-padded"
      style={{ padding: '5rem 2rem', maxWidth: '1100px', margin: '0 auto' }}
    >
      {/* Section header */}
      <div style={{ marginBottom: '3rem' }}>
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
          // research notes
        </p>
        <h2
          style={{
            fontFamily: 'var(--f-display)',
            fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
            fontWeight: 700,
            color: 'var(--c-text)',
          }}
        >
          文章與筆記
        </h2>
      </div>

      {/* Three-layer content */}
      <div
        data-kb-scroll
        style={{ position: 'relative', overflowX: 'hidden' }}
      >
        <AnimatePresence mode="wait">
          {layer === 'bento' && (
            <KBCategoryBento
              key="bento"
              articleMap={articleMap}
              onSelect={handleSelectCategory}
            />
          )}

          {layer === 'list' && selectedCategory && (
            <KBArticleList
              key="list"
              category={selectedCategory}
              articles={articleMap.get(selectedCategory) ?? []}
              onBack={handleBackToBento}
              onSelect={handleSelectArticle}
            />
          )}

          {layer === 'reader' && selectedArticle && (
            <KBArticleReader
              key="reader"
              article={selectedArticle}
              onBack={handleBackToList}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
