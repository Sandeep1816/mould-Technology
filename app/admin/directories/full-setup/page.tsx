"use client"

import { useState } from "react"

export default function FullSupplierSetup() {
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("token")
      : null

  const [loading, setLoading] = useState(false)

  const [form, setForm] = useState({
    companyName: "",
    website: "",
    location: "",
    industry: "",
    description: "",

    recruiterName: "",
    recruiterEmail: "",
    recruiterUsername: "",
    recruiterPassword: "",

    directoryName: "",
    directoryDescription: "",
    phoneNumber: "",
    directoryEmail: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
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
            },
            recruiter: {
              fullName: form.recruiterName,
              email: form.recruiterEmail,
              username: form.recruiterUsername,
              password: form.recruiterPassword,
            },
            directory: {
              name: form.directoryName,
              description: form.directoryDescription,
              phoneNumber: form.phoneNumber,
              email: form.directoryEmail,
            },
          }),
        }
      )

      if (!res.ok) throw new Error("Failed")

      alert("Full setup created successfully ✅")
    } catch (err) {
      alert("Error creating full setup")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#f6f8fc] p-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow space-y-8">

        <h1 className="text-2xl font-bold">
          Create Company Supplier Listing
        </h1>

        <form onSubmit={handleSubmit} className="space-y-10">

          {/* ================= COMPANY ================= */}
          <Section title="Company Information">
            <Input label="Company Name" name="companyName" onChange={handleChange} />
            <Input label="Website" name="website" onChange={handleChange} />
            <Input label="Location" name="location" onChange={handleChange} />
            <Input label="Industry" name="industry" onChange={handleChange} />
            <Textarea label="Description" name="description" onChange={handleChange} />
          </Section>

          {/* ================= RECRUITER ================= */}
          <Section title="Recruiter Information">
            <Input label="Full Name" name="recruiterName" onChange={handleChange} />
            <Input label="Email" name="recruiterEmail" onChange={handleChange} />
            <Input label="Username" name="recruiterUsername" onChange={handleChange} />
            <Input label="Password" name="recruiterPassword" type="password" onChange={handleChange} />
          </Section>

          {/* ================= DIRECTORY ================= */}
          <Section title="Directory Information">
            <Input label="Directory Name" name="directoryName" onChange={handleChange} />
            <Input label="Phone Number" name="phoneNumber" onChange={handleChange} />
            <Input label="Directory Email" name="directoryEmail" onChange={handleChange} />
            <Textarea label="Directory Description" name="directoryDescription" onChange={handleChange} />
          </Section>

          <button
            type="submit"
            disabled={loading}
            className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition"
          >
            {loading ? "Creating..." : "Create Full Setup"}
          </button>

        </form>
      </div>
    </div>
  )
}

/* ================= REUSABLE COMPONENTS ================= */

function Section({ title, children }: any) {
  return (
    <div className="space-y-4 border p-5 rounded-lg">
      <h2 className="font-semibold text-lg">{title}</h2>
      {children}
    </div>
  )
}

function Input({ label, ...props }: any) {
  return (
    <div className="space-y-1">
      <label className="text-sm text-gray-600">{label}</label>
      <input
        {...props}
        className="w-full border rounded-lg px-3 py-2 text-sm"
      />
    </div>
  )
}

function Textarea({ label, ...props }: any) {
  return (
    <div className="space-y-1">
      <label className="text-sm text-gray-600">{label}</label>
      <textarea
        {...props}
        className="w-full border rounded-lg px-3 py-2 text-sm"
      />
    </div>
  )
}
