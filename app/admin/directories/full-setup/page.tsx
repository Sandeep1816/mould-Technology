"use client"

import { useState } from "react"
import UploadBox from "@/components/UploadBox"

export default function FullSupplierSetup() {
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("token")
      : null

  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)

  const DEFAULT_PASSWORD = "Company@21" // ✅ DEFAULT PASSWORD

  const [form, setForm] = useState({
    companyName: "",
    website: "",
    location: "",
    industry: "",
    description: "",
    logoUrl: "",

    email: "",
    // recruiterPassword removed from UI

    phoneNumber: "",
    directoryDescription: "",

    videoGallery: [""],
    socialLinks: {
      facebook: "",
      linkedin: "",
      twitter: "",
      youtube: "",
      instagram: "",
    },
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSocialChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm({
      ...form,
      socialLinks: {
        ...form.socialLinks,
        [e.target.name]: e.target.value,
      },
    })
  }

  const handleVideoChange = (index: number, value: string) => {
    const updated = [...form.videoGallery]
    updated[index] = value
    setForm({ ...form, videoGallery: updated })
  }

  const addVideoField = () => {
    setForm({ ...form, videoGallery: [...form.videoGallery, ""] })
  }

  const handleLogoUpload = async (file: File) => {
    try {
      setUploading(true)

      const formData = new FormData()
      formData.append("image", file)

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/upload`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      )

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Upload failed")

      setForm(prev => ({
        ...prev,
        logoUrl: data.imageUrl,
      }))

    } catch (err: any) {
      alert(err.message)
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const username = form.email
        .split("@")[0]
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "")

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/create-full-setup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            company: {
              name: form.companyName,
              website: form.website,
              location: form.location,
              industry: form.industry,
              description: form.description,
              logoUrl: form.logoUrl,
            },
            recruiter: {
              email: form.email,
              username,
              password: DEFAULT_PASSWORD, // ✅ AUTO DEFAULT PASSWORD
            },
            directory: {
              name: form.companyName,
              description: form.directoryDescription,
              phoneNumber: form.phoneNumber,
              email: form.email,
              website: form.website,
              logoUrl: form.logoUrl,
              videoGallery: form.videoGallery.filter(v => v.trim() !== ""),
              socialLinks: form.socialLinks,
            },
          }),
        }
      )

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.message)
      }

      alert("Full setup created successfully ✅")

    } catch (err: any) {
      alert(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#f6f8fc] py-10 px-6">
      <div className="max-w-5xl mx-auto bg-white p-10 rounded-xl shadow">

        <h1 className="text-2xl font-bold mb-8 text-center">
          Create Company Supplier Listing
        </h1>

        <form onSubmit={handleSubmit} className="space-y-8">

          <div className="grid md:grid-cols-2 gap-6">
            <Input
              label="Company Name"
              name="companyName"
              value={form.companyName}
              onChange={handleChange}
              required
            />

            <Input
              label="Website"
              name="website"
              value={form.website}
              onChange={handleChange}
            />

            <Input
              label="Location"
              name="location"
              value={form.location}
              onChange={handleChange}
            />

            <Input
              label="Industry"
              name="industry"
              value={form.industry}
              onChange={handleChange}
            />

            <Input
              label="Recruiter Email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
            />

            {/* 
            <Input
              label="Recruiter Password"
              name="recruiterPassword"
              type="password"
              value={form.recruiterPassword}
              onChange={handleChange}
              required
            />
            */}

            <Input
              label="Phone Number"
              name="phoneNumber"
              value={form.phoneNumber}
              onChange={handleChange}
            />
          </div>

          <UploadBox
            label="Company Logo"
            value={form.logoUrl}
            onUpload={handleLogoUpload}
            accept="image/*"
          />

          <Textarea
            label="Directory Description"
            name="directoryDescription"
            value={form.directoryDescription}
            onChange={handleChange}
          />

          {/* Video Gallery */}
          <div className="space-y-3">
            <label className="font-medium text-gray-700">
              Video Gallery
            </label>

            {form.videoGallery.map((video, index) => (
              <input
                key={index}
                type="text"
                placeholder="YouTube Video URL"
                value={video}
                onChange={(e) =>
                  handleVideoChange(index, e.target.value)
                }
                className="w-full border rounded-lg px-3 py-2 text-sm"
              />
            ))}

            <button
              type="button"
              onClick={addVideoField}
              className="text-blue-600 text-sm hover:underline"
            >
              + Add Another Video
            </button>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <label className="font-medium text-gray-700">
              Social Media Links
            </label>

            <div className="grid md:grid-cols-2 gap-6">
              <Input label="Facebook" name="facebook" value={form.socialLinks.facebook} onChange={handleSocialChange} />
              <Input label="LinkedIn" name="linkedin" value={form.socialLinks.linkedin} onChange={handleSocialChange} />
              <Input label="Twitter" name="twitter" value={form.socialLinks.twitter} onChange={handleSocialChange} />
              <Input label="YouTube" name="youtube" value={form.socialLinks.youtube} onChange={handleSocialChange} />
              <Input label="Instagram" name="instagram" value={form.socialLinks.instagram} onChange={handleSocialChange} />
            </div>
          </div>

          <div className="pt-4 text-center">
            <button
              type="submit"
              disabled={loading}
              className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition disabled:opacity-50"
            >
              {loading ? "Creating..." : "Create Full Setup"}
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}

function Input({ label, ...props }: any) {
  return (
    <div className="space-y-1">
      <label className="text-sm text-gray-600">{label}</label>
      <input {...props} className="w-full border rounded-lg px-3 py-2 text-sm" />
    </div>
  )
}

function Textarea({ label, ...props }: any) {
  return (
    <div className="space-y-1">
      <label className="text-sm text-gray-600">{label}</label>
      <textarea {...props} className="w-full border rounded-lg px-3 py-2 text-sm" />
    </div>
  )
}