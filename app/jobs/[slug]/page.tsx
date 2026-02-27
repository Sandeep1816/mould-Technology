"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import {
  MapPin,
  Briefcase,
  IndianRupee,
  Clock,
  Eye,
  Building2,
  ChevronRight,
  Share2,
  Bookmark,
  ArrowLeft,
} from "lucide-react"

export default function JobDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const router = useRouter()

  const [job, setJob] = useState<any>(null)
  const [otherJobs, setOtherJobs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (!slug) return

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/jobs/${slug}/view`, {
      method: "POST",
    }).catch(() => {})

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/jobs/${slug}`)
      .then((res) => res.json())
      .then((data) => setJob(data))

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/jobs`)
      .then((res) => res.json())
      .then((jobs) => {
        const filtered = jobs
          .filter((j: any) => j.slug !== slug)
          .slice(0, 5)
        setOtherJobs(filtered)
      })
      .finally(() => setLoading(false))
  }, [slug])

  const handleApply = () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}")
    if (!user?.id) {
      router.push("/login")
      return
    }
    router.push(`/login`)
  }

  if (loading)
    return (
      <div className="min-h-screen bg-[#F4F2EE] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-full border-4 border-blue-600 border-t-transparent animate-spin" />
          <p className="text-sm text-gray-500 font-medium">Loading job details...</p>
        </div>
      </div>
    )

  if (!job)
    return (
      <div className="min-h-screen bg-[#F4F2EE] flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl font-semibold text-gray-700">Job not found</p>
          <p className="text-sm text-gray-400 mt-1">This listing may have been removed.</p>
        </div>
      </div>
    )

  const postedDate = new Date(job.createdAt)
  const daysAgo = Math.floor(
    (Date.now() - postedDate.getTime()) / (1000 * 60 * 60 * 24)
  )

  return (
    <div className="min-h-screen bg-[#F4F2EE]" style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}>

      {/* Top nav breadcrumb */}
      <div className="bg-white shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-2 text-sm text-gray-500">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-1 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft size={15} />
            Back to Jobs
          </button>
          <ChevronRight size={13} className="text-gray-300" />
          <span className="text-gray-800 font-medium truncate">{job.title}</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* ===== LEFT / MAIN ===== */}
        <div className="lg:col-span-2 space-y-4 min-w-0">

          {/* Hero Card */}
          <div className="bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.07)] overflow-hidden">

            {/* Color accent bar */}
            <div className="h-1.5 bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-500" />

            <div className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h1 className="text-[22px] font-bold text-gray-900 leading-tight">
                    {job.title}
                  </h1>

                  <div className="flex items-center gap-2 mt-2">
                    <span className="flex items-center gap-1.5 text-sm font-semibold text-blue-700">
                      <Building2 size={14} />
                      {job.company?.name}
                    </span>
                    <span className="text-gray-300">•</span>
                    <span className="text-xs text-gray-400">
                      {daysAgo === 0
                        ? "Posted today"
                        : daysAgo === 1
                        ? "Posted yesterday"
                        : `Posted ${daysAgo} days ago`}
                    </span>
                  </div>
                </div>

                {/* Company logo placeholder */}
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center shadow-sm flex-shrink-0">
                  <Building2 size={22} className="text-blue-500" />
                </div>
              </div>

              {/* Tags row */}
              <div className="flex flex-wrap gap-2 mt-5">
                <Tag icon={<MapPin size={12} />} label={job.location} />
                <Tag icon={<Briefcase size={12} />} label={job.employmentType} />
                {job.experience && (
                  <Tag icon={<Clock size={12} />} label={job.experience} />
                )}
                {job.salaryRange && (
                  <Tag icon={<IndianRupee size={12} />} label={job.salaryRange} />
                )}
                <Tag
                  icon={<Eye size={12} />}
                  label={`${job.views} views`}
                  variant="muted"
                />
              </div>

              {/* Actions */}
              {/* <div className="flex items-center gap-3 mt-6">
                <button
                  onClick={handleApply}
                  className="bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white text-sm font-semibold px-7 py-2.5 rounded-full transition-all duration-150 shadow-[0_2px_8px_rgba(37,99,235,0.35)]"
                >
                  Apply Now
                </button>

                <button
                  onClick={() => setSaved(!saved)}
                  className={`flex items-center gap-1.5 text-sm font-medium px-4 py-2.5 rounded-full transition-all duration-150 ${
                    saved
                      ? "bg-blue-50 text-blue-600"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  <Bookmark size={14} fill={saved ? "currentColor" : "none"} />
                  {saved ? "Saved" : "Save"}
                </button>

                <button className="ml-auto flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 transition-colors">
                  <Share2 size={14} />
                  Share
                </button>
              </div> */}
            </div>
          </div>

          {/* Description Card */}
          <div className="bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.07)] p-6">
            <h2 className="text-base font-bold text-gray-900 mb-4">
              Job Description
            </h2>

  <div
  className="prose max-w-none prose-sm text-gray-700
             prose-h1:text-lg prose-h2:text-base
             prose-h1:font-bold prose-h2:font-semibold
             prose-ul:list-disc prose-ul:pl-5
             prose-strong:text-gray-900
             break-words overflow-hidden"
  dangerouslySetInnerHTML={{ __html: job.description }}
