"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function CreateJobPage() {
  const router = useRouter()
  const [companyId, setCompanyId] = useState<number | null>(null)

  const [form, setForm] = useState({
    title: "",
    slug: "",
    description: "",
    employmentType: "Full-time",
    location: "",
  })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const token = localStorage.getItem("token")

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/jobs`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...form,
          companyId: companyId || 1, // temp (replace after company page)
        }),
      }
    )

    if (res.ok) {
      router.push("/recruiter/jobs")
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-2xl font-bold mb-6">
        Create Job
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          placeholder="Job Title"
          className="w-full border p-3 rounded"
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
        />

        <input
          placeholder="Slug"
          className="w-full border p-3 rounded"
          onChange={(e) =>
            setForm({ ...form, slug: e.target.value })
          }
        />

        <textarea
          placeholder="Description"
          className="w-full border p-3 rounded"
          rows={5}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
        />

        <input
          placeholder="Location"
          className="w-full border p-3 rounded"
          onChange={(e) =>
            setForm({ ...form, location: e.target.value })
          }
        />

        <button className="bg-blue-600 text-white px-6 py-3 rounded">
          Publish Job
        </button>
      </form>
    </div>
  )
}
