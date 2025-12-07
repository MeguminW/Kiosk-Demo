/**
 * Queue-related types
 */

export interface QueueStatus {
  currentWaitTime: number  // minutes
  queueLength: number      // number of patients
  clinicStatus: 'open' | 'closed' | 'busy'
}

export interface QueueAssignment {
  queueNumber: number
  estimatedWait: number
  patientsAhead: number
  timestamp: string
}
