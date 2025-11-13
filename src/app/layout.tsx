import type { Metadata } from "next";
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
      <body className="min-h-screen relative">
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
      </body>
    </html>
  );
}
