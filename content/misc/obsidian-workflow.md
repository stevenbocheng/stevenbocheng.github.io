---
title: 我的 Obsidian 知識管理系統
date: 2026-03-08
category: misc
tags: [Obsidian, PKM, Zettelkasten, Productivity]
summary: 結合 Zettelkasten 與 PARA 系統，打造適合研究者的第二大腦架構。
---

## 為什麼需要知識管理系統？

研究工作的特性：輸入量大、跨域、長週期。
問題不在於「記住」，而在於「連結」——孤立的知識點沒有價值，有連結的知識才能生成洞見。

## 我的資料夾結構

```
筆記(第二大腦)/
├── 10_收件匣/          # 快速捕捉，每週清理
├── 20_資源庫/          # 文獻、書籍、課程筆記
├── 30_專案/            # 進行中的研究、開發
├── 40_領域/            # 長期培養的主題
└── 50_卡片盒筆記/
    ├── 01_文獻筆記/    # 直接來自來源的摘要
    ├── 02_參考筆記/    # 自己的理解與評論
    └── 03_永久筆記/    # 完整想法，可獨立存在
```

改自 PARA（Projects / Areas / Resources / Archive）+ Zettelkasten 的永久筆記概念。

## 永久筆記的寫法

一篇好的永久筆記應該：

1. **只有一個主要想法**（Atomicity）
2. **用自己的話寫**，不是引用原文
3. **有連結到其他筆記**，至少 2-3 個
4. **標題是完整的陳述句**，而非關鍵字

❌ 差：「Attention mechanism」
✅ 好：「Scaled dot-product attention 用 $\sqrt{d_k}$ 縮放是為了防止 Softmax 飽和」

## Obsidian 必裝插件

| 插件 | 用途 |
|------|------|
| Dataview | 動態查詢筆記，像 SQL 一樣搜索 |
| Templater | 筆記模板，自動填入日期、連結 |
| Calendar | 日記視圖，追蹤每日捕捉 |
| Excalidraw | 在筆記中畫圖，視覺化概念 |

## Dataview 範例查詢

列出本月所有 AI 技術筆記：

```dataview
TABLE date, summary
FROM #ai-tech
WHERE date >= date(2026-03-01)
SORT date DESC
```

## 與開發工作流整合

永久筆記 → 個人網頁 Knowledge Base 的流程：

1. 在 `03_永久筆記/` 寫好筆記
2. 複製到 `個人網頁/content/` 對應分類
3. 補上 YAML frontmatter（title, date, category, tags, summary）
4. Push → GitHub Actions 自動重新 build 部署

目標：**寫筆記的同時就在更新網站**，零額外成本。
