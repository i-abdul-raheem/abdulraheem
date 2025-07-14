'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Menu, X, Code } from 'lucide-react'

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      
      // Track active section
      const sections = ['home', 'about', 'skills', 'projects', 'contact']
      const scrollPosition = window.scrollY + 150 // Offset for header and better detection

      let currentSection = 'home'
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i])
        if (section && section.offsetTop <= scrollPosition) {
          currentSection = sections[i]
          break
        }
      }
      
      setActiveSection(currentSection)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial call
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Home', href: '#home', id: 'home' },
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Skills', href: '#skills', id: 'skills' },
    { name: 'Projects', href: '#projects', id: 'projects' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ]

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsOpen(false)
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-1 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-dark-900/95 backdrop-blur-md border-b border-white/10' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2"
          >
            <Code className="h-8 w-8 text-primary-500" />
            <span className="text-xl font-bold gradient-text">DevPortfolio</span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.button
                key={item.name}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection(item.href)}
                className={`transition-colors duration-300 font-medium ${
                  activeSection === item.id
                    ? 'text-primary-400 border-b-2 border-primary-400'
                    : 'text-gray-300 hover:text-primary-400'
                }`}
              >
                {item.name}
              </motion.button>
            ))}
            {/* <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="button-primary"
              onClick={() => scrollToSection('#contact')}
            >
              Get In Touch
            </motion.button> */}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-primary-400 transition-colors duration-300"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 bg-dark-800/95 backdrop-blur-md rounded-lg mt-2">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className={`block w-full text-left px-3 py-2 rounded-md transition-colors duration-300 ${
                    activeSection === item.id
                      ? 'text-primary-400 bg-primary-500/20 border-l-4 border-primary-400'
                      : 'text-gray-300 hover:text-primary-400 hover:bg-white/5'
                  }`}
                >
                  {item.name}
                </button>
              ))}
              {/* <button
                onClick={() => scrollToSection('#contact')}
                className="block w-full text-left px-3 py-2 button-primary mt-2"
              >
                Get In Touch
              </button> */}
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  )
}

export default Navigation 