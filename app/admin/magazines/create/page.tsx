"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import UploadBox from "@/components/UploadBox"

export default function CreateMagazinePage() {
  const router = useRouter()

  const [form, setForm] = useState<any>({
    flipbookPages: []
  })

  const [loading, setLoading] = useState(false)
  const [uploadingPages, setUploadingPages] = useState(false)

  /* ================= SINGLE FILE UPLOAD ================= */

  async function uploadFile(file: File, field: string) {
    const data = new FormData()
    data.append("image", file)

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/upload`, {
      method: "POST",
      body: data,
    })

    const result = await res.json()

    setForm((prev: any) => ({
      ...prev,
      [field]: result.imageUrl,
    }))
  }

  /* ================= MULTIPLE PAGE UPLOAD ================= */

  async function uploadFlipbookPage(file: File) {
    const data = new FormData()
    data.append("image", file)

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/upload`, {
      method: "POST",
      body: data,
    })

    const result = await res.json()

    setForm((prev: any) => ({
      ...prev,
      flipbookPages: [...(prev.flipbookPages || []), result.imageUrl],
    }))
  }

  async function handleFlipbookFiles(files: FileList | null) {
    if (!files) return

    setUploadingPages(true)

    for (const file of Array.from(files)) {
      await uploadFlipbookPage(file)
    }

    setUploadingPages(false)
  }

  function removePage(index: number) {
    setForm((prev: any) => ({
      ...prev,
      flipbookPages: prev.flipbookPages.filter(
        (_: string, i: number) => i !== index
      ),
    }))
  }

  /* ================= SUBMIT ================= */

  async function handleSubmit() {
    setLoading(true)
    const token = localStorage.getItem("token")

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/magazines`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...form,
        status: "PUBLISHED",
      }),
    })

    router.push("/admin/magazines")
  }

  return (
    <div className="max-w-4xl mx-auto p-10 space-y-8">
      <h1 className="text-2xl font-bold">Create Magazine</h1>

      {/* TITLE */}
      <input
        placeholder="Title"
        className="w-full border p-3 rounded"
        onChange={e => setForm({ ...form, title: e.target.value })}
      />

      {/* DESCRIPTION */}
      <textarea
        placeholder="Description"
        className="w-full border p-3 rounded"
        onChange={e => setForm({ ...form, description: e.target.value })}
      />

      {/* COVER IMAGE */}
      <UploadBox
        label="Cover Image"
        value={form.coverImageUrl}
        height="h-52"
        accept="image/*"
        onUpload={(file) => uploadFile(file, "coverImageUrl")}
      />

      {/* OPTIONAL PDF */}
      <UploadBox
        label="PDF File (Optional)"
        value={form.pdfUrl}
        height="h-40"
        accept="application/pdf"
        onUpload={(file) => uploadFile(file, "pdfUrl")}
      />

      {/* ================= FLIPBOOK PAGES ================= */}

      <div>
        <p className="font-medium mb-2">Flipbook Pages (Multiple Images)</p>

        <input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => handleFlipbookFiles(e.target.files)}
        />

        {uploadingPages && (
          <p className="text-sm text-gray-500 mt-2">
            Uploading pages...
          </p>
        )}

        {form.flipbookPages?.length > 0 && (
          <div className="grid grid-cols-3 gap-4 mt-4">
            {form.flipbookPages.map((img: string, index: number) => (
              <div key={index} className="relative">
                <img
                  src={img}
                  className="w-full h-40 object-cover rounded-lg border"
                />

                <button
                  type="button"
                  onClick={() => removePage(index)}
                  className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded"
                >
                  ✕
                </button>

                <p className="text-xs text-center mt-1">
                  Page {index + 1}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* SUBMIT */}
      <button
        onClick={handleSubmit}
        className="bg-black text-white px-6 py-2 rounded"
      >
        {loading ? "Publishing..." : "Publish"}
      </button>
    </div>
  )
}
