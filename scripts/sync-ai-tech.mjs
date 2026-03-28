import fs from 'fs';
import path from 'path';

function slugify(str) {
  return str
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\u4e00-\u9fff-]/g, '')
    .replace(/--+/g, '-')
    .trim();
}

function transformMarkdown(raw) {
  let content = raw.replace(/!\[\[.*?\]\]/g, '');
  content = content.replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (_, link, alias) => alias || link);
  return content.trim();
}

function extractFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  return match ? match[0] : null;
}

function buildFrontmatter(title, category) {
  const date = '2026-03-28';
  return `---\ntitle: ${title}\ndate: ${date}\ncategory: ${category}\ntags: []\nsummary: ''\n---\n\n`;
}

const vaultRoot = 'd:/筆記(第二大腦)';
const srcDir = `${vaultRoot}/50_卡片盒筆記/03_永久筆記/AI技術`;
const destDir = 'd:/個人網頁/content/ai-tech';
const imgDestDir = 'd:/個人網頁/public/images';

if (!fs.existsSync(imgDestDir)) fs.mkdirSync(imgDestDir, { recursive: true });

const files = fs.readdirSync(srcDir).filter(f => f.endsWith('.md'));
console.log('Found files:', files);

for (const file of files) {
  const raw = fs.readFileSync(path.join(srcDir, file), 'utf8');
  const slug = slugify(file.replace('.md', ''));
  const destFile = slug + '.md';

  // 複製圖片並轉換語法（檔名空格轉連字符、全部小寫）
  let transformed = raw.replace(/!\[\[([^\]]+\.(?:png|jpg|jpeg|gif|webp|svg))\]\]/gi, (_, imgName) => {
    const safeImgName = imgName.replace(/\s+/g, '-').toLowerCase();
    const srcImg = path.join(vaultRoot, imgName);
    const destImg = path.join(imgDestDir, safeImgName);
    if (fs.existsSync(srcImg)) {
      fs.copyFileSync(srcImg, destImg);
      console.log('  Copied image:', safeImgName);
    } else {
      console.warn('  Image not found:', srcImg);
    }
    return `![](./images/${safeImgName})`;
  });

  // 移除非圖片的 Obsidian 嵌入語法
  transformed = transformed.replace(/!\[\[.*?\]\]/g, '');
  // 移除 Obsidian 內部連結
  transformed = transformed.replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (_, link, alias) => alias || link);
  transformed = transformed.trim();

  if (!extractFrontmatter(transformed)) {
    const title = file.replace('.md', '');
    transformed = buildFrontmatter(title, 'ai-tech') + transformed;
  }

  fs.writeFileSync(path.join(destDir, destFile), transformed, 'utf8');
  console.log('Wrote:', destFile);
}

console.log('Done.');
