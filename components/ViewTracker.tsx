'use client'

import { useEffect } from 'react'
import { getEndpointUrl } from '@/lib/config'

interface ViewTrackerProps {
  page?: string
}

export default function ViewTracker({ page = 'home' }: ViewTrackerProps) {
  useEffect(() => {
    const trackView = async () => {
      try {
        // Generate a simple session ID
        const sessionId = localStorage.getItem('sessionId') || 
          Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
        
        localStorage.setItem('sessionId', sessionId)

        await fetch(getEndpointUrl('analytics', 'trackView'), {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            page,
            sessionId
          })
        })
      } catch (error) {
        // Silently fail - don't affect user experience
        console.log('View tracking failed:', error)
      }
    }

    trackView()
  }, [page])

  return null // This component doesn't render anything
} 