import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import ProjectDialog, {
  type ProjectData,
  StatBadge,
  Highlight,
  SectionLabel,
} from './ProjectDialog'

/* ─── Project body content ───────────────────────────── */
function Project1Body() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Video */}
      <div>
        <SectionLabel>Demo</SectionLabel>
        <video
          src="/demo_video.mp4"
          controls
          style={{
            width: '100%',
            borderRadius: '0.75rem',
            border: '1px solid var(--c-border)',
            backgroundColor: '#000',
          }}
        />
      </div>

      {/* Summary */}
      <div>
        <SectionLabel>Overview</SectionLabel>
        <p style={{ fontSize: '0.9rem', color: 'var(--c-subtle)', lineHeight: 1.8 }}>
          使用者對著 Webcam 在空中用手指「書寫」數學式，系統即時捕捉指尖軌跡、以影像辨識理解字跡，
          再透過符號數學引擎精確計算，最終將 LaTeX 解答渲染於螢幕上。
          不靠硬算，不靠猜測，從架構層消除 AI 幻覺。
        </p>
      </div>

      {/* Architecture */}
      <div>
        <SectionLabel>系統架構亮點</SectionLabel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <Highlight
            title="Kalman Filter 軌跡平滑"
            desc="建立 4×2 狀態空間物理慣性模型，主動抵抗瞬間異常觀測值，消除相機抖動造成的筆跡鋸齒，大幅提升下游 OCR 辨識率。"
            color="var(--c-neon)"
          />
          <Highlight
            title="Neuro-Symbolic 雙核架構"
            desc="GPT-4o-mini 只負責理解歪扭字跡語意，精確計算完全交給 SymPy 符號引擎。從設計層根治 LLM 數學幻覺問題。"
            color="var(--c-amber)"
          />
          <Highlight
            title="Dynamic ROI 自動裁剪引擎"
            desc="OpenCV 連通區域分析精準定位字跡邊界框，裁切後傳輸影像大小降低 70%+，同步提升 LLM 對小字體的注意力。"
            color="var(--c-blue)"
          />
          <Highlight
            title="CLAHE 動態亮度均衡 + 3D 透視補償"
            desc="強逆光下維持 MediaPipe 穩定追蹤；World Landmarks 3D 座標消除透視畸變，手勢判定具備尺度不變性。"
            color="var(--c-neon)"
          />
        </div>
      </div>

      {/* Benchmark images */}
      <div>
        <SectionLabel>Ablation Study — Kalman Filter 效能驗證</SectionLabel>
        <div className="two-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <p style={{ fontSize: '0.75rem', color: 'var(--c-muted)', marginBottom: '0.5rem', fontFamily: 'var(--f-mono)' }}>
              合成資料（高斯雜訊模擬）
            </p>
            <img
              src="/kalman_benchmark.png"
              alt="Kalman Filter benchmark on synthetic data"
              style={{ width: '100%', borderRadius: '0.5rem', border: '1px solid var(--c-border)' }}
            />
          </div>
          <div>
            <p style={{ fontSize: '0.75rem', color: 'var(--c-muted)', marginBottom: '0.5rem', fontFamily: 'var(--f-mono)' }}>
              真實人體軌跡實測
            </p>
            <img
              src="/real_world_benchmark.png"
              alt="Kalman Filter benchmark on real trajectory"
              style={{ width: '100%', borderRadius: '0.5rem', border: '1px solid var(--c-border)' }}
            />
          </div>
        </div>
        <p style={{ fontSize: '0.78rem', color: 'var(--c-muted)', marginTop: '0.75rem', lineHeight: 1.7 }}>
          🟢 綠色虛線：理想意圖 ｜ 🔴 紅色：Raw Input（未濾波）｜ 🔵 藍色：Kalman Smoothed
        </p>
      </div>

      {/* Gesture table */}
      <div>
        <SectionLabel>手勢操作</SectionLabel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {[
            { gesture: '☝️ 食指', action: '書寫模式', note: '指尖移動即時繪製' },
            { gesture: '👍 大拇指', action: '清除畫布', note: '穩定維持 0.5 秒' },
            { gesture: '🖐️ 四指全開', action: '送出計算', note: '穩定維持 0.7 秒' },
          ].map((row) => (
            <div
              key={row.gesture}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 2fr',
                gap: '0.5rem',
                padding: '0.6rem 1rem',
                borderRadius: '0.5rem',
                backgroundColor: 'var(--c-raised)',
                fontSize: '0.83rem',
              }}
            >
              <span>{row.gesture}</span>
              <span style={{ color: 'var(--c-neon)', fontFamily: 'var(--f-mono)' }}>{row.action}</span>
              <span style={{ color: 'var(--c-muted)' }}>{row.note}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function Project2Body() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Stats */}
      <div>
        <SectionLabel>Performance Metrics</SectionLabel>
        <div className="stat-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
          <StatBadge label="Mean Absolute Percentage Error" value="MAPE 11.9%" color="var(--c-amber)" />
          <StatBadge label="Coefficient of Determination" value="R² 0.625" color="var(--c-amber)" />
          <StatBadge label="行政區覆蓋 · 實價登錄筆數" value="31 / 137,244" color="var(--c-amber)" />
        </div>
      </div>

      {/* Tech highlights */}
      <div>
        <SectionLabel>技術亮點</SectionLabel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <Highlight
            title="車位價格拆算（Lasso 回歸）"
            desc="政府原始資料車位與住宅總價混報，自行建模拆算還原真實淨屋單價，解決資料髒污而非迴避它。"
            color="var(--c-amber)"
          />
          <Highlight
            title="分流建模策略"
            desc="集合住宅（CatBoost）與透天厝（LightGBM）分別建模，由業務邏輯驅動模型設計，而非套用單一算法。"
            color="var(--c-amber)"
          />
          <Highlight
            title="PCA 地理降維 + 動能特徵"
            desc="5 項交通距離 PCA 壓縮解決多重共線性；加入行政區 30/90/180 日移動均價，MAPE 改善約 3%。"
            color="var(--c-neon)"
          />
          <Highlight
            title="SHAP 可解釋性"
            desc="每筆估價附瀑布圖，清楚說明哪些特徵推高或壓低預測價格，符合業界對模型透明度的要求。"
            color="var(--c-neon)"
          />
          <Highlight
            title="Streamlit Cloud 公開部署"
            desc="不只是 Jupyter Notebook，完整部署為可公開存取的互動式儀表板，任何人都能即時使用。"
            color="var(--c-blue)"
          />
        </div>
      </div>

      {/* Challenges */}
      <div>
        <SectionLabel>挑戰 → 解法</SectionLabel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {[
            { challenge: '實價登錄車位與住宅總價混報', solution: '用 Lasso 回歸建立車位定價模型，逐筆拆算' },
            { challenge: '交通距離特徵多重共線性', solution: 'PCA 降維為 2 個主成分，保留 90% 變異' },
            { challenge: '集合住宅與透天厝定價邏輯差異大', solution: '分流建模，各自選最優演算法' },
            { challenge: '模型對行情時序不敏感', solution: '加入行政區 30/90/180 日動態移動平均' },
          ].map((row, i) => (
            <div
              key={i}
              className="two-col"
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1rem',
                padding: '0.75rem 1rem',
                borderRadius: '0.5rem',
                backgroundColor: 'var(--c-raised)',
                border: '1px solid var(--c-border)',
                fontSize: '0.82rem',
              }}
            >
              <span style={{ color: 'var(--c-subtle)' }}>{row.challenge}</span>
              <span style={{ color: 'var(--c-amber)' }}>→ {row.solution}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function Project5Body() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1.25rem',
        padding: '4rem 2rem',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          width: '4rem',
          height: '4rem',
          borderRadius: '50%',
          border: '2px solid #a78bfa40',
          backgroundColor: '#a78bfa0a',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.5rem',
        }}
      >
        🔬
      </div>
      <h3 style={{ fontFamily: 'var(--f-display)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--c-text)' }}>
        敬請期待
      </h3>
      <p style={{ fontSize: '0.9rem', color: 'var(--c-muted)', maxWidth: '28rem', lineHeight: 1.8 }}>
        本研究論文正在撰寫中。
        <br />
        使用主動學習搭配粒子校正流程與不確定性指標，
        取代專家挑選 CryoEM 蛋白質粒子影像所需耗費的時間與成本。
      </p>
    </div>
  )
}

