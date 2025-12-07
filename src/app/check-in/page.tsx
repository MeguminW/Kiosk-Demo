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
    <main className="relative flex min-h-screen flex-col bg-white">
      {/* Header with Logo */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-10">
        <Logo variant="wordmark" />
      </div>

      {/* Back Button */}
      <div className="absolute top-8 left-12 z-10">
        <Button
          variant="ghost"
          onClick={handleBack}
          className="text-2xl h-14 px-6 hover:bg-neutral-100"
        >
          ← Back
        </Button>
      </div>

      {/* Form Container - Centered */}
      <div className="flex-1 flex items-center justify-center px-12 py-24">
        <Card className="w-full max-w-3xl p-12 shadow-xl rounded-3xl border-2">
          <h2 className="text-4xl font-semibold mb-10 text-center">Enter Your Information</h2>
          <CheckInForm onSubmit={handleSubmit} />
        </Card>
      </div>
    </main>
  )
}
