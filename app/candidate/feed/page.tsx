"use client"

import { useEffect, useState } from "react"
import {
  MapPin,
  Briefcase,
  Clock,
  Users,
} from "lucide-react"
import Link from "next/link"

export default function CandidateFeedPage() {
  const [jobs, setJobs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/jobs`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setJobs(data)
        else if (Array.isArray(data.jobs)) setJobs(data.jobs)
      })
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <div className="p-10">Loading feed...</div>
  }

  return (
    <div className="bg-[#f3f2ef] min-h-screen">
      <div className="max-w-[1200px] mx-auto px-4 py-6 grid grid-cols-12 gap-6">

        {/* ================= LEFT SIDEBAR ================= */}
        <aside className="col-span-12 lg:col-span-3 space-y-4">

          {/* PROFILE CARD */}
          <div className="bg-white rounded-lg overflow-hidden shadow-sm">
            <div className="h-16 bg-gradient-to-r from-blue-600 to-indigo-600" />
            <div className="flex flex-col items-center -mt-8 pb-4">
              <img
                src="https://i.pravatar.cc/100"
                className="w-16 h-16 rounded-full border-2 border-white"
              />
              <h3 className="font-semibold mt-2">
                Candidate
              </h3>
              <p className="text-xs text-gray-500">
                Aspiring Professional
              </p>
            </div>

            <div className="border-t px-4 py-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">
                  Profile viewers
                </span>
                <span className="text-blue-600 font-medium">
                  24
                </span>
              </div>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div className="bg-white rounded-lg shadow-sm p-4 text-sm space-y-2">
            <p className="font-medium">Quick links</p>
            <p className="text-gray-600">Saved jobs</p>
            <p className="text-gray-600">My applications</p>
            <p className="text-gray-600">Job alerts</p>
          </div>
        </aside>

        {/* ================= FEED ================= */}
        <main className="col-span-12 lg:col-span-6 space-y-4">

          {/* START POST (STATIC UI) */}
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center gap-3">
              <img
                src="https://i.pravatar.cc/40"
                className="w-10 h-10 rounded-full"
              />
              <input
                disabled
                placeholder="Search jobs, companies, locations"
                className="flex-1 border rounded-full px-4 py-2 text-sm bg-gray-50"
              />
            </div>
          </div>

          {/* JOB POSTS */}
          {jobs.map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-lg shadow-sm p-5"
            >
              {/* HEADER */}
             {job.company?.slug ? (
  <Link
    href={`/company/${job.company.slug}`}
    className="flex items-center gap-3 mb-3 group"
  >
    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
      <Briefcase size={18} className="text-blue-600" />
    </div>

    <div>
      <p className="font-semibold text-sm group-hover:underline">
        {job.company.name}
      </p>
      <p className="text-xs text-gray-500">
        Hiring · {job.employmentType || "Full-time"}
      </p>
    </div>
  </Link>
) : (
  <div className="flex items-center gap-3 mb-3">
    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
      <Briefcase size={18} className="text-blue-600" />
    </div>
    <p className="font-semibold text-sm">Company</p>
  </div>
)}


              {/* TITLE */}
              <h2 className="font-semibold mb-1">
                {job.title}
              </h2>

              {/* META */}
              <div className="flex flex-wrap gap-4 text-xs text-gray-500 mb-3">
                <span className="flex items-center gap-1">
                  <MapPin size={12} />
                  {job.location}
                </span>

                <span className="flex items-center gap-1">
                  <Clock size={12} />
                  Recently posted
                </span>

                <span className="flex items-center gap-1">
                  <Users size={12} />
                  Actively hiring
                </span>
              </div>

              {/* DESCRIPTION */}
              <p className="text-sm text-gray-700 line-clamp-3 mb-4">
                {job.description}
              </p>

              {/* ACTIONS */}
              <div className="flex gap-4 text-sm">
                <Link
                  href={`/jobs/${job.slug}`}
                  className="text-blue-600 font-medium"
                >
                  View job
                </Link>

                <Link
                  href={`/jobs/${job.slug}#apply`}
                  className="text-gray-600"
                >
                  Apply
                </Link>
              </div>
            </div>
          ))}
        </main>

        {/* ================= RIGHT SIDEBAR ================= */}
        <aside className="col-span-12 lg:col-span-3 space-y-4">

          {/* NEWS */}
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h4 className="font-semibold mb-3">
              Job Market News
            </h4>

            <ul className="space-y-3 text-sm">
              <li>
                <p className="font-medium">
                  Hiring increases in tech
                </p>
                <p className="text-xs text-gray-500">
                  2h ago · 4,200 readers
                </p>
              </li>

              <li>
                <p className="font-medium">
                  Remote jobs still trending
                </p>
                <p className="text-xs text-gray-500">
                  4h ago · 2,100 readers
                </p>
              </li>

              <li>
                <p className="font-medium">
                  Interview tips for 2026
                </p>
                <p className="text-xs text-gray-500">
                  1d ago · 6,800 readers
                </p>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  )
}
