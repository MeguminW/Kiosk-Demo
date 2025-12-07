# Fountain Kiosk Tablet

Self-service check-in kiosk for walk-in clinics. Built with Next.js, TypeScript, Tailwind CSS, and shadcn/ui.

## Features

- **Welcome Screen** - Displays current wait time and queue length
- **Check-In Form** - Collects patient name and phone number with validation
- **Success Confirmation** - Shows queue number, estimated wait, and sends SMS tracking link
- **Auto-Return** - 10-second countdown returns to welcome screen
- **PWA Ready** - Full-screen mode for iPad kiosk deployment
- **Twilio SMS Integration** - Automatic tracking link sent to patients

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Twilio account (for SMS functionality)

### Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Update .env.local with your Twilio credentials:
# - TWILIO_ACCOUNT_SID
# - TWILIO_AUTH_TOKEN
# - TWILIO_MESSAGING_SERVICE_SID
# - NEXT_PUBLIC_PATIENT_WEB_URL
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
npm run start
```

### Deploy to Netlify

1. Push code to Git repository
2. Connect repository to Netlify
3. Add environment variables in Netlify dashboard
4. Deploy!

## User Flow

1. **Welcome Page** (`/`)
   - View current wait time
   - Tap "Check In" to begin

2. **Check-In Form** (`/check-in`)
   - Enter full name (validated)
   - Enter phone number (auto-formatted, validated)
   - Submit to join queue

3. **Success Page** (`/success`)
   - See queue number (large display)
   - View estimated wait time
   - SMS confirmation message
   - Auto-return after 10 seconds or tap "Done"

## Design System

Follows Fountain Design System specifications:
- **Colors**: Black/White primary, semantic colors for status
- **Typography**: Inter font, 1.5x scaling for kiosk readability
- **Spacing**: 8px grid system
- **Components**: shadcn/ui for accessibility and consistency

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Form Validation**: react-hook-form + Zod
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **SMS**: Twilio API

## Project Structure

```
src/
├── app/                    # Next.js pages
│   ├── api/               # API routes
│   ├── check-in/          # Check-in form page
│   ├── success/           # Success confirmation page
│   └── page.tsx           # Welcome page
├── components/
│   ├── ui/                # shadcn/ui components
│   ├── kiosk/             # Kiosk-specific components
│   └── shared/            # Shared components
├── lib/                   # Utilities and helpers
├── types/                 # TypeScript types
└── hooks/                 # Custom React hooks
```

## API Routes

- `GET /api/queue/status` - Fetch current queue status
- `POST /api/check-in` - Submit check-in and trigger SMS

## Environment Variables

Required for production:

```
TWILIO_ACCOUNT_SID=...
TWILIO_AUTH_TOKEN=...
TWILIO_MESSAGING_SERVICE_SID=...
NEXT_PUBLIC_PATIENT_WEB_URL=https://your-patient-web-url.com
```

## iPad Setup (Kiosk Mode)

1. Add to Home Screen from Safari
2. Enable Guided Access (Settings → Accessibility → Guided Access)
3. Lock to Fountain Kiosk app
4. Disable home button during active sessions

## License

Proprietary - Fountain Health Technologies Inc.
