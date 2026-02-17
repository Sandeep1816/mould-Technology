"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

interface Company {
  id: number
  name: string
}

interface Recruiter {
  id: number
  email: string
  username: string
  companyId: number
}

export default function AdminCreateDirectoryPage() {
  const router = useRouter()

  const [companies, setCompanies] = useState<Company[]>([])
  const [recruiters, setRecruiters] = useState<Recruiter[]>([])

  const [form, setForm] = useState({
    name: "",
    slug: "",
    description: "",
    companyId: "",
    submittedById: "",
  })

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("token")
      : null

  // 🔥 Fetch companies
  useEffect(() => {
    async function fetchCompanies() {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/companies`
      )
      const data = await res.json()
      setCompanies(data)
    }

    fetchCompanies()
  }, [])

  // 🔥 Fetch recruiters when company changes
  useEffect(() => {
    if (!form.companyId) return

    async function fetchRecruiters() {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/recruiters?companyId=${form.companyId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      const data = await res.json()
      setRecruiters(data)
    }

    fetchRecruiters()
  }, [form.companyId])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/create-directory`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...form,
          companyId: Number(form.companyId),
          submittedById: Number(form.submittedById),
        }),
      }
    )

    if (res.ok) {
      alert("Directory created successfully")
      router.push("/admin")
    } else {
      const error = await res.json()
      alert(error.error || "Failed to create directory")
    }
  }

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">
        Create Directory (Admin)
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Company Dropdown */}
        <div>
          <label className="block font-medium mb-1">
            Select Company
          </label>
          <select
            className="w-full border p-2 rounded"
            value={form.companyId}
            onChange={(e) =>
              setForm({ ...form, companyId: e.target.value })
            }
            required
          >
            <option value="">Select company</option>
            {companies.map((company) => (
              <option key={company.id} value={company.id}>
                {company.name}
              </option>
            ))}
          </select>
        </div>

        {/* Recruiter Dropdown */}
        <div>
          <label className="block font-medium mb-1">
            Select Recruiter
          </label>
          <select
            className="w-full border p-2 rounded"
            value={form.submittedById}
            onChange={(e) =>
              setForm({ ...form, submittedById: e.target.value })
            }
            required
          >
            <option value="">Select recruiter</option>
            {recruiters.map((rec) => (
              <option key={rec.id} value={rec.id}>
                {rec.username} ({rec.email})
              </option>
            ))}
          </select>
        </div>

        {/* Directory Name */}
        <div>
          <label className="block font-medium mb-1">
            Directory Name
          </label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
            required
          />
        </div>

        {/* Slug */}
        <div>
          <label className="block font-medium mb-1">
            Slug
          </label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={form.slug}
            onChange={(e) =>
              setForm({ ...form, slug: e.target.value })
            }
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium mb-1">
            Description
          </label>
          <textarea
            className="w-full border p-2 rounded"
            rows={5}
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
            required
          />
        </div>

        <button
          type="submit"
          className="bg-black text-white px-5 py-2 rounded hover:opacity-90"
        >
          Create Directory
        </button>
      </form>
    </div>
  )
}
