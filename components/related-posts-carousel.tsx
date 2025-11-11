"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"

type Post = {
  id: number
  title: string
  slug: string
  excerpt?: string
  imageUrl?: string
  publishedAt?: string
  category?: any
}

export default function RelatedPostsCarousel() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchRelated() {
      try {
        const res = await fetch("https://newsprk-backend.onrender.com/api/posts?limit=1000")
        const data = await res.json()
        const allPosts = Array.isArray(data.data) ? data.data : []

        // Get the latest posts with categories
        const filtered = allPosts
          .sort((a: Post, b: Post) => new Date(b.publishedAt || "").getTime() - new Date(a.publishedAt || "").getTime())
          .slice(0, 4)

        setPosts(filtered)
      } catch (err) {
        console.error("Failed to load related posts", err)
      } finally {
        setLoading(false)
      }
    }

    fetchRelated()
  }, [])

  if (loading) {
    return (
      <section className="bg-white border-b border-gray-200 py-12 px-6">
        <div className="max-w-6xl mx-auto text-center text-gray-500">Loading related content...</div>
      </section>
    )
  }

  return (
    <section className="bg-white border-b border-gray-200 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <h2
          className="text-2xl md:text-3xl font-bold text-[#003049] mb-8 text-center"
          style={{ fontFamily: "Oswald, sans-serif" }}
        >
          Related Content
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {posts.map((post) => {
            const imageUrl =
              post.imageUrl && post.imageUrl.startsWith("http")
                ? post.imageUrl
                : post.imageUrl
                  ? `https://newsprk-backend.onrender.com${post.imageUrl}`
                  : "/placeholder.svg"

            const date = post.publishedAt
              ? new Date(post.publishedAt).toLocaleDateString("en-US", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })
              : "Today"

            const categoryName = typeof post.category === "object" ? post.category?.name || "LATEST" : "LATEST"

            return (
              <Link
                key={post.id}
                href={`/post/${post.slug}`}
                className="group flex flex-col bg-white border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                {/* Image */}
                <div className="relative w-full h-48 overflow-hidden bg-gray-200">
                  <Image
                    src={imageUrl || "/placeholder.svg"}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Content */}
                <div className="p-4 flex flex-col flex-1">
                  {/* Category Badge */}
                  <div className="mb-2">
                    <span
                      className="inline-block bg-[#0077b6] text-white text-xs font-bold px-3 py-1 rounded-none uppercase tracking-widest"
                      style={{ fontFamily: "Oswald, sans-serif" }}
                    >
                      {categoryName}
                    </span>
                  </div>

                  {/* Date */}
                  <p className="text-gray-500 text-xs uppercase tracking-widest mb-2">{date}</p>

                  {/* Title */}
                  <h3
                    className="text-base font-bold text-[#003049] mb-3 line-clamp-2 group-hover:text-[#0077b6] transition-colors"
                    style={{ fontFamily: "Oswald, sans-serif" }}
                  >
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  {post.excerpt && <p className="text-gray-700 text-sm line-clamp-2 mb-4 flex-1">{post.excerpt}</p>}

                  {/* Read More Link */}
                  <div className="text-[#d62839] font-bold text-sm uppercase tracking-widest group-hover:text-[#003049] transition-colors">
                    READ MORE &gt;
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
