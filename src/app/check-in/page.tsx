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
      {/* Header with Logo and Back */}
      <motion.div
        className="pt-10 pb-6 px-10"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.4 }}
      >
        <div className="flex items-center justify-center relative">
          {/* Back Button - absolute left */}
          <Button
            variant="ghost"
            onClick={handleBack}
            className="absolute left-0 text-xl h-12 px-4 hover:bg-neutral-100 font-medium"
          >
            ← Back
          </Button>

          {/* Logo - perfectly centered */}
          <Logo variant="combined" />
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-8">
        <motion.div
          className="w-full max-w-3xl"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >

          {/* Form Card - Premium Design */}
          <div className="bg-white rounded-[32px] border-2 border-neutral-100 p-14 shadow-2xl">

            {/* Title Section */}
            <div className="text-center space-y-3 mb-12">
              <h2 className="text-5xl font-bold text-black tracking-tight">
                Enter Your Information
              </h2>
              <p className="text-xl text-neutral-500 font-light">
                We'll send you a tracking link via SMS
              </p>
            </div>

            {/* Form */}
            <div className="space-y-8">
              <CheckInForm onSubmit={handleSubmit} />
            </div>

            {/* Info Section */}
            <div className="mt-12 pt-10 border-t-2 border-neutral-100">
              <div className="bg-neutral-50 rounded-2xl p-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <svg className="w-6 h-6 text-neutral-600 mt-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <p className="text-lg text-neutral-700 leading-relaxed">
                    You'll receive a text message with a link to track your queue position in real-time. Feel free to step out while you wait!
                  </p>
                </div>
              </div>
            </div>

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
