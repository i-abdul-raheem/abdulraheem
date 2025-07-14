'use client'

import { useState } from 'react'
import { X } from 'lucide-react'

interface PrivacyPolicyModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function PrivacyPolicyModal({ isOpen, onClose }: PrivacyPolicyModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto modal-content">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6 border-b pb-4">
            <h2 className="text-2xl font-bold text-gray-900">Privacy Policy</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          <div className="prose prose-sm max-w-none scrollable">
            <p className="text-gray-600 mb-6">
              <strong>Last updated:</strong> {new Date().toLocaleDateString()}
            </p>

            <section className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">1. Information We Collect</h3>
              <div className="text-gray-700 space-y-2">
                <p><strong>Personal Information:</strong> When you contact us through the contact form, we may collect your name, email address, and any other information you provide.</p>
                <p><strong>Usage Data:</strong> We may collect information about how you interact with our website, including your IP address, browser type, pages visited, and time spent on pages.</p>
                <p><strong>Cookies:</strong> We use cookies to enhance your browsing experience and analyze website traffic.</p>
              </div>
            </section>

            <section className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">2. How We Use Your Information</h3>
              <div className="text-gray-700 space-y-2">
                <p>We use the information we collect to:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Respond to your inquiries and provide customer support</li>
                  <li>Improve our website and services</li>
                  <li>Analyze website usage and trends</li>
                  <li>Send you updates about our services (with your consent)</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </div>
            </section>

            <section className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">3. Information Sharing</h3>
              <div className="text-gray-700 space-y-2">
                <p>We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except in the following circumstances:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>To comply with legal requirements</li>
                  <li>To protect our rights and safety</li>
                  <li>With service providers who assist us in operating our website (under strict confidentiality agreements)</li>
                </ul>
              </div>
            </section>

            <section className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">4. Data Security</h3>
              <div className="text-gray-700 space-y-2">
                <p>We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.</p>
              </div>
            </section>

            <section className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">5. Your Rights</h3>
              <div className="text-gray-700 space-y-2">
                <p>You have the right to:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Access your personal information</li>
                  <li>Correct inaccurate information</li>
                  <li>Request deletion of your information</li>
                  <li>Opt-out of marketing communications</li>
                  <li>Lodge a complaint with supervisory authorities</li>
                </ul>
              </div>
            </section>

            <section className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">6. Third-Party Links</h3>
              <div className="text-gray-700 space-y-2">
                <p>Our website may contain links to third-party websites. We are not responsible for the privacy practices of these websites. We encourage you to read their privacy policies.</p>
              </div>
            </section>

            <section className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">7. Changes to This Policy</h3>
              <div className="text-gray-700 space-y-2">
                <p>We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date.</p>
              </div>
            </section>

            <section className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">8. Contact Us</h3>
              <div className="text-gray-700 space-y-2">
                <p>If you have any questions about this privacy policy, please contact us through the contact form on this website.</p>
              </div>
            </section>
          </div>

          <div className="flex justify-end pt-6 border-t">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 