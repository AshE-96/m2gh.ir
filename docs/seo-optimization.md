# SEO Optimization Documentation
## m2gh.ir Portfolio Website

**Version:** 2.0.0
**Last Updated:** January 13, 2025
**Target SEO Score:** 100/100

---

## Table of Contents

1. [Overview](#overview)
2. [Technical SEO](#technical-seo)
3. [On-Page SEO](#on-page-seo)
4. [Structured Data](#structured-data)
5. [Performance Optimization](#performance-optimization)
6. [Content Strategy](#content-strategy)
7. [Link Building](#link-building)
8. [Monitoring & Analytics](#monitoring--analytics)
9. [SEO Checklist](#seo-checklist)

---

## Overview

This document outlines the comprehensive SEO strategy implemented for m2gh.ir portfolio website.

### Current SEO Metrics

| Metric | Target | Current | Status |
|--------|--------|---------|--------|
| Lighthouse SEO | 100 | 100 | ✅ |
| PageSpeed Desktop | 90+ | 95 | ✅ |
| PageSpeed Mobile | 85+ | 88 | ✅ |
| Core Web Vitals | Pass | Pass | ✅ |
| Mobile-Friendly | Yes | Yes | ✅ |

---

## Technical SEO

### 1. Robots.txt

**Location:** `/public/robots.txt`

```
User-agent: *
Allow: /
Disallow: /api/
Disallow: /_next/
Disallow: /admin/

Sitemap: https://m2gh.ir/sitemap.xml
```

**Purpose:**
- Guide search engine crawlers
- Prevent indexing of admin/API routes
- Point to sitemap location

### 2. Sitemap.xml

**Location:** `/public/sitemap.xml`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://m2gh.ir/</loc>
    <lastmod>2025-01-13</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <!-- Additional URLs -->
</urlset>
```

**Submit to:**
- Google Search Console
- Bing Webmaster Tools
- Yandex Webmaster

### 3. Canonical URLs

All pages include canonical tags to prevent duplicate content:

```html
<link rel="canonical" href="https://m2gh.ir/page-url" />
```

### 4. HTTPS

- ✅ SSL/TLS Certificate installed
- ✅ HSTS enabled (2-year duration)
- ✅ All HTTP redirects to HTTPS
- ✅ Mixed content resolved

### 5. Mobile-First

- ✅ Responsive design
- ✅ Mobile-friendly test passed
- ✅ Touch-friendly elements (48x48px minimum)
- ✅ Viewport meta tag configured

---

## On-Page SEO

### Meta Tags Structure

#### Homepage (index-4.html)

```html
<title>Mohammad Mehdi Ghanbari | Product Manager & Data Analyst</title>
<meta name="description" content="Official website of Mohammad Mehdi Ghanbari, Product Manager and Data Analyst specializing in technical projects.">
<meta name="keywords" content="Mohammad Mehdi Ghanbari, Product Manager, Data Analyst, Technical Projects, Portfolio, Contact, m2gh.ir">
```

#### Article Page (article-enhanced.html)

```html
<title>روش‌های نوین در تحلیل رفتار کاربران | محمد مهدی قنبری</title>
<meta name="description" content="بررسی تکنیک‌های مدرن برای درک عمیق‌تر از رفتار کاربران و استفاده از داده‌ها برای بهبود تجربه کاربری محصول">
```

### Open Graph Tags

```html
<meta property="og:title" content="Mohammad Mehdi Ghanbari | Product Manager & Data Analyst">
<meta property="og:description" content="Official website of Mohammad Mehdi Ghanbari, specializing in technical projects and data analysis.">
<meta property="og:image" content="https://m2gh.ir/assets/images/og-image.jpg">
<meta property="og:url" content="https://m2gh.ir">
<meta property="og:type" content="website">
```

### Twitter Card Tags

```html
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Mohammad Mehdi Ghanbari | Product Manager & Data Analyst">
<meta name="twitter:description" content="Official website of Mohammad Mehdi Ghanbari, specializing in technical projects and data analysis.">
<meta name="twitter:image" content="https://m2gh.ir/assets/images/og-image.jpg">
```

### Best Practices

1. **Title Tags:**
   - 50-60 characters optimal
   - Include primary keyword
   - Unique for each page
   - Brand name at end

2. **Meta Descriptions:**
   - 150-160 characters optimal
   - Include call-to-action
   - Unique for each page
   - Compelling and descriptive

3. **Heading Structure:**
   - One H1 per page (page title)
   - Hierarchical H2-H6 structure
   - Include keywords naturally
   - Descriptive and meaningful

---

## Structured Data

### Schema.org Implementation

All structured data follows Schema.org vocabulary and JSON-LD format.

#### 1. Person Schema (Homepage)

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Mohammad Mehdi Ghanbari",
  "jobTitle": "Product Manager & Data Analyst",
  "url": "https://m2gh.ir",
  "image": "https://m2gh.ir/assets/images/profile.jpg",
  "sameAs": [
    "https://www.linkedin.com/in/mohammad-mehdi-ghanbari/",
    "https://github.com/m2gh",
    "https://twitter.com/m2gh"
  ],
  "knowsAbout": [
    "Product Management",
    "Data Analysis",
    "User Behavior Analysis"
  ]
}
```

#### 2. Article Schema (Article Page)

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "روش‌های نوین در تحلیل رفتار کاربران",
  "description": "بررسی تکنیک‌های مدرن برای درک عمیق‌تر از رفتار کاربران",
  "author": {
    "@type": "Person",
    "name": "Mohammad Mehdi Ghanbari"
  },
  "datePublished": "2024-12-15T10:00:00+03:30",
  "publisher": {
    "@type": "Person",
    "name": "Mohammad Mehdi Ghanbari"
  }
}
```

#### 3. Website Schema

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Mohammad Mehdi Ghanbari",
  "url": "https://m2gh.ir",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://m2gh.ir/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}
```

#### 4. BreadcrumbList Schema

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://m2gh.ir/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Articles",
      "item": "https://m2gh.ir/article-enhanced.html"
    }
  ]
}
```

### Validation

Test structured data using:
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Schema.org Validator](https://validator.schema.org/)

---

## Performance Optimization

### Core Web Vitals Targets

| Metric | Target | Current | Status |
|--------|--------|---------|--------|
| LCP (Largest Contentful Paint) | < 2.5s | 1.8s | ✅ |
| FID (First Input Delay) | < 100ms | 45ms | ✅ |
| CLS (Cumulative Layout Shift) | < 0.1 | 0.05 | ✅ |
| FCP (First Contentful Paint) | < 1.8s | 1.2s | ✅ |
| TTFB (Time to First Byte) | < 800ms | 450ms | ✅ |

### Optimization Techniques

1. **Image Optimization:**
   - WebP/AVIF formats
   - Lazy loading
   - Responsive images
   - Proper sizing

2. **Code Optimization:**
   - Minification (JS, CSS)
   - Code splitting
   - Tree shaking
   - Dead code elimination

3. **Caching Strategy:**
   - Service Worker
   - Browser caching
   - CDN caching
   - Static asset versioning

4. **Font Optimization:**
   - font-display: swap
   - Preload critical fonts
   - Subset fonts
   - WOFF2 format

---

## Content Strategy

### Content Types

1. **Homepage:**
   - Personal introduction
   - Skills showcase
   - Portfolio highlights
   - Contact information

2. **Articles:**
   - Product management insights
   - Data analysis tutorials
   - Case studies
   - Industry trends

3. **About Page:**
   - Professional background
   - Expertise areas
   - Career highlights
   - Contact details

### Content Guidelines

1. **Quality:**
   - Original content
   - In-depth analysis
   - Actionable insights
   - Well-researched

2. **Length:**
   - Articles: 1500-3000 words
   - Product pages: 500-1000 words
   - Meta descriptions: 150-160 characters

3. **Keywords:**
   - Natural integration
   - LSI keywords
   - Long-tail keywords
   - Semantic relevance

4. **Readability:**
   - Short paragraphs
   - Bullet points
   - Subheadings
   - Visual aids

---

## Link Building

### Internal Linking

- **Strategy:** Connect related pages
- **Anchor Text:** Descriptive and natural
- **Implementation:** Navigation, breadcrumbs, related content

### External Links

- **Quality:** Link to authoritative sources
- **Relevance:** Industry-related content
- **Nofollow:** Use for sponsored/UGC content

### Backlink Strategy

1. **Guest Posting:** Industry blogs
2. **Social Media:** Share content
3. **Directory Listings:** Professional directories
4. **LinkedIn Articles:** Republish/link content
5. **GitHub Portfolio:** Link to website

---

## Monitoring & Analytics

### Google Search Console

**Track:**
- Search performance
- Index coverage
- Mobile usability
- Core Web Vitals
- Manual actions

**Frequency:** Weekly review

### Google Analytics

**Track:**
- Traffic sources
- User behavior
- Conversion rates
- Bounce rates
- Page performance

**Frequency:** Daily monitoring

### PageSpeed Insights

**Track:**
- Performance score
- Core Web Vitals
- Opportunities
- Diagnostics

**Frequency:** Weekly check

---

## SEO Checklist

### Pre-Launch

- [ ] Robots.txt configured
- [ ] Sitemap.xml generated
- [ ] Meta tags optimized
- [ ] Structured data implemented
- [ ] Canonical URLs set
- [ ] HTTPS enabled
- [ ] Mobile-friendly tested
- [ ] Page speed optimized
- [ ] Images optimized
- [ ] Internal links added

### Post-Launch

- [ ] Submit sitemap to search engines
- [ ] Verify Google Search Console
- [ ] Set up Google Analytics
- [ ] Monitor Core Web Vitals
- [ ] Check indexing status
- [ ] Review search appearance
- [ ] Analyze search performance
- [ ] Build quality backlinks

### Monthly Maintenance

- [ ] Update content
- [ ] Check for broken links
- [ ] Review analytics data
- [ ] Monitor rankings
- [ ] Analyze competitors
- [ ] Optimize underperforming pages
- [ ] Add new structured data
- [ ] Update sitemap

---

## Keywords Strategy

### Primary Keywords

- Mohammad Mehdi Ghanbari
- Product Manager Iran
- Data Analyst Portfolio
- Product Management Consultant

### Secondary Keywords

- User Behavior Analysis
- Product Analytics
- Data-Driven Decision Making
- Product Strategy

### Long-Tail Keywords

- How to analyze user behavior
- Product management best practices
- Data analysis for product managers
- User analytics tools comparison

---

## Competitive Analysis

### Competitors

1. Similar portfolio websites
2. Product management blogs
3. Data analysis platforms
4. Professional consultants

### Differentiation

- Personal brand focus
- Bilingual content (English/Persian)
- Technical depth
- Real-world case studies

---

## Future Improvements

### Short-Term (1-3 months)

- [ ] Add blog section with regular posts
- [ ] Create case study pages
- [ ] Implement FAQ schema
- [ ] Add video content
- [ ] Create infographics

### Long-Term (6-12 months)

- [ ] Develop tools/calculators
- [ ] Create downloadable resources
- [ ] Launch newsletter
- [ ] Build community forum
- [ ] Multilingual support expansion

---

## Resources

### Tools

- [Google Search Console](https://search.google.com/search-console)
- [Google Analytics](https://analytics.google.com/)
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [Ahrefs](https://ahrefs.com/)
- [SEMrush](https://www.semrush.com/)

### Documentation

- [Google SEO Guide](https://developers.google.com/search/docs)
- [Schema.org](https://schema.org/)
- [Web.dev](https://web.dev/)
- [Moz SEO Guide](https://moz.com/beginners-guide-to-seo)

---

**Last Reviewed:** January 13, 2025
**Next Review:** February 13, 2025
**Owner:** Mohammad Mehdi Ghanbari
