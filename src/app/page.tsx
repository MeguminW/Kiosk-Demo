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
  const [isLoading, setIsLoading] = useState(true)

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
    <main className="relative flex min-h-screen flex-col bg-white">
      {/* Header with Logo */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-10">
        <Logo variant="combined" />
      </div>

      {/* Main Content - Centered */}
      <div className="flex-1 flex flex-col items-center justify-center px-12 py-24">
        {/* Main Headline */}
        <h1 className="text-6xl font-semibold tracking-tight text-center mb-3 max-w-5xl leading-tight">
          Welcome to {CLINIC_INFO.name}
        </h1>

        {/* Subheadline */}
        <p className="text-3xl text-neutral-500 mb-16 text-center">
          Check in to join the queue
        </p>

        {/* Wait Time Card */}
        {!isLoading && (
          <div className="mb-12">
            <WaitTimeIndicator
              waitMinutes={queueStatus.waitTime}
              queueLength={queueStatus.queueLength}
              variant="detailed"
            />
          </div>
        )}

        {/* Check In Button */}
        <Button
          size="lg"
          onClick={handleCheckIn}
          className="h-20 px-16 text-2xl font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all"
        >
          Check In
        </Button>
      </div>

      {/* Footer */}
      <KioskFooter />
    </main>
  )
}
