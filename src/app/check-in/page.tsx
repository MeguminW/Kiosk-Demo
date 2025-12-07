'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Logo } from '@/components/shared/Logo'
import { CheckInForm } from '@/components/kiosk/CheckInForm'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { type CheckInFormData } from '@/lib/validations'

export default function CheckInPage() {
  const router = useRouter()

  const handleBack = () => {
    router.push('/')
  }

  const handleSubmit = async (data: CheckInFormData) => {
    try {
      const response = await fetch('/api/check-in', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Check-in failed')
      }

      const result = await response.json()

      // Navigate to success page with queue data
      router.push(
        `/success?queueNumber=${result.queueNumber}&wait=${result.estimatedWait}&ahead=${result.patientsAhead}&phone=${data.phoneNumber}`
      )
    } catch (error) {
      console.error('Check-in error:', error)
      alert('Check-in failed. Please try again or see the front desk.')
    }
  }

  return (
    <motion.main
      className="h-screen bg-white flex flex-col overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      {/* Back Button - Absolute top-left */}
      <motion.div
        className="absolute top-6 left-6 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.4 }}
      >
        <Button
          variant="ghost"
          onClick={handleBack}
          className="text-base h-9 px-2 hover:bg-neutral-100 font-medium text-neutral-700"
        >
          ← Back
        </Button>
      </motion.div>

      {/* Logo - Top center */}
      <motion.div
        className="pt-6 pb-3 flex justify-center"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.4 }}
      >
        <Logo variant="combined" />
      </motion.div>

      {/* Main Content - Tab 3 inspired design */}
      <div className="flex-1 flex flex-col justify-center px-8 pb-12">
        <motion.div
          className="w-full max-w-2xl mx-auto"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          {/* Title - Tab 3 sizing */}
          <h1 className="text-4xl sm:text-5xl font-semibold mb-10 tracking-tight text-center">
            Enter Your Information
          </h1>
          <p className="text-lg sm:text-xl text-center text-neutral-500 mb-8">
            We'll send you a tracking link via SMS
          </p>

          {/* Form Card - Tab 3 style */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 mb-8 shadow-xl border border-neutral-200">
            {/* Form */}
            <div className="mb-8">
              <CheckInForm onSubmit={handleSubmit} />
            </div>

            {/* Info Box - Tab 3 style */}
            <div className="bg-neutral-50 rounded-2xl p-6 sm:p-8 border border-neutral-200">
              <p className="text-lg sm:text-xl text-center">
                ✓ You'll receive a text with a link to track your position and complete your intake form
              </p>
              <p className="text-base sm:text-lg text-neutral-500 text-center mt-2">
                Feel free to step out while you wait!
              </p>
            </div>
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
