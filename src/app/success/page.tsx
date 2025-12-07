'use client'

import { Suspense, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { SuccessAnimation } from '@/components/kiosk/SuccessAnimation'
import { CountdownTimer } from '@/components/kiosk/CountdownTimer'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { formatPhone } from '@/lib/utils'

function SuccessContent() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const queueNumber = searchParams.get('queueNumber') || '0'
  const estimatedWait = searchParams.get('wait') || '0'
  const patientsAhead = searchParams.get('ahead') || '0'
  const phoneNumber = searchParams.get('phone') || ''

  // Redirect to home if no queue number
  useEffect(() => {
    if (!searchParams.get('queueNumber')) {
      router.replace('/')
    }
  }, [searchParams, router])

  const handleReturnToWelcome = () => {
    router.replace('/')
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white px-8 py-12">
      {/* Success Animation */}
      <div className="mb-8">
        <SuccessAnimation />
      </div>

      {/* Headline */}
      <h1 className="text-4xl sm:text-5xl font-semibold mb-10 tracking-tight text-center">You're Checked In!</h1>

      {/* Queue Info Card */}
      <Card className="p-8 sm:p-10 mb-8 max-w-2xl w-full shadow-xl rounded-3xl border border-neutral-200">
        {/* Queue Number - Prominent */}
        <div className="text-center mb-6">
          <p className="text-xl text-neutral-500 mb-2">Your Queue Number</p>
          <p className="text-7xl sm:text-8xl font-bold tabular-nums tracking-tight">#{queueNumber}</p>
        </div>

        {/* Wait Info */}
        <div className="flex justify-around items-center border-t border-neutral-200 pt-6 gap-8">
          <div className="text-center flex-1">
            <p className="text-lg text-neutral-500 mb-1">Estimated Wait</p>
            <p className="text-3xl sm:text-4xl font-semibold">~{estimatedWait} min</p>
          </div>
          <div className="w-px h-12 bg-neutral-200" />
          <div className="text-center flex-1">
            <p className="text-lg text-neutral-500 mb-1">Patients Ahead</p>
            <p className="text-3xl sm:text-4xl font-semibold">{patientsAhead}</p>
          </div>
        </div>
      </Card>

      {/* SMS Confirmation */}
      <div className="bg-neutral-50 rounded-2xl p-6 sm:p-8 mb-8 max-w-2xl w-full border border-neutral-200">
        <p className="text-lg sm:text-xl text-center">
          ✓ Tracking link sent to{' '}
          <span className="font-semibold">{formatPhone(phoneNumber)}</span>
        </p>
        <p className="text-base sm:text-lg text-neutral-500 text-center mt-2">
          Feel free to step out. We'll notify you when it's almost your turn.
        </p>
      </div>

      {/* Countdown Timer */}
      <div className="mb-8">
        <CountdownTimer
          seconds={20}
          onComplete={handleReturnToWelcome}
          showProgress={true}
        />
      </div>

      {/* Done Button */}
      <Button
        size="lg"
        onClick={handleReturnToWelcome}
        className="h-16 sm:h-20 px-16 sm:px-20 text-xl sm:text-2xl font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all"
      >
        Done
      </Button>
    </main>
  )
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="animate-pulse">Loading...</div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  )
}
