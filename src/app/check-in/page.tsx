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
      {/* Header - Logo stick to top */}
      <motion.div
        className="pt-8 pb-4"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.4 }}
      >
        {/* Back Button - Top left corner */}
        <div className="absolute top-8 left-8">
          <Button
            variant="ghost"
            onClick={handleBack}
            className="text-lg h-10 px-3 hover:bg-neutral-100 font-medium text-neutral-700"
          >
            ← Back
          </Button>
        </div>

        {/* Logo - Centered */}
        <div className="flex justify-center">
          <Logo variant="combined" />
        </div>
      </motion.div>

      {/* Main Content - Form centered with proper spacing */}
      <div className="flex-1 flex flex-col justify-center px-10 -mt-8">
        <motion.div
          className="w-full max-w-xl mx-auto"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          {/* Form Card - Clean and minimal */}
          <div className="bg-white rounded-3xl border border-neutral-200 shadow-lg p-10">
            {/* Title */}
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-black mb-2">
                Enter Your Information
              </h2>
              <p className="text-lg text-neutral-500">
                We'll send you a tracking link via SMS
              </p>
            </div>

            {/* Form */}
            <div className="space-y-6">
              <CheckInForm onSubmit={handleSubmit} />
            </div>

            {/* Info Box */}
            <div className="mt-8 pt-6 border-t border-neutral-200">
              <div className="flex gap-3 text-neutral-600">
                <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <p className="text-base leading-relaxed">
                  You'll receive a text with a link to track your queue position in real-time. Feel free to step out while you wait!
                </p>
              </div>
            </div>
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
