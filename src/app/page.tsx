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
      {/* Logo - stick to top with minimal padding */}
      <motion.div
        className="pt-8 pb-4 flex justify-center"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.4 }}
      >
        <Logo variant="combined" />
      </motion.div>

      {/* Main Content - Fixed spacing for perfect balance */}
      <div className="flex-1 flex flex-col justify-center px-10 -mt-8">
        <motion.div
          className="w-full max-w-2xl mx-auto space-y-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          {/* Welcome Message - Compact */}
          <div className="text-center space-y-2">
            <h1 className="text-5xl font-bold text-black">
              Welcome to
            </h1>
            <h2 className="text-4xl font-bold text-black">
              {CLINIC_INFO.name}
            </h2>
            <p className="text-xl text-neutral-500 pt-1">
              Check in to join the queue
            </p>
          </div>

          {/* Wait Time Card - Compact and clean */}
          {!isLoading && (
            <div className="bg-neutral-50 rounded-3xl p-8 space-y-6">
              {/* Wait Time - Main focus */}
              <div className="text-center">
                <div className="text-neutral-400 text-sm font-semibold tracking-widest uppercase mb-3">
                  Current Wait Time
                </div>
                <div className="text-7xl font-bold text-black tabular-nums">
                  ~{queueStatus.waitTime}
                  <span className="text-5xl text-neutral-400 font-normal ml-2">min</span>
                </div>
              </div>

              {/* Patients Ahead - Secondary info */}
              <div className="flex items-center justify-center gap-2 text-neutral-600 border-t border-neutral-200 pt-5">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="text-lg font-medium">
                  {queueStatus.queueLength} patients ahead
                </span>
              </div>
            </div>
          )}

          {/* Check In Button */}
          <div className="flex justify-center pt-4">
            <Button
              onClick={handleCheckIn}
              className="bg-black hover:bg-neutral-800 text-white h-16 px-16 text-xl font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02]"
            >
              Check In
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Footer - Always visible */}
      <div className="pb-5 text-center">
        <p className="text-neutral-400 text-sm">
          Powered by Fountain Health Technologies Inc.
        </p>
      </div>
    </motion.main>
  )
}
