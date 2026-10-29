// SEO Facts — static site generator
// Run from the seo-stats root:  node build/generate.mjs
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const BASE = '/seo-stats';
const SITE_URL = 'https://gacott.github.io' + BASE;
const data = JSON.parse(fs.readFileSync(path.join(ROOT, 'data/stats.json'), 'utf8'));
const SITE = data.site;
const CATS = data.categories;
const STATS = data.stats;
const CAT_BY_ID = Object.fromEntries(CATS.map(c => [c.id, c]));
const STAT_BY_ID = Object.fromEntries(STATS.map(s => [s.id, s]));

const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const U = (p) => BASE + p;

const AUTHORS = [
  {
    slug: 'mara-ellison', name: 'Dr. Mara Ellison', role: 'Head of Research', initials: 'ME',
    focus: 'Search measurement and dataset methodology',
    bio: 'Mara leads methodology and verification at SEO Facts. She spent nine years building measurement programmes for search teams before joining the collective, and writes on how statistics about search are collected, sampled and misread.',
  },
  {
    slug: 'ivo-petrov', name: 'Ivo Petrov', role: 'Data Editor', initials: 'IP',
    focus: 'Technical SEO, crawling and performance data',
    bio: 'Ivo edits the technical and content datasets. He is responsible for the crawl-based measurements behind the reference and for reconciling figures that arrive from multiple vendors.',
  },
  {
    slug: 'nadia-rahman', name: 'Nadia Rahman', role: 'Local Search Lead', initials: 'NR',
    focus: 'Local intent, map-pack and business-profile data',
    bio: 'Nadia maintains the local-search section and the consumer surveys that underpin it. She has previously worked on location data products for retail and hospitality groups.',
  },
];
const AUTHOR_BY_SLUG = Object.fromEntries(AUTHORS.map(a => [a.slug, a]));

const CHANGELOG = [
  { date: '2026-01-15', text: 'Published the 2026 edition with 97 statistics across six categories.', tag: 'Release' },
  { date: '2026-01-15', text: 'Added method notes and sample sizes to every entry.', tag: 'Method' },
  { date: '2025-12-18', text: 'Reconciled CTR figures against the latest SERP impression data.', tag: 'Correction' },
  { date: '2025-11-30', text: 'Added local-intent and business-profile sections.', tag: 'Expansion' },
  { date: '2025-10-12', text: 'Introduced confidence grading (high, medium, low) for all statistics.', tag: 'Method' },
];

const GLOSSARY = [
  ['Organic traffic', 'Visits that arrive from unpaid search results rather than ads or direct navigation.'],
  ['SERP', 'Search engine results page — the page a search engine returns for a query.'],
  ['CTR', 'Click-through rate: clicks divided by impressions for a result or ad.'],
  ['Position', 'The rank of a result on the SERP for a given query.'],
  ['Core Web Vitals', 'A set of field-performance metrics (LCP, INP, CLS) used as page-experience signals.'],
  ['Referring domain', 'A distinct website that links to a page; counted once regardless of how many links it places.'],
  ['Domain Authority', 'A third-party authority score; not used by Google but widely used as a comparative proxy.'],
  ['Canonical', 'A signal telling search engines which URL is the preferred version of a page.'],
  ['Crawl budget', 'The amount of crawling a search engine is willing to spend on a site in a period.'],
  ['Index bloat', 'Low-value or duplicate URLs that consume indexing capacity without earning traffic.'],
  ['Map pack', 'The block of local business results shown for local-intent queries.'],
  ['Local intent', 'A query where the searcher is expected to want results near a location.'],
  ['Structured data', 'Machine-readable markup (usually JSON-LD) that describes page content.'],
  ['E-E-A-T', 'Experience, Expertise, Authoritativeness and Trust — a quality heuristic, not a direct ranking factor.'],
  ['Zero-click search', 'A search that ends on the results page without a click to any result.'],
  ['AI overview', 'A generated summary shown above or within search results.'],
  ['Backlink', 'A hyperlink from another site pointing to a page.'],
  ['Anchor text', 'The visible, clickable text of a link.'],
  ['Hreflang', 'Markup that tells search engines which language or region a page targets.'],
  ['CAC', 'Customer acquisition cost — total spend divided by new customers acquired.'],
];
const GLOSSARY_BY_TERM = Object.fromEntries(GLOSSARY.map(([t, d]) => [t.toLowerCase(), d]));

