import Link from 'next/link'
import Avatar from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Mail, MapPin, Calendar, Award, Users, Briefcase } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen p-6 pt-24">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <section className="hero-section text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 hero-title-gradient">
            درباره من
          </h1>
          <p className="text-xl max-w-2xl mx-auto hero-subtitle-gradient">
            سفری از ایده تا اجرا، با تمرکز بر خلق ارزش و نوآوری
          </p>
        </section>

        <div className="about-grid grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <aside className="profile-card lg:col-span-1">
            <div className="container-custom p-6">
              <div className="text-center flex flex-col items-center">
                <div className="mb-4">
                  <Avatar
                    src="/assets/images/1606670715813.jpeg"
                    alt="محمد مهدی قنبری - مدیر محصول و تحلیل‌گر داده"
                    size="lg"
                    priority
                  />
                </div>

                <h2 className="text-2xl font-bold text-text mb-2">
                  محمد مهدی قنبری
                </h2>

                <p className="text-accent text-lg mb-6">
                  مدیر محصول و تحلیل‌گر داده
                </p>

                <div className="profile-stats grid grid-cols-3 gap-4 mb-8">
                  <div className="stat text-center">
                    <span className="stat-number text-2xl font-bold text-accent">5+</span>
                    <span className="stat-label text-sm text-text-secondary block">سال تجربه</span>
                  </div>
                  <div className="stat text-center">
                    <span className="stat-number text-2xl font-bold text-accent">20+</span>
                    <span className="stat-label text-sm text-text-secondary block">پروژه</span>
                  </div>
                  <div className="stat text-center">
                    <span className="stat-number text-2xl font-bold text-accent">10+</span>
                    <span className="stat-label text-sm text-text-secondary block">مشتری</span>
                  </div>
                </div>

                <div className="social-links flex justify-center gap-4">
                  <a
                    href="https://linkedin.com/in/mohammad-mehdi-ghanbari"
                    className="social-link p-3 rounded-full transition-all duration-300 hover:scale-110"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/>
                      <circle cx="4" cy="4" r="2"/>
                    </svg>
                  </a>

                  <a
                    href="https://github.com/mmehdi"
                    className="social-link p-3 rounded-full transition-all duration-300 hover:scale-110"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>

                  <a
                    href="mailto:mehdi@m2gh.ir"
                    className="social-link p-3 rounded-full transition-all duration-300 hover:scale-110 text-accent"
                    aria-label="Email"
                  >
                    <Mail className="w-6 h-6" stroke="currentColor" fill="none" />
                  </a>
                </div>
              </div>
            </div>
          </aside>

          {/* Content Area */}
          <div className="content-area lg:col-span-2 space-y-8">
            {/* Introduction Section */}
            <section className="content-section">
              <div className="content-box-glass p-6 rounded-lg">
                <h2 className="section-title flex items-center gap-4 mb-6">
                  <div className="section-icon w-8 h-8 bg-accent text-bg rounded-full flex items-center justify-center text-sm font-bold">
                    01
                  </div>
                  <span className="text-2xl font-bold text-text">معرفی</span>
                </h2>

                <div className="space-y-4 text-text-secondary leading-relaxed">
                  <p>
                    سلام! من محمد مهدی قنبری هستم، مدیر محصول و تحلیل‌گر داده با بیش از 5 سال تجربه در صنعت فناوری.
                    تخصص من در ترکیب هنر طراحی تجربه کاربری با قدرت تحلیل داده برای خلق محصولاتی است که واقعاً تفاوت ایجاد می‌کنند.
                  </p>
                  <p>
                    من به نوآوری، حل مسائل پیچیده و ایجاد راه‌حل‌هایی که زندگی کاربران را بهبود می‌بخشد، علاقه‌مند هستم.
                    همیشه در جستجوی یادگیری تکنولوژی‌های جدید و به‌کارگیری آن‌ها در پروژه‌های واقعی هستم.
                  </p>
                </div>
              </div>
            </section>

            {/* Skills Section */}
            <section className="content-section">
              <div className="content-box-glass p-6 rounded-lg">
                <h2 className="section-title flex items-center gap-4 mb-8">
                  <div className="section-icon w-8 h-8 bg-accent text-bg rounded-full flex items-center justify-center text-sm font-bold">
                    02
                  </div>
                  <span className="text-2xl font-bold text-text">مهارت‌ها</span>
                </h2>

                <div className="skills-grid grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="skill-category-box p-4 rounded-lg">
                    <h3 className="skill-category-title text-lg font-semibold text-accent mb-4 flex items-center gap-2">
                      <div className="w-2 h-2 bg-accent rounded-full"></div>
                      مدیریت محصول
                    </h3>
                    <div className="skill-tags flex flex-wrap gap-2">
                      <span className="skill-tag px-3 py-1.5 bg-accent/10 text-accent rounded-full text-sm border border-accent/20 hover:bg-accent/20 transition-colors">Product Strategy</span>
                      <span className="skill-tag px-3 py-1.5 bg-accent/10 text-accent rounded-full text-sm border border-accent/20 hover:bg-accent/20 transition-colors">Roadmapping</span>
                      <span className="skill-tag px-3 py-1.5 bg-accent/10 text-accent rounded-full text-sm border border-accent/20 hover:bg-accent/20 transition-colors">User Research</span>
                      <span className="skill-tag px-3 py-1.5 bg-accent/10 text-accent rounded-full text-sm border border-accent/20 hover:bg-accent/20 transition-colors">A/B Testing</span>
                      <span className="skill-tag px-3 py-1.5 bg-accent/10 text-accent rounded-full text-sm border border-accent/20 hover:bg-accent/20 transition-colors">Agile/Scrum</span>
                    </div>
                  </div>

                  <div className="skill-category-box p-4 rounded-lg">
                    <h3 className="skill-category-title text-lg font-semibold text-accent mb-4 flex items-center gap-2">
                      <div className="w-2 h-2 bg-accent rounded-full"></div>
                      تحلیل داده
                    </h3>
                    <div className="skill-tags flex flex-wrap gap-2">
                      <span className="skill-tag px-3 py-1.5 bg-accent/10 text-accent rounded-full text-sm border border-accent/20 hover:bg-accent/20 transition-colors">SQL</span>
                      <span className="skill-tag px-3 py-1.5 bg-accent/10 text-accent rounded-full text-sm border border-accent/20 hover:bg-accent/20 transition-colors">Python</span>
                      <span className="skill-tag px-3 py-1.5 bg-accent/10 text-accent rounded-full text-sm border border-accent/20 hover:bg-accent/20 transition-colors">Tableau</span>
                      <span className="skill-tag px-3 py-1.5 bg-accent/10 text-accent rounded-full text-sm border border-accent/20 hover:bg-accent/20 transition-colors">Google Analytics</span>
                      <span className="skill-tag px-3 py-1.5 bg-accent/10 text-accent rounded-full text-sm border border-accent/20 hover:bg-accent/20 transition-colors">Excel</span>
                    </div>
                  </div>

                  <div className="skill-category-box p-4 rounded-lg">
                    <h3 className="skill-category-title text-lg font-semibold text-accent mb-4 flex items-center gap-2">
                      <div className="w-2 h-2 bg-accent rounded-full"></div>
                      طراحی
                    </h3>
                    <div className="skill-tags flex flex-wrap gap-2">
                      <span className="skill-tag px-3 py-1.5 bg-accent/10 text-accent rounded-full text-sm border border-accent/20 hover:bg-accent/20 transition-colors">Figma</span>
                      <span className="skill-tag px-3 py-1.5 bg-accent/10 text-accent rounded-full text-sm border border-accent/20 hover:bg-accent/20 transition-colors">Adobe XD</span>
                      <span className="skill-tag px-3 py-1.5 bg-accent/10 text-accent rounded-full text-sm border border-accent/20 hover:bg-accent/20 transition-colors">Prototyping</span>
                      <span className="skill-tag px-3 py-1.5 bg-accent/10 text-accent rounded-full text-sm border border-accent/20 hover:bg-accent/20 transition-colors">Wireframing</span>
                      <span className="skill-tag px-3 py-1.5 bg-accent/10 text-accent rounded-full text-sm border border-accent/20 hover:bg-accent/20 transition-colors">UI/UX</span>
                    </div>
                  </div>

                  <div className="skill-category-box p-4 rounded-lg">
                    <h3 className="skill-category-title text-lg font-semibold text-accent mb-4 flex items-center gap-2">
                      <div className="w-2 h-2 bg-accent rounded-full"></div>
                      فنی
                    </h3>
                    <div className="skill-tags flex flex-wrap gap-2">
                      <span className="skill-tag px-3 py-1.5 bg-accent/10 text-accent rounded-full text-sm border border-accent/20 hover:bg-accent/20 transition-colors">HTML/CSS</span>
                      <span className="skill-tag px-3 py-1.5 bg-accent/10 text-accent rounded-full text-sm border border-accent/20 hover:bg-accent/20 transition-colors">JavaScript</span>
                      <span className="skill-tag px-3 py-1.5 bg-accent/10 text-accent rounded-full text-sm border border-accent/20 hover:bg-accent/20 transition-colors">Git</span>
                      <span className="skill-tag px-3 py-1.5 bg-accent/10 text-accent rounded-full text-sm border border-accent/20 hover:bg-accent/20 transition-colors">API</span>
                      <span className="skill-tag px-3 py-1.5 bg-accent/10 text-accent rounded-full text-sm border border-accent/20 hover:bg-accent/20 transition-colors">React</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Contact CTA */}
            <section className="content-section">
              <div className="container-custom p-8 text-center">
                <h3 className="text-2xl font-bold text-text mb-4">
                  آماده همکاری هستیم؟
                </h3>
                <p className="text-text-secondary mb-6">
                  برای پروژه‌های جدید یا فرصت‌های همکاری، با من تماس بگیرید.
                </p>
                <Button href="/contact" icon="phone">
                  تماس با من
                </Button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
