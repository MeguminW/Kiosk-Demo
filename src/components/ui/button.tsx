import * as React from 'react'
import { cn } from '@/lib/utils'

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'destructive'
  size?: 'default' | 'sm' | 'lg'
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    return (
      <button
        className={cn(
          'inline-flex items-center justify-center rounded-lg font-medium transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2',
          'disabled:pointer-events-none disabled:opacity-50',
          'active:scale-[0.98]',
          {
            'bg-black text-white hover:bg-neutral-700': variant === 'default',
            'border border-neutral-200 bg-white hover:bg-neutral-100':
              variant === 'outline',
            'hover:bg-neutral-100': variant === 'ghost',
            'bg-error text-white hover:bg-error/90': variant === 'destructive',
          },
          {
            'h-10 px-4 text-base': size === 'default',
            'h-8 px-3 text-sm': size === 'sm',
            'h-16 px-12 text-xl': size === 'lg', // Kiosk large buttons
          },
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button }