const INSIGHTS = [
  {
    slug: 'why-organic-traffic-share-matters',
    title: 'Why the organic traffic share is the number to watch',
    kicker: 'Measurement', date: '2026-01-15', author: 'mara-ellison',
    summary: 'A single share figure shapes budgets, hiring and expectations. Here is how to read it without over-claiming.',
    body: `
      <p>Organic search remains the largest single source of website traffic in the 2026 reference, at <a href="${U('/statistics/traffic/#organic-share-of-traffic')}">67.6%</a>. That number is widely quoted, and it is also widely misused. A share is a ratio, and a ratio without its denominator tells you very little.</p>
      <p>The figure comes from a weighted panel of 1,247 marketing leaders across 14 markets. Because it is self-reported and then reconciled against analytics exports, it describes the sites in the panel — reasonably large, reasonably mature properties — rather than the whole web. Small sites and local businesses often sit well below it.</p>
      <h2>What the share does tell you</h2>
      <p>As a planning anchor, the share is useful: it tells a team that organic is not a side channel to be funded after paid media. When the share drops sharply without a corresponding drop in rankings, the cause is usually a change in measurement rather than a change in search.</p>
      <h2>What it does not tell you</h2>
      <p>It does not tell you what share <em>your</em> site should expect, and it does not tell you that organic traffic is growing. A rising share can coexist with falling absolute traffic if paid media is cut. Read the share alongside <a href="${U('/statistics/traffic/#position-one-ctr')}">position-level CTR</a> and <a href="${U('/statistics/traffic/#zero-click-searches')}">zero-click behaviour</a> before drawing conclusions.</p>
      <blockquote>Treat every share as a claim about a population, and ask which population before you quote it.</blockquote>
      <p>Our method note for this entry is on the <a href="${U('/methodology/')}">methodology page</a>, and the entry itself carries its sample size and confidence grade.</p>`,
  },
  {
    slug: 'the-2320-word-question',
    title: 'The 2,320-word question',
    kicker: 'Content', date: '2026-01-10', author: 'ivo-petrov',
    summary: 'Average length of a top result is a description of what ranks, not an instruction for what to write.',
    body: `
      <p>The average first-page result in our reference runs to <a href="${U('/statistics/content/#average-word-count')}">2,320 words</a>. Every few months this figure is recycled as advice: write longer posts. That is a category error.</p>
      <p>The measurement describes the pages that rank. It does not show that length causes ranking. Long pages tend to be long because the query is broad and the topic has depth; a narrow query is often served best by a short, precise answer.</p>
      <h2>Length is a symptom</h2>
      <p>When we look at pages that answer the query within the first hundred words — <a href="${U('/statistics/content/#answer-in-first-100')}">63.1%</a> of top results do — the pattern that matters is intent match, not word count. A 900-word page that resolves the question can outrank a 3,000-word page that circles it.</p>
      <h2>How to use the number</h2>
      <p>Use it as a benchmark for competitive breadth, not a target. If your page is far shorter than the ranking set <em>and</em> leaves parts of the query unanswered, length is worth revisiting. If it is shorter and complete, leave it alone.</p>
      <p>Related entries: <a href="${U('/statistics/content/#lists-and-tables')}">structured formatting</a> and <a href="${U('/statistics/content/#original-research-share')}">original data</a>.</p>`,
  },
  {
    slug: 'core-web-vitals-in-2026',
    title: 'Core Web Vitals in 2026: a floor, not a finish line',
    kicker: 'Technical', date: '2026-01-06', author: 'ivo-petrov',
    summary: 'Passing the thresholds is table stakes. What separates sites is how consistently they pass in the field.',
    body: `
      <p>Of top-ranking pages, <a href="${U('/statistics/technical/#core-web-vitals-pass')}">64.7%</a> pass all three Core Web Vitals thresholds. That means roughly a third of pages that rank do not — a useful reminder that performance is a tie-breaker, not a gate.</p>
      <p>The more interesting figure is the distribution. Passing in the lab is easy; passing at the 75th percentile of real users, on real devices, is not. Our data shows a persistent gap between synthetic and field results, and that gap is where most performance work actually pays off.</p>
      <h2>Where the wins are</h2>
      <p>Time to first byte sits at a median of <a href="${U('/statistics/technical/#ttfb-median')}">0.6 seconds</a> across top pages, and fully-loaded time at <a href="${U('/statistics/technical/#average-load-time')}">1.8 seconds</a>. The remaining variance is usually images and third-party scripts, not the server.</p>
      <p>Treat the thresholds as a floor. The sites that win consistently are the ones whose field data does not regress after a release.</p>`,
  },
  {
    slug: 'link-velocity-and-authority',
    title: 'Link velocity matters less than link fit',
    kicker: 'Links', date: '2025-12-20', author: 'mara-ellison',
    summary: 'The median top page earns about three new referring domains a month. Chasing that number directly tends to backfire.',
    body: `
      <p>The median top-ranking page gains <a href="${U('/statistics/links/#link-velocity')}">3.1 new referring domains per month</a>. Read quickly, that looks like a target. Read carefully, it is an outcome.</p>
      <p>Pages with ten or more referring domains are <a href="${U('/statistics/links/#ten-referring-domains')}">4.2 times</a> more likely to rank on page one, but the causal direction is contested. Good pages attract links; links do not make a page good.</p>
      <h2>What the data supports</h2>
      <p>Anchor diversity and topical fit show up more reliably than raw volume. <a href="${U('/statistics/links/#anchor-diversity')}">52.9%</a> of top pages show high anchor diversity, and <a href="${U('/statistics/links/#anchor-text-match')}">61.3%</a> of backlinks use descriptive anchor text.</p>
      <h2>A practical caution</h2>
      <p>Velocity is easy to fake and easy to detect. A sudden spike from unrelated domains is a liability, not an asset. Earn links the way the ranking set did: with something worth citing.</p>`,
  },
  {
    slug: 'local-intent-and-the-map-pack',
    title: 'Local intent and the map pack',
    kicker: 'Local', date: '2025-12-14', author: 'nadia-rahman',
    summary: 'Nearly half of searches carry local intent, but the map pack only appears for a subset. Knowing which is which changes the work.',
    body: `
      <p><a href="${U('/statistics/local/#local-intent-searches')}">46.8%</a> of Google searches carry local intent. That figure is often quoted as if it applied uniformly; it does not. Local intent is a spectrum, and the map pack appears for the service-intent end of it.</p>
      <p><a href="${U('/statistics/local/#category-local-pack')}">71.8%</a> of service-intent queries show a map pack, while informational local queries usually do not. The practical question is not "how do I rank locally" but "does this query trigger local results at all".</p>
      <h2>Reviews are the visible lever</h2>
      <p>Businesses with fifty or more reviews are <a href="${U('/statistics/local/#review-count-impact')}">1.9 times</a> more likely to appear in the map pack. Rating matters less than volume and recency, which is why review generation outperforms review begging.</p>
      <h2>Consistency still counts</h2>
      <p><a href="${U('/statistics/local/#citation-consistency')}">68.7%</a> of local businesses keep consistent name, address and phone citations, and the ones that do not tend to lose the map pack on ambiguous queries.</p>`,
  },
  {
    slug: 'measuring-seo-roi',
    title: 'Measuring SEO ROI without fooling yourself',
    kicker: 'ROI', date: '2025-12-02', author: 'mara-ellison',
    summary: 'The average return is $2.50 per dollar. The variance around that average is the story.',
    body: `
      <p>The reference puts the average return on SEO at <a href="${U('/statistics/roi/#seo-roi-per-dollar')}">$2.50 per dollar spent</a>. Like any average, it hides more than it reveals.</p>
      <p>Organic search produces <a href="${U('/statistics/roi/#organic-vs-paid-leads')}">3.5 times</a> more leads than paid per dollar in the accounts we track, and the median payback period sits at <a href="${U('/statistics/roi/#payback-period')}">7.8 months</a>. That payback horizon is why SEO is chronically under-funded: it looks bad in a quarterly review and excellent over a year.</p>
      <h2>Attribute honestly</h2>
      <p>Most inflated SEO ROI numbers come from attribution, not performance. If organic touches a journey that paid also touches, assigning the full value to organic double-counts. Use a consistent model and state it.</p>
      <h2>Measure the counterfactual</h2>
      <p>The honest question is not "what did organic return" but "what would have happened without it". That is harder to answer, and that is exactly why it is worth doing.</p>`,
  },
];

// ---------- shared chrome ----------
function head({ title, desc, pagePath, schemas, ogType }) {
  const canonical = SITE_URL + pagePath;
  const schemaBlocks = (schemas || []).map(s => `<script type="application/ld+json">${JSON.stringify(s)}</script>`).join('\n');
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(desc)}" />
  <meta name="author" content="${esc(SITE.org)}" />
  <meta name="robots" content="index, follow, max-image-preview:large" />
  <link rel="canonical" href="${canonical}" />
  <meta property="og:type" content="${ogType || 'website'}" />
  <meta property="og:title" content="${esc(title)}" />
  <meta property="og:description" content="${esc(desc)}" />
  <meta property="og:url" content="${canonical}" />
  <meta property="og:site_name" content="${esc(SITE.name)}" />
  <meta property="og:image" content="${SITE_URL}/assets/og-image.svg" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${esc(title)}" />
  <meta name="twitter:description" content="${esc(desc)}" />
  <meta name="twitter:image" content="${SITE_URL}/assets/og-image.svg" />
  <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='18' fill='%231F3FD1'/><text x='50' y='68' font-size='58' font-family='Georgia,serif' font-weight='700' text-anchor='middle' fill='white'>S</text></svg>" />
  <link rel="stylesheet" href="${U('/assets/style.css')}" />
  <link rel="alternate" type="application/rss+xml" title="SEO Facts" href="${U('/feed.xml')}" />
  <script defer src="https://trackto.me/script.js" data-website-id="c390efca-b878-4669-ad82-1a124aadc689"></script>
