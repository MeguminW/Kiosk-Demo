import * as React from 'react'
import { cn } from '@/lib/utils'

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'outline'
}

function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold transition-colors',
        'focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2',
        {
          'bg-black text-white': variant === 'default',
          'border border-neutral-200 bg-white text-neutral-700': variant === 'outline',
        },
        className
      )}
      {...props}
    />
  )
}

export { Badge }
