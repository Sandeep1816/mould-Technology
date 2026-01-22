"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { MapPin, Briefcase } from "lucide-react"
import { ApplySection } from "./ApplySection"

export default function JobDetailPage() {
  const params = useParams()
  const slug = params.slug as string

  const [job, setJob] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!slug) return

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/jobs/${slug}`)
      .then((res) => res.json())
      .then(setJob)
      .finally(() => setLoading(false))
  }, [slug])

  if (loading) return <div className="p-10">Loading job...</div>
  if (!job) return <div className="p-10">Job not found</div>

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold mb-2">{job.title}</h1>

      <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
        <span className="flex items-center gap-1">
          <MapPin size={14} />
          {job.location}
        </span>
        <span className="flex items-center gap-1">
          <Briefcase size={14} />
          {job.employmentType}
        </span>
      </div>

      <p className="text-gray-700 whitespace-pre-line mb-8">
        {job.description}
      </p>

      <ApplySection jobId={job.id} />
    </div>
  )
}
