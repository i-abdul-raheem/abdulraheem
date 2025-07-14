'use client'

import { motion } from 'framer-motion'
import { Code, Github, Linkedin, Twitter, Mail, Phone, MapPin, Globe } from 'lucide-react'
import { useState, useEffect } from 'react'
import PrivacyPolicyModal from './PrivacyPolicyModal'
import TermsOfServiceModal from './TermsOfServiceModal'

interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

interface QuickLink {
  name: string;
  url: string;
}

interface ContactInfo {
  email: string;
  phone: string;
  address: string;
}

interface FooterData {
  copyright: string;
  tagline: string;
  description: string;
  socialLinks: SocialLink[];
  quickLinks: QuickLink[];
  contactInfo: ContactInfo;
}

const Footer = () => {
  const [footerData, setFooterData] = useState<FooterData>({
    copyright: '© 2025 Your Name. All rights reserved.',
    tagline: 'Building amazing digital experiences',
    description: 'Passionate developer creating innovative solutions for the web.',
    socialLinks: [],
    quickLinks: [],
    contactInfo: {
      email: '',
      phone: '',
      address: ''
    }
  });
  const [loading, setLoading] = useState(true);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [showTermsOfService, setShowTermsOfService] = useState(false);

  useEffect(() => {
    fetchFooterData();
  }, []);

  const fetchFooterData = async () => {
    try {
      const response = await fetch('https://abdulraheem-api.vercel.app/api/footer');
      if (response.ok) {
        const data = await response.json();
        setFooterData(data.data);
      }
    } catch (error) {
      console.error('Error fetching footer data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getSocialIcon = (name: string) => {
    const iconMap: { [key: string]: any } = {
      'GitHub': Github,
      'LinkedIn': Linkedin,
      'Twitter': Twitter,
      'Email': Mail,
      'Website': Globe,
    };
    return iconMap[name] || Globe;
  };

  if (loading) {
    return (
      <footer className="bg-dark-800 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading footer...</p>
        </div>
      </footer>
    );
  }

  return (
    <>
      <footer className="bg-dark-800 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <Code className="h-8 w-8 text-primary-500" />
                <span className="text-xl font-bold gradient-text">DevPortfolio</span>
              </div>
              <p className="text-gray-400 mb-2 max-w-md">
                {footerData.tagline}
              </p>
              <p className="text-gray-400 mb-6 max-w-md">
                {footerData.description}
              </p>
              <div className="flex space-x-4">
                {footerData.socialLinks.map((social, index) => {
                  const SocialIcon = getSocialIcon(social.name);
                  return (
                    <motion.a
                      key={index}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center hover:bg-primary-500 transition-colors duration-300"
                      title={social.name}
                    >
                      {social.icon ? (
                        <span className="text-gray-400 text-lg">{social.icon}</span>
                      ) : (
                        <SocialIcon className="w-5 h-5 text-gray-400" />
                      )}
                    </motion.a>
                  );
                })}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-white font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {footerData.quickLinks.length > 0 ? (
                  footerData.quickLinks.map((link, index) => (
                    <li key={index}>
                      <a 
                        href={link.url} 
                        className="text-gray-400 hover:text-primary-400 transition-colors duration-300"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))
                ) : (
                  <>
                    <li>
                      <a href="#home" className="text-gray-400 hover:text-primary-400 transition-colors duration-300">
                        Home
                      </a>
                    </li>
                    <li>
                      <a href="#about" className="text-gray-400 hover:text-primary-400 transition-colors duration-300">
                        About
                      </a>
                    </li>
                    <li>
                      <a href="#skills" className="text-gray-400 hover:text-primary-400 transition-colors duration-300">
                        Skills
                      </a>
                    </li>
                    <li>
                      <a href="#projects" className="text-gray-400 hover:text-primary-400 transition-colors duration-300">
                        Projects
                      </a>
                    </li>
                    <li>
                      <a href="#contact" className="text-gray-400 hover:text-primary-400 transition-colors duration-300">
                        Contact
                      </a>
                    </li>
                  </>
                )}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-white font-semibold mb-4">Contact</h3>
              <ul className="space-y-2">
                {footerData.contactInfo.email && (
                  <li className="text-gray-400 flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    {footerData.contactInfo.email}
                  </li>
                )}
                {footerData.contactInfo.phone && (
                  <li className="text-gray-400 flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    {footerData.contactInfo.phone}
                  </li>
                )}
                {footerData.contactInfo.address && (
                  <li className="text-gray-400 flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {footerData.contactInfo.address}
                  </li>
                )}
                {!footerData.contactInfo.email && !footerData.contactInfo.phone && !footerData.contactInfo.address && (
                  <>
                    <li className="text-gray-400">your.email@example.com</li>
                    <li className="text-gray-400">Add your phone number</li>
                    <li className="text-gray-400">Add your location</li>
                  </>
                )}
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/10 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              {footerData.copyright}
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <button 
                onClick={() => setShowPrivacyPolicy(true)}
                className="text-gray-400 hover:text-primary-400 text-sm transition-colors duration-300"
              >
                Privacy Policy
              </button>
              <button 
                onClick={() => setShowTermsOfService(true)}
                className="text-gray-400 hover:text-primary-400 text-sm transition-colors duration-300"
              >
                Terms of Service
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <PrivacyPolicyModal 
        isOpen={showPrivacyPolicy} 
        onClose={() => setShowPrivacyPolicy(false)} 
      />
      <TermsOfServiceModal 
        isOpen={showTermsOfService} 
        onClose={() => setShowTermsOfService(false)} 
      />
    </>
  )
}

export default Footer 