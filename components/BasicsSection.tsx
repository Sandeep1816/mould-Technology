"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import type { Post } from "../types/Post"

type BasicsSectionProps = {
  posts?: Post[]
}

export default function BasicsSection({ posts = [] }: BasicsSectionProps) {
  const [displayPosts, setDisplayPosts] = useState<Post[]>(posts)

  useEffect(() => {
    if (posts.length === 0) {
      async function fetchPosts() {
        try {
          const res = await fetch("https://newsprk-backend.onrender.com/api/posts")
          const data = await res.json()
          const allPosts: Post[] = data.data || data
          const basicsPosts = allPosts.filter((p) =>
            typeof p.category === "object"
              ? p.category?.slug?.toLowerCase().includes("basics")
              : String(p.category || "").toLowerCase().includes("basics")
          )
          setDisplayPosts(basicsPosts.slice(0, 3))
        } catch (err) {
          console.error("Failed to load Basics posts:", err)
        }
      }
      fetchPosts()
    }
  }, [posts])

  return (
    <section className="bg-white py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-4xl font-bold text-teal-900">Basics</h2>
          <Link
            href="/basics"
            className="border-2 border-teal-700 text-teal-700 px-6 py-2 font-bold hover:bg-teal-700 hover:text-white transition duration-300"
          >
            VIEW ALL &gt;
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Side - 3 Blog Posts */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {displayPosts.map((post) => (
                <div
                  key={post.id}
                  className="rounded-lg overflow-hidden shadow hover:shadow-lg transition duration-300 flex flex-col bg-white border border-gray-100"
                >
                  {/* Image */}
                  <div className="relative w-full h-48 bg-gray-200">
                    <img
                      src={
                        post.imageUrl?.startsWith("http")
                          ? post.imageUrl
                          : post.imageUrl
                          ? `https://newsprk-backend.onrender.com${post.imageUrl}`
                          : "/placeholder.svg"
                      }
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-5 flex flex-col grow">
                    {/* Category Badge */}
                    {post.category && (
                      <div className="mb-3">
                        <span className="bg-teal-600 text-white px-3 py-1 text-xs font-bold uppercase tracking-wider">
                          {typeof post.category === "object" ? post.category?.name : post.category}
                        </span>
                      </div>
                    )}

                    {/* Date */}
                    {post.publishedAt && (
                      <span className="text-xs text-gray-500 font-semibold mb-2">
                        {new Date(post.publishedAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    )}

                    {/* Title */}
                    <h3 className="font-bold text-gray-900 mb-3 line-clamp-3 leading-tight">
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    {post.excerpt && (
                      <p className="text-sm text-gray-600 mb-4 line-clamp-3 grow">
                        {post.excerpt}
                      </p>
                    )}

                    {/* Read More Link */}
                    <Link
                      href={`/post/${post.slug}`}
                      className="text-teal-600 font-bold text-sm hover:text-teal-700 transition flex items-center gap-1"
                    >
                      READ MORE <span>›</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Advertisements */}
          <div className="lg:col-span-1">
            <div className="sticky top-4">
              <h3 className="text-lg font-bold text-gray-700 mb-4">Advertisement</h3>
              <div className="space-y-6">
                {/* Advertisement 1 */}
                <div className="bg-linear-to-br from-purple-700 to-pink-600 rounded-lg overflow-hidden shadow hover:shadow-lg transition duration-300">
                  <img
                    src="/event-registration-banner.jpg"
                    alt="Advertisement 1"
                    className="w-full h-auto object-cover"
                  />
                </div>

                {/* Advertisement 2 */}
                <div className="bg-gray-100 rounded-lg overflow-hidden shadow hover:shadow-lg transition duration-300">
                  <img
                    src="/product-banner.jpg"
                    alt="Advertisement 2"
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
