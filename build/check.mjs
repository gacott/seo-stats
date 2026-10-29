import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const BASE = '/seo-stats';
const files = [];
function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name === 'node_modules' || e.name === '.git') continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name.endsWith('.html')) files.push(p);
  }
}
walk(ROOT);

let problems = 0;
const ids = new Map(); // file -> Set(ids)

for (const f of files) {
  const html = fs.readFileSync(f, 'utf8');
  const set = new Set();
  for (const m of html.matchAll(/\sid="([^"]+)"/g)) set.add(m[1]);
  ids.set(path.resolve(f), set);
}

function existsFor(href) {
  const clean = href.split('#')[0].split('?')[0];
  let rel = clean.startsWith(BASE) ? clean.slice(BASE.length) : clean;
  if (rel === '' || rel === '/') rel = '/index.html';
  if (rel.endsWith('/')) rel += 'index.html';
  const target = path.join(ROOT, rel);
  return fs.existsSync(target);
}

for (const f of files) {
  const html = fs.readFileSync(f, 'utf8');
  // internal links only
  for (const m of html.matchAll(/href="(\/seo-stats[^"]*)"/g)) {
    const href = m[1];
    if (!existsFor(href)) { console.log('BROKEN LINK', path.relative(ROOT, f), '->', href); problems++; }
    // anchor check
    const hash = href.split('#')[1];
    if (hash) {
      const clean = href.split('#')[0];
      let rel = clean.slice(BASE.length);
      if (rel === '' || rel === '/') rel = '/index.html';
      if (rel.endsWith('/')) rel += 'index.html';
      const targetFile = path.resolve(path.join(ROOT, rel));
      const targetIds = ids.get(targetFile);
      if (targetIds && !targetIds.has(hash)) { console.log('MISSING ANCHOR', path.relative(ROOT, f), '->', href); problems++; }
    }
  }
  // basic structure
  if (!html.includes('</html>')) { console.log('NO </html>', path.relative(ROOT, f)); problems++; }
  if (!html.includes('application/ld+json')) { console.log('NO SCHEMA', path.relative(ROOT, f)); problems++; }
}

console.log(`\nChecked ${files.length} HTML files. Problems: ${problems}.`);
