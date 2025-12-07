'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
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
    <motion.main
      className="h-screen bg-white flex flex-col overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      {/* Logo - absolute top positioning */}
      <motion.div
        className="pt-6 pb-3 flex justify-center"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.4 }}
      >
        <Logo variant="combined" />
      </motion.div>

      {/* Main Content - Refined elegant design */}
      <div className="flex-1 flex flex-col justify-center px-8 pb-12">
        <motion.div
          className="w-full max-w-2xl mx-auto space-y-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          {/* Welcome Section - Clear hierarchy */}
          <div className="text-center space-y-4">
            {/* Small eyebrow label */}
            <div className="inline-block">
              <span className="text-sm font-semibold tracking-widest uppercase text-neutral-400">
                Welcome to
              </span>
            </div>

            {/* Main clinic name - hero size */}
            <h1 className="text-[2.5rem] sm:text-5xl font-bold text-black leading-tight tracking-tight px-4">
              Bundle Medical &<br />Sportsworld Walk-In Clinic
            </h1>

            {/* Subtitle - prominent */}
            <p className="text-xl sm:text-2xl text-neutral-600 font-medium pt-2">
              Check in to join the queue
            </p>
          </div>

          {/* Wait Time Card - Cleaner design */}
          {!isLoading && (
            <div className="bg-white rounded-3xl p-10 sm:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-neutral-100">
              {/* Wait Time - Maximum prominence */}
              <div className="text-center mb-8">
                <p className="text-base font-bold tracking-[0.2em] uppercase text-neutral-400 mb-4">
                  Current Wait Time
                </p>
                <div className="flex items-baseline justify-center gap-3">
                  <span className="text-8xl sm:text-9xl font-bold text-black tabular-nums tracking-tighter leading-none">
                    ~{queueStatus.waitTime}
                  </span>
                  <span className="text-4xl sm:text-5xl text-neutral-300 font-light pb-2">
                    min
                  </span>
                </div>
              </div>

              {/* Patients Ahead - Refined */}
              <div className="border-t border-neutral-200 pt-6">
                <div className="flex items-center justify-center gap-3">
                  <svg className="w-6 h-6 text-neutral-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <p className="text-xl sm:text-2xl font-semibold text-neutral-700">
                    {queueStatus.queueLength} patients ahead
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Check In Button - Premium */}
          <div className="flex justify-center pt-4">
            <Button
              onClick={handleCheckIn}
              className="h-16 sm:h-20 px-20 sm:px-24 text-xl sm:text-2xl font-semibold rounded-2xl shadow-lg hover:shadow-2xl transition-all hover:scale-[1.02] bg-black hover:bg-neutral-800"
            >
              Check In
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Spacer to push footer down */}
      <div className="flex-1" />

      {/* Footer - Fixed at bottom */}
      <div className="pb-5 text-center">
        <p className="text-neutral-500 text-sm font-medium">
          Powered by Fountain Health Technologies Inc.
        </p>
      </div>
    </motion.main>
  )
}
