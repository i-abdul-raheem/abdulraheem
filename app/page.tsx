'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Projects from '@/components/Projects'
import Skills from '@/components/Skills'
import Contact from '@/components/Contact'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import ViewTracker from '@/components/ViewTracker'
import ScrollProgressBar from '@/components/ScrollProgressBar'

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 10-0)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-primary-400 font-mono">Loading Portfolio...</p>
        </motion.div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-dark-900">
      <ScrollProgressBar />
      <ViewTracker page="home" />
      <Navigation />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
        <Footer />
      </motion.div>
    </main>
  )
} 