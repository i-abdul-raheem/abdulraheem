'use client'

import { useState } from 'react'
import { X } from 'lucide-react'

interface TermsOfServiceModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function TermsOfServiceModal({ isOpen, onClose }: TermsOfServiceModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto modal-content">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6 border-b pb-4">
            <h2 className="text-2xl font-bold text-gray-900">Terms of Service</h2>
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
              <h3 className="text-lg font-semibold text-gray-900 mb-3">1. Acceptance of Terms</h3>
              <div className="text-gray-700 space-y-2">
                <p>By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.</p>
              </div>
            </section>

            <section className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">2. Use License</h3>
              <div className="text-gray-700 space-y-2">
                <p>Permission is granted to temporarily download one copy of the materials (information or software) on this website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Modify or copy the materials</li>
                  <li>Use the materials for any commercial purpose or for any public display</li>
                  <li>Attempt to reverse engineer any software contained on the website</li>
                  <li>Remove any copyright or other proprietary notations from the materials</li>
                  <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
                </ul>
              </div>
            </section>

            <section className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">3. Disclaimer</h3>
              <div className="text-gray-700 space-y-2">
                <p>The materials on this website are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
              </div>
            </section>

            <section className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">4. Limitations</h3>
              <div className="text-gray-700 space-y-2">
                <p>In no event shall we or our suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on our website, even if we or an authorized representative has been notified orally or in writing of the possibility of such damage.</p>
              </div>
            </section>

            <section className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">5. Accuracy of Materials</h3>
              <div className="text-gray-700 space-y-2">
                <p>The materials appearing on our website could include technical, typographical, or photographic errors. We do not warrant that any of the materials on our website are accurate, complete, or current. We may make changes to the materials contained on our website at any time without notice.</p>
              </div>
            </section>

            <section className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">6. Links</h3>
              <div className="text-gray-700 space-y-2">
                <p>We have not reviewed all of the sites linked to our website and are not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by us of the site. Use of any such linked website is at the user's own risk.</p>
              </div>
            </section>

            <section className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">7. Modifications</h3>
              <div className="text-gray-700 space-y-2">
                <p>We may revise these terms of service for our website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these Terms of Service.</p>
              </div>
            </section>

            <section className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">8. User Conduct</h3>
              <div className="text-gray-700 space-y-2">
                <p>When using our website, you agree not to:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Use the website for any unlawful purpose</li>
                  <li>Attempt to gain unauthorized access to any part of the website</li>
                  <li>Interfere with or disrupt the website or servers</li>
                  <li>Transmit any harmful, offensive, or inappropriate content</li>
                  <li>Impersonate any person or entity</li>
                </ul>
              </div>
            </section>

            <section className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">9. Intellectual Property</h3>
              <div className="text-gray-700 space-y-2">
                <p>The content on this website, including but not limited to text, graphics, images, logos, and software, is the property of the website owner and is protected by copyright and other intellectual property laws.</p>
              </div>
            </section>

            <section className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">10. Governing Law</h3>
              <div className="text-gray-700 space-y-2">
                <p>These terms and conditions are governed by and construed in accordance with the laws and you irrevocably submit to the exclusive jurisdiction of the courts in that location.</p>
              </div>
            </section>

            <section className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">11. Contact Information</h3>
              <div className="text-gray-700 space-y-2">
                <p>If you have any questions about these Terms of Service, please contact us through the contact form on this website.</p>
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