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
      {/* Logo - stick to top */}
      <motion.div
        className="pt-10 pb-6 flex justify-center"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.4 }}
      >
        <Logo variant="combined" />
      </motion.div>

      {/* Main Content Area - no scroll */}
      <div className="flex-1 flex items-center justify-center px-8">
        <motion.div
          className="w-full max-w-4xl space-y-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >

          {/* Welcome Message */}
          <div className="text-center space-y-3">
            <h1 className="text-6xl font-bold tracking-tight text-black leading-tight">
              Welcome to<br />
              {CLINIC_INFO.name}
            </h1>
            <p className="text-2xl text-neutral-600 font-light">
              Check in to join the queue
            </p>
          </div>

          {/* Wait Time Display - Premium Design */}
          {!isLoading && (
            <div className="bg-neutral-50 rounded-[32px] p-10 space-y-8">
              {/* Status Badge */}
              <div className="flex items-center justify-center">
                <span className="inline-flex items-center gap-2 px-6 py-2.5 bg-white rounded-full text-neutral-700 font-medium text-lg shadow-sm">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <circle cx="10" cy="10" r="8" className="text-yellow-400" />
                  </svg>
                  Moderate Wait
                </span>
              </div>

              {/* Wait Time */}
              <div className="text-center space-y-2">
                <div className="text-neutral-500 text-xl font-medium tracking-wide uppercase">
                  Current Wait Time
                </div>
                <div className="text-8xl font-bold text-black tabular-nums tracking-tight">
                  ~{queueStatus.waitTime}<span className="text-6xl text-neutral-400 font-light ml-2">min</span>
                </div>
              </div>

              {/* Patients Ahead */}
              <div className="flex items-center justify-center gap-3 text-neutral-600">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="text-2xl font-medium">
                  {queueStatus.queueLength} patients ahead
                </span>
              </div>
            </div>
          )}

          {/* Check In Button - Premium */}
          <div className="flex justify-center pt-2">
            <Button
              onClick={handleCheckIn}
              className="bg-black hover:bg-neutral-800 text-white h-[72px] px-20 text-2xl font-medium rounded-[20px] shadow-xl hover:shadow-2xl transition-all duration-200 hover:scale-[1.02]"
            >
              Check In
            </Button>
          </div>

        </motion.div>
      </div>

      {/* Footer */}
      <div className="pb-6 text-center">
        <p className="text-neutral-500 text-base">
          Powered by Fountain Health Technologies Inc.
        </p>
      </div>
    </motion.main>
  )
}
