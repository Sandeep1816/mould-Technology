"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import RegistrationModal from "@/components/magazine/RegistrationModal"
import FlipBookViewer from "@/components/FlipBookViewer"

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
  <div className="max-w-[1320px] mx-auto px-4 md:px-6 lg:px-[15px] py-12">

    <FlipBookViewer pages={magazine.flipbookPages || []} />

    <h1 className="text-3xl font-bold mt-10 mb-4">
      {magazine.title}
    </h1>

    {magazine.description && (
      <div
        className="prose max-w-none mb-8"
        dangerouslySetInnerHTML={{ __html: magazine.description }}
      />
    )}

    {magazine.pdfUrl && (
      <button
        onClick={() => setOpen(true)}
        className="bg-black text-white px-6 py-3 rounded"
      >
        Download PDF
      </button>
    )}

    {open && (
      <RegistrationModal
        magazineId={magazine.id}
        onClose={() => setOpen(false)}
      />
    )}
  </div>
)

}
