import { Person, WebSite, Article, WithContext } from 'schema-dts'

interface JsonLdProps {
  data: WithContext<Person> | WithContext<WebSite> | WithContext<Article> | Record<string, any>
}

export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data),
      }}
    />
  )
}

// Predefined schemas
export const personSchema: WithContext<Person> = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': 'https://m2gh.ir/#person',
  name: 'محمد مهدی قنبری',
  alternateName: ['Mohammad Mehdi Ghanbari', 'Mehdi Ghanbari'],
  jobTitle: ['Product Manager', 'Data Analyst', 'Product Engineer'],
  description: 'مدیر محصول و تحلیل‌گر داده متخصص در راهکارهای نوآورانه فناوری، توسعه محصول و تحلیل داده پیشرفته',
  url: 'https://m2gh.ir',
  image: 'https://m2gh.ir/public/assets/images/1606670715813.jpeg',
  sameAs: [
    'https://linkedin.com/in/mohammad-mehdi-ghanbari/',
    'https://github.com/mmehdi'
  ],
  knowsAbout: [
    'Product Management',
    'Data Analysis',
    'Product Development',
    'UX Research',
    'Technology Startups',
    'Business Intelligence',
    'Digital Transformation'
  ],
  hasOccupation: [
    {
      '@type': 'Occupation',
      name: 'Product Manager',
      occupationLocation: {
        '@type': 'Country',
        name: 'Iran'
      }
    },
    {
      '@type': 'Occupation',
      name: 'Data Analyst',
      occupationLocation: {
        '@type': 'Country',
        name: 'Iran'
      }
    }
  ],
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'IR',
    addressRegion: 'Tehran'
  },
  alumniOf: {
    '@type': 'EducationalOrganization',
    name: 'University of Tehran'
  }
}

export const websiteSchema: WithContext<WebSite> = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': 'https://m2gh.ir/#website',
  url: 'https://m2gh.ir',
  name: 'محمد مهدی قنبری | Mohammad Mehdi Ghanbari',
  description: 'پورتفولیوی شخصی محمد مهدی قنبری - مدیر محصول و تحلیل‌گر داده',
  publisher: {
    '@id': 'https://m2gh.ir/#person'
  },
  inLanguage: ['fa-IR', 'en-US'],
  copyrightHolder: {
    '@id': 'https://m2gh.ir/#person'
  }
}
