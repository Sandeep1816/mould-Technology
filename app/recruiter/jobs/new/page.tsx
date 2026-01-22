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
    location: "",
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

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
          body: JSON.stringify(form), // ✅ backend assigns companyId
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

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          required
          placeholder="Job Title"
          className="w-full border p-3 rounded"
          value={form.title}
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
        />

        <input
          required
          placeholder="Slug (unique)"
          className="w-full border p-3 rounded"
          value={form.slug}
          onChange={(e) =>
            setForm({ ...form, slug: e.target.value })
          }
        />

        <textarea
          required
          placeholder="Job description"
          className="w-full border p-3 rounded"
          rows={5}
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
        />

        <input
          required
          placeholder="Location"
          className="w-full border p-3 rounded"
          value={form.location}
          onChange={(e) =>
            setForm({ ...form, location: e.target.value })
          }
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
