"use client"

import { useEffect, useState } from "react"
import { 
  ChevronDown, 
  Briefcase, 
  MapPin, 
  Clock, 
  Calendar,
  Building2,
  TrendingUp,
  Search,
  Filter
} from "lucide-react"

type Job = {
  id: number
  title: string
  location: string
  employmentType: string
  createdAt: string
}

type CompanyJobs = {
  id: number
  name: string
  slug: string
  jobsCount: number
  jobs: Job[]
}

export default function AdminJobsPage() {
  const [companies, setCompanies] = useState<CompanyJobs[]>([])
  const [openCompanyId, setOpenCompanyId] = useState<number | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("token")
      : null

  useEffect(() => {
    setLoading(true)
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/jobs/admin/company-jobs`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        setCompanies(data)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
  }, [token])

  // Filter companies by search term
  const filteredCompanies = companies.filter(company =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Calculate total jobs
  const totalJobs = companies.reduce((sum, company) => sum + company.jobsCount, 0)

  const getEmploymentTypeColor = (type: string) => {
    const types: { [key: string]: string } = {
      "FULL_TIME": "bg-green-100 text-green-700 border-green-200",
      "PART_TIME": "bg-blue-100 text-blue-700 border-blue-200",
      "CONTRACT": "bg-purple-100 text-purple-700 border-purple-200",
      "INTERNSHIP": "bg-orange-100 text-orange-700 border-orange-200",
      "REMOTE": "bg-cyan-100 text-cyan-700 border-cyan-200",
    }
    return types[type] || "bg-gray-100 text-gray-700 border-gray-200"
  }

  const formatEmploymentType = (type: string) => {
    return type.replace(/_/g, " ").toLowerCase().replace(/\b\w/g, l => l.toUpperCase())
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading jobs...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Job Management
              </h1>
              <p className="text-gray-600">
                Manage all job listings across companies
              </p>
            </div>
          </div>

          {/* STATS CARDS */}
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-medium mb-1">
                    Total Companies
                  </p>
                  <h3 className="text-3xl font-bold text-gray-900">
                    {companies.length}
                  </h3>
                </div>
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Building2 className="w-7 h-7 text-white" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-medium mb-1">
                    Total Jobs
                  </p>
                  <h3 className="text-3xl font-bold text-gray-900">
                    {totalJobs}
                  </h3>
                </div>
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Briefcase className="w-7 h-7 text-white" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-medium mb-1">
                    Avg Jobs/Company
                  </p>
                  <h3 className="text-3xl font-bold text-gray-900">
                    {companies.length > 0 ? (totalJobs / companies.length).toFixed(1) : 0}
                  </h3>
                </div>
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <TrendingUp className="w-7 h-7 text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* SEARCH BAR */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search companies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
              />
            </div>
          </div>
        </div>

        {/* COMPANIES LIST */}
        <div className="space-y-4">
          {filteredCompanies.length === 0 && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
              <Building2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg font-medium mb-2">
                {searchTerm ? "No companies match your search" : "No companies found"}
              </p>
              <p className="text-gray-400 text-sm">
                {searchTerm ? "Try adjusting your search terms" : "Companies will appear here once they post jobs"}
              </p>
            </div>
          )}

          {filteredCompanies.map((company, index) => (
            <div
              key={company.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all"
              style={{
                animation: `fadeIn 0.3s ease-out ${index * 0.1}s both`
              }}
            >
              {/* COMPANY HEADER */}
              <button
                onClick={() =>
                  setOpenCompanyId(
                    openCompanyId === company.id ? null : company.id
                  )
                }
                className="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition-colors group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                    <span className="text-white text-xl font-bold">
                      {company.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="text-left">
                    <h2 className="text-lg font-semibold text-gray-900">
                      {company.name}
                    </h2>
                    <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                      <Briefcase className="w-4 h-4" />
                      {company.jobsCount} active {company.jobsCount === 1 ? "job" : "jobs"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="bg-indigo-50 text-indigo-700 text-sm font-semibold px-4 py-2 rounded-full border border-indigo-200">
                    {company.jobsCount}
                  </span>
                  <ChevronDown
                    className={`transition-transform text-gray-400 group-hover:text-gray-600 ${
                      openCompanyId === company.id ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </button>

              {/* JOBS LIST */}
              {openCompanyId === company.id && (
                <div className="border-t border-gray-200 bg-gray-50">
                  {company.jobs.length === 0 && (
                    <div className="p-8 text-center">
                      <Briefcase className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-sm text-gray-500">
                        No active jobs for this company
                      </p>
                    </div>
                  )}

                  <div className="divide-y divide-gray-200">
                    {company.jobs.map((job, jobIndex) => (
                      <div
                        key={job.id}
                        className="p-6 hover:bg-white transition-colors group"
                        style={{
                          animation: `slideIn 0.3s ease-out ${jobIndex * 0.05}s both`
                        }}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex gap-4 flex-1">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform border border-blue-100">
                              <Briefcase className="w-6 h-6 text-blue-600" />
                            </div>

                            <div className="flex-1">
                              <h3 className="font-semibold text-gray-900 mb-2 text-lg">
                                {job.title}
                              </h3>
                              
                              <div className="flex flex-wrap items-center gap-3 text-sm">
                                <div className="flex items-center gap-1.5 text-gray-600">
                                  <MapPin className="w-4 h-4 text-gray-400" />
                                  <span>{job.location}</span>
                                </div>
                                
                                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${getEmploymentTypeColor(job.employmentType)}`}>
                                  <Clock className="w-3 h-3" />
                                  {formatEmploymentType(job.employmentType)}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="text-right flex-shrink-0">
                            <div className="flex items-center gap-1.5 text-xs text-gray-500 bg-gray-100 px-3 py-1.5 rounded-lg">
                              <Calendar className="w-3.5 h-3.5" />
                              <span>
                                {new Date(job.createdAt).toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric"
                                })}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  )
}