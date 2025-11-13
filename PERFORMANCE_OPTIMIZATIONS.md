# 🚀 راهنمای پیاده‌سازی بهینه‌سازی‌های عملکرد

این فایل شامل دستورالعمل‌های دقیق برای پیاده‌سازی بهینه‌سازی‌های پیشنهادی است.

---

## 1. بهینه‌سازی Particles Background

### مشکل:
Particles Background در هر فریم محاسبات سنگین انجام می‌دهد که باعث کاهش FPS می‌شود.

### راهکار:

```typescript
// src/components/ui/particles-background.tsx
'use client'

import { useEffect, useRef, useState } from 'react'

export default function ParticlesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameRef = useRef<number | undefined>(undefined)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d', { alpha: false }) // Disable alpha for better performance
    if (!ctx) return

    const canvasEl = canvas
    const context = ctx

    let particlesArray: Particle[] = []
    
    // Reduce particles on mobile and when tab is hidden
    const getParticleCount = () => {
      if (!isVisible) return 0
      const baseCount = window.innerWidth < 768 
        ? Math.floor((window.innerWidth * window.innerHeight) / 15000)
        : Math.floor((window.innerWidth * window.innerHeight) / 10000)
      return Math.min(baseCount, 100) // Cap at 100 particles
    }
    
    const numberOfParticles = getParticleCount()
    const maxDistance = 170
    const flowDirection = { x: 0.07, y: 0.04 }

    // Throttled resize handler
    let resizeTimeout: NodeJS.Timeout
    const resizeCanvas = () => {
      canvasEl.width = window.innerWidth
      canvasEl.height = window.innerHeight
    }

    resizeCanvas()
    
    const handleResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(() => {
        resizeCanvas()
        init()
      }, 250)
    }
    
    window.addEventListener('resize', handleResize)

    // Visibility API - pause when tab is hidden
    const handleVisibilityChange = () => {
      const hidden = document.hidden
      setIsVisible(!hidden)
      
      if (hidden) {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current)
        }
      } else {
        init()
        animate()
      }
    }
    
    document.addEventListener('visibilitychange', handleVisibilityChange)

    class ParticleClass implements Particle {
      // ... existing code ...
      
      // Optimize update method
      update() {
        // Use cached values where possible
        const time = Date.now() * 0.0006
        this.speedX = this.baseSpeedX + flowDirection.x * (Math.sin(time) * 0.15)
        this.speedY = this.baseSpeedY + flowDirection.y * (Math.cos(time) * 0.15)

        this.x += this.speedX
        this.y += this.speedY

        // Optimize opacity calculation
        this.opacity += this.pulseSpeed * this.pulseDirection
        if (this.opacity >= this.maxOpacity || this.opacity <= this.minOpacity) {
          this.pulseDirection *= -1
        }

        // Wrap around
        if (this.x > canvasEl.width) this.x = 0
        if (this.x < 0) this.x = canvasEl.width
        if (this.y > canvasEl.height) this.y = 0
        if (this.y < 0) this.y = canvasEl.height
      }

      draw() {
        context.beginPath()
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        
        // Cache color calculation
        const colorIndex = Math.floor((this.x * this.y) / 1000) % 5
        const accentRGB = ['6, 214, 160', '17, 233, 182', '2, 190, 150', '0, 222, 213', '8, 174, 158'][colorIndex]

        context.fillStyle = `rgba(${accentRGB}, ${this.opacity})`
        context.shadowBlur = 8
        context.shadowColor = `rgba(${accentRGB}, 0.3)`
        context.fill()
        context.shadowBlur = 0
      }
    }

    const init = () => {
      particlesArray.length = 0
      const count = getParticleCount()
      for (let i = 0; i < count; i++) {
        particlesArray.push(new ParticleClass())
      }
    }

    // Optimize connection drawing
    const connect = () => {
      const length = particlesArray.length
      for (let a = 0; a < length; a++) {
        for (let b = a + 1; b < length; b++) {
          const dx = particlesArray[a].x - particlesArray[b].x
          const dy = particlesArray[a].y - particlesArray[b].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < maxDistance) {
            const opacity = 1 - (distance / maxDistance)
            const gradient = context.createLinearGradient(
              particlesArray[a].x,
              particlesArray[a].y,
              particlesArray[b].x,
              particlesArray[b].y
            )

            gradient.addColorStop(0, `rgba(6, 214, 160, ${opacity * 0.25})`)
            gradient.addColorStop(1, `rgba(0, 222, 213, ${opacity * 0.25})`)

            context.strokeStyle = gradient
            context.lineWidth = opacity * 1.5
            context.beginPath()
            context.moveTo(particlesArray[a].x, particlesArray[a].y)
            context.lineTo(particlesArray[b].x, particlesArray[b].y)
            context.stroke()
          }
        }
      }
    }

    let lastFrameTime = 0
    const targetFPS = 30 // Reduce to 30 FPS for better performance
    const frameInterval = 1000 / targetFPS

    const animate = (currentTime: number = 0) => {
      if (!isVisible) return
      
      const elapsed = currentTime - lastFrameTime
      
      if (elapsed >= frameInterval) {
        context.clearRect(0, 0, canvasEl.width, canvasEl.height)
        
        for (let i = 0; i < particlesArray.length; i++) {
          particlesArray[i].update()
          particlesArray[i].draw()
        }
        connect()
        
        lastFrameTime = currentTime - (elapsed % frameInterval)
      }
      
      animationFrameRef.current = requestAnimationFrame(animate)
    }

    init()
    if (isVisible) {
      animate()
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      window.removeEventListener('resize', handleResize)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [isVisible])

  return (
    <div className="animated-bg fixed inset-0 -z-10">
      <canvas
        ref={canvasRef}
        className="block w-full h-full"
        style={{ display: 'block', width: '100%', height: '100%' }}
      />
    </div>
  )
}
```

