import { NextRequest, NextResponse } from 'next/server'
import { checkInSchema } from '@/lib/validations'
import { PATIENT_WEB_URL, SMS_TEMPLATES } from '@/lib/constants'

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

    // Mock queue assignment (in production, this would interact with a database)
    const queueNumber = Math.floor(Math.random() * 20) + 1
    const patientsAhead = queueNumber - 1
    const estimatedWait = queueNumber * 10

    // Send SMS in background (don't await to avoid blocking response)
    const firstName = fullName.split(' ')[0]
    const trackingUrl = `${PATIENT_WEB_URL}?q=${queueNumber}`

    sendSMS(phoneNumber, firstName, trackingUrl).catch((err) => {
      console.error('SMS failed:', err)
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
    console.warn('Twilio credentials not configured, skipping SMS')
    return
  }

  const message = SMS_TEMPLATES.checkIn(firstName, trackingUrl)

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
    throw new Error(`Twilio API error: ${error}`)
  }
}
