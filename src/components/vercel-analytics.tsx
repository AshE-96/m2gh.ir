'use client'

import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/next"

export default function VercelAnalytics() {
  return (
    <>
      <SpeedInsights 
        sampleRate={1}
        framework="nextjs"
      />
      <Analytics />
    </>
  )
}

