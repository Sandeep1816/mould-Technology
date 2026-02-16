"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import UploadBox from "@/components/UploadBox"

export default function EditRecruiterProfile() {
  const router = useRouter()

  const [form, setForm] = useState({
    fullName: "",
    headline: "",
    about: "",
    location: "",
    websiteUrl: "",
    avatarUrl: "",
  })

  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [success, setSuccess] = useState("")
  const [error, setError] = useState("")

  /* ================= LOAD PROFILE ================= */

  useEffect(() => {
    async function loadProfile() {
      const token = localStorage.getItem("token")

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/recruiters/me`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )

      const data = await res.json()

      setForm({
        fullName: data.fullName || "",
        headline: data.headline || "",
        about: data.about || "",
        location: data.location || "",
        websiteUrl: data.websiteUrl || "",
        avatarUrl: data.avatarUrl || "",
      })
    }

    loadProfile()
  }, [])

  /* ================= HANDLE INPUT ================= */

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  /* ================= HANDLE IMAGE UPLOAD ================= */

  async function handleFileUpload(file: File) {
    try {
      setUploading(true)
      const token = localStorage.getItem("token")

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

      if (!res.ok) {
        alert("Upload failed")
        return
      }

      setForm(prev => ({
        ...prev,
        avatarUrl: data.imageUrl,
      }))
    } catch (err) {
      console.error("Upload error", err)
    } finally {
      setUploading(false)
    }
  }

  /* ================= SUBMIT ================= */

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess("")

    try {
      const token = localStorage.getItem("token")

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/recruiters/profile`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(form),
        }
      )

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || "Failed to update")
        return
      }

      setSuccess("Profile updated successfully 🎉")

      setTimeout(() => {
        router.push("/recruiter/dashboard")
      }, 1200)
    } catch {
      setError("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-xl bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <h1 className="text-2xl font-bold mb-6 text-gray-900">
          Edit Profile
        </h1>

        {error && (
          <div className="mb-4 text-sm text-red-600 bg-red-50 p-3 rounded">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 text-sm text-green-600 bg-green-50 p-3 rounded">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          <UploadBox
            label={uploading ? "Uploading..." : "Profile Avatar"}
            value={form.avatarUrl}
            onUpload={handleFileUpload}
            height="h-48"
            accept="image/*"
          />

          <Input label="Full Name" name="fullName" value={form.fullName} onChange={handleChange} />
          <Input label="Headline" name="headline" value={form.headline} onChange={handleChange} />
          <Input label="Location" name="location" value={form.location} onChange={handleChange} />
          <Input label="Website URL" name="websiteUrl" value={form.websiteUrl} onChange={handleChange} />

          <div>
            <label className="text-sm font-medium text-gray-700">
              About
            </label>
            <textarea
              name="about"
              value={form.about}
              onChange={handleChange}
              rows={4}
              className="w-full mt-1 px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-[50px] bg-blue-600 hover:bg-blue-700 text-white rounded-md font-semibold transition disabled:opacity-60"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  )
}

function Input({
  label,
  name,
  value,
  onChange,
}: {
  label: string
  name: string
  value: string
  onChange: any
}) {
  return (
    <div>
      <label className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        className="w-full h-[48px] px-4 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
      />
    </div>
  )
}
