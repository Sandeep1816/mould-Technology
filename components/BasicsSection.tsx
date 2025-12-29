"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import type { Post } from "../types/Post"

export default function BasicsSection() {
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    async function fetchPosts() {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/posts?limit=1000`
      )
      const json = await res.json()
      const allPosts: Post[] = json.data || json

      const basicsPosts = allPosts.filter((p) =>
        typeof p.category === "object"
          ? p.category?.slug?.toLowerCase().includes("basics")
          : String(p.category || "").toLowerCase().includes("basics")
      )

      setPosts(basicsPosts.slice(0, 6))
    }

    fetchPosts()
  }, [])

  if (!posts.length) return null

  return (
    <section className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-[34px] font-semibold tracking-tight text-[#111] font-oswald">
            Trending Stories
          </h2>

          <Link
            href="/basics"
            className="text-sm font-semibold uppercase tracking-wide text-[#0077b6] hover:underline"
          >
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          {/* LEFT CONTENT */}
          <div className="lg:col-span-3 space-y-10">
            {posts.map((post) => (
              <article
                key={post.id}
                className="flex gap-6 border-b pb-10 last:border-b-0"
              >
                {/* Image */}
                <Link
                  href={`/post/${post.slug}`}
                  className="w-[280px] h-[180px] flex-shrink-0 overflow-hidden rounded-md bg-gray-100"
                >
                  <img
                    src={
                      post.imageUrl?.startsWith("http")
                        ? post.imageUrl
                        : post.imageUrl
                        ? `${process.env.NEXT_PUBLIC_API_URL}${post.imageUrl}`
                        : "/placeholder.jpg"
                    }
                    alt={post.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </Link>

                {/* Content */}
                <div className="flex flex-col">
                  {/* Category */}
                  {post.category && (
                    <span className="inline-block mb-2 text-[11px] font-bold uppercase tracking-widest bg-[#0077b6] text-white px-3 py-1 w-fit">
                      {typeof post.category === "object"
                        ? post.category.name
                        : post.category}
                    </span>
                  )}

                  {/* Title */}
                  <Link href={`/post/${post.slug}`}>
                    <h3 className="text-[26px] leading-snug font-semibold text-[#111] hover:text-[#0077b6] transition-colors">
                      {post.title}
                    </h3>
                  </Link>

                  {/* Excerpt */}
                  {post.excerpt && (
                    <p className="mt-3 text-[15px] text-gray-600 leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  )}

                  {/* Meta */}
                  <div className="mt-4 flex items-center gap-4 text-[13px] text-gray-500">
                    <span>
                      By{" "}
                      <strong className="font-medium text-gray-700">
                        {post.author?.name}
                      </strong>
                    </span>

                    <span>•</span>

                    {post.views && <span>{post.views.toLocaleString()} Views</span>}

                    <span>•</span>

                    {post.publishedAt && (
                      <span>
                        {new Date(post.publishedAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* RIGHT SIDEBAR (same Nerio spacing) */}
          <aside className="lg:col-span-1 space-y-8">
            <div className="sticky top-24">
              <h4 className="text-lg font-semibold mb-4 border-b pb-2">
                Advertisement
              </h4>

              <div className="space-y-6">
                {[1, 2, 3].map((i) => (
                  <img
                    key={i}
                    src="/advertisement-banner.jpg"
                    className="w-full h-[180px] object-cover rounded-md border"
                    alt="Advertisement"
                  />
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
