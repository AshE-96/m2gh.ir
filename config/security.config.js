/**
 * Security Configuration for m2gh.ir Portfolio
 * Comprehensive security headers and CSP policies
 */

// Generate nonce for inline scripts (use in middleware)
const crypto = require('crypto');

function generateNonce() {
  return crypto.randomBytes(16).toString('base64');
}

// Content Security Policy
const cspDirectives = {
  'default-src': ["'self'"],
  'script-src': [
    "'self'",
    "'unsafe-inline'", // Remove in production, use nonce instead
    'https://www.googletagmanager.com',
    'https://www.clarity.ms',
    'https://www.google-analytics.com',
    'https://ssl.google-analytics.com'
  ],
  'style-src': [
    "'self'",
    "'unsafe-inline'", // Required for dynamic styles
    'https://fonts.googleapis.com'
  ],
  'font-src': [
    "'self'",
    'https://fonts.gstatic.com',
    'data:'
  ],
  'img-src': [
    "'self'",
    'data:',
    'https:',
    'https://via.placeholder.com',
    'https://www.google-analytics.com'
  ],
  'connect-src': [
    "'self'",
    'https://www.google-analytics.com',
    'https://www.clarity.ms',
    'https://api.m2gh.ir'
  ],
  'frame-ancestors': ["'none'"],
  'base-uri': ["'self'"],
  'form-action': ["'self'"],
  'object-src': ["'none'"],
  'upgrade-insecure-requests': []
};

// Convert CSP object to string
function generateCSP() {
  return Object.entries(cspDirectives)
    .map(([key, values]) => {
      if (values.length === 0) return key;
      return `${key} ${values.join(' ')}`;
    })
    .join('; ');
}

// Security Headers Configuration
const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: generateCSP()
  },
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin'
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(self), payment=()'
  }
];

// Rate Limiting Configuration
const rateLimitConfig = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false
};

// CORS Configuration
const corsOptions = {
  origin: ['https://m2gh.ir', 'https://www.m2gh.ir'],
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  maxAge: 86400 // 24 hours
};

// Input Sanitization Rules
const sanitizationRules = {
  name: {
    maxLength: 100,
    pattern: /^[\u0600-\u06FFa-zA-Z\s]+$/,
    trim: true
  },
  email: {
    maxLength: 255,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    lowercase: true,
    trim: true
  },
  comment: {
    maxLength: 2000,
    stripHtml: true,
    trim: true
  }
};

// HTML Entity Encoding
function encodeHTML(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

// Sanitize Input Function
function sanitizeInput(input, type) {
  const rules = sanitizationRules[type];
  if (!rules) return input;

  let sanitized = input;

  // Trim
  if (rules.trim) {
    sanitized = sanitized.trim();
  }

  // Lowercase
  if (rules.lowercase) {
    sanitized = sanitized.toLowerCase();
  }

  // Max Length
  if (rules.maxLength && sanitized.length > rules.maxLength) {
    throw new Error(`${type} exceeds maximum length of ${rules.maxLength}`);
  }

  // Pattern Validation
  if (rules.pattern && !rules.pattern.test(sanitized)) {
    throw new Error(`${type} contains invalid characters`);
  }

  // Strip HTML
  if (rules.stripHtml) {
    sanitized = encodeHTML(sanitized);
  }

  return sanitized;
}

// CSRF Token Generation
function generateCSRFToken() {
  return crypto.randomBytes(32).toString('hex');
}

// Validate CSRF Token
function validateCSRFToken(token, storedToken) {
  return crypto.timingSafeEqual(
    Buffer.from(token),
    Buffer.from(storedToken)
  );
}

module.exports = {
  generateNonce,
  generateCSP,
  securityHeaders,
  rateLimitConfig,
  corsOptions,
  sanitizeInput,
  generateCSRFToken,
  validateCSRFToken,
  encodeHTML
};
