'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, Home, Globe } from 'lucide-react'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [currentLang, setCurrentLang] = useState('fa')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleLanguage = () => {
    const nextLang = currentLang === 'fa' ? 'en' : 'fa'
    setCurrentLang(nextLang)
    document.documentElement.setAttribute('lang', nextLang)
    document.documentElement.setAttribute('dir', nextLang === 'fa' ? 'rtl' : 'ltr')
    localStorage.setItem('preferredLanguage', nextLang)
  }

  const menuItems = [
    { href: '/', label: 'خانه', icon: Home },
    { href: '/about', label: 'درباره من' },
    { href: '/projects', label: 'پروژه‌ها' },
    { href: '/blog', label: 'مقالات' },
    { href: '/contact', label: 'تماس با ما' },
  ]

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'header-scrolled' : 'header-top'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo/Brand removed per request */}

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1 space-x-reverse">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="nav-link px-4 py-2 text-text-secondary hover:text-accent transition-all duration-300 relative group"
              >
                <span className="relative z-10">{item.label}</span>
                <span className="nav-link-bg absolute inset-0 bg-accent/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </Link>
            ))}
            
            {/* Language Switcher - Desktop */}
            <button
              onClick={toggleLanguage}
              className="mr-2 p-2 text-text-secondary hover:text-accent transition-all duration-300 relative group flex items-center justify-center rounded-lg hover:bg-accent/10"
              aria-label="تغییر زبان"
            >
              <Globe className="w-5 h-5" />
            </button>
          </div>

          {/* Mobile Right Side: Language + Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            {/* Language Switcher - Mobile */}
            <button
              onClick={toggleLanguage}
              className="p-2 rounded-lg text-text hover:text-accent hover:bg-accent/10 transition-all duration-300 flex items-center"
              aria-label="تغییر زبان"
            >
              <Globe className="w-5 h-5" />
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-text hover:text-accent hover:bg-accent/10 transition-all duration-300"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div 
          className={`md:hidden mobile-menu overflow-hidden transition-all duration-300 ${
            isOpen ? 'mobile-menu-open' : 'mobile-menu-closed'
          }`}
        >
          <div>
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block text-text-secondary hover:text-accent"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </header>
  )
}

