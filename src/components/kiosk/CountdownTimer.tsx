'use client'

import { useEffect, useState } from 'react'

interface CountdownTimerProps {
  seconds: number
  onComplete: () => void
  showProgress?: boolean
}

export function CountdownTimer({
  seconds: initialSeconds,
  onComplete,
  showProgress = true,
}: CountdownTimerProps) {
  const [seconds, setSeconds] = useState(initialSeconds)

  useEffect(() => {
    if (seconds <= 0) {
      onComplete()
      return
    }

    const timer = setInterval(() => {
      setSeconds((s) => s - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [seconds, onComplete])

  const progress = ((initialSeconds - seconds) / initialSeconds) * 100

  return (
    <div className="text-center">
      <p className="text-2xl text-neutral-500 mb-5">
        Returning to welcome in <span className="font-bold tabular-nums text-3xl">{seconds}s</span>
      </p>
      {showProgress && (
        <div className="w-80 mx-auto bg-neutral-200 rounded-full h-3 overflow-hidden shadow-inner">
          <div
            className="bg-black h-full transition-all duration-1000 ease-linear rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  )
}
