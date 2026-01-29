"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

type Article = {
  id: number
  title: string
  slug: string
  createdAt: string
}

export default function RecruiterArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchArticles()
  }, [])

  async function fetchArticles() {
    try {
      const token = localStorage.getItem("token")

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/recruiter/articles`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      if (!res.ok) {
        throw new Error("Failed to fetch articles")
      }

      const data = await res.json()

      // ✅ SAFELY NORMALIZE RESPONSE
      const articlesArray: Article[] = Array.isArray(data)
        ? data
        : Array.isArray(data?.data)
        ? data.data
        : []

      setArticles(articlesArray)
    } catch (error) {
      console.error("Fetch articles error:", error)
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(id: number) {
    const ok = confirm("Are you sure you want to delete this article?")
    if (!ok) return

    try {
      const token = localStorage.getItem("token")

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/recruiter/articles/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      if (!res.ok) {
        throw new Error("Delete failed")
      }

      // ✅ Remove locally after delete
      setArticles(prev => prev.filter(article => article.id !== id))
    } catch (error) {
      alert("Failed to delete article")
    }
  }

  if (loading) {
    return <p className="p-10">Loading articles...</p>
  }

  return (
    <div className="max-w-5xl mx-auto p-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">My Articles</h1>

        <Link
          href="/recruiter/articles/create"
          className="bg-black text-white px-4 py-2 rounded"
        >
          + Create Article
        </Link>
      </div>

      {articles.length === 0 ? (
        <p className="text-gray-500">No articles created yet.</p>
      ) : (
        <div className="space-y-4">
          {articles.map(article => (
            <div
              key={article.id}
              className="border rounded-lg p-4 flex justify-between items-center"
            >
              <div>
                <h2 className="font-semibold">{article.title}</h2>
                <p className="text-sm text-gray-500">
                  {new Date(article.createdAt).toLocaleDateString()}
                </p>
              </div>

              <div className="flex gap-4">
                <Link
                  href={`/recruiter/articles/${article.id}/edit`}
                  className="text-blue-600 text-sm"
                >
                  Edit
                </Link>

                <button
                  onClick={() => handleDelete(article.id)}
                  className="text-red-600 text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