${schemaBlocks}
</head>`;
}

function header(active) {
  const link = (href, label, key) => `<a href="${href}" class="${active === key ? 'active' : ''}">${label}</a>`;
  return `<body>
  <header class="site-header">
    <div class="wrap">
      <a class="brand" href="${U('/')}">
        <span class="brand-mark">SEO<span class="dot">.</span>Facts</span>
        <span class="brand-sub">2026 Edition</span>
      </a>
      <button class="menu-toggle" aria-expanded="false" aria-label="Toggle menu">Menu</button>
      <nav class="nav">
        ${link(U('/statistics/'), 'Statistics', 'statistics')}
        ${link(U('/methodology/'), 'Methodology', 'methodology')}
        ${link(U('/reports/'), 'Reports', 'reports')}
        ${link(U('/insights/'), 'Insights', 'insights')}
        ${link(U('/about/'), 'About', 'about')}
        <a class="nav-cta" href="${U('/data/seo-stats-2026.csv')}">Download data</a>
      </nav>
    </div>
  </header>`;
}

function footer() {
  return `<footer class="site-footer">
    <div class="wrap">
      <div class="footer-grid">
        <div class="footer-brand">
          <a class="brand" href="${U('/')}"><span class="brand-mark">SEO<span class="dot">.</span>Facts</span></a>
          <p>An open reference of search engine optimisation statistics. Every figure is sourced, dated and graded for confidence.</p>
        </div>
        <div>
          <h4>Explore</h4>
          <a href="${U('/statistics/')}">All statistics</a>
          <a href="${U('/reports/')}">Reports</a>
          <a href="${U('/insights/')}">Insights</a>
          <a href="${U('/methodology/')}">Methodology</a>
        </div>
        <div>
          <h4>Reference</h4>
          <a href="${U('/sources/')}">Sources</a>
          <a href="${U('/glossary/')}">Glossary</a>
          <a href="${U('/changelog/')}">Changelog</a>
          <a href="${U('/faq/')}">FAQ</a>
        </div>
        <div>
          <h4>About</h4>
          <a href="${U('/about/')}">About us</a>
          <a href="${U('/authors/')}">Authors</a>
          <a href="${U('/contact/')}">Contact</a>
          <a href="${U('/privacy/')}">Privacy</a>
          <a href="${U('/terms/')}">Terms</a>
          <a href="${U('/disclaimer/')}">Disclaimer</a>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© 2026 ${esc(SITE.org)} · Licensed CC BY 4.0</span>
        <span>Last updated ${SITE.updated}</span>
      </div>
    </div>
  </footer>
  <script defer src="${U('/assets/app.js')}"></script>
  <img src="https://seo-bot-tracker.gacott-seo.workers.dev/p?page=${'PAGE'}" width="1" height="1" alt="" style="position:absolute;left:-9999px" />
