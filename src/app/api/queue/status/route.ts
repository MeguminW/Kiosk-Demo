import { NextResponse } from 'next/server'

/**
 * GET /api/queue/status
 * Returns current queue status
 */
export async function GET() {
  // Mock data - standardized for demo
  const mockData = {
    currentWaitTime: 35, // 35 minutes
    queueLength: 4,      // 4 patients ahead
    clinicStatus: 'open' as const,
  }

  return NextResponse.json(mockData)
}
