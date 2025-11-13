'use client'

import { Button } from '@/components/ui/button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex items-center justify-center min-h-screen p-6">
      <div className="container-custom text-center">
        <div className="text-6xl mb-4">⚠️</div>
        <h1 className="text-2xl font-bold text-text mb-4">
          خطایی رخ داده است
        </h1>
        <p className="text-text-secondary mb-6">
          متاسفانه مشکلی پیش آمده است. لطفا دوباره امتحان کنید.
        </p>
        <Button onClick={reset}>
          تلاش مجدد
        </Button>
      </div>
    </div>
  )
}
