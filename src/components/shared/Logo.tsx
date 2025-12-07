import { cn } from '@/lib/utils'
import Image from 'next/image'

interface LogoProps {
  variant?: 'icon' | 'wordmark' | 'combined'
  className?: string
}

export function Logo({ variant = 'combined', className }: LogoProps) {
  if (variant === 'icon') {
    return (
      <div className={cn('flex items-center justify-center', className)}>
        <Image
          src="/fountain-icon.png"
          alt="Fountain"
          width={80}
          height={80}
          priority
          className="select-none"
        />
      </div>
    )
  }

  if (variant === 'wordmark') {
    return (
      <div className={cn('flex items-center justify-center', className)}>
        <Image
          src="/fountain-wordmark.svg"
          alt="Fountain"
          width={200}
          height={60}
          priority
          className="select-none"
        />
      </div>
    )
  }

  // Combined: Icon + Wordmark
  return (
    <div className={cn('flex items-center justify-center', className)}>
      <Image
        src="/fountain-combined.png"
        alt="Fountain Health Technologies"
        width={400}
        height={120}
        priority
        className="select-none"
      />
    </div>
  )
}
