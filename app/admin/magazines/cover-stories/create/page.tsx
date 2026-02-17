"use client"

import { useEffect, useState } from "react"
import UploadBox from "@/components/UploadBox"
import { useRouter } from "next/navigation"

/* ================= TYPES ================= */

type Author = {
  id: number
  name: string
}

type CoverStoryForm = {
  title: string
  slug: string
  shortDescription: string
  keyCategories: string[]
  imageBrief: string
  fullDescription: string
  badge: string
  coverImageUrl?: string
  slugImageUrls: string[]
  authorId?: number
}

/* ================= HELPERS ================= */

function generateSlug(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
}

/* ================= COMPONENT ================= */

export default function CreateCoverStoryPage() {
  const router = useRouter()

  const [authors, setAuthors] = useState<Author[]>([])
  const [loading, setLoading] = useState(false)

  const [form, setForm] = useState<CoverStoryForm>({
    title: "",
    slug: "",
    shortDescription: "",
    keyCategories: [],
    imageBrief: "",
    fullDescription: "",
    badge: "",
    coverImageUrl: "",
    slugImageUrls: [],
  })

  /* ================= FETCH AUTHORS ================= */

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/magazines/authors`)
      .then(res => res.json())
      .then(data => {
        setAuthors(Array.isArray(data) ? data : [])
      })
  }, [])

  /* ================= UPLOAD SINGLE IMAGE ================= */

  async function uploadImage(file: File, field: keyof CoverStoryForm) {
    const data = new FormData()
    data.append("image", file)

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/upload`, {
      method: "POST",
      body: data,
    })

    const result = await res.json()

    setForm((prev) => ({
      ...prev,
      [field]: result.imageUrl,
    }))
  }

  /* ================= UPLOAD MULTIPLE IMAGES ================= */

  async function uploadExtraImage(file: File) {
    const data = new FormData()
    data.append("image", file)

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/upload`, {
      method: "POST",
      body: data,
    })

    const result = await res.json()

    setForm((prev) => ({
      ...prev,
      slugImageUrls: [...prev.slugImageUrls, result.imageUrl],
    }))
  }

  function removeImage(index: number) {
    setForm((prev) => ({
      ...prev,
      slugImageUrls: prev.slugImageUrls.filter((_, i) => i !== index),
    }))
  }

  /* ================= SUBMIT ================= */

  async function handleSubmit() {
    try {
      setLoading(true)

      const token = localStorage.getItem("token")

      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/magazines/cover-stories`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(form),
        }
      )

      router.push("/admin/magazines")
    } catch (err) {
      console.error("Create cover story error:", err)
    } finally {
      setLoading(false)
    }
  }

  /* ================= UI ================= */

  return (
    <div className="max-w-5xl mx-auto p-10 space-y-8">
      <h1 className="text-3xl font-bold">Create Cover Story</h1>

      {/* TITLE */}
      <input
        placeholder="Title"
        className="w-full border p-3 rounded"
        value={form.title}
        onChange={(e) => {
          const title = e.target.value
          setForm({
            ...form,
            title,
            slug: generateSlug(title),
          })
        }}
      />

      {/* SLUG */}
      <input
        placeholder="Slug"
        className="w-full border p-3 rounded"
        value={form.slug}
        onChange={(e) =>
          setForm({ ...form, slug: e.target.value })
        }
      />

      {/* SHORT DESCRIPTION */}
      <textarea
        placeholder="Short Description"
        className="w-full border p-3 rounded"
        value={form.shortDescription}
        onChange={(e) =>
          setForm({ ...form, shortDescription: e.target.value })
        }
      />

      {/* KEY CATEGORIES */}
      <input
        placeholder="Key Categories (comma separated)"
        className="w-full border p-3 rounded"
        onChange={(e) =>
          setForm({
            ...form,
            keyCategories: e.target.value
              .split(",")
              .map((cat) => cat.trim()),
          })
        }
      />

      {/* IMAGE BRIEF */}
      <textarea
        placeholder="Brief on Image Description"
        className="w-full border p-3 rounded"
        value={form.imageBrief}
        onChange={(e) =>
          setForm({ ...form, imageBrief: e.target.value })
        }
      />

      {/* FULL DESCRIPTION */}
      <textarea
        placeholder="Full Description"
        rows={6}
        className="w-full border p-3 rounded"
        value={form.fullDescription}
        onChange={(e) =>
          setForm({ ...form, fullDescription: e.target.value })
        }
      />

      {/* BADGE */}
      <input
        placeholder="Badge"
        className="w-full border p-3 rounded"
        value={form.badge}
        onChange={(e) =>
          setForm({ ...form, badge: e.target.value })
        }
      />

      {/* COVER IMAGE */}
      <UploadBox
        label="Cover Image"
        value={form.coverImageUrl}
        height="h-52"
        onUpload={(file) =>
          uploadImage(file, "coverImageUrl")
        }
      />

      {/* ADDITIONAL IMAGES */}
      <UploadBox
        label="Additional Images"
        multiple
        onUpload={uploadExtraImage}
      />

      {/* PREVIEW GRID */}
      {form.slugImageUrls.length > 0 && (
        <div className="grid grid-cols-3 gap-4">
          {form.slugImageUrls.map((img, index) => (
            <div key={index} className="relative">
              <img
                src={img}
                className="w-full h-40 object-cover rounded border"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      {/* AUTHOR DROPDOWN */}
      <select
        className="w-full border p-3 rounded"
        onChange={(e) =>
          setForm({
            ...form,
            authorId: Number(e.target.value),
          })
        }
      >
        <option value="">Select Author</option>
        {authors.map((a) => (
          <option key={a.id} value={a.id}>
            {a.name}
          </option>
        ))}
      </select>

      {/* SUBMIT */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-black text-white px-6 py-3 rounded hover:opacity-90"
      >
        {loading ? "Creating..." : "Create Cover Story"}
      </button>
    </div>
  )
}
