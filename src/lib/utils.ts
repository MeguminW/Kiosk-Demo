import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merge Tailwind CSS classes safely
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format phone number: (519) 555-0123
 */
export function formatPhone(phone: string): string {
  const digits = phone.replace(/\D/g, '')
  if (digits.length !== 10) return phone

  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
}

/**
 * Mask phone number: (519) ***-0123
 */
export function maskPhone(phone: string): string {
  const formatted = formatPhone(phone)
  return formatted.replace(/\d{3}-/, '***-')
}

/**
 * Get wait time color based on minutes
 */
export function getWaitColor(minutes: number): string {
  if (minutes < 15) return 'text-success'
  if (minutes < 30) return 'text-warning'
  if (minutes < 60) return 'text-orange-500'
  return 'text-error'
}

/**
 * Get wait time label
 */
export function getWaitLabel(minutes: number): string {
  if (minutes < 15) return 'Short Wait'
  if (minutes < 30) return 'Moderate Wait'
  if (minutes < 60) return 'Busy'
  return 'Very Busy'
}

/**
 * Sleep/delay utility
 */
export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}
