"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import {
  Briefcase,
  Users,
  Clock,
  TrendingUp,
  Bell,
} from "lucide-react"
import { useRecruiterGuard } from "@/lib/useRecruiterGuard"

/* ================= TYPES ================= */

type RecentJob = {
  id: number
  title: string
  applications?: number
}

type DashboardData = {
  jobsCount: number
  applicationsCount: number
  shortlistedCount: number
  recentJobs: RecentJob[]
}

/* ================= PAGE ================= */

export default function RecruiterDashboard() {
  // ✅ HOOKS MUST ALWAYS RUN
  const allowed = useRecruiterGuard()

  const [data, setData] = useState<DashboardData>({
    jobsCount: 0,
    applicationsCount: 0,
    shortlistedCount: 0,
    recentJobs: [],
  })

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!allowed) return

    async function loadDashboard() {
      try {
        const token = localStorage.getItem("token")

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/recruiter/dashboard`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )

        if (!res.ok) throw new Error("Failed to load dashboard")

        const result = await res.json()

        setData({
          jobsCount: result.jobsCount ?? 0,
          applicationsCount: result.applicationsCount ?? 0,
          shortlistedCount: result.shortlistedCount ?? 0,
          recentJobs: result.recentJobs ?? [],
        })
      } catch (err) {
        console.error("Dashboard error:", err)
      } finally {
        setLoading(false)
      }
    }

    loadDashboard()
  }, [allowed])

  /* ================= RENDER GUARDS ================= */

  if (!allowed) {
    return null // redirect handled inside useRecruiterGuard
  }

  if (loading) {
    return <div className="p-10">Loading dashboard...</div>
  }

  return (
    <div className="min-h-screen bg-[#f6f8fc] px-6 py-10">
      <div className="max-w-[1400px] mx-auto grid grid-cols-12 gap-8">

        {/* ================= MAIN ================= */}
        <main className="col-span-12 xl:col-span-9 space-y-8">

          {/* HEADER */}
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">
              Recruiter Dashboard
            </h1>
            <span className="text-sm text-gray-500">
              {new Date().toDateString()}
            </span>
          </div>

          {/* KPI CARDS */}
          <div className="grid md:grid-cols-3 gap-6">
            <KpiCard
              title="Applications"
              value={data.applicationsCount}
              icon={<Users />}
              color="bg-purple-500"
            />
            <KpiCard
              title="Shortlisted"
              value={data.shortlistedCount}
              icon={<TrendingUp />}
              color="bg-cyan-500"
            />
            <KpiCard
              title="Active Jobs"
              value={data.jobsCount}
              icon={<Clock />}
              color="bg-orange-400"
            />
          </div>

          {/* QUICK ACTIONS */}
          <div className="grid md:grid-cols-2 gap-6">
            <Link
              href="/recruiter/jobs"
              className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <Briefcase className="text-blue-600" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold">My Jobs</h2>
                  <p className="text-sm text-gray-500">
                    View and manage your posted jobs
                  </p>
                </div>
              </div>
            </Link>

            <Link
              href="/recruiter/jobs/new"
              className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <TrendingUp className="text-green-600" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold">Post a Job</h2>
                  <p className="text-sm text-gray-500">
                    Create a new job listing
                  </p>
                </div>
              </div>
            </Link>
          </div>

          {/* RECENT JOBS */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="font-semibold text-lg mb-4">
              Recent Job Posts
            </h2>

            {data.recentJobs.length === 0 ? (
              <p className="text-sm text-gray-500">
                No recent jobs found
              </p>
            ) : (
              <table className="w-full text-sm">
                <tbody className="divide-y">
                  {data.recentJobs.map((job) => (
                    <tr key={job.id}>
                      <td className="py-3 font-medium">{job.title}</td>
                      <td className="py-3 text-right">
                        {job.applications ?? 0} applications
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </main>

        {/* ================= SIDEBAR ================= */}
        <aside className="col-span-12 xl:col-span-3 space-y-6">
          <div className="bg-white rounded-2xl shadow p-6 text-center">
            <img
              src="https://i.pravatar.cc/100"
              className="w-20 h-20 rounded-full mx-auto mb-3"
            />
            <h3 className="font-semibold">Recruiter</h3>
            <p className="text-sm text-gray-500">
              Hiring Manager
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow p-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Bell size={16} /> Activity
            </h3>
            <ul className="text-sm space-y-3 text-gray-600">
              <li>New applications received</li>
              <li>Job post nearing expiry</li>
              <li>Candidates shortlisted</li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  )
}

/* ================= COMPONENT ================= */

function KpiCard({
  title,
  value,
  icon,
  color,
}: {
  title: string
  value: number
  icon: React.ReactNode
  color: string
}) {
  return (
    <div className="bg-white rounded-2xl shadow p-6 flex justify-between">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <h3 className="text-2xl font-bold">{value}</h3>
      </div>
      <div
        className={`w-12 h-12 rounded-full flex items-center justify-center text-white ${color}`}
      >
        {icon}
      </div>
    </div>
  )
}
