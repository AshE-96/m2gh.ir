import type { Metadata } from "next";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/lib/i18n';
import ParticlesBackground from "@/components/ui/particles-background";
import Header from "@/components/layout/header";
import VercelAnalytics from "@/components/vercel-analytics";
import "./globals.css";

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

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale} dir={locale === 'fa' ? 'rtl' : 'ltr'}>
      <body className="min-h-screen relative">
        <NextIntlClientProvider messages={messages}>
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
          <VercelAnalytics />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
