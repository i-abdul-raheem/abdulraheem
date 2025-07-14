'use client'

import { motion } from 'framer-motion'
import { ArrowDown, Github, Linkedin, Mail, Download, Twitter, Globe } from 'lucide-react'
import { useState, useEffect } from 'react'
import { getEndpointUrl } from '@/lib/config'

interface AboutData {
  name: string;
  title: string;
  subtitle: string;
  description: string;
  github: string;
  linkedin: string;
  twitter: string;
  website: string;
  technologyTags: string[];
}

interface ResumeInfo {
  id: string;
  originalName: string;
  size: number;
  uploadDate: string;
}

const Hero = () => {
  const [aboutData, setAboutData] = useState<AboutData>({
    name: 'Your Name',
    title: 'Full-Stack Developer',
    subtitle: 'Passionate about creating innovative web applications',
    description: 'A dedicated developer with expertise in modern web technologies.',
    github: '',
    linkedin: '',
    twitter: '',
    website: '',
    technologyTags: []
  });
  const [resumeInfo, setResumeInfo] = useState<ResumeInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAboutData();
    fetchResumeInfo();
  }, []);

  const fetchAboutData = async () => {
    try {
      const response = await fetch(getEndpointUrl('about'));
      if (response.ok) {
        const data = await response.json();
        setAboutData(data.data);
      }
    } catch (error) {
      console.error('Error fetching about data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchResumeInfo = async () => {
    try {
      const response = await fetch(getEndpointUrl('resume', 'info'));
      const data = await response.json();
      
      console.log('Resume info response:', data); // Debug log
      
      if (data.success && data.data) {
        setResumeInfo(data.data);
        console.log('Resume available:', data.data.originalName); // Debug log
      } else {
        console.log('No active resume available'); // Debug log
        setResumeInfo(null);
      }
    } catch (error) {
      console.error('Error fetching resume info:', error);
      setResumeInfo(null);
    }
  };

  const handleDownloadResume = () => {
    if (resumeInfo) {
      window.open(`${getEndpointUrl('resume', 'download')}/${resumeInfo.id}`, '_blank');
    }
  };

  const scrollToAbout = () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })
  }

  if (loading) {
    return (
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900"></div>
        <div className="relative z-10 text-center">
          <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>
      
      {/* Floating Elements - Hidden on mobile, visible on larger screens */}
      <motion.div
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 5, 0]
        }}
        transition={{ 
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-20 left-20 w-32 h-32 bg-primary-500/10 rounded-full blur-xl hidden md:block"
      ></motion.div>
      
      <motion.div
        animate={{ 
          y: [0, 20, 0],
          rotate: [0, -5, 0]
        }}
        transition={{ 
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-20 right-20 w-40 h-40 bg-primary-600/10 rounded-full blur-xl hidden md:block"
      ></motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-4 sm:space-y-6 md:space-y-8"
        >
          {/* Greeting */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-primary-400 font-mono text-sm sm:text-base md:text-lg"
          >
            Hello, I'm
          </motion.p>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight"
          >
            <span className="gradient-text">{aboutData.name}</span>
          </motion.h1>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-primary-400 font-semibold"
          >
            {aboutData.title}
          </motion.h2>

          {/* Subtitle */}
          {aboutData.subtitle && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-4"
            >
              {aboutData.subtitle}
            </motion.p>
          )}

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-sm sm:text-base md:text-lg text-gray-400 max-w-4xl mx-auto leading-relaxed px-4"
          >
            {aboutData.description}
          </motion.p>

          {/* Tech Stack Preview */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 text-xs sm:text-sm text-gray-400 px-4"
          >
            {aboutData.technologyTags && aboutData.technologyTags.length > 0 ? (
              aboutData.technologyTags.map((tech, index) => (
                <span key={index} className="px-2 sm:px-3 py-1 bg-white/5 rounded-full border border-white/10">
                  {tech}
                </span>
              ))
            ) : (
              <>
                
              </>
            )}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="button-primary flex items-center gap-2 w-full sm:w-auto justify-center"
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
              Get In Touch
            </motion.button>
            
            {resumeInfo && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="button-secondary flex items-center gap-2 w-full sm:w-auto justify-center"
                onClick={handleDownloadResume}
              >
                <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                Download CV
              </motion.button>
            )}
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="flex justify-center gap-4 sm:gap-6 px-4"
          >
            {aboutData.github && (
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href={aboutData.github} target="_blank" rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary-400 transition-colors duration-300"
              >
                <Github className="w-5 h-5 sm:w-6 sm:h-6" />
              </motion.a>
            )}
            {aboutData.linkedin && (
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href={aboutData.linkedin} target="_blank" rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary-400 transition-colors duration-300"
              >
                <Linkedin className="w-5 h-5 sm:w-6 sm:h-6" />
              </motion.a>
            )}
            {aboutData.twitter && (
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href={aboutData.twitter} target="_blank" rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary-400 transition-colors duration-300"
              >
                <Twitter className="w-5 h-5 sm:w-6 sm:h-6" />
              </motion.a>
            )}
            {aboutData.website && (
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href={aboutData.website} target="_blank" rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary-400 transition-colors duration-300"
              >
                <Globe className="w-5 h-5 sm:w-6 sm:h-6" />
              </motion.a>
            )}
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute -bottom-8 sm:-bottom-12 left-1/2 transform -translate-x-1/2"
        >
          <motion.button
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            onClick={scrollToAbout}
            className="text-gray-400 hover:text-primary-400 transition-colors duration-300"
          >
            <ArrowDown className="w-5 h-5 sm:w-6 sm:h-6" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero 