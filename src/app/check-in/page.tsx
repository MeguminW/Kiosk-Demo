'use client'

import { useRouter } from 'next/navigation'
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
    <main className="flex min-h-screen flex-col bg-white">
      {/* Logo stick to top + Back button */}
      <div className="flex items-start justify-between pt-10 px-10">
        <Button
          variant="ghost"
          onClick={handleBack}
          className="text-xl h-12 px-4 hover:bg-neutral-100 -ml-4"
        >
          ← Back
        </Button>
        <div className="flex-1 flex justify-center -ml-20">
          <Logo variant="combined" />
        </div>
        <div className="w-20"></div>
      </div>

      {/* Main Content - centered, clean */}
      <div className="flex-1 flex flex-col items-center justify-center px-12">
        <div className="w-full max-w-3xl">
          <Card className="p-12 shadow-xl rounded-3xl border border-neutral-200">
            {/* Title */}
            <h2 className="text-4xl font-semibold text-center mb-3">
              Enter Your Information
            </h2>
            <p className="text-xl text-neutral-500 text-center mb-10">
              We'll send you a tracking link via SMS
            </p>

            {/* Form */}
            <CheckInForm onSubmit={handleSubmit} />

            {/* Info */}
            <div className="mt-10 pt-8 border-t border-neutral-200">
              <div className="flex items-start gap-3">
                <span className="text-2xl">💬</span>
                <p className="text-lg text-neutral-600 leading-relaxed">
                  You'll receive a text message with a link to track your queue position in real-time. Feel free to step out while you wait!
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </main>
  )
}