---

## 2. بهینه‌سازی فونت‌ها با next/font

### نصب:
```bash
npm install next@latest
```

### پیاده‌سازی:

```typescript
// src/app/layout.tsx
import type { Metadata } from "next";
import { Vazirmatn } from 'next/font/google'
import ParticlesBackground from "@/components/ui/particles-background";
import Header from "@/components/layout/header";
import "./globals.css";

const vazirmatn = Vazirmatn({
  subsets: ['latin', 'arabic'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  preload: true,
  variable: '--font-vazirmatn',
  fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
  adjustFontFallback: true,
})

export const metadata: Metadata = {
  title: "محمد مهدی قنبری | Mohammad Mehdi Ghanbari",
  description: "Product Manager and Data Analyst specializing in innovative technology solutions and advanced data analysis",
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#06d6a0",
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl" className={vazirmatn.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
      </head>
      <body className={`${vazirmatn.className} min-h-screen relative`}>
        <svg width="0" height="0" style={{ position: 'absolute' }}>
          <defs>
            <linearGradient id="buttonIconGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#20e3b2" />
              <stop offset="100%" stopColor="#05a87f" />
            </linearGradient>
            <linearGradient id="nameGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f0f7f9" />
              <stop offset="100%" stopColor="#20e3b2" />
            </linearGradient>
            <linearGradient id="titleGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#06d6a0" />
              <stop offset="100%" stopColor="#20e3b2" />
            </linearGradient>
          </defs>
        </svg>
        <ParticlesBackground />
        <Header />
        {children}
      </body>
    </html>
  );
}
```

### به‌روزرسانی CSS:

```css
/* src/app/globals.css */
:root {
  --font-vazirmatn: var(--font-vazirmatn);
  /* ... other variables ... */
}

body {
  font-family: var(--font-vazirmatn), var(--font-sans);
  /* ... */
}

/* حذف @font-face قدیمی */
```

---

## 3. اضافه کردن Resource Hints

```typescript
// src/app/layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      <head>
        {/* DNS Prefetch */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <link rel="dns-prefetch" href="https://www.linkedin.com" />
        <link rel="dns-prefetch" href="https://github.com" />
        
        {/* Preconnect */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Prefetch برای صفحات مهم */}
        <link rel="prefetch" href="/blog" />
        <link rel="prefetch" href="/about" />
        <link rel="prefetch" href="/contact" />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
```

---

## 4. بهینه‌سازی next.config.ts

```typescript
// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Compression
  compress: true,
  
  // Experimental features
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
    optimizeCss: true,
  },
  
  // Image optimization
  images: {
    domains: ['m2gh.ir'],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
  
  // Headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  
  // Rewrites
  async rewrites() {
    return [
      {
        source: '/robots.txt',
        destination: '/api/robots',
      },
      {
        source: '/sitemap.xml',
        destination: '/api/sitemap',
      },
    ];
  },
  
  // Output
  output: 'standalone',
  
  // Power optimization
  poweredByHeader: false,
};

export default nextConfig;
```

---

## 5. Bundle Analysis Setup

### نصب:
```bash
npm install --save-dev @next/bundle-analyzer
```

### تنظیمات:

```typescript
// next.config.ts
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({
  // ... existing config
})
```

### استفاده:
```bash
ANALYZE=true npm run build
```

---

## 6. Performance Monitoring

### نصب:
```bash
npm install web-vitals
```

### پیاده‌سازی:

```typescript
// src/app/layout.tsx
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
```

---

## 7. Lazy Loading برای کامپوننت‌ها

```typescript
// src/app/layout.tsx
import dynamic from 'next/dynamic'

const ParticlesBackground = dynamic(
  () => import('@/components/ui/particles-background'),
  { 
    ssr: false,
    loading: () => <div className="animated-bg fixed inset-0 -z-10" />
  }
)

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <ParticlesBackground />
        {children}
      </body>
    </html>
  )
}
```

---

## 8. تست و بررسی

### دستورات تست:

```bash
# Build
npm run build

# Start production server
npm start

# Analyze bundle
ANALYZE=true npm run build

# Lighthouse CI
npm install -g @lhci/cli
lhci autorun
```

### ابزارهای تست:
- Google PageSpeed Insights
- Lighthouse (Chrome DevTools)
- WebPageTest
- Chrome DevTools Performance Tab

---

## 📊 معیارهای موفقیت

پس از پیاده‌سازی، باید به این معیارها برسید:

- ✅ LCP < 2.5s
- ✅ FID < 100ms
- ✅ CLS < 0.1
- ✅ TTI < 3.5s
- ✅ First Load JS < 200KB
- ✅ Lighthouse Score > 90

---

**نکته:** این بهینه‌سازی‌ها را به تدریج پیاده‌سازی کنید و بعد از هر تغییر، عملکرد را تست کنید.

