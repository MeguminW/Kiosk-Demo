/**
 * Patient-related types
 */

export interface PatientCheckIn {
  fullName: string
  phoneNumber: string
  clinicId?: string
  timestamp?: string
}

export interface CheckInResponse {
  success: boolean
  queueNumber: number
  estimatedWait: number
  patientsAhead: number
  error?: string
}
