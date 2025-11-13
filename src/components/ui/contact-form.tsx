'use client'

import { useState } from 'react'
import { Button } from './button'
import { Mail, Send, CheckCircle, AlertCircle } from 'lucide-react'

interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

export default function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        })
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="contact-form-section">
      <h2 className="form-title text-2xl font-bold text-text mb-8 flex items-center gap-3">
        <div className="form-icon w-8 h-8 bg-accent text-bg rounded-full flex items-center justify-center text-sm font-bold">
          01
        </div>
        تماس با من
      </h2>

      {submitStatus === 'success' && (
        <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-md flex items-center gap-3 text-green-400">
          <CheckCircle className="w-5 h-5" />
          <span>پیام شما با موفقیت ارسال شد! به زودی با شما تماس خواهم گرفت.</span>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-md flex items-center gap-3 text-red-400">
          <AlertCircle className="w-5 h-5" />
          <span>خطا در ارسال پیام. لطفا دوباره امتحان کنید.</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="contact-form space-y-6">
        <div className="form-row grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="form-group">
            <label htmlFor="name" className="form-label block text-text font-medium mb-2">
              نام *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="form-input w-full px-4 py-3 bg-secondary/70 border border-accent/20 rounded-md text-text placeholder-text-secondary focus:outline-none focus:border-accent transition-colors"
              placeholder="نام و نام خانوادگی شما"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label block text-text font-medium mb-2">
              ایمیل *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="form-input w-full px-4 py-3 bg-secondary/70 border border-accent/20 rounded-md text-text placeholder-text-secondary focus:outline-none focus:border-accent transition-colors"
              placeholder="email@example.com"
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="subject" className="form-label block text-text font-medium mb-2">
            موضوع
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
            className="form-input w-full px-4 py-3 bg-secondary/70 border border-accent/20 rounded-md text-text placeholder-text-secondary focus:outline-none focus:border-accent transition-colors"
            placeholder="موضوع پیام شما"
          />
        </div>

        <div className="form-group">
          <label htmlFor="message" className="form-label block text-text font-medium mb-2">
            پیام *
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            required
            rows={6}
            maxLength={1000}
            className="form-textarea w-full px-4 py-3 bg-secondary/70 border border-accent/20 rounded-md text-text placeholder-text-secondary focus:outline-none focus:border-accent transition-colors resize-vertical"
            placeholder="پیام خود را اینجا بنویسید..."
          />
          <div className="text-right text-sm text-text-secondary mt-1">
            {formData.message.length}/1000
          </div>
        </div>

        <div className="flex justify-start">
          <Button
            type="submit"
            disabled={isSubmitting}
            icon="mail"
            className="w-full md:w-auto"
          >
            {isSubmitting ? 'در حال ارسال...' : 'ارسال پیام'}
          </Button>
        </div>
      </form>
    </div>
  )
}
