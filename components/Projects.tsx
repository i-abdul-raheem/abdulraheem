'use client'

import { motion } from 'framer-motion'
import { Github, ExternalLink, Calendar, Code, Database, Globe, Smartphone, Cloud } from 'lucide-react'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { getEndpointUrl } from '@/lib/config'

interface Project {
  _id: string;
  title: string;
  description: string;
  technologies: string[];
  github?: string;
  live?: string;
  image?: string;
  featured: boolean;
  order: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}

interface ProjectsSettings {
  projectsTitle: string
  projectsSubtitle: string
  viewAllButtonText: string
  viewAllButtonUrl: string
  showViewAllButton: boolean
  maxFeaturedProjects: number
}

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [settings, setSettings] = useState<ProjectsSettings>({
    projectsTitle: 'Featured Projects',
    projectsSubtitle: 'A showcase of my recent work, demonstrating my skills in full-stack development and problem-solving.',
    viewAllButtonText: 'View All Projects',
    viewAllButtonUrl: '/projects',
    showViewAllButton: true,
    maxFeaturedProjects: 6
  })

  useEffect(() => {
    fetchProjects();
    fetchProjectsSettings();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch(getEndpointUrl('projects'));
      if (response.ok) {
        const data = await response.json();
        console.log('API Response:', data); // Debug log
        // Filter only active projects and sort by order
        const activeProjects = data.data
          .filter((project: Project) => project.status === 'active')
          .sort((a: Project, b: Project) => a.order - b.order);
        console.log('Filtered Projects:', activeProjects); // Debug log
        // Log image URLs for debugging
        activeProjects.forEach((project: Project, index: number) => {
          console.log(`Project ${index + 1} image:`, project.image);
        });
        setProjects(activeProjects);
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProjectsSettings = async () => {
    try {
      const response = await fetch(getEndpointUrl('projects/settings'));
      if (response.ok) {
        const data = await response.json();
        setSettings(data.data || settings);
      }
    } catch (error) {
      console.error('Error fetching projects settings:', error);
    }
  };

  const handleViewAllProjects = () => {
    if (settings.viewAllButtonUrl.startsWith('http')) {
      window.open(settings.viewAllButtonUrl, '_blank')
    } else {
      // For internal routes, you might want to implement a modal or navigate to a projects page
      window.open(`${window.location.origin}${settings.viewAllButtonUrl}`, '_blank')
    }
  }

  return (
    <section id="projects" className="py-20 bg-dark-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {settings.projectsTitle.split(' ').map((word, index) => 
              word.toLowerCase() === 'projects' ? (
                <span key={index} className="gradient-text">{word} </span>
              ) : (
                <span key={index}>{word} </span>
              )
            )}
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            {settings.projectsSubtitle}
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
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-effect rounded-xl overflow-hidden card-hover group"
              >
                {/* Project Image */}
                <div className="relative h-48 overflow-hidden">
                  {project.image ? (
                    <Image 
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                      onError={() => {
                        console.log('Image failed to load:', project.image); // Debug log
                      }}
                      unoptimized={project.image?.includes('abdulraheem-api.vercel.app')}
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                      <span className="text-gray-400 text-sm">No Image</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
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
                    {project.technologies.slice(0, 3).map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 py-1 text-xs bg-primary-500/20 text-primary-400 rounded-full border border-primary-500/30"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2 py-1 text-xs bg-gray-500/20 text-gray-400 rounded-full">
                        +{project.technologies.length - 3} more
                      </span>
                    )}
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
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 bg-primary-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Cloud className="w-12 h-12 text-primary-400" />
            </div>
            <h3 className="text-2xl font-semibold text-white mb-4">No Projects Available</h3>
            <p className="text-gray-400 max-w-md mx-auto">
              Projects will be displayed here once they are added to the portfolio.
            </p>
          </motion.div>
        )}

        {/* View More Button */}
        {settings.showViewAllButton && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleViewAllProjects}
              className="button-secondary"
            >
              {settings.viewAllButtonText}
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  )
}

export default Projects 