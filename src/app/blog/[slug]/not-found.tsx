import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-black text-accent mb-4">404</h1>
        <h2 className="text-3xl font-bold text-text mb-4">مقاله یافت نشد</h2>
        <p className="text-text-secondary mb-8">
          متأسفانه مقاله مورد نظر شما یافت نشد. ممکن است حذف شده باشد یا آدرس اشتباه باشد.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/blog"
            className="button"
          >
            بازگشت به بلاگ
          </Link>
          <Link
            href="/"
            className="button"
          >
            صفحه اصلی
          </Link>
        </div>
      </div>
    </div>
  )
}

