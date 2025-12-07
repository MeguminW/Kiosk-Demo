import { NextRequest, NextResponse } from 'next/server'
import { checkInSchema } from '@/lib/validations'
import { PATIENT_WEB_URL, SMS_TEMPLATES } from '@/lib/constants'

// Force dynamic rendering for API route
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

/**
 * POST /api/check-in
 * Process patient check-in and send SMS
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate input
    const validated = checkInSchema.safeParse(body)
    if (!validated.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: validated.error.errors },
        { status: 400 }
      )
    }

    const { fullName, phoneNumber } = validated.data

    // Mock queue assignment - standardized for demo
    // User becomes #5 in queue after 4 people already waiting
    const queueNumber = 5
    const patientsAhead = 4
    const estimatedWait = 45 // 45 minutes wait

    // Send SMS in background (don't await to avoid blocking response)
    const firstName = fullName.split(' ')[0]
    const trackingUrl = `${PATIENT_WEB_URL}?q=${queueNumber}`

    console.log('📱 Attempting to send SMS to:', phoneNumber)
    console.log('📍 Tracking URL:', trackingUrl)

    sendSMS(phoneNumber, firstName, trackingUrl).catch((err) => {
      console.error('❌ SMS failed:', err)
      // Log error but don't fail the check-in
    })

    return NextResponse.json({
      success: true,
      queueNumber,
      estimatedWait,
      patientsAhead,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Check-in error:', error)
    return NextResponse.json(
      { error: 'Check-in failed' },
      { status: 500 }
    )
  }
}

/**
 * Send SMS via Twilio API
 */
async function sendSMS(
  phoneNumber: string,
  firstName: string,
  trackingUrl: string
): Promise<void> {
  const accountSid = process.env.TWILIO_ACCOUNT_SID
  const authToken = process.env.TWILIO_AUTH_TOKEN
  const messagingServiceSid = process.env.TWILIO_MESSAGING_SERVICE_SID

  if (!accountSid || !authToken || !messagingServiceSid) {
    console.warn('⚠️ Twilio credentials not configured, skipping SMS')
    console.log('TWILIO_ACCOUNT_SID:', accountSid ? 'SET' : 'MISSING')
    console.log('TWILIO_AUTH_TOKEN:', authToken ? 'SET' : 'MISSING')
    console.log('TWILIO_MESSAGING_SERVICE_SID:', messagingServiceSid ? 'SET' : 'MISSING')
    return
  }

  const message = SMS_TEMPLATES.checkIn(firstName, trackingUrl)
  console.log('📧 SMS Message:', message)

  const response = await fetch(
    `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
    {
      method: 'POST',
      headers: {
        Authorization: `Basic ${Buffer.from(`${accountSid}:${authToken}`).toString('base64')}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        To: `+1${phoneNumber}`,
        MessagingServiceSid: messagingServiceSid,
        Body: message,
      }),
    }
  )

  if (!response.ok) {
    const error = await response.text()
    console.error('❌ Twilio API Response:', error)
    throw new Error(`Twilio API error: ${error}`)
  }

  console.log('✅ SMS sent successfully!')
  const result = await response.json()
  console.log('📱 Twilio Response:', result)
}
