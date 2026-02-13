"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import RegistrationModal from "@/components/magazine/RegistrationModal"

export default function SingleMagazinePage() {
  const { slug } = useParams()
  const [magazine, setMagazine] = useState<any>(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/magazines/${slug}`)
      .then(res => res.json())
      .then(setMagazine)
  }, [slug])

  if (!magazine) return <p className="p-10">Loading...</p>

  return (
    <div className="max-w-5xl mx-auto py-12 px-6">
      <img
        src={magazine.coverImageUrl}
        className="w-full h-96 object-cover rounded-xl mb-6"
      />

      <h1 className="text-3xl font-bold mb-4">{magazine.title}</h1>

      <div
        className="prose max-w-none mb-8"
        dangerouslySetInnerHTML={{ __html: magazine.description }}
      />

      <button
        onClick={() => setOpen(true)}
        className="bg-black text-white px-6 py-3 rounded"
      >
        Download Magazine
      </button>

      {open && (
        <RegistrationModal
          magazineId={magazine.id}
          onClose={() => setOpen(false)}
        />
      )}
    </div>
  )
}
