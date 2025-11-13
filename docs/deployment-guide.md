# Deployment Guide
## m2gh.ir Portfolio Website

**Version:** 2.0.0
**Last Updated:** January 13, 2025
**Status:** Production-Ready

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Environment Setup](#environment-setup)
3. [Build Process](#build-process)
4. [Deployment Options](#deployment-options)
5. [Post-Deployment](#post-deployment)
6. [Monitoring & Maintenance](#monitoring--maintenance)
7. [Troubleshooting](#troubleshooting)

---

## Prerequisites

### Required Software

- Node.js >= 18.0.0 LTS
- npm >= 9.0.0 or pnpm >= 8.0.0
- Git >= 2.30.0

### Accounts & Services

- [ ] Domain registrar account (m2gh.ir)
- [ ] Hosting provider (Vercel/Netlify/AWS)
- [ ] SSL certificate (Let's Encrypt or commercial)
- [ ] Google Search Console
- [ ] Google Analytics
- [ ] Microsoft Clarity (optional)

---

## Environment Setup

### 1. Clone Repository

```bash
git clone https://github.com/yourusername/next-portfolio.git
cd next-portfolio
```

### 2. Install Dependencies

```bash
npm install
# or
pnpm install
```

### 3. Environment Variables

Create `.env.local` from `.env.example`:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your actual values:

```env
# Site Configuration
NEXT_PUBLIC_SITE_URL=https://m2gh.ir
NEXT_PUBLIC_SITE_NAME="Mohammad Mehdi Ghanbari"

# Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_CLARITY_ID=xxxxxxxxxx

# API Configuration (if applicable)
API_BASE_URL=https://api.m2gh.ir
API_SECRET_KEY=your-secret-key-here

# Security
SESSION_SECRET=generate-32-char-random-string
CSRF_SECRET=generate-32-char-random-string
```

### 4. Generate Secrets

```bash
# Generate random secrets
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## Build Process

### Development Build

```bash
npm run dev
```

Access at: http://localhost:3000

### Production Build

```bash
# Build for production
npm run build

# Test production build locally
npm run start
```

### Build Verification

```bash
# Run tests
npm test

# Check TypeScript types
npm run typecheck

# Lint code
npm run lint

# Check bundle size
npm run analyze
```

---

## Deployment Options

### Option 1: Vercel (Recommended)

#### Why Vercel?
- Native Next.js support
- Automatic deployments
- Global CDN
- Serverless functions
- Free SSL certificates

#### Deploy Steps:

1. **Install Vercel CLI:**
```bash
npm i -g vercel
```

2. **Login to Vercel:**
```bash
vercel login
```

3. **Deploy:**
```bash
vercel --prod
```

4. **Configure Domain:**
   - Go to Vercel Dashboard
   - Settings → Domains
   - Add custom domain: m2gh.ir
   - Update DNS records as instructed

#### Environment Variables:
```bash
# Add environment variables via CLI
vercel env add NEXT_PUBLIC_GA_ID production
```

Or via Dashboard: Settings → Environment Variables

---

### Option 2: Netlify

#### Deploy Steps:

1. **Install Netlify CLI:**
```bash
npm i -g netlify-cli
```

2. **Build & Deploy:**
```bash
npm run build
netlify deploy --prod --dir=.next
```

3. **Configure:**
Create `netlify.toml`:
```toml
[build]
  command = "npm run build"
  publish = ".next"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    X-XSS-Protection = "1; mode=block"
```

---

### Option 3: AWS (S3 + CloudFront)

#### Prerequisites:
- AWS Account
- AWS CLI configured
- S3 bucket created
- CloudFront distribution created

#### Deploy Steps:

1. **Build Static Export:**
```bash
# Update next.config.ts
output: 'export'

# Build
npm run build
```

2. **Upload to S3:**
```bash
aws s3 sync out/ s3://your-bucket-name --delete
```

3. **Invalidate CloudFront Cache:**
```bash
aws cloudfront create-invalidation --distribution-id XXXXX --paths "/*"
```

4. **Configure CloudFront:**
   - Origin: S3 bucket
   - SSL Certificate: ACM certificate
   - Custom domain: m2gh.ir
   - Behaviors: Cache policy optimized

---

### Option 4: Docker Deployment

#### Dockerfile:

```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

#### Build & Run:

```bash
# Build image
docker build -t m2gh-portfolio .

# Run container
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_SITE_URL=https://m2gh.ir \
  -e NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX \
  m2gh-portfolio
```

---

## Post-Deployment

### 1. DNS Configuration

#### A Record:
```
Type: A
Name: @
Value: Your-Server-IP
TTL: 3600
```

#### CNAME Record:
```
Type: CNAME
Name: www
Value: m2gh.ir
TTL: 3600
```

### 2. SSL Certificate

#### Let's Encrypt (Free):
```bash
# Install Certbot
sudo apt-get install certbot

# Generate certificate
sudo certbot certonly --webroot -w /var/www/html -d m2gh.ir -d www.m2gh.ir

# Auto-renewal
sudo crontab -e
0 0 1 * * certbot renew --quiet
```

### 3. Submit to Search Engines

#### Google Search Console:
1. Go to: https://search.google.com/search-console
2. Add property: m2gh.ir
3. Verify ownership (DNS/HTML file)
4. Submit sitemap: https://m2gh.ir/sitemap.xml

#### Bing Webmaster Tools:
1. Go to: https://www.bing.com/webmasters
2. Add site
3. Verify ownership
4. Submit sitemap

### 4. Setup Analytics

#### Google Analytics:
```html
<!-- Add to all pages -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

#### Microsoft Clarity:
```html
<script type="text/javascript">
  (function(c,l,a,r,i,t,y){
    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
  })(window, document, "clarity", "script", "XXXXXXXXXX");
</script>
```

### 5. Test Deployment

#### Automated Tests:
```bash
# Run Lighthouse CI
npm run lighthouse-ci

# Check broken links
npm run check-links

# Security audit
npm audit

# Performance test
npm run perf-test
```

#### Manual Checks:
- [ ] Homepage loads correctly
- [ ] All navigation links work
- [ ] Forms submit successfully
- [ ] Images load properly
- [ ] Mobile responsive
- [ ] SSL certificate valid
- [ ] Redirects working (HTTP → HTTPS)
- [ ] 404 page displays
- [ ] Sitemap accessible
- [ ] Robots.txt accessible

---

## Monitoring & Maintenance

### 1. Uptime Monitoring

**UptimeRobot Setup:**
```
Monitor Type: HTTP(s)
URL: https://m2gh.ir
Monitoring Interval: 5 minutes
Alert Contacts: your@email.com
```

### 2. Error Tracking

**Sentry Setup:**
```bash
npm install @sentry/nextjs

# Initialize
npx @sentry/wizard -i nextjs
```

**Configuration:**
```javascript
// sentry.client.config.js
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0,
  environment: process.env.NODE_ENV,
});
```

### 3. Performance Monitoring

**Web Vitals:**
```javascript
// pages/_app.js
export function reportWebVitals(metric) {
  if (metric.label === 'web-vital') {
    console.log(metric);
    // Send to analytics
    gtag('event', metric.name, {
      value: Math.round(metric.value),
      metric_id: metric.id,
      metric_value: metric.value,
      metric_delta: metric.delta,
    });
  }
}
```

### 4. Backup Strategy

**Automated Backups:**
```bash
# Daily backups (cron job)
0 2 * * * /usr/local/bin/backup-website.sh

# backup-website.sh
#!/bin/bash
DATE=$(date +%Y%m%d)
tar -czf /backups/m2gh-$DATE.tar.gz /var/www/html
find /backups -type f -mtime +30 -delete
```

### 5. Update Schedule

**Weekly:**
- Check analytics
- Review error logs
- Monitor performance

**Monthly:**
- Update dependencies
- Security audit
- Performance audit
- Backup verification

**Quarterly:**
- Content review
- SEO audit
- Full security review

---

## Troubleshooting

### Common Issues

#### 1. Build Fails

**Error:** `Module not found`
```bash
# Solution: Clear cache and reinstall
rm -rf node_modules .next
npm install
npm run build
```

#### 2. Environment Variables Not Working

**Error:** `process.env.VAR_NAME is undefined`
```bash
# Solution: Ensure proper naming
# Client-side: NEXT_PUBLIC_*
# Server-side: No prefix
```

#### 3. Images Not Loading

**Error:** `Invalid src prop`
```javascript
// Solution: Add domain to next.config.ts
images: {
  domains: ['m2gh.ir', 'cdn.example.com'],
}
```

#### 4. 404 on Refresh

**Error:** Page not found on browser refresh
```nginx
# Solution: Configure server
# Nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

#### 5. Slow Performance

**Symptoms:** High LCP, low performance score
```bash
# Solutions:
1. Enable compression (Brotli/Gzip)
2. Optimize images (WebP/AVIF)
3. Enable caching headers
4. Use CDN
5. Code splitting
```

---

## Rollback Procedure

### If Deployment Fails:

#### Vercel:
```bash
# List deployments
vercel ls

# Rollback to previous
vercel rollback [deployment-url]
```

#### Git:
```bash
# Revert to previous commit
git revert HEAD
git push

# Or hard reset (destructive)
git reset --hard HEAD~1
git push --force
```

#### Database (if applicable):
```bash
# Restore from backup
pg_restore -d database_name backup_file.dump
```

---

## Security Checklist

### Pre-Deployment:
- [ ] No secrets in code
- [ ] Environment variables configured
- [ ] HTTPS enabled
- [ ] Security headers configured
- [ ] CSP implemented
- [ ] Input validation enabled
- [ ] Rate limiting configured

### Post-Deployment:
- [ ] SSL certificate valid
- [ ] Security headers verified
- [ ] HSTS enabled
- [ ] Vulnerability scan passed
- [ ] Penetration test completed
- [ ] Backup system working
- [ ] Monitoring alerts configured

---

## Performance Checklist

### Pre-Deployment:
- [ ] Lighthouse score > 90
- [ ] Images optimized
- [ ] Code minified
- [ ] Caching configured
- [ ] Service Worker enabled
- [ ] Performance budget met

### Post-Deployment:
- [ ] Core Web Vitals passing
- [ ] Real User Monitoring active
- [ ] CDN configured
- [ ] Compression enabled
- [ ] Performance alerts set

---

## Support

### Resources:
- **Documentation:** `/docs` directory
- **Issues:** GitHub Issues
- **Email:** support@m2gh.ir

### Emergency Contacts:
- **Developer:** Mohammad Mehdi Ghanbari
- **Hosting:** [Hosting Provider Support]
- **DNS:** [Domain Provider Support]

---

**Last Updated:** January 13, 2025
**Next Review:** February 13, 2025
**Maintained By:** Mohammad Mehdi Ghanbari
