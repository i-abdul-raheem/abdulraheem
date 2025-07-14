'use client'

import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter, Globe } from 'lucide-react'
import { useState, useEffect } from 'react'
import { getEndpointUrl } from '@/lib/config'

interface ContactSettings {
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  contactTitle: string;
  contactSubtitle: string;
  contactDescription: string;
  formEnabled: boolean;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
}

const Contact = () => {
  const [contactSettings, setContactSettings] = useState<ContactSettings>({
    email: '',
    phone: '',
    address: '',
    city: '',
    country: '',
    contactTitle: 'Get In Touch',
    contactSubtitle: "Let's work together",
    contactDescription: "I'm always interested in hearing about new opportunities and exciting projects.",
    formEnabled: true
  });
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    fetchContactSettings();
  }, []);

  const fetchContactSettings = async () => {
    try {
      const response = await fetch(getEndpointUrl('contactSettings'));
      if (response.ok) {
        const data = await response.json();
        setContactSettings(data.data);
      }
    } catch (error) {
      console.error('Error fetching contact settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch(getEndpointUrl('contact'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          subject: '',
          message: ''
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: contactSettings.email || 'your.email@example.com',
      link: contactSettings.email ? `mailto:${contactSettings.email}` : '#'
    },
    {
      icon: Phone,
      title: 'Phone',
      value: contactSettings.phone || 'Add your phone number',
      link: contactSettings.phone ? `tel:${contactSettings.phone}` : '#'
    },
    {
      icon: MapPin,
      title: 'Location',
      value: [contactSettings.address, contactSettings.city, contactSettings.country].filter(Boolean).join(', ') || 'Add your location',
      link: '#'
    }
  ];

  if (loading) {
    return (
      <section id="contact" className="py-20 bg-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading contact information...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-20 bg-dark-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {contactSettings.contactTitle}
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            {contactSettings.contactDescription}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          {contactSettings.formEnabled && (
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="glass-effect p-8 rounded-xl"
            >
              <h3 className="text-2xl font-semibold text-white mb-6">Send a Message</h3>
              
              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-500/20 border border-green-500/30 rounded-lg">
                  <p className="text-green-400">Message sent successfully! I'll get back to you soon.</p>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg">
                  <p className="text-red-400">Failed to send message. Please try again.</p>
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className="w-full px-4 py-3 bg-dark-800 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-500 transition-colors duration-300"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className="w-full px-4 py-3 bg-dark-800 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-500 transition-colors duration-300"
                      placeholder="Doe"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-4 py-3 bg-dark-800 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-500 transition-colors duration-300"
                    placeholder="john@example.com"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => handleInputChange('subject', e.target.value)}
                    className="w-full px-4 py-3 bg-dark-800 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-500 transition-colors duration-300"
                    placeholder="Project Inquiry"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Message *
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    className="w-full px-4 py-3 bg-dark-800 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-500 transition-colors duration-300 resize-none"
                    placeholder="Tell me about your project..."
                  ></textarea>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={submitting}
                  className="w-full button-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>
          )}

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-semibold text-white mb-6">Contact Information</h3>
              <div className="space-y-6">
                {contactInfo.map((info) => (
                  <motion.a
                    key={info.title}
                    whileHover={{ scale: 1.02 }}
                    href={info.link}
                    className="flex items-center space-x-4 p-4 glass-effect rounded-lg hover:bg-white/5 transition-colors duration-300"
                  >
                    <div className="w-12 h-12 bg-primary-500/20 rounded-lg flex items-center justify-center">
                      <info.icon className="w-6 h-6 text-primary-400" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium">{info.title}</h4>
                      <p className="text-gray-400">{info.value}</p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-xl font-semibold text-white mb-4">Follow Me</h4>
              <div className="flex space-x-4">
                {contactSettings.email && (
                  <motion.a
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    href={`mailto:${contactSettings.email}`}
                    className="w-12 h-12 bg-primary-500/20 rounded-lg flex items-center justify-center hover:bg-primary-500 transition-colors duration-300"
                  >
                    <Mail className="w-6 h-6 text-primary-400" />
                  </motion.a>
                )}
              </div>
            </div>

            {/* Availability Status */}
            <div className="glass-effect p-6 rounded-xl">
              <h4 className="text-xl font-semibold text-white mb-4">Current Status</h4>
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-gray-400 font-medium">Available for new opportunities</span>
              </div>
              <p className="text-gray-300 text-sm">
                I'm currently open to discussing new projects and opportunities.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact 