"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import RichTextEditor from "@/components/RichTextField"

export default function EditDirectoryPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  const [directory, setDirectory] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    async function loadDirectory() {
      try {
        const token = localStorage.getItem("token")

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/suppliers/recruiter/directories/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )

        const data = await res.json()
        setDirectory(data)
      } catch {
        alert("Unable to load directory")
      } finally {
        setLoading(false)
      }
    }

    loadDirectory()
  }, [id])

  async function saveChanges() {
    if (!directory?.isLiveEditable) {
      alert("Directory is not approved yet")
      return
    }

    try {
      setSaving(true)
      const token = localStorage.getItem("token")

      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/suppliers/${directory.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(directory),
        }
      )

      router.push("/recruiter/dashboard")
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div className="p-10">Loading directory...</div>
  if (!directory) return <div className="p-10">Directory not found</div>

  return (
    <div className="max-w-3xl mx-auto p-10">
      <h1 className="text-2xl font-bold mb-6">
        Edit Supplier Directory
      </h1>

      <input
        className="input mb-4"
        value={directory.name}
        onChange={(e) => setDirectory({ ...directory, name: e.target.value })}
      />

      <input
        className="input mb-4 bg-gray-100"
        value={directory.slug}
        disabled
      />

      {/* DESCRIPTION */}
      <RichTextEditor name="description" />

      {/* PRODUCT SUPPLIES */}
      <Section title="Product Supplies">
        {(directory.productSupplies || []).map((item: string, i: number) => (
          <input
            key={i}
            className="input"
            value={item}
            onChange={(e) => {
              const arr = [...directory.productSupplies]
              arr[i] = e.target.value
              setDirectory({ ...directory, productSupplies: arr })
            }}
          />
        ))}
      </Section>

      {/* SOCIAL LINKS */}
      <Section title="Social Media">
        {["facebook", "linkedin", "twitter", "youtube"].map((key) => (
          <input
            key={key}
            className="input"
            placeholder={key}
            value={directory.socialLinks?.[key] || ""}
            onChange={(e) =>
              setDirectory({
                ...directory,
                socialLinks: {
                  ...directory.socialLinks,
                  [key]: e.target.value,
                },
              })
            }
          />
        ))}
      </Section>

      <button
        onClick={saveChanges}
        disabled={saving}
        className="mt-6 bg-black text-white px-6 py-2 rounded"
      >
        {saving ? "Saving..." : "Save Changes"}
      </button>
    </div>
  )
}

function Section({ title, children }: any) {
  return (
    <div className="mt-6 space-y-2">
      <h3 className="font-semibold">{title}</h3>
      {children}
    </div>
  )
}
