/**
 * SEO Configuration for m2gh.ir Portfolio
 * Optimized meta tags, structured data, and social sharing
 */

const siteConfig = {
  siteName: 'Mohammad Mehdi Ghanbari',
  siteUrl: 'https://m2gh.ir',
  defaultTitle: 'Mohammad Mehdi Ghanbari | Product Manager & Data Analyst',
  defaultDescription: 'Official website of Mohammad Mehdi Ghanbari, Product Manager and Data Analyst specializing in technical projects and data analysis.',
  defaultImage: 'https://m2gh.ir/assets/images/og-image.jpg',
  twitterHandle: '@m2gh',
  defaultLanguage: 'en',
  alternateLanguage: 'fa',
  themeColor: '#121212',
  backgroundColor: '#0a0a0a'
};

// Generate Person Schema
function generatePersonSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Mohammad Mehdi Ghanbari',
    jobTitle: 'Product Manager & Data Analyst',
    url: siteConfig.siteUrl,
    image: `${siteConfig.siteUrl}/assets/images/profile.jpg`,
    description: siteConfig.defaultDescription,
    sameAs: [
      'https://www.linkedin.com/in/mohammad-mehdi-ghanbari/',
      'https://github.com/m2gh',
      'https://twitter.com/m2gh'
    ],
    alumniOf: {
      '@type': 'Organization',
      name: 'University Name'
    },
    knowsAbout: [
      'Product Management',
      'Data Analysis',
      'User Behavior Analysis',
      'Business Intelligence',
      'Project Management'
    ]
  };
}

// Generate Website Schema
function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.siteName,
    url: siteConfig.siteUrl,
    description: siteConfig.defaultDescription,
    publisher: {
      '@type': 'Person',
      name: 'Mohammad Mehdi Ghanbari'
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteConfig.siteUrl}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string'
    },
    inLanguage: ['en', 'fa']
  };
}

// Generate Article Schema
function generateArticleSchema(article) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    image: article.image || siteConfig.defaultImage,
    author: {
      '@type': 'Person',
      name: 'Mohammad Mehdi Ghanbari',
      url: siteConfig.siteUrl
    },
    publisher: {
      '@type': 'Person',
      name: 'Mohammad Mehdi Ghanbari',
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.siteUrl}/assets/images/logo.png`
      }
    },
    datePublished: article.publishedDate,
    dateModified: article.modifiedDate || article.publishedDate,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': article.url
    },
    keywords: article.keywords || [],
    articleSection: article.category || 'Product Management',
    wordCount: article.wordCount || 0,
    inLanguage: article.language || 'fa'
  };
}

// Generate BreadcrumbList Schema
function generateBreadcrumbSchema(breadcrumbs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
}

// Generate Organization Schema
function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Mohammad Mehdi Ghanbari - Consulting Services',
    url: siteConfig.siteUrl,
    logo: `${siteConfig.siteUrl}/assets/images/logo.png`,
    description: 'Product Management and Data Analysis consulting services',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'IR'
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      email: 'contact@m2gh.ir'
    }
  };
}

// Meta Tags Generator
function generateMetaTags(page) {
  const title = page.title || siteConfig.defaultTitle;
  const description = page.description || siteConfig.defaultDescription;
  const image = page.image || siteConfig.defaultImage;
  const url = `${siteConfig.siteUrl}${page.path || ''}`;

  return {
    title,
    description,
    canonical: url,
    openGraph: {
      type: page.type || 'website',
      url,
      title,
      description,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title
        }
      ],
      locale: 'en_US',
      alternateLocale: 'fa_IR',
      siteName: siteConfig.siteName
    },
    twitter: {
      card: 'summary_large_image',
      site: siteConfig.twitterHandle,
      creator: siteConfig.twitterHandle,
      title,
      description,
      image
    },
    additionalMetaTags: [
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1.0, maximum-scale=5.0'
      },
      {
        name: 'theme-color',
        content: siteConfig.themeColor
      },
      {
        name: 'apple-mobile-web-app-capable',
        content: 'yes'
      },
      {
        name: 'apple-mobile-web-app-status-bar-style',
        content: 'black-translucent'
      }
    ]
  };
}

// Sitemap URLs Configuration
const sitemapPages = [
  {
    url: '/',
    changefreq: 'weekly',
    priority: 1.0
  },
  {
    url: '/index-4.html',
    changefreq: 'weekly',
    priority: 0.9
  },
  {
    url: '/article-enhanced.html',
    changefreq: 'monthly',
    priority: 0.8
  },
  {
    url: '/me.html',
    changefreq: 'monthly',
    priority: 0.7
  }
];

module.exports = {
  siteConfig,
  generatePersonSchema,
  generateWebsiteSchema,
  generateArticleSchema,
  generateBreadcrumbSchema,
  generateOrganizationSchema,
  generateMetaTags,
  sitemapPages
};
