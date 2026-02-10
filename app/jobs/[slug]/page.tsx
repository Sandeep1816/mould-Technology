"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { MapPin, Briefcase } from "lucide-react"
// import { ApplySection } from "./ApplySection"

export default function JobDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const [job, setJob] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!slug) return

    // 1️⃣ Increment job view (fire-and-forget)
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/jobs/${slug}/view`,
      { method: "POST" }
    ).catch(() => {})

    // 2️⃣ Fetch job details
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/jobs/${slug}`)
      .then(res => res.json())
      .then(setJob)
      .finally(() => setLoading(false))
  }, [slug])

  if (loading) return <div className="p-10">Loading job...</div>
  if (!job) return <div className="p-10">Job not found</div>

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-2">
        {job.title}
      </h1>

      <div className="flex gap-6 text-sm text-gray-600 mb-6">
        <span className="flex items-center gap-1">
          <MapPin size={14} />
          {job.location}
        </span>

        <span className="flex items-center gap-1">
          <Briefcase size={14} />
          {job.employmentType || "Full-time"}
        </span>
      </div>

      <div className="prose max-w-none mb-10">
        <p className="whitespace-pre-line">
          {job.description}
        </p>
      </div>

      {/* 🔐 Apply requires auth */}
      {/* <ApplySection jobId={job.id} /> */}
    </div>
  )
}
