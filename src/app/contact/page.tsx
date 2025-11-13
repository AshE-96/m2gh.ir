import ContactForm from '@/components/ui/contact-form'

export default function ContactPage() {
  return (
    <div className="min-h-screen p-6 pt-24">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <section className="hero-section text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-text mb-4">
            تماس با من
          </h1>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            بیایید با هم کار کنیم و ایده‌های شما را به واقعیت تبدیل کنیم
          </p>
        </section>

        <div className="max-w-2xl mx-auto">
          {/* Contact Form */}
          <ContactForm />
        </div>
      </div>
    </div>
  )
}
