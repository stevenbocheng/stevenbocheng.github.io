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

const srcDir = 'd:/筆記(第二大腦)/50_卡片盒筆記/03_永久筆記/AI技術';
const destDir = 'd:/個人網頁/content/ai-tech';

const files = fs.readdirSync(srcDir).filter(f => f.endsWith('.md'));
console.log('Found files:', files);

for (const file of files) {
  const raw = fs.readFileSync(path.join(srcDir, file), 'utf8');
  const slug = slugify(file.replace('.md', ''));
  const destFile = slug + '.md';

  let transformed = transformMarkdown(raw);

  if (!extractFrontmatter(transformed)) {
    const title = file.replace('.md', '');
    transformed = buildFrontmatter(title, 'ai-tech') + transformed;
  }

  fs.writeFileSync(path.join(destDir, destFile), transformed, 'utf8');
  console.log('Wrote:', destFile);
}

console.log('Done.');
