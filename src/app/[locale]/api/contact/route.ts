import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import nodemailer from 'nodemailer'

interface ContactData {
  name: string
  email: string
  subject?: string
  message: string
  date: string
  id: string
  read: boolean
}

// Create reusable transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    host: 'mail.m2gh.ir',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER || 'contact@m2gh.ir',
      pass: process.env.SMTP_PASSWORD || '',
    },
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email and message are required' },
        { status: 400 }
      )
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Create contact data
    const contactData: ContactData = {
      id: Date.now().toString(),
      name,
      email,
      subject: subject || '',
      message,
      date: new Date().toISOString(),
      read: false
    }

    // Save to contacts.json file
    const contactsFilePath = path.join(process.cwd(), 'src/data/contacts.json')

    let contacts: ContactData[] = []
    try {
      const contactsData = fs.readFileSync(contactsFilePath, 'utf8')
      contacts = JSON.parse(contactsData)
    } catch (error) {
      // File doesn't exist or is empty, start with empty array
      contacts = []
    }

    contacts.push(contactData)

    // Write back to file
    fs.writeFileSync(contactsFilePath, JSON.stringify(contacts, null, 2))

    // Send email
    try {
      const transporter = createTransporter()
      const smtpPassword = process.env.SMTP_PASSWORD

      if (!smtpPassword) {
        console.warn('SMTP_PASSWORD not set, skipping email send')
      } else {
        const mailOptions = {
          from: `"${name}" <${process.env.SMTP_USER || 'contact@m2gh.ir'}>`,
          replyTo: email,
          to: process.env.CONTACT_EMAIL || 'mehdi@m2gh.ir',
          subject: subject ? `تماس از سایت: ${subject}` : `تماس از سایت: ${name}`,
          html: `
            <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #06d6a0; border-bottom: 2px solid #06d6a0; padding-bottom: 10px;">
                پیام جدید از فرم تماس
              </h2>
              
              <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p><strong>نام:</strong> ${name}</p>
                <p><strong>ایمیل:</strong> <a href="mailto:${email}">${email}</a></p>
                ${subject ? `<p><strong>موضوع:</strong> ${subject}</p>` : ''}
                <p><strong>تاریخ:</strong> ${new Date().toLocaleString('fa-IR')}</p>
              </div>
              
              <div style="background: #ffffff; padding: 20px; border-left: 4px solid #06d6a0; margin: 20px 0;">
                <h3 style="color: #333; margin-top: 0;">پیام:</h3>
                <p style="line-height: 1.8; color: #555; white-space: pre-wrap;">${message}</p>
              </div>
              
              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #888; font-size: 12px;">
                <p>این ایمیل به صورت خودکار از فرم تماس سایت ارسال شده است.</p>
                <p>برای پاسخ، می‌توانید مستقیماً به این ایمیل پاسخ دهید.</p>
              </div>
            </div>
          `,
          text: `
پیام جدید از فرم تماس

نام: ${name}
ایمیل: ${email}
${subject ? `موضوع: ${subject}` : ''}
تاریخ: ${new Date().toLocaleString('fa-IR')}

پیام:
${message}
          `.trim(),
        }

        await transporter.sendMail(mailOptions)
        console.log('Email sent successfully')
      }
    } catch (emailError) {
      console.error('Error sending email:', emailError)
      // Don't fail the request if email fails, just log it
    }

    return NextResponse.json(
      { message: 'Contact form submitted successfully', id: contactData.id },
      { status: 200 }
    )

  } catch (error) {
    console.error('Error processing contact form:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const contactsFilePath = path.join(process.cwd(), 'src/data/contacts.json')

    let contacts: ContactData[] = []
    try {
      const contactsData = fs.readFileSync(contactsFilePath, 'utf8')
      contacts = JSON.parse(contactsData)
    } catch (error) {
      contacts = []
    }

    return NextResponse.json(contacts)
  } catch (error) {
    console.error('Error fetching contacts:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
