/**
 * Fountain Kiosk - Constants
 */

export const CLINIC_INFO = {
  name: 'Bundle Medical & Sportsworld Walk-In Clinic',
  address: '50 Sportsworld Crossing Rd Unit E1-03, Kitchener ON N2P 0A4',
  phone: '519-957-2057',
} as const

export const SMS_TEMPLATES = {
  checkIn: (firstName: string, trackingUrl: string) =>
    `Hi ${firstName}, welcome to Bundle Medical & Sportsworld Walk-In Clinic. Track your queue status: ${trackingUrl}`,
} as const

export const VALIDATION_MESSAGES = {
  nameRequired: 'Name must be at least 2 characters',
  nameInvalid: 'Please enter a valid name',
  phoneRequired: 'Phone number is required',
  phoneInvalid: 'Phone number must be 10 digits',
} as const

export const AUTO_RETURN_DELAY = 10000 // 10 seconds

export const PATIENT_WEB_URL = process.env.NEXT_PUBLIC_PATIENT_WEB_URL || 'https://lucky-nougat-b6fba4.netlify.app'
