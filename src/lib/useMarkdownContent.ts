import { useMemo } from 'react'

export interface Article {
  slug: string
  title: string
  date: string
  category: string
  tags: string[]
  summary: string
  body: string
}

const rawFiles = import.meta.glob('../../content/**/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>

/** Lightweight browser-safe frontmatter parser (no Buffer dependency) */
function parseFrontmatter(raw: string): { data: Record<string, unknown>; content: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)
  if (!match) return { data: {}, content: raw }

  const yamlBlock = match[1]
  const content = match[2]
  const data: Record<string, unknown> = {}

  for (const line of yamlBlock.split(/\r?\n/)) {
    const colonIdx = line.indexOf(':')
    if (colonIdx === -1) continue
    const key = line.slice(0, colonIdx).trim()
    const val = line.slice(colonIdx + 1).trim()

    if (val.startsWith('[') && val.endsWith(']')) {
      // Inline array: [a, b, c]
      data[key] = val
        .slice(1, -1)
        .split(',')
        .map((s) => s.trim().replace(/^['"]|['"]$/g, ''))
        .filter(Boolean)
    } else {
      data[key] = val.replace(/^['"]|['"]$/g, '')
    }
  }

  return { data, content }
}

function parseArticles(): Map<string, Article[]> {
  const map = new Map<string, Article[]>()

  for (const [path, raw] of Object.entries(rawFiles)) {
    const { data, content } = parseFrontmatter(raw)
    const slug = path.split('/').pop()?.replace('.md', '') ?? path
    const article: Article = {
      slug,
      title: typeof data.title === 'string' ? data.title : slug,
      date: typeof data.date === 'string' ? data.date.slice(0, 10) : '',
      category: typeof data.category === 'string' ? data.category : 'misc',
      tags: Array.isArray(data.tags) ? (data.tags as string[]) : [],
      summary: typeof data.summary === 'string' ? data.summary : '',
      body: content,
    }

    const existing = map.get(article.category) ?? []
    existing.push(article)
    map.set(article.category, existing)
  }

  map.forEach((articles, key) => {
    map.set(key, articles.sort((a, b) => b.date.localeCompare(a.date)))
  })

  return map
}

const articleMap = parseArticles()

export function useMarkdownContent() {
  return useMemo(() => articleMap, [])
}
