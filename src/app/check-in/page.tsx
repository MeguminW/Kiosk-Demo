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
      {/* Header Area */}
      <div className="relative flex items-center px-10 py-6 border-b border-neutral-200">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={handleBack}
          className="text-xl h-11 px-3 hover:bg-neutral-100"
        >
          ← Back
        </Button>

        {/* Logo - Absolutely centered */}
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Logo variant="wordmark" />
        </div>
      </div>

      {/* Form Container - Redesigned like Tab 3 */}
      <div className="flex-1 flex items-center justify-center px-10 py-12">
        <div className="w-full max-w-2xl">
          <Card className="p-12 shadow-xl rounded-3xl border border-neutral-200">
            <h2 className="text-4xl font-semibold mb-2 text-center">Enter Your Information</h2>
            <p className="text-lg text-neutral-500 text-center mb-10">
              We'll send you a tracking link via SMS
            </p>

            <CheckInForm onSubmit={handleSubmit} />

            {/* Info text at bottom */}
            <div className="mt-8 pt-6 border-t border-neutral-200">
              <p className="text-base text-neutral-500 text-center">
                💬 You'll receive a text message with a link to track your queue position in real-time. Feel free to step out while you wait!
              </p>
            </div>
          </Card>
        </div>
      </div>
    </main>
  )
}
