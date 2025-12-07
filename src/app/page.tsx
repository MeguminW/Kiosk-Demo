'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Logo } from '@/components/shared/Logo'
import { WaitTimeIndicator } from '@/components/kiosk/WaitTimeIndicator'
import { KioskFooter } from '@/components/kiosk/KioskFooter'
import { Button } from '@/components/ui/button'
import { CLINIC_INFO } from '@/lib/constants'

export default function WelcomePage() {
  const router = useRouter()
  const [queueStatus, setQueueStatus] = useState({
    waitTime: 35,
    queueLength: 4,
  })
  const [isLoading, setIsLoading] = useState(false)

  // Fetch queue status on mount
  useEffect(() => {
    async function fetchQueueStatus() {
      try {
        const response = await fetch('/api/queue/status')
        if (response.ok) {
          const data = await response.json()
          setQueueStatus({
            waitTime: data.currentWaitTime,
            queueLength: data.queueLength,
          })
        }
      } catch (error) {
        console.error('Failed to fetch queue status:', error)
        // Use default values
      } finally {
        setIsLoading(false)
      }
    }

    fetchQueueStatus()

    // Refresh every 30 seconds
    const interval = setInterval(fetchQueueStatus, 30000)
    return () => clearInterval(interval)
  }, [])

  const handleCheckIn = () => {
    router.push('/check-in')
  }

  return (
    <main className="flex min-h-screen flex-col bg-white">
      {/* Logo stick to top - no gap below */}
      <div className="flex justify-center pt-10">
        <Logo variant="combined" />
      </div>

      {/* Main Content - centered, clean flow */}
      <div className="flex-1 flex flex-col items-center justify-center px-12">
        {/* Headline */}
        <h1 className="text-5xl font-semibold text-center max-w-4xl leading-tight mb-3">
          Welcome to {CLINIC_INFO.name}
        </h1>

        {/* Subtitle */}
        <p className="text-2xl text-neutral-500 text-center mb-12">
          Check in to join the queue
        </p>

        {/* Wait Time Card - clean, prominent */}
        {!isLoading && (
          <div className="w-full max-w-3xl mb-12">
            <div className="bg-white rounded-3xl border border-neutral-200 shadow-xl p-12">
              {/* Header row */}
              <div className="flex items-center justify-between mb-10">
                <p className="text-2xl font-semibold text-neutral-700">Current Wait Time</p>
                <span className="px-5 py-2 bg-neutral-100 text-neutral-700 text-lg font-medium rounded-full">
                  Moderate Wait
                </span>
              </div>

              {/* Wait time - hero */}
              <div className="flex items-center mb-10">
                <svg className="w-16 h-16 text-neutral-400 mr-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-8xl font-bold">~{queueStatus.waitTime} min</p>
              </div>

              {/* Patients ahead */}
              <div className="flex items-center text-neutral-600">
                <svg className="w-10 h-10 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <p className="text-3xl font-semibold">{queueStatus.queueLength} patients ahead</p>
              </div>
            </div>
          </div>
        )}

        {/* CTA Button */}
        <Button
          size="lg"
          onClick={handleCheckIn}
          className="h-20 px-32 text-2xl font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all"
        >
          Check In
        </Button>
      </div>

      {/* Footer */}
      <KioskFooter />
    </main>
  )
}
