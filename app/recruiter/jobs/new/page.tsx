"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function CreateJobPage() {
  const router = useRouter()

  const [form, setForm] = useState({
    title: "",
    slug: "",
    description: "",
    employmentType: "Full-time",
    experience: "",
    salaryRange: "",
    location: "",
    isRemote: false,
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value, type } = e.target

    setForm({
      ...form,
      [name]:
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : value,
    })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const token = localStorage.getItem("token")
      if (!token) {
        router.push("/login")
        return
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/jobs`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(form),
        }
      )

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || "Failed to create job")
        return
      }

      router.push("/recruiter/jobs")
    } catch (err) {
      setError("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-2xl font-bold mb-6">Create Job</h1>

      {error && (
        <div className="mb-4 text-sm text-red-600 bg-red-50 p-3 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Title */}
        <input
          name="title"
          required
          placeholder="Job Title"
          className="w-full border p-3 rounded"
          value={form.title}
          onChange={handleChange}
        />

        {/* Slug */}
        <input
          name="slug"
          required
          placeholder="Unique Slug (e.g. senior-mern-developer)"
          className="w-full border p-3 rounded"
          value={form.slug}
          onChange={handleChange}
        />

        {/* Employment Type */}
        <select
          name="employmentType"
          className="w-full border p-3 rounded"
          value={form.employmentType}
          onChange={handleChange}
        >
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Contract">Contract</option>
          <option value="Internship">Internship</option>
        </select>

        {/* Experience */}
        <input
          name="experience"
          placeholder="Experience (e.g. 2-5 years)"
          className="w-full border p-3 rounded"
          value={form.experience}
          onChange={handleChange}
        />

        {/* Salary */}
        <input
          name="salaryRange"
          placeholder="Salary Range (e.g. ₹6L - ₹12L)"
          className="w-full border p-3 rounded"
          value={form.salaryRange}
          onChange={handleChange}
        />

        {/* Location */}
        <input
          name="location"
          required
          placeholder="Location"
          className="w-full border p-3 rounded"
          value={form.location}
          onChange={handleChange}
        />

        {/* Remote Option */}
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            name="isRemote"
            checked={form.isRemote}
            onChange={handleChange}
          />
          Remote Job
        </label>

        {/* Description */}
        <textarea
          name="description"
          required
          placeholder="Job Description"
          className="w-full border p-3 rounded"
          rows={6}
          value={form.description}
          onChange={handleChange}
        />

        <button
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-3 rounded disabled:opacity-60"
        >
          {loading ? "Publishing..." : "Publish Job"}
        </button>
      </form>
    </div>
  )
}
