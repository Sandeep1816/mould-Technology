"use client"

import { useEffect, useState } from "react"

type Article = {
  id: number
  title: string
  company?: {
    id: number
    name: string
  }
}

export default function AdminArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("token")
      : null

  // 🔹 Fetch pending articles
  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/articles/pending`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then(res => res.json())
      .then(data => setArticles(data))
      .catch(err => console.error(err))
  }, [token])

  // ✅ APPROVE
  async function handleApprove(id: number) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/articles/${id}/approve`,
      {
        method: "PUT", // ✅ FIXED
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    if (res.ok) {
      setArticles(prev => prev.filter(a => a.id !== id))
    }
  }

  // ❌ REJECT
  async function handleReject(id: number) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/articles/${id}/reject`,
      {
        method: "PUT", // ✅ FIXED
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    if (res.ok) {
      setArticles(prev => prev.filter(a => a.id !== id))
    }
  }

  return (
    <div className="max-w-5xl mx-auto p-10">
      <h1 className="text-2xl font-bold mb-6">
        Pending Articles
      </h1>

      {articles.length === 0 && (
        <p className="text-gray-500">
          No pending articles 🎉
        </p>
      )}

      {articles.map(article => (
        <div
          key={article.id}
          className="border rounded p-4 mb-4"
        >
          <h2 className="font-semibold text-lg">
            {article.title}
          </h2>

          <p className="text-sm text-gray-500">
            Company: {article.company?.name || "—"}
          </p>

          <div className="flex gap-4 mt-4">
            <button
              onClick={() => handleApprove(article.id)}
              className="bg-green-600 text-white px-4 py-1 rounded"
            >
              Approve
            </button>

            <button
              onClick={() => handleReject(article.id)}
              className="bg-red-600 text-white px-4 py-1 rounded"
            >
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
