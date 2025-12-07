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
    <main className="flex min-h-screen flex-col bg-white">
      {/* Main Content - Centered with proper spacing */}
      <div className="flex-1 flex flex-col items-center justify-center px-12 py-16 space-y-10">
        {/* Logo */}
        <div className="mb-6">
          <Logo variant="combined" />
        </div>

        {/* Main Headline */}
        <h1 className="text-5xl font-semibold tracking-tight text-center max-w-4xl leading-tight">
          Welcome to {CLINIC_INFO.name}
        </h1>

        {/* Subheadline */}
        <p className="text-2xl text-neutral-500 text-center">
          Check in to join the queue
        </p>

        {/* Wait Time Card */}
        {!isLoading && (
          <div className="my-4">
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
          className="h-20 px-16 text-2xl font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all mt-6"
        >
          Check In
        </Button>
      </div>

      {/* Footer */}
      <KioskFooter />
    </main>
  )
}
