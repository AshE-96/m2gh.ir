'use client'

import { useState } from 'react'

export default function LanguageSwitcher() {
  const [currentLang, setCurrentLang] = useState('fa')

  const toggleLanguage = () => {
    const nextLang = currentLang === 'fa' ? 'en' : 'fa'
    setCurrentLang(nextLang)

    // Update document attributes
    document.documentElement.setAttribute('lang', nextLang)
    document.documentElement.setAttribute('dir', nextLang === 'fa' ? 'rtl' : 'ltr')
    localStorage.setItem('preferredLanguage', nextLang)

    // Show notification - i18n will be fully implemented in production
    alert(`زبان به ${nextLang === 'fa' ? 'فارسی' : 'English'} تغییر یافت! (در نسخه نهایی i18n کامل پیاده‌سازی خواهد شد)`)
  }

  return (
    <button
      onClick={toggleLanguage}
      className="lang-switch fixed top-4 left-4 z-50 bg-secondary/70 text-text border border-accent/30 px-3 py-1.5 rounded-md text-sm font-medium cursor-pointer transition-all duration-300 backdrop-blur-md hover:bg-accent/15 hover:border-accent hover:-translate-y-1 hover:shadow-lg hover:shadow-black/30 flex items-center gap-1.5"
      aria-label="تغییر زبان"
    >
      <span className="text-xs">🌐</span>
      <span>{currentLang === 'fa' ? 'EN' : 'فارسی'}</span>
    </button>
  )
}
