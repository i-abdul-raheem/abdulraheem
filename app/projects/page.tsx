'use client'

import { motion } from 'framer-motion'
import { ExternalLink, Github, Eye, ArrowLeft } from 'lucide-react'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import ViewTracker from '@/components/ViewTracker'
import ScrollProgressBar from '@/components/ScrollProgressBar'
import { getEndpointUrl } from '@/lib/config'

interface Project {
  _id: string
  title: string
  description: string
  technologies: string[]
  github?: string
  live?: string
  image?: string
  featured: boolean
  createdAt: string
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAllProjects()
  }, [])

  const fetchAllProjects = async () => {
    try {
      const response = await fetch(getEndpointUrl('projects'))
      if (response.ok) {
        const data = await response.json()
        setProjects(data.data || [])
      }
    } catch (error) {
      console.error('Error fetching projects:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-dark-900">
      <ScrollProgressBar />
      <ViewTracker page="projects" />
      {/* Header */}
      <header className="bg-dark-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link 
                href="/"
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Portfolio
              </Link>
            </div>
            <h1 className="text-xl font-semibold text-white">All Projects</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            All <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A comprehensive collection of my work, showcasing various technologies and problem-solving approaches.
          </p>
        </motion.div>

        {loading ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
            <p className="text-gray-400">Loading projects...</p>
          </div>
        ) : projects.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project._id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="glass-effect rounded-xl overflow-hidden card-hover group"
              >
                {/* Project Image */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={project.image?.startsWith('http') ? project.image : `${getEndpointUrl('images').replace('/api', '')}${project.image}`}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    onError={(e) => {
                      e.currentTarget.src = 'https://www.dummyimage.com/400x250/1e293b/64748b?text=Project+Image';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  {project.featured && (
                    <div className="absolute top-4 right-4 bg-primary-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                      Featured
                    </div>
                  )}
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-primary-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 py-1 text-xs bg-primary-500/20 text-primary-400 rounded-full border border-primary-500/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Project Links */}
                  <div className="flex gap-3">
                    {project.github && (
                      <motion.a
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-3 py-2 text-sm bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg transition-colors"
                      >
                        <Github className="w-4 h-4" />
                        Code
                      </motion.a>
                    )}
                    {project.live && (
                      <motion.a
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-3 py-2 text-sm bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Live Demo
                      </motion.a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 bg-primary-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Eye className="w-12 h-12 text-primary-400" />
            </div>
            <h3 className="text-2xl font-semibold text-white mb-4">No Projects Available</h3>
            <p className="text-gray-400 max-w-md mx-auto">
              Projects will be displayed here once they are added to the portfolio.
            </p>
          </motion.div>
        )}
      </main>
    </div>
  )
} 