/* ─── Project 3: AI Learning Consultant ─────────────── */
function Project3Body() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Overview */}
      <div>
        <SectionLabel>專案概覽</SectionLabel>
        <p style={{ fontSize: '0.9rem', color: 'var(--c-subtle)', lineHeight: 1.85 }}>
          使用者輸入學習背景與目標（中文），系統自動規劃個人化短中長期學習路線，
          並從Goodreads 書籍資料庫中挑選出5000本書集，以混合式 RAG 搜尋推薦書單，
          輸出結構化的 Markdown 學習建議。
        </p>
      </div>

      {/* Stats */}
      <div>
        <SectionLabel>系統規模</SectionLabel>
        <div className="stat-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
          <StatBadge label="Goodreads 書籍資料庫" value="178 萬筆" color="#60a5fa" />
          <StatBadge label="高評分取樣" value="5,000 筆" color="#60a5fa" />
          <StatBadge label="Embedding 模型" value="multilingual-e5" color="#60a5fa" />
        </div>
      </div>

      {/* Architecture */}
      <div>
        <SectionLabel>系統架構亮點</SectionLabel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <Highlight title="Multi-Agent 設計（LangGraph）" desc="拆分為 Planner → Retriever → Writer 三個節點，各司其職。預留 Reviewer 自動重審機制，含條件分支與 revision_count 上限保護。" color="#60a5fa" />
          <Highlight title="混合式 RAG 架構" desc="FAISS 語義搜尋（60%）+ BM25 關鍵字搜尋（40%）EnsembleRetriever 融合，解決純向量搜尋在專有名詞上的盲點。" color="#60a5fa" />
          <Highlight title="跨語言橋接" desc="Planner 將使用者的中文目標自動轉換為英文 SEARCH_QUERIES，讓英文書籍資料庫的 BM25 搜尋正確發揮效果。" color="var(--c-neon)" />
          <Highlight title="輸入防護 + 可觀測性" desc="LLM 分類器過濾不相關問題，避免無效 API 呼叫。LangSmith 全程追蹤 Token 用量與執行時間。" color="var(--c-neon)" />
        </div>
      </div>

      {/* Tech stack */}
      <div>
        <SectionLabel>技術堆疊</SectionLabel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {[
            { category: 'LLM', tech: 'OpenAI GPT-4o（via LangChain）' },
            { category: 'Agent 框架', tech: 'LangGraph StateGraph + TypedDict 狀態機' },
            { category: '向量搜尋', tech: 'FAISS（語義）+ BM25（關鍵字）EnsembleRetriever' },
            { category: 'Embedding', tech: 'intfloat/multilingual-e5-small（本地執行，免 GPU）' },
            { category: 'UI & 可觀測性', tech: 'Streamlit + LangSmith Token 追蹤' },
          ].map((row, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '7rem 1fr', gap: '1rem', padding: '0.6rem 1rem', borderRadius: '0.5rem', backgroundColor: 'var(--c-raised)', fontSize: '0.83rem' }}>
              <span style={{ color: '#60a5fa', fontFamily: 'var(--f-mono)', fontSize: '0.72rem' }}>{row.category}</span>
              <span style={{ color: 'var(--c-subtle)' }}>{row.tech}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Demo Video */}
      <div>
        <SectionLabel>Demo 影片</SectionLabel>
        <div style={{ position: 'relative', paddingBottom: '56.25%', borderRadius: '0.75rem', overflow: 'hidden', border: '1px solid var(--c-border)' }}>
          <iframe src="https://www.youtube.com/embed/ZJcxpqSZHUI" title="AI 學習諮詢師 Demo" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }} />
        </div>
      </div>

      {/* Screenshots */}
      <div>
        <SectionLabel>使用範例截圖</SectionLabel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <img src="/ai-consultant-demo1.jpg" alt="AI 學習諮詢師輸入範例" style={{ width: '100%', borderRadius: '0.5rem', border: '1px solid var(--c-border)' }} />
          <div className="two-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <img src="/ai-consultant-demo2.jpg" alt="輸出 1" style={{ width: '100%', borderRadius: '0.5rem', border: '1px solid var(--c-border)' }} />
            <img src="/ai-consultant-demo3.jpg" alt="輸出 2" style={{ width: '100%', borderRadius: '0.5rem', border: '1px solid var(--c-border)' }} />
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─── Project 4: Academia Sinica Internship ─────────── */
function Project4Body() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Overview */}
      <div>
        <SectionLabel>研究背景</SectionLabel>
        <p style={{ fontSize: '0.9rem', color: 'var(--c-subtle)', lineHeight: 1.85 }}>
          探討高血壓相關基因的遺傳變異如何改變蛋白質 3D 結構，嘗試解釋高血壓的潛在致病機制。
          基於「序列決定結構、結構決定功能」的生物學原理，建立一套端到端可重複的自動化分析流程：
          GWAS Catalog → TWB 基因組資料 → AlphaFold 3 建模 → RMSD/TM-score 結構比對。
        </p>
      </div>

      {/* Stats */}
      <div>
        <SectionLabel>研究規模</SectionLabel>
        <div className="stat-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
          <StatBadge label="台灣人體生物資料庫參與者" value="1,491 人" color="#34d399" />
          <StatBadge label="目標分析基因" value="3 個基因" color="#34d399" />
          <StatBadge label="端到端自動化流程" value="GWAS → 3D" color="#34d399" />
        </div>
      </div>

      {/* Workflow */}
      <div>
        <SectionLabel>分析工作流程</SectionLabel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          {[
            { step: '01', title: '資料收集', desc: 'GWAS Catalog 候選基因 + TWB 全基因組變異資料 (VCF)' },
            { step: '02', title: '變異蛋白質序列生成', desc: 'SHAPEIT4 基因型定相 + ANNOVAR 功能註釋' },
            { step: '03', title: '3D 結構建模', desc: 'AlphaFold 3 + 固定隨機種子確保可重複性' },
            { step: '04', title: '結構比對分析', desc: 'RMSD & TM-score 全局 + 局部結構域比對' },
          ].map((row) => (
            <div key={row.step} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', padding: '0.75rem 1rem', borderRadius: '0.5rem', backgroundColor: 'var(--c-raised)' }}>
              <span style={{ fontFamily: 'var(--f-mono)', fontSize: '0.7rem', color: '#34d399', fontWeight: 700, flexShrink: 0, paddingTop: '0.1rem' }}>{row.step}</span>
              <div>
                <p style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--c-text)', marginBottom: '0.15rem' }}>{row.title}</p>
                <p style={{ fontSize: '0.8rem', color: 'var(--c-muted)' }}>{row.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video */}
      <div>
        <SectionLabel>成果報告影片</SectionLabel>
        <div style={{ position: 'relative', paddingBottom: '56.25%', borderRadius: '0.75rem', overflow: 'hidden', border: '1px solid var(--c-border)' }}>
          <iframe src="https://www.youtube.com/embed/WMRV9NNiG7Q" title="中研院統計所暑期實習成果報告" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }} />
        </div>
      </div>

      {/* Poster PDF */}
      <div>
        <SectionLabel>研究海報 (Poster)</SectionLabel>
        <iframe src="/poster.pdf" title="阮柏誠 中研院實習海報" style={{ width: '100%', height: '680px', border: '1px solid var(--c-border)', borderRadius: '0.75rem', backgroundColor: '#fff' }} />
      </div>

      {/* Divider */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--c-border)' }} />
        <span style={{ fontFamily: 'var(--f-mono)', fontSize: '0.7rem', color: 'var(--c-muted)' }}>更多文件</span>
        <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--c-border)' }} />
      </div>

      {/* PPT + Report */}
      <div className="two-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div>
          <SectionLabel>暑期最終成果 (PPT)</SectionLabel>
          <iframe src="/internship_final.pdf" title="暑期最終成果 PPT" className="pdf-iframe" style={{ width: '100%', height: '520px', border: '1px solid var(--c-border)', borderRadius: '0.75rem', backgroundColor: '#fff' }} />
        </div>
        <div>
          <SectionLabel>個人書面報告</SectionLabel>
          <iframe src="/internship_report.pdf" title="中研院暑期實習生個人書面報告" className="pdf-iframe" style={{ width: '100%', height: '520px', border: '1px solid var(--c-border)', borderRadius: '0.75rem', backgroundColor: '#fff' }} />
        </div>
      </div>
    </div>
  )
}

