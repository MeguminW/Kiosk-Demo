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
    <main className="flex min-h-screen flex-col items-center justify-center bg-white px-12 py-16">
      {/* Success Animation */}
      <div className="mb-10">
        <SuccessAnimation />
      </div>

      {/* Headline */}
      <h1 className="text-6xl font-semibold mb-12 tracking-tight">You're Checked In!</h1>

      {/* Queue Info Card */}
      <Card className="p-12 mb-10 max-w-3xl w-full shadow-xl rounded-3xl border-2">
        {/* Queue Number - Prominent */}
        <div className="text-center mb-8">
          <p className="text-2xl text-neutral-500 mb-3">Your Queue Number</p>
          <p className="text-9xl font-bold tabular-nums tracking-tight">#{queueNumber}</p>
        </div>

        {/* Wait Info */}
        <div className="flex justify-around items-center border-t-2 border-neutral-200 pt-8 gap-12">
          <div className="text-center flex-1">
            <p className="text-xl text-neutral-500 mb-2">Estimated Wait</p>
            <p className="text-5xl font-semibold">~{estimatedWait} min</p>
          </div>
          <div className="w-px h-16 bg-neutral-200" />
          <div className="text-center flex-1">
            <p className="text-xl text-neutral-500 mb-2">Patients Ahead</p>
            <p className="text-5xl font-semibold">{patientsAhead}</p>
          </div>
        </div>
      </Card>

      {/* SMS Confirmation */}
      <div className="bg-neutral-100 rounded-2xl p-8 mb-10 max-w-3xl w-full">
        <p className="text-2xl text-center font-medium">
          ✓ Tracking link sent to{' '}
          <span className="font-semibold">{formatPhone(phoneNumber)}</span>
        </p>
        <p className="text-xl text-neutral-500 text-center mt-3">
          Feel free to step out. We'll notify you when it's almost your turn.
        </p>
      </div>

      {/* Countdown Timer */}
      <div className="mb-10">
        <CountdownTimer
          seconds={10}
          onComplete={handleReturnToWelcome}
          showProgress={true}
        />
      </div>

      {/* Done Button */}
      <Button
        size="lg"
        onClick={handleReturnToWelcome}
        className="h-20 px-16 text-2xl font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all"
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
