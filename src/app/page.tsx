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

      {/* Main Content - Calculated spacing, no flex tricks */}
      <div className="px-10 pt-6 pb-4">
        <motion.div
          className="w-full max-w-2xl mx-auto space-y-5"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          {/* Welcome Message */}
          <div className="text-center space-y-1">
            <h1 className="font-display text-[2.75rem] font-semibold text-black tracking-tight">
              Welcome to
            </h1>
            <h2 className="font-display text-[2.25rem] font-semibold text-black leading-tight tracking-tight">
              {CLINIC_INFO.name}
            </h2>
            <p className="font-sans text-lg text-neutral-500 pt-2 font-medium">
              Check in to join the queue
            </p>
          </div>

          {/* Wait Time Card */}
          {!isLoading && (
            <div className="bg-neutral-100 rounded-2xl p-7 space-y-5">
              {/* Wait Time */}
              <div className="text-center">
                <div className="font-sans text-[0.6875rem] font-bold tracking-[0.15em] uppercase mb-2 text-neutral-500">
                  Current Wait Time
                </div>
                <div className="font-mono text-[4rem] font-bold text-black tabular-nums tracking-tight leading-none">
                  ~{queueStatus.waitTime}
                  <span className="text-[2.5rem] text-neutral-400 font-medium ml-2">min</span>
                </div>
              </div>

              {/* Patients Ahead */}
              <div className="flex items-center justify-center gap-2 text-neutral-600 border-t border-neutral-300 pt-4">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="font-sans text-base font-medium">
                  {queueStatus.queueLength} patients ahead
                </span>
              </div>
            </div>
          )}

          {/* Check In Button */}
          <div className="flex justify-center pt-3">
            <Button
              onClick={handleCheckIn}
              className="font-display bg-black hover:bg-neutral-800 text-white h-14 px-14 text-lg font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02]"
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
