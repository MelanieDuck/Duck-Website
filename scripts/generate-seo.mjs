import { readFileSync, writeFileSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const projectRoot = join(__dirname, '..')
const configPath = join(projectRoot, 'public', 'restaurant-config.json')
const distHtmlPath = join(projectRoot, 'dist', 'index.html')
const sitemapPath = join(projectRoot, 'dist', 'sitemap.xml')
const robotsPath = join(projectRoot, 'dist', 'robots.txt')

const written = []
const skipped = []

try {
  if (!existsSync(distHtmlPath)) {
    console.log('[seo] dist/index.html not found — skipping SEO generation.')
    process.exit(0)
  }

  let config
  try {
    config = JSON.parse(readFileSync(configPath, 'utf8'))
  } catch {
    console.log('[seo] Could not read or parse restaurant-config.json — skipping.')
    process.exit(0)
  }

  // ── Helpers ──────────────────────────────────────────────
  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;')
  }

  function resolveSiteUrl() {
    const sources = [
      { value: process.env.SITE_URL, label: 'SITE_URL' },
      { value: config.siteUrl, label: 'config.siteUrl' },
    ]
    const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
    if (vercelUrl) {
      sources.push({ value: 'https://' + vercelUrl.trim(), label: 'VERCEL_PROJECT_PRODUCTION_URL' })
    }

    for (const src of sources) {
      let url = (src.value || '').trim()
      if (!url) continue
      url = url.replace(/\/+$/, '')
      if (!/^https?:\/\//i.test(url)) {
        console.log(`[seo] Invalid site URL "${url}" from ${src.label} — skipping this source.`)
        continue
      }
      console.log(`[seo] Site URL from ${src.label}: ${url}/`)
      return url + '/'
    }

    return null
  }

  function absoluteImage(imgUrl, siteUrl) {
    if (!imgUrl) return null
    if (imgUrl.startsWith('http://') || imgUrlUrl.startsWith('https://')) return imgUrl
    if (imgUrl.startsWith('/') && siteUrl) return siteUrl + imgUrl
    return null
  }

  function truncateAtWord(text, maxLen) {
    if (text.length <= maxLen) return text
    const cut = text.slice(0, maxLen)
    const lastSpace = cut.lastIndexOf(' ')
    return cut.slice(0, lastSpace > 0 ? lastSpace : maxLen) + '…'
  }

  // ── Time parser ──────────────────────────────────────────
  const DAY_MAP = {
    monday: 'Monday', tuesday: 'Tuesday', wednesday: 'Wednesday',
    thursday: 'Thursday', friday: 'Friday', saturday: 'Saturday', sunday: 'Sunday',
  }

  function normalizeSpaces(str) {
    return str
      .replace(/[\u202F\u2009\u00A0]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
  }

  function parseTime12h(raw) {
    const s = normalizeSpaces(raw)
    const m = s.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i)
    if (!m) return null
    let h = parseInt(m[1], 10)
    const min = parseInt(m[2], 10)
    const ap = m[3].toUpperCase()
    if (ap === 'AM') {
      if (h === 12) h = 0
    } else {
      if (h !== 12) h += 12
    }
    return `${String(h).padStart(2, '0')}:${String(min).padStart(2, '0')}`
  }

  function parseTimeRange(timeStr) {
    const s = normalizeSpaces(timeStr)
    // Split on en dash or hyphen surrounded by spaces
    const parts = s.split(/\s[–-]\s/)
    if (parts.length !== 2) return null
    const opens = parseTime12h(parts[0])
    const closes = parseTime12h(parts[1])
    if (!opens || !closes) return null
    return { opens, closes }
  }

  function mapDayNames(daysStr) {
    const s = normalizeSpaces(daysStr)
    // Handle ranges like "Monday-Friday" or "Monday – Friday"
    const rangeParts = s.split(/\s[–-]\s|-/)
    if (rangeParts.length > 1) {
      const start = rangeParts[0].trim().toLowerCase()
      const end = rangeParts[rangeParts.length - 1].trim().toLowerCase()
      const order = ['monday','tuesday','wednesday','thursday','friday','saturday','sunday']
      const si = order.indexOf(start)
      const ei = order.indexOf(end)
      if (si === -1 || ei === -1) return null
      const result = []
      for (let i = si; i <= ei; i++) result.push(DAY_MAP[order[i]])
      return result
    }
    const single = s.toLowerCase()
    if (DAY_MAP[single]) return [DAY_MAP[single]]
    return null
  }

  function buildOpeningHours(openingHours) {
    if (!Array.isArray(openingHours)) return []
    const specs = []
    for (const block of openingHours) {
      const dayNames = mapDayNames(block.days || '')
      if (!dayNames) {
        skipped.push(`openingHours entry "${block.days}" (unrecognized day(s))`)
        continue
      }
      const times = Array.isArray(block.times) ? block.times : []
      for (const t of times) {
        const parsed = parseTimeRange(t)
        if (!parsed) {
          skipped.push(`openingHours "${block.days}" time "${t}" (unparseable)`)
          continue
        }
        specs.push({
          dayOfWeek: dayNames,
          opens: parsed.opens,
          closes: parsed.closes,
        })
      }
    }
    return specs
  }

  // ── Site URL ─────────────────────────────────────────────
  const siteUrl = resolveSiteUrl()
  if (!siteUrl) skipped.push('canonical/og:url/sitemap (no valid site URL)')

  // ── Title ────────────────────────────────────────────────
  const name = config.name || ''
  const tagline = config.tagline || ''
  const title = `${name} – ${tagline}`

  // ── Description ──────────────────────────────────────────
  let description
  if (config.metaDescription) {
    description = config.metaDescription
  } else if (Array.isArray(config.about) && config.about[0]) {
    description = truncateAtWord(config.about[0], 155)
  } else {
    description = tagline
  }

  // ── Hero image ───────────────────────────────────────────
  const heroImage = config.heroSlides?.[0]?.imageUrl || null
  let ogImage = null
  if (heroImage) {
    if (heroImage.startsWith('http://') || heroImage.startsWith('https://')) {
      ogImage = heroImage
    } else if (heroImage.startsWith('/') && siteUrl) {
      ogImage = siteUrl.replace(/\/$/, '') + heroImage
    } else if (heroImage.startsWith('/')) {
      ogImage = heroImage
      skipped.push('og:image absolute URL (no site URL)')
    } else {
      skipped.push('og:image (unrecognized format)')
    }
  } else {
    skipped.push('og:image (no hero image)')
  }

  // ── Build meta tags block ────────────────────────────────
  const tags = []

  if (siteUrl) {
    tags.push(`<link rel="canonical" href="${escapeHtml(siteUrl)}" />`)
  }

  tags.push(`<meta name="description" content="${escapeHtml(description)}" />`)
  tags.push(`<meta property="og:type" content="website" />`)
  tags.push(`<meta property="og:title" content="${escapeHtml(title)}" />`)
  tags.push(`<meta property="og:description" content="${escapeHtml(description)}" />`)
  if (siteUrl) {
    tags.push(`<meta property="og:url" content="${escapeHtml(siteUrl)}" />`)
  }
  if (name) {
    tags.push(`<meta property="og:site_name" content="${escapeHtml(name)}" />`)
  }
  if (ogImage) {
    tags.push(`<meta property="og:image" content="${escapeHtml(ogImage)}" />`)
  }
  tags.push(`<meta name="twitter:card" content="summary_large_image" />`)
  tags.push(`<meta name="twitter:title" content="${escapeHtml(title)}" />`)
  tags.push(`<meta name="twitter:description" content="${escapeHtml(description)}" />`)
  if (ogImage) {
    tags.push(`<meta name="twitter:image" content="${escapeHtml(ogImage)}" />`)
  }

  // ── JSON-LD ──────────────────────────────────────────────
  const jsonLd = { '@context': 'https://schema.org', '@type': 'Restaurant' }

  if (name) jsonLd.name = name
  if (description) jsonLd.description = description
  if (siteUrl) jsonLd.url = siteUrl
  if (ogImage) jsonLd.image = ogImage
  if (config.contact?.telephone) jsonLd.telephone = config.contact.telephone
  if (config.contact?.email) jsonLd.email = config.contact.email
  if (config.contact?.address) {
    jsonLd.address = {
      '@type': 'PostalAddress',
      streetAddress: config.contact.address,
    }
  }

  if (config._meta?.lat != null && config._meta?.lng != null) {
    const lat = Number(config._meta.lat)
    const lng = Number(config._meta.lng)
    if (Number.isFinite(lat) && Number.isFinite(lng)) {
      jsonLd.geo = { '@type': 'GeoCoordinates', latitude: lat, longitude: lng }
    }
  }

  const openingSpecs = buildOpeningHours(config.openingHours)
  if (openingSpecs.length > 0) {
    jsonLd.openingHoursSpecification = openingSpecs.map((spec) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: spec.dayOfWeek,
      opens: spec.opens,
      closes: spec.closes,
    }))
  }

  if (config.priceRange) jsonLd.priceRange = config.priceRange
  if (config.cuisine) jsonLd.servesCuisine = config.cuisine

  const jsonLdStr = JSON.stringify(jsonLd).replace(/</g, '\\u003c')
  tags.push(`<script type="application/ld+json">${jsonLdStr}</script>`)

  const seoBlock = `<!-- seo:start -->\n${tags.join('\n')}\n<!-- seo:end -->`

  // ── Edit dist/index.html ─────────────────────────────────
  let html = readFileSync(distHtmlPath, 'utf8')

  // Remove any previous seo block
  html = html.replace(/<!-- seo:start -->[\s\S]*?<!-- seo:end -->\n?/g, '')

  // Remove pre-existing tags we are about to set (outside our own block)
  html = html.replace(/<meta\s+name=["']description["'][^>]*>\n?/gi, '')
  html = html.replace(/<link\s+rel=["']canonical["'][^>]*>\n?/gi, '')
  html = html.replace(/<meta\s+property=["']og:[^>]*>\n?/gi, '')
  html = html.replace(/<meta\s+name=["']twitter:[^>]*>\n?/gi, '')

  // Replace <title>
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(title)}</title>`)

  // Ensure <html lang="en">
  if (/<html\s[^>]*>/i.test(html)) {
    html = html.replace(/<html\s[^>]*>/i, (match) => {
      if (/\slang=/i.test(match)) {
        return match.replace(/\slang="[^"]*"/i, ' lang="en"')
      }
      return match.replace(/<html/i, '<html lang="en"')
    })
  } else if (/<html>/i.test(html)) {
    html = html.replace(/<html>/i, '<html lang="en">')
  }

  // Insert seo block before </head>
  if (/<\/head>/i.test(html)) {
    html = html.replace(/<\/head>/i, `${seoBlock}\n</head>`)
  } else {
    skipped.push('SEO meta block (no </head> found in dist/index.html)')
  }

  writeFileSync(distHtmlPath, html, 'utf8')
  written.push('dist/index.html (title, meta tags, JSON-LD)')

  // ── sitemap.xml ──────────────────────────────────────────
  if (siteUrl) {
    const today = new Date().toISOString().slice(0, 10)
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url>\n    <loc>${escapeHtml(siteUrl)}</loc>\n    <lastmod>${today}</lastmod>\n  </url>\n</urlset>\n`
    writeFileSync(sitemapPath, sitemap, 'utf8')
    written.push('dist/sitemap.xml')
  } else {
    skipped.push('dist/sitemap.xml (no site URL)')
  }

  // ── robots.txt ───────────────────────────────────────────
  let robots = 'User-agent: *\nAllow: /\n'
  if (siteUrl) {
    robots += `Sitemap: ${siteUrl.replace(/\/$/, '')}/sitemap.xml\n`
  }
  writeFileSync(robotsPath, robots, 'utf8')
  written.push('dist/robots.txt')

  // ── Summary ──────────────────────────────────────────────
  const summary = `[seo] Written: ${written.join(', ')}.` +
    (skipped.length ? ` Skipped: ${skipped.join('; ')}.` : '')
  console.log(summary)
} catch (err) {
  console.log(`[seo] Unexpected error: ${err && err.message ? err.message : err} — continuing.`)
} finally {
  process.exit(0)
}
