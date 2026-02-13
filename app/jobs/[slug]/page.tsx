"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import {
  MapPin,
  Briefcase,
  IndianRupee,
  Clock,
  Eye,
  Building2,
} from "lucide-react"
import Link from "next/link"

export default function JobDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const [job, setJob] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!slug) return

    // 👁️ Increment view
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/jobs/${slug}/view`,
      { method: "POST" }
    ).catch(() => {})

    // 📦 Fetch job
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/jobs/${slug}`)
      .then(res => res.json())
      .then(setJob)
      .finally(() => setLoading(false))
  }, [slug])

  if (loading) return <div className="p-10">Loading job...</div>
  if (!job) return <div className="p-10">Job not found</div>

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">

      {/* 🔹 Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">
          {job.title}
        </h1>

        <div className="flex flex-wrap gap-6 text-sm text-gray-600">

          <span className="flex items-center gap-1">
            <Building2 size={14} />
            {job.company?.name}
          </span>

          <span className="flex items-center gap-1">
            <MapPin size={14} />
            {job.location}
          </span>

          <span className="flex items-center gap-1">
            <Briefcase size={14} />
            {job.employmentType}
          </span>

          {job.salaryRange && (
            <span className="flex items-center gap-1">
              <IndianRupee size={14} />
              {job.salaryRange}
            </span>
          )}

          {job.experience && (
            <span className="flex items-center gap-1">
              <Clock size={14} />
              {job.experience}
            </span>
          )}

          <span className="flex items-center gap-1">
            <Eye size={14} />
            {job.views} views
          </span>
        </div>
      </div>

      {/* 🔹 Remote Badge */}
      {job.isRemote && (
        <div className="inline-block bg-green-100 text-green-700 text-xs px-3 py-1 rounded mb-6">
          Remote Available
        </div>
      )}

      {/* 🔹 Description */}
      <div className="prose max-w-none mb-10">
        <h2 className="text-xl font-semibold mb-3">
          Job Description
        </h2>
        <p className="whitespace-pre-line">
          {job.description}
        </p>
      </div>

      {/* 🔹 Posted Date */}
      <div className="text-sm text-gray-500 mb-10">
        Posted on {new Date(job.createdAt).toLocaleDateString()}
      </div>

      {/* 🔹 Apply Button */}
      <Link href={"/signup?role=candidate"}>   
       <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition">
        Apply Now
      </button>
      
      </Link>
     
    </div>
  )
}
