"use client"

import { useEffect, useMemo, useState } from "react"
import { FileText, Eye, Share2 } from "lucide-react"

/* ================= TYPES ================= */

type Company = {
  id: number
  name: string
}

type Article = {
  id: number
  title: string
  views: number
  shares: number
  company?: Company
}

/* ================= PAGE ================= */

export default function AdminArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [selectedCompanyId, setSelectedCompanyId] = useState<number | null>(null)
  const [status, setStatus] = useState<"PENDING" | "APPROVED">("APPROVED")

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("token")
      : null

  /* ================= FETCH ================= */

  useEffect(() => {
    if (!token) return

    const endpoint =
      status === "PENDING"
        ? "/api/admin/articles/pending"
        : "/api/admin/articles/adminapproved"

    fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => {
        setArticles(data)
        setSelectedCompanyId(null)
      })
      .catch(console.error)
  }, [token, status])

  /* ================= STATS ================= */

  const totalArticles = articles.length

  const totalViews = useMemo(
    () => articles.reduce((sum, a) => sum + (a.views ?? 0), 0),
    [articles]
  )

  const totalShares = useMemo(
  () => articles.reduce((sum, a) => sum + (a.shares ?? 0), 0),
  [articles]
)


  /* ================= GROUP BY COMPANY ================= */

  const companies = useMemo(() => {
    const map = new Map<number, { company: Company; count: number }>()

    articles.forEach(article => {
      if (!article.company) return

      if (!map.has(article.company.id)) {
        map.set(article.company.id, {
          company: article.company,
          count: 1,
        })
      } else {
        map.get(article.company.id)!.count++
      }
    })

    return Array.from(map.values())
  }, [articles])

  const filteredArticles = useMemo(() => {
    if (!selectedCompanyId) return []
    return articles.filter(a => a.company?.id === selectedCompanyId)
  }, [articles, selectedCompanyId])

  /* ================= UI ================= */

  return (
    <div className="min-h-screen bg-[#F4F6FA] p-8 space-y-8">

      {/* ================= HEADER ================= */}
      <div>
        <h1 className="text-2xl font-bold text-[#0A2B57]">
          Article Moderation
        </h1>
        <p className="text-sm text-gray-500">
          Review and manage company articles
        </p>
      </div>

      {/* ================= STATS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          label="Articles Posted"
          value={totalArticles}
          icon={<FileText />}
          color="bg-blue-600"
        />
        <StatCard
          label="Articles Viewed"
          value={totalViews}
          icon={<Eye />}
          color="bg-green-600"
        />
        <StatCard
          label="Articles Shared"
          value={totalShares}
          icon={<Share2 />}
          color="bg-purple-600"
        />
      </div>

      {/* ================= TABS ================= */}
      <div className="flex gap-3">
        {["PENDING", "APPROVED"].map(tab => (
          <button
            key={tab}
            onClick={() => setStatus(tab as any)}
            className={`px-5 py-2 rounded-md text-sm font-medium transition
              ${
                status === tab
                  ? "bg-[#0A2B57] text-white shadow"
                  : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-100"
              }
            `}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* ================= CONTENT ================= */}
      <div className="grid grid-cols-12 gap-6">

        {/* COMPANIES */}
        <aside className="col-span-3 bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <h2 className="font-semibold text-[#0A2B57] mb-4">
            Companies
          </h2>

          <ul className="space-y-2">
            {companies.map(({ company, count }) => (
              <li
                key={company.id}
                onClick={() => setSelectedCompanyId(company.id)}
                className={`p-3 rounded-md cursor-pointer flex justify-between items-center transition
                  ${
                    selectedCompanyId === company.id
                      ? "bg-blue-50 text-[#0A2B57] font-medium"
                      : "hover:bg-gray-100 text-gray-700"
                  }`}
              >
                <span>{company.name}</span>
                <span className="text-xs bg-gray-200 px-2 py-0.5 rounded">
                  {count}
                </span>
              </li>
            ))}
          </ul>
        </aside>

        {/* ARTICLES */}
        <main className="col-span-9 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          {!selectedCompanyId && (
            <p className="text-gray-500">
              Select a company to view articles
            </p>
          )}

          <ul className="space-y-4">
            {filteredArticles.map(article => (
              <li
                key={article.id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition"
              >
                <h3 className="font-semibold text-[#0A2B57]">
                  {article.title}
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  👁 {article.views} views
                </p>
                  <p className="text-xs text-gray-500 mt-1">
                  👁 {article.shares} views
                </p>
              </li>
            ))}
          </ul>
        </main>
      </div>
    </div>
  )
}

/* ================= STAT CARD ================= */

function StatCard({
  label,
  value,
  icon,
  color,
}: {
  label: string
  value: number
  icon: React.ReactNode
  color: string
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 flex justify-between items-center">
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <h3 className="text-2xl font-bold">{value}</h3>
      </div>
      <div
        className={`w-12 h-12 ${color} text-white rounded-lg flex items-center justify-center`}
      >
        {icon}
      </div>
    </div>
  )
}
