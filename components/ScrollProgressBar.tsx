'use client'

import { useState, useEffect } from 'react'

export default function ScrollProgressBar() {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = (scrollTop / docHeight) * 100
      setScrollProgress(scrollPercent)
    }

    // Add scroll event listener
    window.addEventListener('scroll', updateScrollProgress)
    
    // Initial calculation
    updateScrollProgress()

    // Cleanup
    return () => window.removeEventListener('scroll', updateScrollProgress)
  }, [])

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-gray-800 z-[9999]">
      <div 
        className="h-full bg-gradient-to-r from-primary-500 to-primary-600 transition-all duration-150 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  )
} 