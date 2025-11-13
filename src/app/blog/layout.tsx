import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'بلاگ | محمد مهدی قنبری',
  description: 'مقالات و نوشته‌های محمد مهدی قنبری در زمینه مدیریت محصول، تحلیل داده و طراحی. بینش‌ها و تجربیات در دنیای فناوری و محصولات دیجیتال.',
  keywords: ['بلاگ', 'مقالات', 'مدیریت محصول', 'تحلیل داده', 'طراحی', 'فناوری'],
  openGraph: {
    title: 'بلاگ | محمد مهدی قنبری',
    description: 'مقالات و نوشته‌های محمد مهدی قنبری در زمینه مدیریت محصول، تحلیل داده و طراحی',
    url: 'https://m2gh.ir/blog',
    type: 'website',
  },
  alternates: {
    canonical: 'https://m2gh.ir/blog'
  }
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