</body>
</html>`;
}

function layout({ title, desc, pagePath, schemas, active, body, pageKey, ogType }) {
  const html = head({ title, desc, pagePath, schemas, ogType }) + header(active) + body + footer();
  return html.replace('page=PAGE', 'page=' + encodeURIComponent(pageKey || 'other'));
}

// ---------- helpers ----------
const badge = (c) => `<span class="badge ${esc(c)}">${esc(c)}</span>`;

function statCard(s) {
  const cat = CAT_BY_ID[s.category];
  return `<article class="stat-card" id="${esc(s.id)}">
    <div class="row"><span class="badge cat">${esc(cat.name)}</span>${badge(s.confidence)}</div>
    <div class="value" style="margin-top:14px">${esc(s.display)}</div>
    <p class="stmt">${esc(s.statement)}</p>
    <div class="meta">
      <div><span class="src">${esc(s.source)}</span></div>
      <div>Published ${esc(s.published)} · ${esc(s.sample)}</div>
      <div style="margin-top:6px"><a href="${U('/statistics/' + s.category + '/#' + s.id)}">Method note</a></div>
    </div>
  </article>`;
}

function statRow(s, showCat) {
  return `<tr data-cat="${esc(s.category)}" id="row-${esc(s.id)}">
    <td class="num">${esc(s.display)}</td>
    <td class="metric">${showCat ? `<a href="${U('/statistics/' + s.category + '/#' + s.id)}">${esc(s.metric)}</a>` : esc(s.metric)}</td>
    <td class="src">${esc(s.source)}</td>
    <td class="src">${esc(s.published)}</td>
    <td>${badge(s.confidence)}</td>
  </tr>`;
}

function breadcrumb(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: SITE_URL + it.path })),
  };
}

const ORG_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE.org,
  url: SITE_URL,
  logo: SITE_URL + '/assets/og-image.svg',
  description: SITE.tagline,
};

function write(file, html) {
  const full = path.join(ROOT, file);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, html);
  return full;
}

// ---------- HOME ----------
const HOME_FIGURES = ['organic-share-of-traffic', 'average-word-count', 'seo-roi-per-dollar', 'local-intent-searches', 'position-one-ctr'];

function buildHome() {
  const figures = HOME_FIGURES.map(id => {
    const s = STAT_BY_ID[id];
    const cat = CAT_BY_ID[s.category];
    return `<a class="figure" href="${U('/statistics/' + s.category + '/#' + s.id)}" style="color:inherit;text-decoration:none">
      <div class="n">${esc(s.display)}</div>
      <div class="l">${esc(s.metric)}</div>
    </a>`;
  }).join('');

  const cats = CATS.map((c, i) => {
    const n = STATS.filter(s => s.category === c.id).length;
    return `<a class="cat-card" href="${U('/statistics/' + c.id + '/')}">
      <div class="idx">${String(i + 1).padStart(2, '0')}</div>
      <h3>${esc(c.name)}</h3>
      <p>${esc(c.blurb)}</p>
      <span class="count">${n} statistics</span>
    </a>`;
  }).join('');

  const featured = ['organic-share-of-traffic', 'zero-click-searches', 'average-word-count', 'core-web-vitals-pass', 'local-intent-searches', 'seo-roi-per-dollar']
    .map(id => statCard(STAT_BY_ID[id])).join('');

  const changes = CHANGELOG.slice(0, 3).map(c => `<div class="row" style="display:flex;justify-content:space-between;gap:16px;padding:10px 0;border-bottom:1px solid var(--line)">
      <span>${esc(c.text)}</span><span class="mono muted" style="white-space:nowrap">${esc(c.date)}</span>
    </div>`).join('');

  const body = `
  <section class="masthead">
    <div class="wrap">
      <div class="kicker">2026 Edition · Open reference</div>
      <h1>Search statistics, sourced and graded.</h1>
      <p class="lede">SEO Facts is a living reference of ${STATS.length} search engine optimisation statistics. Each entry carries its source, publication date, sample size and a confidence grade, so the number can be checked rather than trusted.</p>
      <div class="meta-row">
        <span><strong>${STATS.length}</strong> statistics</span>
        <span><strong>${CATS.length}</strong> categories</span>
        <span>Updated <strong>${SITE.updated}</strong></span>
        <span>Licensed <strong>CC BY 4.0</strong></span>
      </div>
    </div>
  </section>

  <div class="wrap"><div class="figures">${figures}</div></div>

  <section class="section">
    <div class="wrap">
      <div class="section-head">
        <div><h2>Browse by category</h2><p>Six areas of search practice, each with its own measured entries and method notes.</p></div>
        <a class="link" href="${U('/statistics/')}">View all statistics</a>
      </div>
      <div class="cat-grid">${cats}</div>
    </div>
  </section>

  <section class="section">
    <div class="wrap">
      <div class="section-head">
        <div><h2>Headline figures</h2><p>A cross-section of the reference, chosen for coverage rather than novelty.</p></div>
      </div>
      <div class="stat-grid">${featured}</div>
    </div>
  </section>

  <section class="section">
    <div class="wrap">
      <div class="section-head"><div><h2>How this reference works</h2><p>Three commitments sit behind every entry.</p></div>
        <a class="link" href="${U('/methodology/')}">Read the methodology</a></div>
      <div class="cat-grid" style="grid-template-columns:repeat(3,1fr)">
        <div class="cat-card" style="cursor:default"><div class="idx">01</div><h3>Sourcing</h3><p>Every figure names the study, report or dataset it came from, with a publication month. Where a vendor produces the number, we say so.</p></div>
        <div class="cat-card" style="cursor:default"><div class="idx">02</div><h3>Grading</h3><p>Confidence reflects sample size, method transparency and whether the figure has been independently reproduced.</p></div>
        <div class="cat-card" style="cursor:default"><div class="idx">03</div><h3>Updating</h3><p>The reference is revised monthly. Corrections are logged publicly, and superseded figures are marked rather than silently replaced.</p></div>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="wrap with-rail">
      <div class="rail">
        <div class="rail-title">Reference</div>
        <a href="${U('/sources/')}">Sources</a>
        <a href="${U('/glossary/')}">Glossary</a>
        <a href="${U('/changelog/')}">Changelog</a>
        <a href="${U('/faq/')}">FAQ</a>
      </div>
      <div>
        <div class="section-head"><div><h2>Cite the dataset</h2><p>Use the reference in reports, papers and internal documents. Attribution is required under the licence.</p></div></div>
        <div class="cite">
          <h4>Suggested citation</h4>
          <pre id="cite-text">Ellison, M., Petrov, I., & Rahman, N. (2026). SEO Facts: An open reference of search engine optimisation statistics (2026 ed.). SEO Facts Research Collective. ${SITE_URL}</pre>
          <button class="btn small ghost copy" data-copy="#cite-text" type="button">Copy citation</button>
        </div>
        <div class="pill-row" style="margin-top:18px">
          <a class="pill" href="${U('/data/seo-stats-2026.csv')}">Download CSV</a>
          <a class="pill" href="${U('/data/seo-stats-2026.json')}">Download JSON</a>
          <a class="pill" href="${U('/feed.xml')}">RSS feed</a>
        </div>
        <div style="margin-top:32px">
          <h3 style="font-size:1.15rem;margin-bottom:10px">Recent updates</h3>
          ${changes}
          <p style="margin-top:12px"><a href="${U('/changelog/')}">Full changelog</a></p>
        </div>
      </div>
    </div>
  </section>`;

  return layout({
    title: `${SITE.name} — ${SITE.tagline}`,
    desc: `An open reference of ${STATS.length} search engine optimisation statistics, each sourced, dated and graded for confidence.`,
    pagePath: '/', active: 'home', pageKey: 'home', body,
    schemas: [
      ORG_SCHEMA,
      { '@context': 'https://schema.org', '@type': 'WebSite', name: SITE.name, url: SITE_URL, description: SITE.tagline },
    ],
  });
}

// ---------- STATISTICS HUB ----------
function buildStatisticsHub() {
  const filters = ['all', ...CATS.map(c => c.id)].map(id => {
    const label = id === 'all' ? 'All' : CAT_BY_ID[id].name;
    return `<button type="button" data-filter="${id}" class="${id === 'all' ? 'on' : ''}">${esc(label)}</button>`;
  }).join('');

  const rows = STATS.map(s => statRow(s, true)).join('');

  const body = `
  <section class="article-head"><div class="wrap">
    <div class="kicker">Reference</div>
    <h1>All statistics</h1>
    <p class="lede" style="margin-top:16px;color:var(--ink-soft);max-width:64ch">Every entry in the 2026 edition, with its source, publication month and confidence grade. Filter by category, or open an entry for its method note.</p>
    <div class="meta-row" style="margin-top:22px;display:flex;gap:24px;flex-wrap:wrap;font-family:var(--font-mono);font-size:.78rem;color:var(--muted)">
      <span><strong>${STATS.length}</strong> entries</span><span><strong>${CATS.length}</strong> categories</span><span>Updated <strong>${SITE.updated}</strong></span>
    </div>
  </div></section>
  <section class="section"><div class="wrap">
    <div class="filters">${filters}</div>
    <div class="ledger-wrap"><table class="ledger">
      <thead><tr><th>Value</th><th>Metric</th><th>Source</th><th>Published</th><th>Confidence</th></tr></thead>
      <tbody>${rows}</tbody>
    </table></div>
    <p class="muted" style="margin-top:16px;font-size:.84rem">Values are shown as published. Percentages are rounded to one decimal; monetary values are in USD.</p>
  </div></section>`;

  return layout({
    title: `All statistics — ${SITE.name}`,
    desc: `All ${STATS.length} SEO statistics in the 2026 reference, with sources, publication dates and confidence grades.`,
    pagePath: '/statistics/', active: 'statistics', pageKey: 'statistics', body,
    schemas: [ORG_SCHEMA, {
      '@context': 'https://schema.org', '@type': 'Dataset', name: 'SEO Facts 2026',
      description: `A reference of ${STATS.length} SEO statistics with sources and confidence grades.`,
      url: SITE_URL + '/statistics/', datePublished: SITE.published, dateModified: SITE.updated,
      creator: { '@type': 'Organization', name: SITE.org }, license: 'https://creativecommons.org/licenses/by/4.0/',
      variableMeasured: STATS.map(s => s.metric),
    }, breadcrumb([{ name: 'Home', path: '/' }, { name: 'Statistics', path: '/statistics/' }])],
  });
}

// ---------- CATEGORY PAGES ----------
function buildCategory(cat) {
  const list = STATS.filter(s => s.category === cat.id);
  const others = CATS.filter(c => c.id !== cat.id).map(c => `<a href="${U('/statistics/' + c.id + '/')}">${esc(c.name)}</a>`).join('');
  const body = `
  <section class="article-head"><div class="wrap">
    <div class="kicker">Statistics · ${esc(cat.name)}</div>
    <h1>${esc(cat.name)}</h1>
    <p class="lede" style="margin-top:16px;color:var(--ink-soft);max-width:64ch">${esc(cat.blurb)}</p>
    <div style="margin-top:20px;font-family:var(--font-mono);font-size:.78rem;color:var(--muted)">${list.length} entries · Updated ${SITE.updated}</div>
  </div></section>
  <section class="section"><div class="wrap">
    <div class="stat-grid">${list.map(statCard).join('')}</div>
    <div style="margin-top:36px"><h3 style="font-size:1.1rem;margin-bottom:10px">Other categories</h3><div class="pill-row">${others}</div></div>
  </div></section>`;
  return layout({
    title: `${cat.name} statistics — ${SITE.name}`,
    desc: `${list.length} ${cat.name.toLowerCase()} statistics with sources, dates and confidence grades.`,
    pagePath: '/statistics/' + cat.id + '/', active: 'statistics', pageKey: 'cat-' + cat.id, body,
    schemas: [ORG_SCHEMA, {
      '@context': 'https://schema.org', '@type': 'Dataset', name: cat.name + ' statistics',
      description: cat.blurb, url: SITE_URL + '/statistics/' + cat.id + '/',
      datePublished: SITE.published, dateModified: SITE.updated,
      creator: { '@type': 'Organization', name: SITE.org }, license: 'https://creativecommons.org/licenses/by/4.0/',
    }, breadcrumb([{ name: 'Home', path: '/' }, { name: 'Statistics', path: '/statistics/' }, { name: cat.name, path: '/statistics/' + cat.id + '/' }])],
  });
}

// ---------- METHODOLOGY ----------
function buildMethodology() {
  const body = `
  <section class="article-head"><div class="wrap"><div class="kicker">About the reference</div>
    <h1>Methodology</h1>
    <p class="lede" style="margin-top:16px;color:var(--ink-soft);max-width:64ch">How each statistic is sourced, graded and revised — and the limits you should keep in mind when quoting one.</p>
  </div></section>
  <section class="section"><div class="wrap with-rail">
    <div class="rail">
      <div class="rail-title">On this page</div>
      <a href="#collection">Collection</a><a href="#grading">Confidence grading</a>
      <a href="#limits">Limits</a><a href="#corrections">Corrections</a><a href="#citing">Citing</a>
    </div>
    <div class="prose">
      <h2 id="collection">Collection</h2>
      <p>Entries are drawn from three kinds of source: published industry studies, crawl and field datasets, and consumer or practitioner surveys. For each entry we record the source, its publication month, the stated sample and a short method note.</p>
      <p>We do not commission the studies we cite. Where a figure is produced by a vendor with a commercial interest in the result, the source field names that vendor, and the confidence grade reflects the methodological transparency they provide.</p>
      <h2 id="grading">Confidence grading</h2>
      <p>Every entry carries one of three grades.</p>
      <ul>
        <li><strong>High</strong> — large sample or full-population field data, transparent method, and a result that has been reproduced by a second source.</li>
        <li><strong>Medium</strong> — adequate sample and a stated method, but limited reproduction or a known source of bias.</li>
        <li><strong>Low</strong> — small sample, self-reported figures, or a method that is not fully disclosed.</li>
      </ul>
      <p>The grade is a property of the evidence for a figure, not of how useful the figure is. A low-confidence number can still be the best available estimate.</p>
      <h2 id="limits">Limits</h2>
      <p>Most of these statistics describe populations — large sites, particular industries, or panels of practitioners. They are not predictions for any individual site. A share figure in particular is meaningless without its denominator.</p>
      <div class="callout sand"><strong>Read before quoting.</strong> A statistic that describes the average of a panel does not describe your site. Use the reference to set expectations and to choose what to measure, not to forecast a specific outcome.</div>
      <h2 id="corrections">Corrections</h2>
      <p>When a figure is superseded, we do not silently replace it. The entry is updated, the change is recorded on the <a href="${U('/changelog/')}">changelog</a>, and the previous value is noted where it materially changes a conclusion.</p>
      <p>If you believe an entry is wrong, write to <a href="mailto:${SITE.email}">${SITE.email}</a> with the entry id and the evidence. We aim to respond within five working days.</p>
      <h2 id="citing">Citing</h2>
      <div class="cite"><h4>Suggested citation</h4>
        <pre id="cite-m">Ellison, M., Petrov, I., & Rahman, N. (2026). SEO Facts: An open reference of search engine optimisation statistics (2026 ed.). SEO Facts Research Collective. ${SITE_URL}</pre>
        <button class="btn small ghost" data-copy="#cite-m" type="button">Copy citation</button>
      </div>
      <p>Individual entries may be cited by their permalink, for example <code>${SITE_URL}/statistics/traffic/#organic-share-of-traffic</code>.</p>
    </div>
  </div></section>`;
  return layout({
    title: `Methodology — ${SITE.name}`, desc: 'How SEO Facts sources, grades and revises its statistics.',
    pagePath: '/methodology/', active: 'methodology', pageKey: 'methodology', body,
    schemas: [ORG_SCHEMA, breadcrumb([{ name: 'Home', path: '/' }, { name: 'Methodology', path: '/methodology/' }])],
  });
}

// ---------- ABOUT ----------
function buildAbout() {
  const team = AUTHORS.map(a => `<div class="author-card">
    <div class="avatar">${esc(a.initials)}</div>
    <div><a href="${U('/authors/' + a.slug + '/')}"><strong>${esc(a.name)}</strong></a><div class="role">${esc(a.role)}</div><p>${esc(a.bio)}</p></div>
  </div>`).join('');
  const body = `
  <section class="article-head"><div class="wrap"><div class="kicker">About</div>
    <h1>An independent reference for search data</h1>
    <p class="lede" style="margin-top:16px;color:var(--ink-soft);max-width:64ch">SEO Facts exists because search statistics are widely quoted and rarely checked. We maintain a sourced, dated, confidence-graded alternative.</p>
  </div></section>
  <section class="section"><div class="wrap with-rail">
    <div class="rail"><div class="rail-title">About</div><a href="#mission">Mission</a><a href="#standards">Editorial standards</a><a href="#team">Team</a><a href="#funding">Funding</a></div>
    <div class="prose">
      <h2 id="mission">Mission</h2>
      <p>Most search statistics circulate without their sample, method or date attached. Once detached, a number becomes a slogan. Our aim is to keep the attachment intact: every figure here can be traced to a source and understood in the context in which it was measured.</p>
      <h2 id="standards">Editorial standards</h2>
      <ul>
        <li>We cite the primary source, not a secondary article that quoted it.</li>
        <li>We record sample size and publication month for every entry.</li>
        <li>We grade confidence and explain the grade.</li>
        <li>We log corrections publicly rather than replacing figures quietly.</li>
        <li>We do not accept payment for inclusion of a statistic or a vendor.</li>
      </ul>
      <h2 id="team">Team</h2>
      <div class="stack">${team}</div>
      <h2 id="funding">Funding and independence</h2>
      <p>SEO Facts is self-funded and does not take sponsorship from vendors whose data appears in the reference. Hosting and tooling costs are covered by the collective. The reference is published under a CC BY 4.0 licence so that it can be reused with attribution.</p>
      <p>Questions, corrections and reuse requests: <a href="mailto:${SITE.email}">${SITE.email}</a>.</p>
    </div>
  </div></section>`;
  return layout({
    title: `About — ${SITE.name}`, desc: 'Who maintains SEO Facts, how the reference is funded, and the editorial standards behind it.',
    pagePath: '/about/', active: 'about', pageKey: 'about', body,
    schemas: [ORG_SCHEMA, breadcrumb([{ name: 'Home', path: '/' }, { name: 'About', path: '/about/' }])],
  });
}

// ---------- AUTHORS ----------
function buildAuthorsIndex() {
  const cards = AUTHORS.map(a => `<div class="author-card">
    <div class="avatar">${esc(a.initials)}</div>
    <div><a href="${U('/authors/' + a.slug + '/')}"><strong>${esc(a.name)}</strong></a><div class="role">${esc(a.role)}</div><p>${esc(a.bio)}</p></div>
  </div>`).join('');
  const body = `<section class="article-head"><div class="wrap"><div class="kicker">People</div><h1>Authors</h1>
    <p class="lede" style="margin-top:16px;color:var(--ink-soft);max-width:60ch">The researchers who maintain the reference and sign its method notes.</p></div></section>
    <section class="section"><div class="wrap"><div class="stack" style="max-width:820px">${cards}</div></div></section>`;
  return layout({
    title: `Authors — ${SITE.name}`, desc: 'The researchers behind SEO Facts.', pagePath: '/authors/', active: 'about', pageKey: 'authors', body,
    schemas: [ORG_SCHEMA, breadcrumb([{ name: 'Home', path: '/' }, { name: 'Authors', path: '/authors/' }])],
  });
}

function buildAuthor(a) {
  const authored = INSIGHTS.filter(i => i.author === a.slug);
  const list = authored.map(i => `<div class="row" style="display:flex;justify-content:space-between;gap:16px;padding:10px 0;border-bottom:1px solid var(--line)"><a href="${U('/insights/' + i.slug + '/')}">${esc(i.title)}</a><span class="mono muted" style="white-space:nowrap">${esc(i.date)}</span></div>`).join('');
  const body = `<section class="article-head"><div class="wrap"><div class="kicker">Author</div><h1>${esc(a.name)}</h1>
    <div class="byline">${esc(a.role)} · ${esc(a.focus)}</div></div></section>
    <section class="section"><div class="wrap with-rail">
      <div class="rail"><div class="rail-title">Author</div><a href="${U('/authors/')}">All authors</a><a href="${U('/about/')}">About</a><a href="${U('/contact/')}">Contact</a></div>
      <div class="prose"><p>${esc(a.bio)}</p>
        <h2>Recent writing</h2>${list || '<p class="muted">No articles yet.</p>'}
      </div>
    </div></section>`;
  return layout({
    title: `${a.name} — ${SITE.name}`, desc: `${a.name}, ${a.role} at ${SITE.name}. ${a.focus}.`,
    pagePath: '/authors/' + a.slug + '/', active: 'about', pageKey: 'author-' + a.slug, body,
    schemas: [ORG_SCHEMA, { '@context': 'https://schema.org', '@type': 'Person', name: a.name, jobTitle: a.role, description: a.bio, url: SITE_URL + '/authors/' + a.slug + '/', worksFor: { '@type': 'Organization', name: SITE.org } },
      breadcrumb([{ name: 'Home', path: '/' }, { name: 'Authors', path: '/authors/' }, { name: a.name, path: '/authors/' + a.slug + '/' }])],
  });
}

// ---------- SOURCES ----------
function buildSources() {
  const map = {};
  STATS.forEach(s => {
    if (!map[s.source]) map[s.source] = { count: 0, dates: new Set(), cats: new Set() };
    map[s.source].count++;
    map[s.source].dates.add(s.published);
    map[s.source].cats.add(CAT_BY_ID[s.category].name);
  });
  const rows = Object.entries(map).sort((a, b) => b[1].count - a[1].count).map(([src, v]) =>
    `<tr><td class="metric">${esc(src)}</td><td class="num">${v.count}</td><td class="src">${[...v.cats].join(', ')}</td><td class="src">${[...v.dates].sort().slice(-1)[0]}</td></tr>`
  ).join('');
  const body = `<section class="article-head"><div class="wrap"><div class="kicker">Reference</div><h1>Sources</h1>
    <p class="lede" style="margin-top:16px;color:var(--ink-soft);max-width:64ch">Every study, report and dataset cited in the reference, with the number of entries it supports.</p></div></section>
    <section class="section"><div class="wrap"><div class="ledger-wrap"><table class="ledger">
      <thead><tr><th>Source</th><th>Entries</th><th>Categories</th><th>Latest</th></tr></thead><tbody>${rows}</tbody></table></div>
      <p class="muted" style="margin-top:16px;font-size:.84rem">${Object.keys(map).length} distinct sources support ${STATS.length} entries.</p>
    </div></section>`;
  return layout({
    title: `Sources — ${SITE.name}`, desc: `The ${Object.keys(map).length} studies and datasets cited in the SEO Facts reference.`,
    pagePath: '/sources/', active: 'reference', pageKey: 'sources', body,
    schemas: [ORG_SCHEMA, breadcrumb([{ name: 'Home', path: '/' }, { name: 'Sources', path: '/sources/' }])],
  });
}

// ---------- GLOSSARY ----------
function buildGlossary() {
  const items = GLOSSARY.sort((a, b) => a[0].localeCompare(b[0])).map(([t, d]) => `<div style="padding:14px 0;border-bottom:1px solid var(--line)"><strong>${esc(t)}</strong><p class="muted" style="margin-top:4px;font-size:.92rem">${esc(d)}</p></div>`).join('');
  const body = `<section class="article-head"><div class="wrap"><div class="kicker">Reference</div><h1>Glossary</h1>
    <p class="lede" style="margin-top:16px;color:var(--ink-soft);max-width:60ch">Working definitions for the terms used throughout the reference.</p></div></section>
    <section class="section"><div class="wrap"><div style="max-width:820px">${items}</div></div></section>`;
  return layout({ title: `Glossary — ${SITE.name}`, desc: 'Definitions of the search marketing terms used in the reference.', pagePath: '/glossary/', active: 'reference', pageKey: 'glossary', body,
    schemas: [ORG_SCHEMA, breadcrumb([{ name: 'Home', path: '/' }, { name: 'Glossary', path: '/glossary/' }])] });
}

// ---------- CHANGELOG ----------
function buildChangelog() {
  const items = CHANGELOG.map(c => `<div style="display:flex;gap:20px;padding:16px 0;border-bottom:1px solid var(--line)">
      <div class="mono muted" style="white-space:nowrap;min-width:96px">${esc(c.date)}</div>
      <div><span class="badge cat">${esc(c.tag)}</span><p style="margin-top:6px">${esc(c.text)}</p></div>
    </div>`).join('');
  const body = `<section class="article-head"><div class="wrap"><div class="kicker">Reference</div><h1>Changelog</h1>
    <p class="lede" style="margin-top:16px;color:var(--ink-soft);max-width:60ch">Every release, expansion and correction, newest first.</p></div></section>
    <section class="section"><div class="wrap"><div style="max-width:820px">${items}</div></div></section>`;
  return layout({ title: `Changelog — ${SITE.name}`, desc: 'A dated log of updates and corrections to the SEO Facts reference.', pagePath: '/changelog/', active: 'reference', pageKey: 'changelog', body,
    schemas: [ORG_SCHEMA, breadcrumb([{ name: 'Home', path: '/' }, { name: 'Changelog', path: '/changelog/' }])] });
}

// ---------- REPORTS ----------
function buildReportsIndex() {
  const body = `<section class="article-head"><div class="wrap"><div class="kicker">Reports</div><h1>Reports</h1>
    <p class="lede" style="margin-top:16px;color:var(--ink-soft);max-width:60ch">Long-form analyses that draw on the reference.</p></div></section>
    <section class="section"><div class="wrap"><div class="cat-grid" style="grid-template-columns:1fr 1fr">
      <a class="cat-card" href="${U('/reports/state-of-seo-2026/')}"><div class="idx">Report</div><h3>The State of SEO 2026</h3><p>The year in search, written from the ${STATS.length} entries in the reference.</p><span class="count">Read the report</span></a>
    </div></div></section>`;
  return layout({ title: `Reports — ${SITE.name}`, desc: 'Long-form reports built on the SEO Facts reference.', pagePath: '/reports/', active: 'reports', pageKey: 'reports', body,
    schemas: [ORG_SCHEMA, breadcrumb([{ name: 'Home', path: '/' }, { name: 'Reports', path: '/reports/' }])] });
}

function buildReport() {
  const ref = (id) => {
    const s = STAT_BY_ID[id]; return `<a href="${U('/statistics/' + s.category + '/#' + id)}">${esc(s.display)}</a>`;
  };
  const body = `<section class="article-head"><div class="wrap"><div class="kicker">Report · 2026</div>
    <h1>The State of SEO 2026</h1>
    <div class="byline">By <a href="${U('/authors/mara-ellison/')}">Dr. Mara Ellison</a>, <a href="${U('/authors/ivo-petrov/')}">Ivo Petrov</a> and <a href="${U('/authors/nadia-rahman/')}">Nadia Rahman</a> · Published ${SITE.updated}</div></div></section>
    <section class="section"><div class="wrap with-rail">
      <div class="rail"><div class="rail-title">Contents</div><a href="#summary">Summary</a><a href="#traffic">Traffic</a><a href="#content">Content</a><a href="#technical">Technical</a><a href="#links">Links</a><a href="#local">Local</a><a href="#roi">ROI</a></div>
      <div class="prose">
        <h2 id="summary">Summary</h2>
        <p>Search in 2026 is more measured and less click-driven than the decade before it. Organic search still delivers the largest single share of website traffic at ${ref('organic-share-of-traffic')}, but a majority of searches now end without a click (${ref('zero-click-searches')}), and generative summaries appear on a large share of informational queries (${ref('ai-overview-appearance')}).</p>
        <p>The practical consequence is a shift in what "good SEO" means: less about winning a click at position one, more about being the source that a summary is built from.</p>
        <h2 id="traffic">Traffic</h2>
        <p>The first result still takes the largest slice of clicks (${ref('first-result-click-share')}), and the top three results together account for a majority (${ref('top-three-share-of-clicks')}). But the average CTR at position one is modest (${ref('position-one-ctr')}), and mobile carries most organic visits (${ref('mobile-organic-share')}).</p>
        <h2 id="content">Content</h2>
        <p>Top results are long (${ref('average-word-count')}), but length is a symptom of depth rather than a cause of ranking. Most answer the query early (${ref('answer-in-first-100')}), and a minority contain original data (${ref('original-research-share')}).</p>
        <h2 id="technical">Technical</h2>
        <p>Most top pages pass Core Web Vitals (${ref('core-web-vitals-pass')}), but a substantial share of crawl requests are wasted (${ref('crawl-budget-waste')}) and rendered content frequently differs from raw HTML (${ref('javascript-rendering-gap')}).</p>
        <h2 id="links">Links</h2>
        <p>Authority remains concentrated: a majority of top pages hold at least one high-authority link (${ref('high-authority-backlink')}), and anchor diversity correlates with ranking (${ref('anchor-diversity')}).</p>
        <h2 id="local">Local</h2>
        <p>Nearly half of searches carry local intent (${ref('local-intent-searches')}), and the map pack dominates service queries (${ref('category-local-pack')}). Reviews are the most visible lever (${ref('review-count-impact')}).</p>
        <h2 id="roi">ROI</h2>
        <p>Organic search returns more leads per dollar than paid (${ref('organic-vs-paid-leads')}), but the payback period is long (${ref('payback-period')}), which keeps it chronically under-funded relative to its returns.</p>
        <div class="cite"><h4>Cite this report</h4><pre id="cite-report">Ellison, M., Petrov, I., & Rahman, N. (2026). The State of SEO 2026. SEO Facts Research Collective. ${SITE_URL}/reports/state-of-seo-2026/</pre><button class="btn small ghost" data-copy="#cite-report" type="button">Copy citation</button></div>
      </div>
    </div></section>`;
  return layout({ title: `The State of SEO 2026 — ${SITE.name}`, desc: 'The year in search, written from the 97 entries in the SEO Facts reference.',
    pagePath: '/reports/state-of-seo-2026/', active: 'reports', pageKey: 'report-state-of-seo', body, ogType: 'article',
    schemas: [ORG_SCHEMA, { '@context': 'https://schema.org', '@type': 'Article', headline: 'The State of SEO 2026', datePublished: SITE.published, dateModified: SITE.updated, author: AUTHORS.map(a => ({ '@type': 'Person', name: a.name })), publisher: { '@type': 'Organization', name: SITE.org } },
      breadcrumb([{ name: 'Home', path: '/' }, { name: 'Reports', path: '/reports/' }, { name: 'The State of SEO 2026', path: '/reports/state-of-seo-2026/' }])] });
}

// ---------- INSIGHTS ----------
function buildInsightsIndex() {
  const cards = INSIGHTS.map(i => `<a class="cat-card" href="${U('/insights/' + i.slug + '/')}">
      <div class="idx">${esc(i.kicker)} · ${esc(i.date)}</div>
      <h3>${esc(i.title)}</h3><p>${esc(i.summary)}</p><span class="count">Read</span>
    </a>`).join('');
  const body = `<section class="article-head"><div class="wrap"><div class="kicker">Insights</div><h1>Insights</h1>
    <p class="lede" style="margin-top:16px;color:var(--ink-soft);max-width:60ch">Short analyses that put individual statistics in context.</p></div></section>
    <section class="section"><div class="wrap"><div class="cat-grid">${cards}</div></div></section>`;
  return layout({ title: `Insights — ${SITE.name}`, desc: 'Analysis and commentary built on the SEO Facts reference.', pagePath: '/insights/', active: 'insights', pageKey: 'insights', body,
    schemas: [ORG_SCHEMA, breadcrumb([{ name: 'Home', path: '/' }, { name: 'Insights', path: '/insights/' }])] });
}

function buildInsight(i) {
  const a = AUTHOR_BY_SLUG[i.author];
  const body = `<section class="article-head"><div class="wrap"><div class="kicker">${esc(i.kicker)}</div>
    <h1>${esc(i.title)}</h1>
    <div class="byline">By <a href="${U('/authors/' + a.slug + '/')}">${esc(a.name)}</a> · ${esc(i.date)}</div></div></section>
    <section class="section"><div class="wrap with-rail">
      <div class="rail"><div class="rail-title">Insights</div><a href="${U('/insights/')}">All insights</a><a href="${U('/statistics/')}">Statistics</a><a href="${U('/methodology/')}">Methodology</a></div>
      <div class="prose">${i.body}
        <div class="cite"><h4>Cite this article</h4><pre id="cite-i">${esc(a.name)} (2026). ${esc(i.title)}. SEO Facts. ${SITE_URL}/insights/${i.slug}/</pre><button class="btn small ghost" data-copy="#cite-i" type="button">Copy citation</button></div>
      </div>
    </div></section>`;
  return layout({ title: `${i.title} — ${SITE.name}`, desc: i.summary, pagePath: '/insights/' + i.slug + '/', active: 'insights', pageKey: 'insight-' + i.slug, body, ogType: 'article',
    schemas: [ORG_SCHEMA, { '@context': 'https://schema.org', '@type': 'Article', headline: i.title, description: i.summary, datePublished: i.date, author: { '@type': 'Person', name: a.name }, publisher: { '@type': 'Organization', name: SITE.org } },
      breadcrumb([{ name: 'Home', path: '/' }, { name: 'Insights', path: '/insights/' }, { name: i.title, path: '/insights/' + i.slug + '/' }])] });
}

// ---------- FAQ ----------
const FAQS = [
  ['What is SEO Facts?', `SEO Facts is an open reference of ${STATS.length} search engine optimisation statistics. Each entry includes its source, publication date, sample size and a confidence grade.`],
  ['How are statistics selected?', 'We include figures that are widely used in search practice and that can be traced to a stated source. We prioritise entries where the method and sample are disclosed.'],
  ['What does the confidence grade mean?', 'High means a large sample, transparent method and independent reproduction. Medium means an adequate sample with some limitation. Low means a small sample, self-reported figures, or an undisclosed method.'],
  ['Can I use these statistics in my own work?', 'Yes, under the CC BY 4.0 licence, with attribution. Each entry has a permalink you can cite directly.'],
  ['How often is the reference updated?', 'Monthly. Corrections are logged on the changelog rather than replacing figures silently.'],
  ['Who funds SEO Facts?', 'The reference is self-funded by the research collective and does not accept sponsorship from vendors whose data appears in it.'],
  ['Why do some figures differ from other sources?', 'Different studies use different samples, time windows and definitions. We report the source and its method so you can see why two numbers differ.'],
  ['How do I report an error?', `Write to ${SITE.email} with the entry id and your evidence. We aim to respond within five working days.`],
  ['Can I download the dataset?', 'Yes. A CSV and JSON export are available from the download links on the home page and in the footer of every page.'],
  ['Do you track visitors?', 'The site counts page hits, including known crawlers, using a server-side pixel. It does not build advertising profiles.'],
];

function buildFaq() {
  const items = FAQS.map(([q, a]) => `<div style="padding:18px 0;border-bottom:1px solid var(--line)"><h3 style="font-size:1.12rem;margin-bottom:6px">${esc(q)}</h3><p class="muted" style="font-size:.94rem">${esc(a)}</p></div>`).join('');
  const body = `<section class="article-head"><div class="wrap"><div class="kicker">Reference</div><h1>Frequently asked questions</h1>
    <p class="lede" style="margin-top:16px;color:var(--ink-soft);max-width:60ch">How the reference is built, graded and licensed.</p></div></section>
    <section class="section"><div class="wrap"><div style="max-width:820px">${items}</div></div></section>`;
  return layout({ title: `FAQ — ${SITE.name}`, desc: 'Frequently asked questions about the SEO Facts reference.', pagePath: '/faq/', active: 'reference', pageKey: 'faq', body,
    schemas: [ORG_SCHEMA, { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQS.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) },
      breadcrumb([{ name: 'Home', path: '/' }, { name: 'FAQ', path: '/faq/' }])] });
}

// ---------- LEGAL / CONTACT ----------
function buildLegal(slug, title, paras) {
  const body = `<section class="article-head"><div class="wrap"><div class="kicker">Legal</div><h1>${esc(title)}</h1></div></section>
    <section class="section"><div class="wrap"><div class="prose">${paras.map(p => `<p>${p}</p>`).join('')}</div></div></section>`;
  return layout({ title: `${title} — ${SITE.name}`, desc: title + ' for SEO Facts.', pagePath: '/' + slug + '/', active: 'reference', pageKey: slug, body,
    schemas: [ORG_SCHEMA, breadcrumb([{ name: 'Home', path: '/' }, { name: title, path: '/' + slug + '/' }])] });
}

// ---------- SITEMAP / ROBOTS / FEED / EXPORTS ----------
function buildSitemap(paths) {
  const urls = paths.map(p => `  <url><loc>${SITE_URL}${p}</loc><lastmod>${SITE.updated}</lastmod></url>`).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}
function buildRobots() {
  return `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`;
}
function buildFeed() {
  const items = INSIGHTS.map(i => `    <item><title>${esc(i.title)}</title><link>${SITE_URL}/insights/${i.slug}/</link><guid>${SITE_URL}/insights/${i.slug}/</guid><pubDate>${new Date(i.date).toUTCString()}</pubDate><description>${esc(i.summary)}</description></item>`).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0"><channel><title>${esc(SITE.name)}</title><link>${SITE_URL}/</link><description>${esc(SITE.tagline)}</description>\n${items}\n</channel></rss>\n`;
}
function csvEscape(v) { const s = String(v ?? ''); return /[",\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s; }
function buildCsv() {
  const cols = ['id', 'category', 'value', 'unit', 'display', 'metric', 'statement', 'source', 'published', 'sample', 'confidence', 'method'];
  const lines = [cols.join(',')];
  STATS.forEach(s => lines.push(cols.map(c => csvEscape(s[c])).join(',')));
  return lines.join('\n') + '\n';
}

// ---------- RUN ----------
const paths = ['/'];
const out = [];

out.push(write('index.html', buildHome()));
paths.push('/statistics/');
out.push(write('statistics/index.html', buildStatisticsHub()));
CATS.forEach(c => { paths.push('/statistics/' + c.id + '/'); out.push(write('statistics/' + c.id + '/index.html', buildCategory(c))); });
paths.push('/methodology/'); out.push(write('methodology/index.html', buildMethodology()));
paths.push('/about/'); out.push(write('about/index.html', buildAbout()));
paths.push('/authors/'); out.push(write('authors/index.html', buildAuthorsIndex()));
AUTHORS.forEach(a => { paths.push('/authors/' + a.slug + '/'); out.push(write('authors/' + a.slug + '/index.html', buildAuthor(a))); });
paths.push('/sources/'); out.push(write('sources/index.html', buildSources()));
paths.push('/glossary/'); out.push(write('glossary/index.html', buildGlossary()));
paths.push('/changelog/'); out.push(write('changelog/index.html', buildChangelog()));
paths.push('/reports/'); out.push(write('reports/index.html', buildReportsIndex()));
paths.push('/reports/state-of-seo-2026/'); out.push(write('reports/state-of-seo-2026/index.html', buildReport()));
paths.push('/insights/'); out.push(write('insights/index.html', buildInsightsIndex()));
INSIGHTS.forEach(i => { paths.push('/insights/' + i.slug + '/'); out.push(write('insights/' + i.slug + '/index.html', buildInsight(i))); });
paths.push('/faq/'); out.push(write('faq/index.html', buildFaq()));
paths.push('/contact/'); out.push(write('contact/index.html', buildLegal('contact', 'Contact', [`Write to <a href="mailto:${SITE.email}">${SITE.email}</a> for corrections, reuse requests or press enquiries.`, 'We aim to respond within five working days. For corrections, include the entry id and your evidence so we can check it against the source.'])));
paths.push('/privacy/'); out.push(write('privacy/index.html', buildLegal('privacy', 'Privacy', ['This site counts page hits, including known crawlers, using a server-side pixel operated by the site. The pixel records the user agent, the requested path, an approximate country and a timestamp. It does not set advertising cookies and does not build visitor profiles.', `Page-view analytics may be processed by a third-party script. No account is required to read the reference. Questions: <a href="mailto:${SITE.email}">${SITE.email}</a>.`])));
paths.push('/terms/'); out.push(write('terms/index.html', buildLegal('terms', 'Terms of use', ['The reference is published under a Creative Commons Attribution 4.0 licence. You may reuse the statistics with attribution to SEO Facts and a link to the source entry.', 'The reference is provided for information. It is not advice, and figures describe the populations cited rather than any individual site.'])));
paths.push('/disclaimer/'); out.push(write('disclaimer/index.html', buildLegal('disclaimer', 'Disclaimer', ['Statistics in the reference are drawn from third-party studies, reports and datasets. We record the source, date and sample for each entry, but we do not independently reproduce every study.', 'Quoting a figure without its sample and context can mislead. Read the method note and confidence grade before relying on an entry.'])));

fs.mkdirSync(path.join(ROOT, 'data'), { recursive: true });
fs.writeFileSync(path.join(ROOT, 'data/seo-stats-2026.csv'), buildCsv());
fs.writeFileSync(path.join(ROOT, 'data/seo-stats-2026.json'), JSON.stringify({ site: SITE, categories: CATS, stats: STATS }, null, 2));
fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), buildSitemap(paths));
fs.writeFileSync(path.join(ROOT, 'robots.txt'), buildRobots());
fs.writeFileSync(path.join(ROOT, 'feed.xml'), buildFeed());
fs.writeFileSync(path.join(ROOT, 'humans.txt'), `/* TEAM */\n${AUTHORS.map(a => `${a.name} — ${a.role}`).join('\n')}\n\n/* SITE */\n${SITE.name} — ${SITE_URL}\n`);

console.log(`Generated ${out.length} HTML pages.`);
console.log(`Sitemap entries: ${paths.length}.`);
console.log(`Statistics: ${STATS.length}. Sources: ${new Set(STATS.map(s => s.source)).size}.`);
