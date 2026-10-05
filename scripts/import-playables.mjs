import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const source = process.argv[2];
if (!source) throw new Error('Usage: node scripts/import-playables.mjs <source-directory>');
const playables = JSON.parse(fs.readFileSync(path.join(root, 'data/playables.json'), 'utf8'));

function removePreloaderMarkup(html) {
  const opening = /<div\b[^>]*\bid=["']application-preloader["'][^>]*>/i.exec(html);
  if (!opening) throw new Error('Expected application-preloader element was not found');
  const tags = /<\/?div\b[^>]*>/gi;
  tags.lastIndex = opening.index;
  let depth = 0;
  for (let match; (match = tags.exec(html));) {
    depth += /^<\//.test(match[0]) ? -1 : 1;
    if (depth === 0) return html.slice(0, opening.index) + html.slice(tags.lastIndex);
  }
  throw new Error('Unbalanced preloader markup');
}

const bridge = `<script>
window.addEventListener('luna:started', function () {
  window.parent.postMessage({ type: 'portfolio:playable-ready' }, '*');
});
window.addEventListener('keydown', function (event) {
  if (event.key === 'Escape') window.parent.postMessage({ type: 'portfolio:playable-close' }, '*');
});
</script>`;

for (const playable of playables) {
  const original = fs.readFileSync(path.join(source, playable.sourceFile), 'utf8');
  const iconTag = [...original.matchAll(/<img\b[^>]*>/gi)].find(match => match[0].includes('preloader__icon'))?.[0];
  const icon = iconTag?.match(/src=["']data:image\/(png|webp|jpeg);base64,([^"']+)["']/i);
  const target = path.join(root, 'public/playables', playable.slug);
  fs.mkdirSync(target, { recursive: true });
  if (icon) fs.writeFileSync(path.join(target, `icon.${icon[1] === 'jpeg' ? 'jpg' : icon[1]}`), Buffer.from(icon[2], 'base64'));

  let removedStyles = 0;
  let removedScripts = 0;
  let removedSnapshots = 0;
  let html = original.replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, block => {
    if (!block.includes('.preloader')) return block;
    removedStyles++;
    return '';
  });
  html = html.replace(/<script\b[^>]*>([\s\S]*?)<\/script>/gi, (block, code) => {
    if (code.includes('__CF$cv$params')) {
      removedSnapshots++;
      return '';
    }
    if (code.includes('application-preloader') && !code.includes('function startGame')) {
      removedScripts++;
      return '';
    }
    return block;
  });
  html = removePreloaderMarkup(html);
  html = html.replace(/var t=document\.getElementById\("application-preloader"\);null!=t&&t\.parentNode\.removeChild\(t\),/g, '');
  html = html.replace('</head>', `<style>html,body{margin:0;padding:0;width:100%;height:100%;overflow:hidden;background:#000}</style>${bridge}</head>`);
  html = html.replace(/<\/html>\s*<\/head>\s*<\/html>\s*$/i, '</html>');
  if (html.includes('application-preloader') || html.includes('.preloader') || removedStyles !== 1 || removedScripts !== 1) {
    throw new Error(`Unexpected preloader structure in ${playable.sourceFile}`);
  }
  fs.writeFileSync(path.join(target, 'index.html'), html, 'utf8');
  console.log(`${playable.title}: preloader removed; ${removedSnapshots} CDN snapshot script removed; ${Buffer.byteLength(html)} bytes`);
}
