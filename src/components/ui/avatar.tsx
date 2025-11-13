'use client'

import { useState } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface AvatarProps {
  src: string
  alt: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
  priority?: boolean
}

export default function Avatar({ src, alt, size = 'md', className, priority = false }: AvatarProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  const sizeClasses = {
    sm: 'w-24 h-24',
    md: 'w-30 h-30',
    lg: 'w-40 h-40'
  }

  return (
    <div className={cn('avatar-container relative cursor-pointer', sizeClasses[size], className)}>
      <div className="avatar-ring absolute inset-0 rounded-full animate-spin-slow"></div>
      <div className="avatar relative w-full h-full rounded-full border-2 border-accent p-1 bg-secondary overflow-hidden z-10 transition-transform duration-500 hover:scale-105 hover:rotate-5">
        <div
          className="avatar-ring-before absolute inset-0 rounded-full opacity-50 animate-pulse"
          style={{
            background: `conic-gradient(from 0deg, transparent 0%, var(--accent) 20%, transparent 40%, transparent 60%, var(--accent) 80%, transparent 100%)`,
            filter: 'blur(4px)'
          }}
        ></div>
        <picture className="relative z-20 block w-full h-full">
          <source srcSet={`${src.replace('.jpeg', '.avif')}`} type="image/avif" />
          <source srcSet={`${src.replace('.jpeg', '.webp')}`} type="image/webp" />
          <Image
            src={src}
            alt={alt}
            fill
            className={cn(
              'avatar-img object-cover rounded-full transition-all duration-300',
              isLoaded ? 'opacity-100' : 'opacity-0'
            )}
            onLoad={() => setIsLoaded(true)}
            priority={priority}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </picture>
      </div>
    </div>
  )
}
