import Link from 'next/link'
import { useTranslations } from 'next-intl'
import Avatar from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import JsonLd, { personSchema, websiteSchema } from "@/components/ui/json-ld"
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'محمد مهدی قنبری | مدیر محصول و تحلیل‌گر داده',
  description: 'مدیر محصول و تحلیل‌گر داده متخصص در راهکارهای نوآورانه فناوری، توسعه محصول و تحلیل داده پیشرفته. تجربه در استارتاپ‌ها و چالش‌های دیجیتال.',
  keywords: ['محمد مهدی قنبری', 'مدیر محصول', 'تحلیل‌گر داده', 'Product Manager', 'Data Analyst', 'فناوری', 'استارتاپ'],
  authors: [{ name: 'محمد مهدی قنبری' }],
  openGraph: {
    title: 'محمد مهدی قنبری | مدیر محصول و تحلیل‌گر داده',
    description: 'مدیر محصول و تحلیل‌گر داده متخصص در راهکارهای نوآورانه فناوری و توسعه محصول',
    url: 'https://m2gh.ir',
    siteName: 'محمد مهدی قنبری',
    locale: 'fa_IR',
    type: 'website',
    images: [
      {
        url: '/assets/images/1606670715813.jpeg',
        width: 400,
        height: 400,
        alt: 'محمد مهدی قنبری - مدیر محصول و تحلیل‌گر داده',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'محمد مهدی قنبری | مدیر محصول و تحلیل‌گر داده',
    description: 'مدیر محصول و تحلیل‌گر داده متخصص در راهکارهای نوآورانه فناوری و توسعه محصول',
    images: ['/assets/images/1606670715813.jpeg'],
  },
  alternates: {
    canonical: 'https://m2gh.ir',
  },
}

export default function Home() {
  const t = useTranslations('home')
  return (
    <div className="home-page flex items-center justify-center min-h-screen p-6 pt-24">
      <div className="container-custom max-w-4xl w-full flex flex-col items-center">
        <div className="profile text-center mb-8 flex flex-col items-center">
          <div className="mb-4">
          <Avatar
            src="/assets/images/1606670715813.jpeg"
            alt={`${t('title')} - ${t('subtitle')}`}
            size="lg"
            priority
          />
          </div>

          <h1 className="name text-4xl font-bold mb-2 text-text" data-text={t('title')}>
            {t('title')}
          </h1>

          <span className="title block text-xl font-medium text-accent mb-4">
            {t('subtitle')}
          </span>

          <p className="bio max-w-2xl mx-auto text-text-secondary text-base leading-relaxed mb-6 px-2">
            {t('bio')}
          </p>
        </div>

        <div className="button-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-0 w-full max-w-4xl">
          <Button href="https://linkedin.com/in/mohammad-mehdi-ghanbari" icon="linkedin" external>
            {t('buttons.linkedin')}
          </Button>

          <Button href="https://github.com/mmehdi" icon="github" external>
            {t('buttons.github')}
          </Button>

          <Button href="/projects" icon="briefcase">
            {t('buttons.projects')}
          </Button>

          <Button href="/about" icon="user">
            {t('buttons.about')}
          </Button>

          <Button href="/blog" icon="bookOpen">
            {t('buttons.blog')}
          </Button>

          <Button href="/contact" icon="phone">
            {t('buttons.contact')}
          </Button>
        </div>
      </div>

      {/* Schema Markup */}
      <JsonLd data={personSchema} />
      <JsonLd data={websiteSchema} />
    </div>
  )
}
