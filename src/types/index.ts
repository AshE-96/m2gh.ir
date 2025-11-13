export interface Project {
  id: number
  name_fa: string
  name_en: string
  description_fa: string
  description_en: string
  status: 'active' | 'done' | 'planning'
  status_fa: string
  status_en: string
  category: string[]
  technologies: string[]
  github_link?: string
  demo_link?: string
  docs_link?: string
  created_date: string
  featured?: boolean
}

export interface Comment {
  id: string
  name: string
  email: string
  message: string
  date: string
  approved: boolean
  article_id?: string
}

export interface Contact {
  id: string
  name: string
  email: string
  subject: string
  message: string
  date: string
  read: boolean
}

export interface Article {
  id: string
  title_fa: string
  title_en: string
  content_fa: string
  content_en: string
  excerpt_fa: string
  excerpt_en: string
  slug: string
  category: string
  tags: string[]
  author: string
  published_date: string
  updated_date?: string
  featured_image?: string
  status: 'published' | 'draft'
  seo_title?: string
  seo_description?: string
  reading_time?: number
}

export interface SEOSettings {
  title: string
  description: string
  keywords: string[]
  og_image: string
  twitter_card: string
  canonical_url: string
}

export interface Language {
  code: 'fa' | 'en'
  name: string
  direction: 'rtl' | 'ltr'
  flag: string
}

export interface SocialLink {
  name: string
  url: string
  icon: string
  color?: string
}

export interface NavigationItem {
  name_fa: string
  name_en: string
  href: string
  icon?: string
}

export interface PersonSchema {
  '@type': 'Person'
  '@id': string
  name: string
  alternateName: string[]
  jobTitle: string[]
  description: string
  url: string
  image: string
  sameAs: string[]
  knowsAbout: string[]
  hasOccupation: Array<{
    '@type': 'Occupation'
    name: string
    occupationLocation: {
      '@type': 'Country'
      name: string
    }
  }>
  address: {
    '@type': 'PostalAddress'
    addressCountry: string
    addressRegion: string
  }
  alumniOf: {
    '@type': 'EducationalOrganization'
    name: string
  }
}

export interface WebsiteSchema {
  '@type': 'WebSite'
  '@id': string
  url: string
  name: string
  description: string
  publisher: {
    '@id': string
  }
  inLanguage: string[]
  copyrightHolder: {
    '@id': string
  }
}

export interface WebPageSchema {
  '@type': 'WebPage'
  '@id': string
  url: string
  name: string
  description: string
  isPartOf: {
    '@id': string
  }
  about: {
    '@id': string
  }
  primaryImageOfPage: {
    '@type': 'ImageObject'
    url: string
  }
  datePublished: string
  dateModified: string
}
