"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"

type Directory = {
  id: number
  name: string
  slug: string
  description: string
  website?: string
  logoUrl?: string
  coverImageUrl?: string
  status: "PENDING" | "APPROVED" | "REJECTED"
  isLiveEditable: boolean
}

export default function EditDirectoryPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  const [directory, setDirectory] = useState<Directory | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    async function loadDirectory() {
      try {
        const token = localStorage.getItem("token")

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/recruiter/directories/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )

        if (!res.ok) {
          throw new Error("Failed to load directory")
        }

        const data = await res.json()
        setDirectory(data)
      } catch (err) {
        console.error(err)
        alert("Unable to load directory")
      } finally {
        setLoading(false)
      }
    }

    loadDirectory()
  }, [id])

  async function saveChanges() {
    if (!directory) return

    if (!directory.isLiveEditable) {
      alert("Directory is not approved yet")
      return
    }

    try {
      setSaving(true)
      const token = localStorage.getItem("token")

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/suppliers/${directory.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: directory.name,
            description: directory.description,
            website: directory.website,
            logoUrl: directory.logoUrl,
            coverImageUrl: directory.coverImageUrl,
          }),
        }
      )

      if (!res.ok) {
        throw new Error("Update failed")
      }

      alert("Directory updated successfully")
      router.push("/recruiter/dashboard")
    } catch (err) {
      console.error(err)
      alert("Failed to save changes")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <div className="p-10">Loading directory...</div>
  }

  if (!directory) {
    return <div className="p-10">Directory not found</div>
  }

  return (
    <div className="max-w-3xl mx-auto p-10">
      <h1 className="text-2xl font-bold mb-6">
        Edit Supplier Directory
      </h1>

      {/* STATUS */}
      <div className="mb-4">
        {directory.status === "PENDING" && (
          <span className="text-yellow-600 text-sm font-semibold">
            Pending admin approval
          </span>
        )}
        {directory.status === "APPROVED" && (
          <span className="text-green-600 text-sm font-semibold">
            Live & editable
          </span>
        )}
        {directory.status === "REJECTED" && (
          <span className="text-red-600 text-sm font-semibold">
            Rejected by admin
          </span>
        )}
      </div>

      {/* FORM */}
      <div className="space-y-4">
        <input
          className="w-full border rounded px-4 py-2"
          placeholder="Company Name"
          value={directory.name}
          onChange={(e) =>
            setDirectory({ ...directory, name: e.target.value })
          }
        />

        <input
          className="w-full border rounded px-4 py-2 bg-gray-100 cursor-not-allowed"
          value={directory.slug}
          disabled
        />

        <textarea
          className="w-full border rounded px-4 py-2 h-32"
          placeholder="Description"
          value={directory.description}
          onChange={(e) =>
            setDirectory({ ...directory, description: e.target.value })
          }
        />

        <input
          className="w-full border rounded px-4 py-2"
          placeholder="Website"
          value={directory.website || ""}
          onChange={(e) =>
            setDirectory({ ...directory, website: e.target.value })
          }
        />

        <input
          className="w-full border rounded px-4 py-2"
          placeholder="Logo URL"
          value={directory.logoUrl || ""}
          onChange={(e) =>
            setDirectory({ ...directory, logoUrl: e.target.value })
          }
        />

        <input
          className="w-full border rounded px-4 py-2"
          placeholder="Cover Image URL"
          value={directory.coverImageUrl || ""}
          onChange={(e) =>
            setDirectory({ ...directory, coverImageUrl: e.target.value })
          }
        />
      </div>

      {/* ACTIONS */}
      <div className="flex gap-4 mt-8">
        <button
          onClick={saveChanges}
          disabled={saving || !directory.isLiveEditable}
          className="bg-black text-white px-6 py-2 rounded disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>

        <button
          onClick={() => router.back()}
          className="border px-6 py-2 rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}
