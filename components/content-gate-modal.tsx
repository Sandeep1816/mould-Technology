"use client"

import type React from "react"

import { useState } from "react"
import { X } from "lucide-react"

interface ContentGateModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (formData: FormData) => void
}

interface FormData {
  firstName: string
  lastName: string
  jobTitle: string
  company: string
  email: string
  subscribe: boolean
}

export default function ContentGateModal({ isOpen, onClose, onSubmit }: ContentGateModalProps) {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    jobTitle: "",
    company: "",
    email: "",
    subscribe: false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-[#003049] to-[#0077b6] text-white p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Welcome to Tooling Technology!</h2>
          <button onClick={onClose} className="text-white hover:bg-white hover:bg-opacity-20 p-1 rounded transition">
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-8">
          <p className="text-center text-gray-700 text-lg font-semibold mb-6">
            Unlimited access to our free premium content requires a little more information from you.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-2 focus:ring-[#0077b6] focus:border-transparent outline-none transition"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-2 focus:ring-[#0077b6] focus:border-transparent outline-none transition"
                  required
                />
              </div>
            </div>

            {/* Job and Company Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Job Title</label>
                <input
                  type="text"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-2 focus:ring-[#0077b6] focus:border-transparent outline-none transition"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Company</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-2 focus:ring-[#0077b6] focus:border-transparent outline-none transition"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-2 focus:ring-[#0077b6] focus:border-transparent outline-none transition"
                required
              />
            </div>

            {/* Subscribe Checkbox */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="subscribe"
                name="subscribe"
                checked={formData.subscribe}
                onChange={handleChange}
                className="w-4 h-4 rounded border-gray-300 text-[#0077b6] focus:ring-[#0077b6]"
              />
              <label htmlFor="subscribe" className="text-sm text-gray-700">
                Also, please subscribe me to the MMT Today Weekly e-newsletter!
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#003049] to-[#0077b6] text-white font-bold py-4 rounded uppercase tracking-widest hover:from-[#002340] hover:to-[#005a8d] transition duration-200"
            >
              Register
            </button>

            {/* Privacy notice */}
            <p className="text-xs text-gray-600 text-center mt-4">
              Your email address will be used to communicate with you about Tooling Technology subscription offers,
              related products and services. Refer to our{" "}
              <a href="#" className="text-[#0077b6] hover:underline">
                Privacy Policy
              </a>{" "}
              for more information.
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
