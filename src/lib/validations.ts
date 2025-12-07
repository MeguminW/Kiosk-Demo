import { z } from 'zod'
import { VALIDATION_MESSAGES } from './constants'

/**
 * Check-in form validation schema
 */
export const checkInSchema = z.object({
  fullName: z
    .string()
    .min(2, VALIDATION_MESSAGES.nameRequired)
    .regex(/^[a-zA-Z\s'-]+$/, VALIDATION_MESSAGES.nameInvalid),

  phoneNumber: z
    .string()
    .transform(val => val.replace(/\D/g, '')) // Strip non-digits
    .pipe(
      z
        .string()
        .length(10, VALIDATION_MESSAGES.phoneInvalid)
    ),
})

export type CheckInFormData = z.infer<typeof checkInSchema>
