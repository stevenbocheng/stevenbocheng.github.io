#!/usr/bin/env node
// sync-notes.js
// 從 obsidian-notes 資料夾同步筆記到 content/

const fs = require('fs')
const path = require('path')

const NOTES_BASE = path.join(__dirname, '../obsidian-notes/50_卡片盒筆記/03_永久筆記')
const CONTENT_BASE = path.join(__dirname, '../content')

const FOLDER_MAP = {
  'AI技術': 'ai-tech',
  'VibeCoding使用框架': 'vibe-coding',
  '數學與統計': 'math-stats',
  '其他': 'misc',
}

function transformMarkdown(raw, filename) {
  // 移除 Obsidian 圖片語法 ![[...]]
  let content = raw.replace(/!\[\[.*?\]\]/g, '')

  // 移除 Obsidian 內部連結的括號，保留文字 [[文字]] → 文字
  content = content.replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (_, link, alias) => alias || link)

  return content.trim()
}

function extractFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  return match ? match[0] : null
}

function buildFrontmatter(filename, category) {
  const title = filename.replace('.md', '')
  const date = new Date().toISOString().slice(0, 10)
  return `---\ntitle: ${title}\ndate: ${date}\ncategory: ${category}\ntags: []\nsummary: ''\n---\n\n`
}

let synced = 0
let skipped = 0

for (const [obsidianFolder, contentFolder] of Object.entries(FOLDER_MAP)) {
  const srcDir = path.join(NOTES_BASE, obsidianFolder)
  const destDir = path.join(CONTENT_BASE, contentFolder)

  if (!fs.existsSync(srcDir)) continue
  if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true })

  // 取得 source 的 md 檔
  const srcFiles = fs.readdirSync(srcDir).filter(f => f.endsWith('.md'))

  // 取得 dest 的 md 檔（用於偵測刪除）
  const destFiles = fs.readdirSync(destDir).filter(f => f.endsWith('.md'))

  // 刪除 dest 中已不存在於 src 的檔案
  for (const destFile of destFiles) {
    const slug = destFile.replace('.md', '')
    // 對應 src 可能是任何檔名轉成的 slug（這裡簡單比對檔名）
    const stillExists = srcFiles.some(f => slugify(f.replace('.md', '')) === slug)
    if (!stillExists) {
      fs.unlinkSync(path.join(destDir, destFile))
      console.log(`🗑  deleted: ${contentFolder}/${destFile}`)
    }
  }

  // 複製 / 更新 src 到 dest
  for (const srcFile of srcFiles) {
    const raw = fs.readFileSync(path.join(srcDir, srcFile), 'utf8')
    const slug = slugify(srcFile.replace('.md', ''))
    const destFile = `${slug}.md`
    const destPath = path.join(destDir, destFile)

    let transformed = transformMarkdown(raw, srcFile)

    // 如果沒有 frontmatter，自動補上
    if (!extractFrontmatter(transformed)) {
      transformed = buildFrontmatter(srcFile.replace('.md', ''), contentFolder) + transformed
    }

    // 只在內容有變化時才寫入
    const existing = fs.existsSync(destPath) ? fs.readFileSync(destPath, 'utf8') : null
    if (existing !== transformed) {
      fs.writeFileSync(destPath, transformed, 'utf8')
      console.log(`✅ synced: ${contentFolder}/${destFile}`)
      synced++
    } else {
      skipped++
    }
  }
}

console.log(`\nDone. synced: ${synced}, unchanged: ${skipped}`)

function slugify(str) {
  return str
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\u4e00-\u9fff-]/g, '')
    .replace(/--+/g, '-')
    .trim()
}
