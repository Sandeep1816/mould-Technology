"use client"

import Link from "next/link"
import {
  Briefcase,
  Users,
  Clock,
  TrendingUp,
  Bell,
} from "lucide-react"

export default function RecruiterDashboard() {
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

          {/* KPI CARDS (STATIC UI) */}
          <div className="grid md:grid-cols-3 gap-6">
            <KpiCard
              title="Applications"
              value="12.2K"
              change="+5%"
              icon={<Users />}
              color="bg-purple-500"
            />
            <KpiCard
              title="Shortlisted"
              value="11.1K"
              change="+14%"
              icon={<TrendingUp />}
              color="bg-cyan-500"
            />
            <KpiCard
              title="On Hold"
              value="6.8K"
              change="-4%"
              icon={<Clock />}
              color="bg-orange-400"
            />
          </div>

          {/* QUICK ACTIONS (REAL LINKS) */}
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
                  <h2 className="text-lg font-semibold">
                    My Jobs
                  </h2>
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
                  <h2 className="text-lg font-semibold">
                    Post a Job
                  </h2>
                  <p className="text-sm text-gray-500">
                    Create a new job listing
                  </p>
                </div>
              </div>
            </Link>
          </div>

          {/* TOP ACTIVE JOBS (STATIC TABLE UI) */}
          <div className="bg-white rounded-2xl shadow p-6">
            <div className="flex justify-between mb-4">
              <h2 className="font-semibold text-lg">
                Top Active Jobs
              </h2>
              <span className="text-sm text-blue-600">
                Last 30 days
              </span>
            </div>

            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-400 border-b">
                  <th className="pb-2">Job Title</th>
                  <th className="pb-2">Applications</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {[
                  ["Full Stack Developer", 203],
                  ["iOS Developer", 121],
                  ["Product Designer", 95],
                  ["Design Lead", 76],
                ].map(([title, count]) => (
                  <tr key={title as string}>
                    <td className="py-3 font-medium">
                      {title}
                    </td>
                    <td className="py-3">{count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ACQUISITIONS (STATIC) */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="font-semibold text-lg mb-4">
              Acquisitions
            </h2>

            <div className="space-y-3 text-sm">
              <Progress label="Applications" value={64} />
              <Progress label="Shortlisted" value={18} />
              <Progress label="On Hold" value={10} />
              <Progress label="Rejected" value={8} />
            </div>
          </div>
        </main>

        {/* ================= SIDEBAR ================= */}
        <aside className="col-span-12 xl:col-span-3 space-y-6">

          {/* PROFILE (STATIC) */}
          <div className="bg-white rounded-2xl shadow p-6 text-center">
            <img
              src="https://i.pravatar.cc/100"
              className="w-20 h-20 rounded-full mx-auto mb-3"
            />
            <h3 className="font-semibold">
              Recruiter
            </h3>
            <p className="text-sm text-gray-500">
              Hiring Manager
            </p>
          </div>

          {/* ACTIVITY */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Bell size={16} /> Activity
            </h3>

            <ul className="text-sm space-y-3 text-gray-600">
              <li>3 new applications today</li>
              <li>Job post expires in 3 days</li>
              <li>7 candidates shortlisted</li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  )
}

/* ================= COMPONENTS ================= */

function KpiCard({ title, value, change, icon, color }: any) {
  return (
    <div className="bg-white rounded-2xl shadow p-6 flex justify-between">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <h3 className="text-2xl font-bold">{value}</h3>
        <span className="text-sm text-green-500">
          {change}
        </span>
      </div>
      <div
        className={`w-12 h-12 rounded-full flex items-center justify-center text-white ${color}`}
      >
        {icon}
      </div>
    </div>
  )
}

function Progress({ label, value }: any) {
  return (
    <div>
      <div className="flex justify-between mb-1">
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div className="h-2 bg-gray-100 rounded">
        <div
          className="h-2 bg-blue-600 rounded"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  )
}