/* ─── Project 6: AI News Automation ─────────────────── */
function Project6Body() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Overview */}
      <div>
        <SectionLabel>專案概覽</SectionLabel>
        <p style={{ fontSize: '0.9rem', color: 'var(--c-subtle)', lineHeight: 1.85 }}>
          實現媒體編輯流程的全面自動化，打造由 AI 驅動的新型態工作流。
          每天台灣時間 08:00，系統從 VentureBeat、MIT Technology Review、TechCrunch 等科技媒體抓取當日 AI 新聞，
          自動翻譯、查核、撰寫、審稿、配圖，最後發布到網站。沒有人需要操作任何東西。
        </p>
      </div>

      {/* Live site screenshot */}
      <div>
        <SectionLabel>實際運行畫面</SectionLabel>
        <p style={{ fontSize: '0.8rem', color: 'var(--c-muted)', marginBottom: '0.75rem' }}>
          此新聞站即建置於本網站內，每日自動更新。
        </p>
        <img
          src="/ai-news-screenshot.jpg"
          alt="AI 科技新聞站實際畫面"
          style={{ width: '100%', borderRadius: '0.75rem', border: '1px solid var(--c-border)' }}
        />
      </div>

      {/* Stats */}
      <div>
        <SectionLabel>系統規模</SectionLabel>
        <div className="stat-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
          <StatBadge label="每天早上 08:00 自動抓取" value="5 個國際科技媒體" color="#f97316" />
          <StatBadge label="每篇文章字數" value="1,500–2,500 字" color="#f97316" />
          <StatBadge label="串接 8 個 AI 角色" value="精確分工 各司其職" color="#f97316" />
        </div>
      </div>

      {/* Pipeline */}
      <div>
        <SectionLabel>8 Agent 流水線</SectionLabel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          {[
            { step: '01', title: 'Researcher', desc: 'RSS × 5 + Tavily 即時搜尋，規則預篩 + LLM 評分 ≥70 分' },
            { step: '02', title: 'Translator', desc: '英→台灣繁體中文，35+ 專業用語校正表' },
            { step: '03', title: 'Deep Researcher', desc: '子問題分解、多源查核、標記可信度' },
            { step: '04', title: 'Writer', desc: '三步驟：article-writing → humanizer-zh-tw → editor' },
            { step: '05', title: 'Manager', desc: '5 維度評分（≥6.0 才過）；退稿最多 2 次' },
            { step: '06', title: 'Media Generator', desc: 'HuggingFace FLUX.1-schnell / SDXL 生成封面圖' },
            { step: '07', title: 'Media Reviewer', desc: '品質審核，最多重試 3 次' },
            { step: '08', title: 'Publisher', desc: '去重偵測、寫入 _posts/、更新 ai-news.json' },
          ].map((row) => (
            <div key={row.step} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', padding: '0.75rem 1rem', borderRadius: '0.5rem', backgroundColor: 'var(--c-raised)' }}>
              <span style={{ fontFamily: 'var(--f-mono)', fontSize: '0.7rem', color: '#f97316', fontWeight: 700, flexShrink: 0, paddingTop: '0.1rem' }}>{row.step}</span>
              <div>
                <p style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--c-text)', marginBottom: '0.15rem' }}>{row.title}</p>
                <p style={{ fontSize: '0.8rem', color: 'var(--c-muted)' }}>{row.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Architecture highlights */}
      <div>
        <SectionLabel>設計亮點</SectionLabel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <Highlight
            title="完整工作流程設計"
            desc="8 個 Agent 透過 LangGraph 串接成有向圖，支援條件分支與迴圈。Manager 評分不足退回 Writer 重寫（最多 2 次），Media Reviewer 審核不通過重新生成封面（最多 3 次），確保每篇文章達標才發布。"
            color="#f97316"
          />
          <Highlight
            title="Skill 驅動的 Agent 設計"
            desc="每個 Agent 搭配對應的 Skill 規範（deep-research、article-writing、humanizer-zh-tw、editor），定義職責與輸出標準。其中 humanizer-zh-tw 專門偵測並修正 24 種 AI 寫作模式，讓文章讀起來不像機器寫的。"
            color="#f97316"
          />
          <Highlight
            title="雙模型分工與成本控管"
            desc="GPT-4o 負責撰稿與深度分析，GPT-4o-mini 處理翻譯、評分、校對，成本約便宜 15 倍。規則預篩在 LLM 前執行，每次最多發布 3 篇，防止費用失控。"
            color="var(--c-neon)"
          />
        </div>
      </div>

      {/* Tech stack */}
      <div>
        <SectionLabel>技術堆疊</SectionLabel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {[
            { category: 'Agent 框架', tech: 'LangGraph + LangChain' },
            { category: 'LLM', tech: 'GPT-4o（寫作）/ GPT-4o-mini（審核、翻譯）' },
            { category: '新聞來源', tech: 'Tavily 即時搜尋 + RSS 訂閱 × 5 媒體' },
            { category: '封面圖生成', tech: 'HuggingFace Inference API' },
            { category: '部署', tech: 'GitHub Actions + GitHub Pages' },
          ].map((row, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '7rem 1fr', gap: '1rem', padding: '0.6rem 1rem', borderRadius: '0.5rem', backgroundColor: 'var(--c-raised)', fontSize: '0.83rem' }}>
              <span style={{ color: '#f97316', fontFamily: 'var(--f-mono)', fontSize: '0.72rem' }}>{row.category}</span>
              <span style={{ color: 'var(--c-subtle)' }}>{row.tech}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ─── Project card data ──────────────────────────────── */
const PROJECTS: ProjectData[] = [
  {
    id: 1,
    title: '手部追蹤即時數學辨識系統',
    subtitle: 'AI 空中書寫數學解題器',
    accentColor: 'var(--c-neon)',
    github: 'https://github.com/stevenbocheng/AI-imaging-related-projects',
    body: <Project1Body />,
  },
  {
    id: 3,
    title: 'AI 學習諮詢師',
    subtitle: 'Multi-Agent RAG · LangGraph',
    accentColor: 'var(--c-blue)',
    github: 'https://github.com/stevenbocheng/LLM-AI-Learning-Consultant',
    body: <Project3Body />,
  },
  {
    id: 6,
    title: '全自動 AI 科技新聞編輯室',
    subtitle: '8 Agents · LangGraph · GitHub Actions',
    accentColor: '#f97316',
    github: 'https://github.com/stevenbocheng/AI-NEWS-Teams',
    body: <Project6Body />,
  },
  {
    id: 2,
    title: '高雄房價預測系統',
    subtitle: 'End-to-End ML Pipeline',
    accentColor: 'var(--c-amber)',
    github: 'https://github.com/stevenbocheng/Kaohsiung-Housing--Data-Analysis',
    demo: 'https://kaohsiung-housing--data-analysis-kiogievjdtcmtownemeud8.streamlit.app/',
    body: <Project2Body />,
  },
  {
    id: 4,
    title: '中研院統計所實習',
    subtitle: 'Academia Sinica · Statistics Institute',
    accentColor: '#34d399',
    body: <Project4Body />,
  },
  {
    id: 5,
    title: 'CryoEM 粒子挑選自動化',
    subtitle: '論文研究 · Active Learning',
    accentColor: '#a78bfa',
    body: <Project5Body />,
  },
]

/* ─── Card meta ──────────────────────────────────────── */
const CARD_META = [
  {
    tags: ['MediaPipe', 'OpenCV', 'Kalman Filter', 'GPT-4o-mini', 'SymPy'],
    metrics: ['ROI 降低 70% 傳輸量', 'Neuro-Symbolic 架構', '零幻覺求解'],
    summary: '在空中揮手，解出數學式。Kalman Filter 消除抖動，Neuro-Symbolic 雙核引擎從架構層根治 AI 幻覺。',
    index: '01',
  },
  {
    tags: ['GPT-4o', 'LangGraph', 'FAISS', 'BM25', 'LangChain'],
    metrics: ['178 萬筆書籍資料庫', 'Multi-Agent 三節點', '混合式 RAG'],
    summary: '輸入學習目標，自動規劃短中長期路線並推薦書單。LangGraph Multi-Agent + FAISS/BM25 混合式 RAG，完整部署於 Streamlit Cloud。',
    index: '02',
  },
  {
    tags: ['LangGraph', 'GPT-4o', 'Tavily', 'HuggingFace', 'GitHub Actions'],
    metrics: ['8 AI Agents · 15 NewsState 欄位', '評分 ≥ 6.0 才發布，最多退稿 2 次', '24 種 AI 寫作模式偵測'],
    summary: '8 個 AI 代理以 LangGraph StateGraph 串接，每日自動蒐集、深度查核、撰寫並發布繁體中文科技新聞。Manager 以 5 維度評分把關，Writer 依序執行 3 個 Prompt 角色去除 AI 痕跡。',
    index: '03',
  },
  {
    tags: ['CatBoost', 'LightGBM', 'SHAP', 'Lasso', 'PCA'],
    metrics: ['MAPE 11.9%', 'R² 0.625', '31 行政區 · 137K 筆資料'],
    summary: '從原始政府髒資料到可公開存取的互動預測儀表板。端到端 ML Pipeline 的完整呈現。',
    index: '04',
  },
  {
    tags: ['AlphaFold 3', 'SHAPEIT4', 'ANNOVAR', 'R', 'Python'],
    metrics: ['1,491 位參與者', '3 目標基因', '全自動化流程'],
    summary: '探索高血壓基因變異與蛋白質 3D 結構的關係。建立端到端可重複的基因組結構分析工作流程。',
    index: '05',
  },
  {
    tags: ['Python', 'Deep Learning', 'Active Learning', 'CryoEM'],
    metrics: ['主動學習挑選', '不確定性指標', '取代人工成本'],
    summary: '使用主動學習搭配粒子校正流程與不確定性指標，自動化挑選 CryoEM 蛋白質粒子影像。',
    index: '06',
    wip: true,
  },
]

/* ─── Grid component ─────────────────────────────────── */
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" as const } },
}

export default function ProjectGrid() {
  const [activeProject, setActiveProject] = useState<ProjectData | null>(null)

  return (
    <section id="projects" className="section-padded" style={{ padding: '6rem 2rem', maxWidth: '1100px', margin: '0 auto' }}>
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
          // selected work
        </p>
        <h2
          style={{
            fontFamily: 'var(--f-display)',
            fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
            fontWeight: 700,
            color: 'var(--c-text)',
          }}
        >
          精選專案
        </h2>
      </div>

      {/* Cards */}
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
        style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
      >
        {PROJECTS.map((project, i) => {
          const meta = CARD_META[i]
          return (
            <motion.div
              key={project.id}
              variants={fadeUp}
              className="card-hover project-card-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: '80px 1fr auto',
                gap: '1.5rem',
                alignItems: 'center',
                padding: '1.75rem 2rem',
                backgroundColor: 'var(--c-surface)',
                border: `1px solid var(--c-border)`,
                borderRadius: '1rem',
                cursor: 'pointer',
              }}
              onClick={() => setActiveProject(project)}
            >
              {/* Index */}
              <div className="project-card-index">
                <span
                  style={{
                    fontFamily: 'var(--f-mono)',
                    fontSize: '2.25rem',
                    fontWeight: 700,
                    color: 'rgba(232, 232, 240, 1)',
                    lineHeight: 1,
                  }}
                >
                  {meta.index}
                </span>
              </div>

              {/* Content */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.4rem', flexWrap: 'wrap' }}>
                  <h3
                    style={{
                      fontFamily: 'var(--f-display)',
                      fontSize: '1.2rem',
                      fontWeight: 700,
                      color: 'var(--c-text)',
                    }}
                  >
                    {project.title}
                  </h3>
                  <span
                    style={{
                      fontFamily: 'var(--f-mono)',
                      fontSize: '0.7rem',
                      color: project.accentColor,
                      padding: '0.15rem 0.5rem',
                      border: `1px solid ${project.accentColor}40`,
                      borderRadius: '0.25rem',
                    }}
                  >
                    {project.subtitle}
                  </span>
                  {meta.wip && (
                    <span
                      style={{
                        fontFamily: 'var(--f-mono)',
                        fontSize: '0.62rem',
                        color: '#a78bfa',
                        padding: '0.1rem 0.45rem',
                        border: '1px solid #a78bfa40',
                        borderRadius: '0.25rem',
                        backgroundColor: '#a78bfa08',
                        letterSpacing: '0.06em',
                      }}
                    >
                      WIP
                    </span>
                  )}
                </div>

                <p style={{ fontSize: '0.875rem', color: 'var(--c-subtle)', marginBottom: '0.875rem', lineHeight: 1.7, maxWidth: '600px' }}>
                  {meta.summary}
                </p>

                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.6rem' }}>
                  {meta.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontFamily: 'var(--f-mono)',
                        fontSize: '0.7rem',
                        padding: '0.2rem 0.6rem',
                        backgroundColor: 'var(--c-raised)',
                        border: '1px solid var(--c-border)',
                        borderRadius: '0.25rem',
                        color: 'var(--c-muted)',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  {meta.metrics.map((m) => (
                    <span
                      key={m}
                      style={{
                        fontSize: '0.75rem',
                        color: project.accentColor,
                        fontFamily: 'var(--f-mono)',
                      }}
                    >
                      ↗ {m}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA arrow */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '2.5rem',
                  height: '2.5rem',
                  border: `1px solid ${project.accentColor}40`,
                  borderRadius: '50%',
                  color: project.accentColor,
                  flexShrink: 0,
                  transition: 'background-color 0.2s',
                }}
              >
                <ArrowUpRight size={16} />
              </div>
            </motion.div>
          )
        })}
      </motion.div>

      <ProjectDialog
        project={activeProject}
        open={activeProject !== null}
        onClose={() => setActiveProject(null)}
      />
    </section>
  )
}
