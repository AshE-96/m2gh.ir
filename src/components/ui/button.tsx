'use client'

import { forwardRef } from 'react'
import Link from 'next/link'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import {
  Github,
  Linkedin,
  Briefcase,
  User,
  BookOpen,
  Phone,
  Mail,
  ExternalLink,
  LucideIcon
} from 'lucide-react'

const iconMap: Record<string, LucideIcon> = {
  github: Github,
  linkedin: Linkedin,
  briefcase: Briefcase,
  user: User,
  bookOpen: BookOpen,
  mail: Mail,
  contact: Phone,
  phone: Phone,
  externalLink: ExternalLink,
}

const buttonVariants = cva(
  'button flex items-center justify-center gap-3 px-4 py-3 bg-secondary/70 text-text border border-accent/20 rounded-md text-sm font-medium transition-all duration-300 backdrop-blur-md relative overflow-hidden box-shadow-custom hover:-translate-y-1.5 hover:scale-102 hover:border-accent hover:shadow-custom group disabled:opacity-50 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        default: '',
        ghost: 'bg-transparent border-transparent hover:bg-accent/10',
        outline: 'bg-transparent border-accent/40 hover:bg-accent/5',
      },
      size: {
        sm: 'px-3 py-2 text-xs gap-2',
        md: 'px-4 py-3 text-sm gap-3',
        lg: 'px-5 py-4 text-base gap-4',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  href?: string
  icon?: string
  external?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, href, icon, external, children, ...props }, ref) => {
    const Icon = icon ? iconMap[icon] : null

    const content = (
      <>
        <div className="absolute inset-0 bg-accent/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md"></div>
        <div className="absolute bottom-0 left-1/2 w-4/5 h-1 bg-gradient-to-r from-transparent via-accent/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-b-md"></div>

        {Icon && (
          <Icon className="relative w-5 h-5 text-accent filter drop-shadow-custom transition-all duration-300 group-hover:scale-115 group-hover:drop-shadow-custom-hover z-10 flex-shrink-0 animate-icon-pulse" />
        )}

        <span className="relative z-10 font-medium transition-all duration-300 group-hover:text-accent-light group-hover:drop-shadow-custom-text">
          {children}
        </span>
      </>
    )

    if (href) {
      return (
        <Link
          href={href}
          className={cn(buttonVariants({ variant, size, className }))}
          {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
        >
          {content}
        </Link>
      )
    }

    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {content}
      </button>
    )
  }
)

Button.displayName = 'Button'

export { Button, buttonVariants }
