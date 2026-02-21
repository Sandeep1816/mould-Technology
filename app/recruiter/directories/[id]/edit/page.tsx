"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import RichTextEditor from "@/components/RichTextField"
import UploadBox from "@/components/UploadBox"

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

        setDirectory({
          ...data,
          tradeNames: data.tradeNames || [""],
          videoGallery: data.videoGallery || [""],
          productSupplies: data.productSupplies || [""],
          socialLinks: data.socialLinks || {},
        })
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
    <div className="max-w-4xl mx-auto p-10 space-y-6">
      <h1 className="text-2xl font-bold">Edit Supplier Directory</h1>

      {/* NAME */}
      <input
        className="input"
        value={directory.name}
        onChange={(e) =>
          setDirectory({ ...directory, name: e.target.value })
        }
      />

      {/* SLUG (READ ONLY) */}
      <input className="input bg-gray-100" value={directory.slug} disabled />

      {/* PHONE */}
      <input
        className="input"
        placeholder="Phone Number"
        value={directory.phoneNumber || ""}
        onChange={(e) =>
          setDirectory({ ...directory, phoneNumber: e.target.value })
        }
      />

      {/* EMAIL */}
      <input
        className="input"
        placeholder="Email"
        value={directory.email || ""}
        onChange={(e) =>
          setDirectory({ ...directory, email: e.target.value })
        }
      />

      {/* WEBSITE */}
      <input
        className="input"
        placeholder="Website"
        value={directory.website || ""}
        onChange={(e) =>
          setDirectory({ ...directory, website: e.target.value })
        }
      />

      {/* DESCRIPTION */}
      <RichTextEditor
        value={directory.description}
        onChange={(val: string) =>
          setDirectory({ ...directory, description: val })
        }
      />

      {/* LOGO */}
      <UploadBox
        label="Company Logo"
        value={directory.logoUrl}
        onUpload={(file) =>
          handleImageUpload(file, directory, setDirectory, "logoUrl")
        }
      />

      {/* COVER IMAGE */}
      <UploadBox
        label="Cover Image"
        value={directory.coverImageUrl}
        onUpload={(file) =>
          handleImageUpload(file, directory, setDirectory, "coverImageUrl")
        }
      />

      {/* PRODUCT SUPPLIES */}
      <Section title="Product Supplies">
        {directory.productSupplies.map((item: string, i: number) => (
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

      {/* TRADE NAMES */}
      <Section title="Trade Names">
        {directory.tradeNames.map((item: string, i: number) => (
          <input
            key={i}
            className="input"
            value={item}
            onChange={(e) => {
              const arr = [...directory.tradeNames]
              arr[i] = e.target.value
              setDirectory({ ...directory, tradeNames: arr })
            }}
          />
        ))}
      </Section>

      {/* VIDEO GALLERY */}
      <Section title="YouTube Video Links">
        {directory.videoGallery.map((item: string, i: number) => (
          <input
            key={i}
            className="input"
            value={item}
            onChange={(e) => {
              const arr = [...directory.videoGallery]
              arr[i] = e.target.value
              setDirectory({ ...directory, videoGallery: arr })
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
        className="bg-black text-white px-6 py-2 rounded"
      >
        {saving ? "Saving..." : "Save Changes"}
      </button>
    </div>
  )
}

/* ---------------- IMAGE UPLOAD ---------------- */
async function handleImageUpload(
  file: File,
  directory: any,
  setDirectory: any,
  field: "logoUrl" | "coverImageUrl"
) {
  const formData = new FormData()
  formData.append("image", file)

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/upload`,
    {
      method: "POST",
      body: formData,
    }
  )

  const data = await res.json()

  setDirectory({
    ...directory,
    [field]: data.imageUrl,
  })
}

/* ---------------- SECTION ---------------- */
function Section({ title, children }: any) {
  return (
    <div className="space-y-2">
      <h3 className="font-semibold">{title}</h3>
      {children}
    </div>
  )
}
