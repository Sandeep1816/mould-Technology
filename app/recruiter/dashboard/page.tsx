"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import {
  Briefcase,
  Users,
  Clock,
  TrendingUp,
  Bell,
  MapPin,
} from "lucide-react"
import { useRecruiterGuard } from "@/lib/useRecruiterGuard"

/* ================= TYPES ================= */

type RecentJob = {
  id: number
  title: string
  applications?: number
}

type Recruiter = {
  username: string
  fullName?: string
  headline?: string
  location?: string
  avatarUrl?: string
}

type DashboardData = {
  jobsCount: number
  applicationsCount: number
  shortlistedCount: number
  recentJobs: RecentJob[]
}

/* ================= PAGE ================= */

export default function RecruiterDashboard() {
  // ⚠️ HOOKS MUST ALWAYS RUN
  const allowed = useRecruiterGuard()

  const [dashboard, setDashboard] = useState<DashboardData>({
    jobsCount: 0,
    applicationsCount: 0,
    shortlistedCount: 0,
    recentJobs: [],
  })

  const [recruiter, setRecruiter] = useState<Recruiter | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!allowed) return

    async function loadAll() {
      try {
        const token = localStorage.getItem("token")

        /* ===== DASHBOARD DATA ===== */
       const dashboardRes = await fetch(
  `${process.env.NEXT_PUBLIC_API_URL}/api/recruiters/dashboard`,

          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )

        const dashboardData = await dashboardRes.json()

        setDashboard({
          jobsCount: dashboardData.jobsCount ?? 0,
          applicationsCount: dashboardData.applicationsCount ?? 0,
          shortlistedCount: dashboardData.shortlistedCount ?? 0,
          recentJobs: dashboardData.recentJobs ?? [],
        })

        /* ===== RECRUITER PROFILE ===== */
        const profileRes = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/recruiters/me`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )

        const recruiterData = await profileRes.json()
        setRecruiter(recruiterData)
      } catch (err) {
        console.error("Dashboard load error:", err)
      } finally {
        setLoading(false)
      }
    }

    loadAll()
  }, [allowed])

  /* ================= RENDER GUARDS ================= */

  if (!allowed) return null
  if (loading) return <div className="p-10">Loading dashboard...</div>

  /* ================= UI ================= */

  return (
    <div className="min-h-screen bg-[#f6f8fc] px-6 py-10">
      <div className="max-w-[1400px] mx-auto grid grid-cols-12 gap-8">

        {/* ================= MAIN ================= */}
        <main className="col-span-12 xl:col-span-9 space-y-8">

          {/* HEADER */}
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome{recruiter?.fullName ? `, ${recruiter.fullName}` : ""}
            </h1>
            <span className="text-sm text-gray-500">
              {new Date().toDateString()}
            </span>
          </div>

          {/* KPI CARDS */}
          <div className="grid md:grid-cols-3 gap-6">
            <KpiCard
              title="Applications"
              value={dashboard.applicationsCount}
              icon={<Users />}
              color="bg-purple-500"
            />
            <KpiCard
              title="Shortlisted"
              value={dashboard.shortlistedCount}
              icon={<TrendingUp />}
              color="bg-cyan-500"
            />
            <KpiCard
              title="Active Jobs"
              value={dashboard.jobsCount}
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
              <ActionCard
                icon={<Briefcase className="text-blue-600" />}
                title="My Jobs"
                desc="View and manage your posted jobs"
              />
            </Link>

            <Link
              href="/recruiter/jobs/new"
              className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition"
            >
              <ActionCard
                icon={<TrendingUp className="text-green-600" />}
                title="Post a Job"
                desc="Create a new job listing"
              />
            </Link>
          </div>

          {/* RECENT JOBS */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="font-semibold text-lg mb-4">
              Recent Job Posts
            </h2>

            {dashboard.recentJobs.length === 0 ? (
              <p className="text-sm text-gray-500">No recent jobs found</p>
            ) : (
              <table className="w-full text-sm">
                <tbody className="divide-y">
                  {dashboard.recentJobs.map((job) => (
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

          {/* PROFILE CARD */}
          <div className="bg-white rounded-2xl shadow p-6 text-center">
            <img
              src={recruiter?.avatarUrl || "https://i.pravatar.cc/100"}
              className="w-20 h-20 rounded-full mx-auto mb-3"
            />

            <h3 className="font-semibold">
              {recruiter?.fullName || recruiter?.username}
            </h3>

            {recruiter?.headline && (
              <p className="text-sm text-gray-500">
                {recruiter.headline}
              </p>
            )}

            {recruiter?.location && (
              <p className="text-xs text-gray-400 flex items-center justify-center gap-1 mt-1">
                <MapPin size={12} />
                {recruiter.location}
              </p>
            )}

            {recruiter?.username && (
              <Link
                href={`/recruiter/${recruiter.username}`}
                className="inline-block mt-4 text-sm text-blue-600 hover:underline"
              >
                View Public Profile
              </Link>
            )}
          </div>

          {/* ACTIVITY */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Bell size={16} /> Activity
            </h3>
            <ul className="text-sm space-y-3 text-gray-600">
     <Link
  href="/recruiter/jobs"
  className="flex items-center gap-1 text-sm text-gray-600 hover:underline"
>
  <Users size={14} />
  View Applicants
</Link>


              {/* <li>New applications received</li> */}
              <li>Job post nearing expiry</li>
              <li>Candidates shortlisted</li>

            </ul>
          </div>
        </aside>
      </div>
    </div>
  )
}

/* ================= COMPONENTS ================= */

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

function ActionCard({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode
  title: string
  desc: string
}) {
  return (
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
        {icon}
      </div>
      <div>
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-sm text-gray-500">{desc}</p>
      </div>
    </div>
  )
}
