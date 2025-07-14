'use client'

import { motion } from 'framer-motion'
import { User, Code, Database, Globe, Award, MapPin, Mail, Calendar } from 'lucide-react'
import { useState, useEffect } from 'react'
import DownloadResume from './DownloadResume'
import { getEndpointUrl } from '@/lib/config'

interface AboutData {
  aboutText: string;
  aboutSectionTitle: string;
  aboutHighlights: string[];
  experience: string;
  education: string;
  location: string;
  email: string;
  projectsCompleted: string;
  yearsExperience: string;
  technologies: string;
  certifications: string;
}

const About = () => {
  const [aboutData, setAboutData] = useState<AboutData>({
    aboutText: 'I am a passionate developer with experience in building modern web applications. I love working with cutting-edge technologies and creating user-friendly solutions.',
    aboutSectionTitle: 'About Me',
    aboutHighlights: [
      'Full-Stack Expertise: Proficient in both frontend and backend development',
      'Modern Technologies: Experience with React, Node.js, TypeScript, and cloud platforms',
      'Problem Solving: Strong analytical skills and creative approach to technical challenges',
      'Team Collaboration: Excellent communication and collaboration skills',
    ],
    experience: '5+ years of experience in web development',
    education: 'Bachelor\'s degree in Computer Science',
    location: '',
    email: '',
    projectsCompleted: '25+',
    yearsExperience: '5+',
    technologies: '15+',
    certifications: '8'
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAboutData();
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

  const stats = [
    { icon: Code, label: 'Projects Completed', value: aboutData.projectsCompleted || '25+' },
    { icon: Database, label: 'Years Experience', value: aboutData.yearsExperience || '5+' },
    { icon: Globe, label: 'Technologies', value: aboutData.technologies || '15+' },
    { icon: Award, label: 'Certifications', value: aboutData.certifications || '8' },
  ]

  if (loading) {
    return (
      <section id="about" className="py-20 bg-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading about information...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="about" className="py-20 bg-dark-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            About <span className="gradient-text">Me</span>
          </h2>
        </motion.div>

        {/* Download Resume Button */}
        {/* <DownloadResume /> */}

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - About Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* About Text */}
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-white">{aboutData.aboutSectionTitle || 'Full-Stack Software Engineer'}</h3>
              <p className="text-gray-300 leading-relaxed">
                {aboutData.aboutText}
              </p>
            </div>

            {/* What I Bring */}
            <div className="space-y-4">
              <h4 className="text-xl font-semibold text-white">What I Bring:</h4>
              <ul className="space-y-3">
                {aboutData.aboutHighlights && aboutData.aboutHighlights.length > 0 ? (
                  aboutData.aboutHighlights.map((highlight, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">{highlight}</span>
                    </li>
                  ))
                ) : (
                  <>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">
                        <strong className="text-white">Full-Stack Expertise:</strong> Proficient in both frontend and backend development
                      </span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">
                        <strong className="text-white">Modern Technologies:</strong> Experience with React, Node.js, TypeScript, and cloud platforms
                      </span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">
                        <strong className="text-white">Problem Solving:</strong> Strong analytical skills and creative approach to technical challenges
                      </span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">
                        <strong className="text-white">Team Collaboration:</strong> Excellent communication and collaboration skills
                      </span>
                    </li>
                  </>
                )}
              </ul>
            </div>

            {/* Get In Touch Card */}
            <div className="glass-effect p-6 rounded-xl">
              <div className="flex items-center space-x-3 mb-4">
                <Mail className="w-6 h-6 text-primary-500" />
                <h4 className="text-lg font-semibold text-white">Get In Touch</h4>
              </div>
              <div className="space-y-2">
                {aboutData.email && (
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <a 
                      href={`mailto:${aboutData.email}`}
                      className="text-gray-300 hover:text-primary-400 transition-colors"
                    >
                      {aboutData.email}
                    </a>
                  </div>
                )}
                {aboutData.location && (
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-300">{aboutData.location}</span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Right Column - Stats */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="glass-effect p-6 rounded-xl text-center card-hover"
                >
                  <stat.icon className="w-8 h-8 text-primary-500 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Experience & Education */}
            <div className="space-y-6">
              {aboutData.experience && (
                <div className="glass-effect p-6 rounded-xl">
                  <div className="flex items-center space-x-3 mb-3">
                    <User className="w-6 h-6 text-primary-500" />
                    <h4 className="text-lg font-semibold text-white">Experience</h4>
                  </div>
                  <p className="text-gray-300">{aboutData.experience}</p>
                </div>
              )}

              {aboutData.education && (
                <div className="glass-effect p-6 rounded-xl">
                  <div className="flex items-center space-x-3 mb-3">
                    <Award className="w-6 h-6 text-primary-500" />
                    <h4 className="text-lg font-semibold text-white">Education</h4>
                  </div>
                  <p className="text-gray-300">{aboutData.education}</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About; 