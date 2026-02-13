"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import UploadBox from "@/components/UploadBox"

export default function CreateMagazinePage() {
  const router = useRouter()
  const [form, setForm] = useState<any>({})
  const [loading, setLoading] = useState(false)

  async function uploadFile(file: File, field: string) {
    const data = new FormData()
    data.append("image", file)

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/upload`, {
      method: "POST",
      body: data,
    })

    const result = await res.json()
    setForm((prev: any) => ({ ...prev, [field]: result.imageUrl }))
  }

  async function handleSubmit() {
    setLoading(true)
    const token = localStorage.getItem("token")

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/magazines`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        ...form,
        status: "PUBLISHED"
      })
    })

    router.push("/admin/magazines")
  }

  return (
    <div className="max-w-3xl mx-auto p-10 space-y-6">
      <h1 className="text-2xl font-bold">Create Magazine</h1>

      <input
        placeholder="Title"
        className="input w-full"
        onChange={e => setForm({ ...form, title: e.target.value })}
      />

      <textarea
        placeholder="Description"
        className="input w-full"
        onChange={e => setForm({ ...form, description: e.target.value })}
      />

      <UploadBox
        label="Cover Image"
        value={form.coverImageUrl}
        onUpload={(file) => uploadFile(file, "coverImageUrl")}
      />

      <UploadBox
        label="PDF File"
        value={form.pdfUrl}
        onUpload={(file) => uploadFile(file, "pdfUrl")}
      />

      <button
        onClick={handleSubmit}
        className="bg-black text-white px-6 py-2 rounded"
      >
        {loading ? "Publishing..." : "Publish"}
      </button>
    </div>
  )
}
