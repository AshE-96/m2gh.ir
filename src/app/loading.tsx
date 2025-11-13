export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-accent mb-4"></div>
        <p className="text-text-secondary">در حال بارگذاری...</p>
      </div>
    </div>
  )
}
