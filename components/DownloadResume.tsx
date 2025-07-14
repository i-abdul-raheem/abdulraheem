'use client'

import { useState, useEffect } from 'react'
import { Download, FileText, Eye } from 'lucide-react'
import { motion } from 'framer-motion'

interface ResumeInfo {
  id: string;
  originalName: string;
  size: number;
  uploadDate: string;
}

const DownloadResume = () => {
  const [resumeInfo, setResumeInfo] = useState<ResumeInfo | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchResumeInfo()
  }, [])

  const fetchResumeInfo = async () => {
    try {
      const response = await fetch('https://abdulraheem-api.vercel.app/api/resume/info')
      const data = await response.json()
      
      if (data.success && data.data) {
        setResumeInfo(data.data)
      }
    } catch (error) {
      console.error('Error fetching resume info:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = () => {
    if (resumeInfo) {
      window.open(`https://abdulraheem-api.vercel.app/api/resume/download/${resumeInfo.id}`, '_blank')
    }
  }

  const handlePreview = () => {
    if (resumeInfo) {
      window.open(`https://abdulraheem-api.vercel.app/api/resume/download/${resumeInfo.id}`, '_blank')
    }
  }

  // Don't render anything if no resume is available
  if (loading || !resumeInfo) {
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex justify-center gap-4 mb-8"
    >
      <button
        onClick={handleDownload}
        className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
      >
        <FileText className="w-5 h-5 mr-2" />
        <span className="font-medium">Download Resume</span>
        <Download className="w-4 h-4 ml-2" />
      </button>
      
      <button
        onClick={handlePreview}
        className="inline-flex items-center px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
      >
        <Eye className="w-5 h-5 mr-2" />
        <span className="font-medium">Preview Resume</span>
      </button>
    </motion.div>
  )
}

export default DownloadResume 