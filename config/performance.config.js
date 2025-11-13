/**
 * Performance Configuration for m2gh.ir Portfolio
 * Optimization strategies for loading, caching, and runtime performance
 */

// Cache Configuration
const cacheConfig = {
  version: 'v1.0.0',
  staticAssets: {
    maxAge: 31536000, // 1 year in seconds
    immutable: true
  },
  htmlPages: {
    maxAge: 3600, // 1 hour
    sMaxAge: 86400, // 24 hours for CDN
    staleWhileRevalidate: 604800 // 1 week
  },
  images: {
    maxAge: 2592000, // 30 days
    formats: ['avif', 'webp', 'jpg', 'png'],
    sizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    quality: 80
  },
  fonts: {
    maxAge: 31536000,
    display: 'swap',
    preload: true
  }
};

// Resource Hints Configuration
const resourceHints = {
  dnsPrefetch: [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
    'https://www.google-analytics.com',
    'https://www.clarity.ms'
  ],
  preconnect: [
    {
      href: 'https://fonts.googleapis.com',
      crossOrigin: 'anonymous'
    },
    {
      href: 'https://fonts.gstatic.com',
      crossOrigin: 'anonymous'
    }
  ],
  preload: [
    {
      href: '/styles.min-2.css',
      as: 'style'
    },
    {
      href: '/maze.min-2.js',
      as: 'script'
    },
    {
      href: 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap',
      as: 'style'
    }
  ]
};

// Font Loading Strategy
const fontConfig = {
  families: {
    Poppins: {
      weights: [400, 700],
      display: 'swap',
      preload: true,
      fallback: '-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif'
    }
  },
  strategy: 'swap', // 'auto', 'block', 'swap', 'fallback', 'optional'
  timeout: 3000 // milliseconds
};

// Image Optimization Configuration
const imageOptimization = {
  formats: ['image/avif', 'image/webp', 'image/jpeg'],
  quality: {
    default: 80,
    thumbnail: 60,
    hero: 90
  },
  lazy: true,
  placeholder: 'blur',
  sizes: {
    mobile: '100vw',
    tablet: '50vw',
    desktop: '33vw'
  }
};

// Compression Configuration
const compressionConfig = {
  level: 6, // 0-9, higher = better compression but slower
  threshold: 1024, // Only compress files larger than 1KB
  filter: (req, res) => {
    if (req.headers['x-no-compression']) {
      return false;
    }
    return true;
  }
};

// Critical CSS Configuration
const criticalCSS = {
  inline: true,
  minify: true,
  extract: true,
  dimensions: [
    { width: 375, height: 667 },   // Mobile
    { width: 768, height: 1024 },  // Tablet
    { width: 1920, height: 1080 }  // Desktop
  ]
};

// Bundle Optimization
const bundleOptimization = {
  splitChunks: {
    chunks: 'all',
    cacheGroups: {
      vendor: {
        test: /[\\/]node_modules[\\/]/,
        name: 'vendors',
        priority: 10
      },
      common: {
        minChunks: 2,
        priority: 5,
        reuseExistingChunk: true
      }
    }
  },
  minimize: true,
  minimizer: {
    terser: {
      parallel: true,
      terserOptions: {
        compress: {
          drop_console: process.env.NODE_ENV === 'production',
          drop_debugger: process.env.NODE_ENV === 'production'
        }
      }
    }
  }
};

// Performance Budgets
const performanceBudgets = {
  maxInitialLoadTime: 3000, // 3 seconds
  maxTotalSize: 500 * 1024, // 500 KB
  maxResourceSize: {
    script: 170 * 1024,  // 170 KB
    style: 50 * 1024,    // 50 KB
    image: 100 * 1024,   // 100 KB
    font: 100 * 1024     // 100 KB
  },
  maxRequests: 50
};

// Lighthouse Score Targets
const lighthouseTargets = {
  performance: 90,
  accessibility: 95,
  bestPractices: 95,
  seo: 100,
  pwa: 90
};

// Service Worker Configuration
const serviceWorkerConfig = {
  enabled: true,
  scope: '/',
  updateViaCache: 'none',
  skipWaiting: true,
  clientsClaim: true,
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
      handler: 'CacheFirst',
      options: {
        cacheName: 'google-fonts-cache',
        expiration: {
          maxEntries: 10,
          maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
        }
      }
    },
    {
      urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
      handler: 'CacheFirst',
      options: {
        cacheName: 'gstatic-fonts-cache',
        expiration: {
          maxEntries: 10,
          maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
        }
      }
    },
    {
      urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp|avif)$/i,
      handler: 'CacheFirst',
      options: {
        cacheName: 'images-cache',
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 60 * 60 * 24 * 30 // 30 days
        }
      }
    },
    {
      urlPattern: /\.(?:js|css)$/i,
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'static-resources',
        expiration: {
          maxEntries: 30,
          maxAgeSeconds: 60 * 60 * 24 * 7 // 1 week
        }
      }
    }
  ]
};

// Web Vitals Thresholds
const webVitalsThresholds = {
  LCP: {
    good: 2500,
    needsImprovement: 4000
  },
  FID: {
    good: 100,
    needsImprovement: 300
  },
  CLS: {
    good: 0.1,
    needsImprovement: 0.25
  },
  FCP: {
    good: 1800,
    needsImprovement: 3000
  },
  TTFB: {
    good: 800,
    needsImprovement: 1800
  }
};

module.exports = {
  cacheConfig,
  resourceHints,
  fontConfig,
  imageOptimization,
  compressionConfig,
  criticalCSS,
  bundleOptimization,
  performanceBudgets,
  lighthouseTargets,
  serviceWorkerConfig,
  webVitalsThresholds
};
