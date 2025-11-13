'use client'

import { useState, FormEvent } from 'react'
import { Comment } from '@/types'

interface CommentsSectionProps {
  articleId: string
  initialComments?: Comment[]
}

export default function CommentsSection({
  articleId,
  initialComments = []
}: CommentsSectionProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    comment: ''
  })

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          action: 'submit_comment',
          article_id: articleId,
          ...formData
        })
      })

      if (response.ok) {
        const result = await response.json()
        alert(
          'دیدگاه شما با موفقیت ثبت شد و پس از تایید مدیر نمایش داده خواهد شد.'
        )
        setFormData({ name: '', email: '', comment: '' })
      } else {
        const error = await response.json()
        alert(error.error || 'خطایی در ثبت دیدگاه رخ داد. لطفاً دوباره تلاش کنید.')
      }
    } catch (error) {
      console.error('Error submitting comment:', error)
      alert('خطایی در اتصال به سرور رخ داد. لطفاً دوباره تلاش کنید.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="comments-section" id="comments-section">
      <div className="comments-header">
        <h2 className="comments-title">نظرات و دیدگاه‌ها</h2>
        <span className="comments-count">{comments.length} نظر</span>
      </div>

      {/* Comment Form */}
      <form className="comment-form-modern" id="commentForm" onSubmit={handleSubmit}>
        <div className="form-header-modern">
          <h3 className="form-title-modern">دیدگاه خود را بنویسید</h3>
          <p className="form-subtitle-modern">
            دیدگاه شما پس از تایید مدیر نمایش داده خواهد شد
          </p>
        </div>
        
        <div className="form-grid-modern">
          <div className="form-group-modern">
            <label className="form-label-modern" htmlFor="comment-name">
              نام <span className="required">*</span>
            </label>
            <input
              type="text"
              id="comment-name"
              className="form-input-modern"
              name="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="نام خود را وارد کنید"
              required
            />
          </div>
          <div className="form-group-modern">
            <label className="form-label-modern" htmlFor="comment-email">
              ایمیل <span className="required">*</span>
            </label>
            <input
              type="email"
              id="comment-email"
              className="form-input-modern"
              name="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="ایمیل خود را وارد کنید"
              required
            />
          </div>
        </div>
        
        <div className="form-group-modern">
          <label className="form-label-modern" htmlFor="comment-text">
            دیدگاه <span className="required">*</span>
          </label>
          <textarea
            id="comment-text"
            className="form-textarea-modern"
            name="comment"
            value={formData.comment}
            onChange={(e) =>
              setFormData({ ...formData, comment: e.target.value })
            }
            placeholder="دیدگاه خود را اینجا بنویسید..."
            rows={6}
            required
          />
        </div>
        
        <div className="form-footer-modern">
          <button
            type="submit"
            disabled={isSubmitting}
            className="submit-btn-modern"
          >
            {isSubmitting ? (
              <>
                <span className="spinner"></span>
                در حال ارسال...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                ارسال دیدگاه
              </>
            )}
          </button>
        </div>
      </form>

      {/* Comments List */}
      <div className="comments-list-modern">
        {comments.map((comment) => (
          <div key={comment.id} className="comment-modern">
            <div className="comment-header-modern">
              <div className="comment-avatar-modern">
                {comment.name.charAt(0).toUpperCase()}
              </div>
              <div className="comment-meta-modern">
                <div className="comment-author-modern">{comment.name}</div>
                <div className="comment-date-modern">
                  {new Date(comment.date).toLocaleDateString('fa-IR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
              </div>
            </div>
            <div className="comment-body-modern">{comment.message}</div>
          </div>
        ))}
        {comments.length === 0 && (
          <div className="comments-empty">
            <svg className="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <h3 className="empty-title">هنوز نظری ثبت نشده است</h3>
            <p className="empty-text">اولین نفری باشید که نظر می‌دهد!</p>
          </div>
        )}
      </div>
    </section>
  )
}

