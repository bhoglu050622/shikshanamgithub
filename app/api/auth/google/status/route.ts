import { NextResponse } from 'next/server'

export async function GET() {
  const clientIdConfigured = !!process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
  const clientSecretConfigured = !!process.env.GOOGLE_CLIENT_SECRET

  return NextResponse.json({
    clientId: clientIdConfigured,
    clientSecret: clientSecretConfigured,
    appUrl: !!process.env.NEXT_PUBLIC_APP_URL
  })
}