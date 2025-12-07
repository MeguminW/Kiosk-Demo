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

      {/* Main Content - Calculated spacing */}
      <div className="px-10 pt-6 pb-4">
        <motion.div
          className="w-full max-w-xl mx-auto"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          {/* Form Card */}
          <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-8">
            {/* Title */}
            <div className="text-center mb-7">
              <h2 className="font-display text-[2rem] font-semibold text-black mb-1 tracking-tight">
                Enter Your Information
              </h2>
              <p className="font-sans text-base text-neutral-500 font-medium">
                We'll send you a tracking link via SMS
              </p>
            </div>

            {/* Form */}
            <div className="space-y-5">
              <CheckInForm onSubmit={handleSubmit} />
            </div>

            {/* Info Box */}
            <div className="mt-7 pt-5 border-t border-neutral-200">
              <div className="flex gap-2 text-neutral-600">
                <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="font-sans text-sm leading-relaxed">
                  You'll receive a text with a link to track your position and complete your intake form. Feel free to step out while you wait!
                </p>
              </div>
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
