"use client"

import { useEffect, useMemo, useState } from "react"

/* ================= TYPES ================= */

type Company = {
  id: number
  name: string
}

type Article = {
  id: number
  title: string
  company?: Company
}

/* ================= PAGE ================= */

export default function AdminArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [selectedCompanyId, setSelectedCompanyId] = useState<number | null>(null)
  const [status, setStatus] = useState<"PENDING" | "APPROVED">("PENDING")

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
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        setArticles(data)
        setSelectedCompanyId(null)
      })
      .catch(console.error)
  }, [token, status])

  /* ================= DERIVED DATA ================= */

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

  /* ================= ACTIONS ================= */

  async function approve(id: number) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/articles/${id}/approve`,
      {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
      }
    )

    if (res.ok) {
      setArticles(prev => prev.filter(a => a.id !== id))
    }
  }

  async function reject(id: number) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/articles/${id}/reject`,
      {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
      }
    )

    if (res.ok) {
      setArticles(prev => prev.filter(a => a.id !== id))
    }
  }

  /* ================= UI ================= */

  return (
    <div className="min-h-screen bg-[#f6f8fc] p-8">
      <h1 className="text-2xl font-bold mb-6">
        Article Moderation
      </h1>

      {/* ================= TABS ================= */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setStatus("PENDING")}
          className={`px-4 py-2 rounded text-sm ${
            status === "PENDING"
              ? "bg-black text-white"
              : "bg-white border"
          }`}
        >
          Pending Articles
        </button>

        <button
          onClick={() => setStatus("APPROVED")}
          className={`px-4 py-2 rounded text-sm ${
            status === "APPROVED"
              ? "bg-black text-white"
              : "bg-white border"
          }`}
        >
          Approved Articles
        </button>
      </div>

      <div className="grid grid-cols-12 gap-6">

        {/* ================= LEFT: COMPANIES ================= */}
        <aside className="col-span-3 bg-white rounded-xl shadow p-4">
          <h2 className="font-semibold mb-4">
            Companies
          </h2>

          {companies.length === 0 && (
            <p className="text-sm text-gray-500">
              No {status.toLowerCase()} articles
            </p>
          )}

          <ul className="space-y-2">
            {companies.map(({ company, count }) => (
              <li
                key={company.id}
                onClick={() => setSelectedCompanyId(company.id)}
                className={`p-3 rounded cursor-pointer flex justify-between items-center
                  ${
                    selectedCompanyId === company.id
                      ? "bg-blue-50 text-blue-700"
                      : "hover:bg-gray-100"
                  }`}
              >
                <span className="text-sm font-medium">
                  {company.name}
                </span>
                <span className="text-xs bg-gray-200 px-2 py-0.5 rounded">
                  {count}
                </span>
              </li>
            ))}
          </ul>
        </aside>

        {/* ================= CENTER: ARTICLES ================= */}
        <main className="col-span-6 bg-white rounded-xl shadow p-6">
          <h2 className="font-semibold mb-4">
            Articles
          </h2>

          {!selectedCompanyId && (
            <p className="text-sm text-gray-500">
              Select a company to view articles
            </p>
          )}

          {selectedCompanyId && filteredArticles.length === 0 && (
            <p className="text-sm text-gray-500">
              No articles for this company
            </p>
          )}

          <ul className="space-y-3">
            {filteredArticles.map(article => (
              <li
                key={article.id}
                className="border rounded-lg p-4"
              >
                <h3 className="font-medium">
                  {article.title}
                </h3>
              </li>
            ))}
          </ul>
        </main>

        {/* ================= RIGHT: ACTION PANEL ================= */}
        <aside className="col-span-3 bg-white rounded-xl shadow p-6">
          <h2 className="font-semibold mb-4">
            {status === "PENDING"
              ? "Approve / Reject"
              : "Published Articles"}
          </h2>

          {!selectedCompanyId && (
            <p className="text-sm text-gray-500">
              Select an article to view details
            </p>
          )}

          <div className="space-y-4">
            {filteredArticles.map(article => (
              <div
                key={article.id}
                className="border rounded-lg p-4"
              >
                <p className="text-sm font-medium mb-3">
                  {article.title}
                </p>

                {status === "PENDING" && (
                  <div className="flex gap-3">
                    <button
                      onClick={() => approve(article.id)}
                      className="flex-1 bg-green-600 text-white py-1.5 rounded text-sm"
                    >
                      Approve
                    </button>

                    <button
                      onClick={() => reject(article.id)}
                      className="flex-1 bg-red-600 text-white py-1.5 rounded text-sm"
                    >
                      Reject
                    </button>
                  </div>
                )}

                {status === "APPROVED" && (
                  <span className="text-xs text-green-600 font-semibold">
                    Published
                  </span>
                )}
              </div>
            ))}
          </div>
        </aside>

      </div>
    </div>
  )
}
