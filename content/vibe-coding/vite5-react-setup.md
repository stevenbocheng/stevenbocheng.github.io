---
title: Vite 5 + React 18 最速工作流
date: 2026-03-10
category: vibe-coding
tags: [Vite, React, TypeScript, DevX]
summary: 從零到 dev server 的完整設定筆記，包含我慣用的 alias、HMR 優化與 build 策略。
---

## 為什麼選 Vite？

Build tool 的選擇影響整個開發體感。Vite 的核心優勢：

- **Dev server 啟動 < 500ms**：ESM + esbuild 預打包 node_modules
- **HMR 精準到模組**：只重新執行變動的 module，state 不丟失
- **Build 走 Rollup**：tree-shaking 比 webpack 積極，bundle 更小

## 基本設定

```bash
npm create vite@latest my-app -- --template react-ts
cd my-app && npm install
```

### `vite.config.ts` 慣用設定

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@lib': path.resolve(__dirname, './src/lib'),
      '@components': path.resolve(__dirname, './src/components'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          motion: ['framer-motion'],
        },
      },
    },
  },
})
```

## HMR 的邊界問題

React Fast Refresh 的 HMR 邊界在**模組層級**。
如果一個模組同時 export component 和 non-component（如常數、工具函數），HMR 可能退化成全頁刷新。

**最佳實踐**：把純工具函數拆到 `src/lib/` 獨立檔案，component 檔案只 export React components。

## import.meta.glob 動態載入

```typescript
// 載入所有 markdown，build time 靜態分析
const modules = import.meta.glob('../content/**/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
})
```

`eager: true` 讓 Vite 在 bundle 時就打包進去，而不是 lazy load。
適合數量有限的靜態內容（如筆記、設定檔）。

## 部署到 GitHub Pages

```yaml
# .github/workflows/deploy.yml
- name: Build
  run: npm run build
- name: Deploy
  uses: peaceiris/actions-gh-pages@v3
  with:
    github_token: ${{ secrets.GITHUB_TOKEN }}
    publish_dir: ./dist
```

記得 `vite.config.ts` 設 `base: '/repo-name/'`，否則 assets 路徑會 404。
