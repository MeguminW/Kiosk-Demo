import { NextResponse } from 'next/server'

/**
 * GET /api/queue/status
 * Returns current queue status
 */
export async function GET() {
  // Mock data - in production, this would fetch from a database
  const mockData = {
    currentWaitTime: Math.floor(Math.random() * 30) + 20, // 20-50 min
    queueLength: Math.floor(Math.random() * 10) + 1,      // 1-10 patients
    clinicStatus: 'open' as const,
  }

  return NextResponse.json(mockData)
}
