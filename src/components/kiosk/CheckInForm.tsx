'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { checkInSchema, type CheckInFormData } from '@/lib/validations'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2 } from 'lucide-react'
import { formatPhone } from '@/lib/utils'

interface CheckInFormProps {
  onSubmit: (data: CheckInFormData) => Promise<void>
}

export function CheckInForm({ onSubmit }: CheckInFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<CheckInFormData>({
    resolver: zodResolver(checkInSchema),
    defaultValues: {
      fullName: '',
      phoneNumber: '',
    },
  })

  // Watch phone number for formatting
  const phoneNumber = watch('phoneNumber')

  // Auto-format phone number as user types
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const digits = value.replace(/\D/g, '').slice(0, 10)

    // Format display
    let formatted = digits
    if (digits.length > 6) {
      formatted = `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
    } else if (digits.length > 3) {
      formatted = `(${digits.slice(0, 3)}) ${digits.slice(3)}`
    } else if (digits.length > 0) {
      formatted = `(${digits}`
    }

    setValue('phoneNumber', digits) // Store clean digits
    e.target.value = formatted // Display formatted
  }

  const handleFormSubmit = async (data: CheckInFormData) => {
    setIsSubmitting(true)
    try {
      await onSubmit(data)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-5">
      {/* Full Name */}
      <div className="space-y-2">
        <Label htmlFor="fullName" className="font-sans text-base font-semibold text-neutral-700">
          Full Name *
        </Label>
        <Input
          id="fullName"
          {...register('fullName')}
          placeholder="Alex Gordon"
          disabled={isSubmitting}
          aria-invalid={errors.fullName ? 'true' : 'false'}
          className="font-sans h-12 text-base px-4 rounded-lg border-neutral-300 focus:border-black focus:ring-0 bg-white"
        />
        {errors.fullName && (
          <p className="font-sans text-xs text-red-600 mt-1" role="alert">
            {errors.fullName.message}
          </p>
        )}
      </div>

      {/* Phone Number */}
      <div className="space-y-2">
        <Label htmlFor="phoneNumber" className="font-sans text-base font-semibold text-neutral-700">
          Phone Number *
        </Label>
        <Input
          id="phoneNumber"
          type="tel"
          {...register('phoneNumber')}
          onChange={handlePhoneChange}
          placeholder="(519) 555-0123"
          disabled={isSubmitting}
          aria-invalid={errors.phoneNumber ? 'true' : 'false'}
          className="font-mono h-12 text-base px-4 rounded-lg border-neutral-300 focus:border-black focus:ring-0 bg-white tracking-wide"
        />
        {errors.phoneNumber && (
          <p className="font-sans text-xs text-red-600 mt-1" role="alert">
            {errors.phoneNumber.message}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        className="font-display w-full h-12 text-base font-semibold rounded-lg bg-black hover:bg-neutral-800 text-white mt-6 shadow-sm hover:shadow-md transition-all hover:scale-[1.01]"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Joining Queue...
          </>
        ) : (
          'Join Queue'
        )}
      </Button>
    </form>
  )
}