/>

            <div className="mt-8 pt-5 border-t border-gray-100">
              <button
                onClick={handleApply}
                className="bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white text-sm font-semibold px-7 py-2.5 rounded-full transition-all duration-150 shadow-[0_2px_8px_rgba(37,99,235,0.35)]"
              >
                Apply for this position
              </button>
            </div>
          </div>

        </div>

        {/* ===== RIGHT SIDEBAR ===== */}
        <div className="space-y-4">

          {/* Job Overview */}
          <div className="bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.07)] p-6">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-4">
              Job Overview
            </h3>

            <div className="space-y-3.5">
              <OverviewRow label="Employment Type" value={job.employmentType} />
              {job.experience && (
                <OverviewRow label="Experience" value={job.experience} />
              )}
              {job.salaryRange && (
                <OverviewRow label="Salary Range" value={job.salaryRange} />
              )}
              <OverviewRow
                label="Posted On"
                value={postedDate.toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              />
              <OverviewRow label="Location" value={job.location} />
            </div>
          </div>

          {/* About Company */}
          <div className="bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.07)] p-6">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-3">
              About Company
            </h3>

            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
                <Building2 size={16} className="text-blue-500" />
              </div>
              <p className="text-sm font-semibold text-gray-800">
                {job.company?.name || "N/A"}
              </p>
            </div>

            <p className="text-xs text-gray-500 leading-relaxed">
              {job.company?.description ||
                "More information about this company is not available at the moment."}
            </p>
          </div>

          {/* More Jobs */}
          {otherJobs.length > 0 && (
            <div className="bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.07)] p-6">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-4">
                Similar Jobs
              </h3>

              <div className="space-y-1">
                {otherJobs.map((item) => (
                  <Link
                    key={item.id}
                    href={`/jobs/${item.slug}`}
                    className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Building2 size={12} className="text-gray-500" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-800 group-hover:text-blue-600 transition-colors truncate">
                        {item.title}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">{item.company?.name}</p>
                      <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                        <MapPin size={10} />
                        {item.location}
                      </p>
                    </div>

                    <ChevronRight
                      size={14}
                      className="text-gray-300 group-hover:text-blue-400 transition-colors flex-shrink-0 mt-1"
                    />
                  </Link>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

/* ── Helper Components ── */

function Tag({
  icon,
  label,
  variant = "default",
}: {
  icon: React.ReactNode
  label: string
  variant?: "default" | "muted"
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full ${
        variant === "muted"
          ? "bg-gray-100 text-gray-400"
          : "bg-blue-50 text-blue-700"
      }`}
    >
      {icon}
      {label}
    </span>
  )
}

function OverviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-2">
      <span className="text-xs text-gray-400 font-medium min-w-[90px]">{label}</span>
      <span className="text-xs text-gray-800 font-semibold text-right">{value}</span>
    </div>
  )
}