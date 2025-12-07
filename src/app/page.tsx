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

      {/* Main Content - Learning from Tab 3 design excellence */}
      <div className="flex-1 flex flex-col justify-center px-8 pb-12">
        <motion.div
          className="w-full max-w-2xl mx-auto"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          {/* Welcome Message - Tab 3 inspired sizing */}
          <h1 className="text-4xl sm:text-5xl font-semibold mb-10 tracking-tight text-center">
            Welcome to<br />
            {CLINIC_INFO.name}
          </h1>
          <p className="text-lg sm:text-xl text-center text-neutral-500 mb-8">
            Check in to join the queue
          </p>

          {/* Wait Time Card - Tab 3 style with shadow-xl */}
          {!isLoading && (
            <div className="bg-white rounded-3xl p-8 sm:p-10 mb-8 shadow-xl border border-neutral-200">
              {/* Wait Time - Prominent like Tab 3 */}
              <div className="text-center mb-6">
                <p className="text-xl text-neutral-500 mb-2">Current Wait Time</p>
                <p className="text-6xl sm:text-7xl font-bold tabular-nums tracking-tight">
                  ~{queueStatus.waitTime}<span className="text-4xl sm:text-5xl text-neutral-400 font-normal ml-2">min</span>
                </p>
              </div>

              {/* Patients Ahead - Tab 3 divider style */}
              <div className="border-t border-neutral-200 pt-6">
                <div className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5 text-neutral-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <p className="text-lg sm:text-xl font-semibold">
                    {queueStatus.queueLength} patients ahead
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Check In Button - Tab 3 size */}
          <div className="flex justify-center">
            <Button
              onClick={handleCheckIn}
              className="h-16 sm:h-20 px-16 sm:px-20 text-xl sm:text-2xl font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all"
            >
              Check In
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Spacer to push footer down */}
      <div className="flex-1" />

      {/* Footer - Fixed at bottom */}
      <div className="pb-4 text-center">
        <p className="text-neutral-400 text-xs">
          Powered by Fountain Health Technologies Inc.
        </p>
      </div>
    </motion.main>
  )
}
