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
      <div className="flex items-center justify-between px-8 py-6 border-b border-neutral-200">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={handleBack}
          className="text-xl h-12 px-4 hover:bg-neutral-100 -ml-4"
        >
          ← Back
        </Button>

        {/* Logo - Center */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <Logo variant="wordmark" />
        </div>

        {/* Spacer for alignment */}
        <div className="w-24"></div>
      </div>

      {/* Form Container - Centered */}
      <div className="flex-1 flex items-center justify-center px-8 py-12">
        <Card className="w-full max-w-2xl p-10 sm:p-12 shadow-xl rounded-3xl border border-neutral-200">
          <h2 className="text-3xl sm:text-4xl font-semibold mb-8 text-center">Enter Your Information</h2>
          <CheckInForm onSubmit={handleSubmit} />
        </Card>
      </div>
    </main>
  )
}
