"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import type { Post } from "../types/Post"

export default function TrendingSection() {
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch("https://newsprk-backend.onrender.com/api/posts?limit=1000")
        const data = await res.json()
        const allPosts: Post[] = data.data || data

        const trendingPosts = allPosts.filter((p) =>
          typeof p.category === "object"
            ? p.category?.slug?.toLowerCase().includes("trending")
            : String(p.category || "").toLowerCase().includes("trending")
        )

        setPosts(trendingPosts.slice(0, 4)) // show 4 trending blogs
      } catch (err) {
        console.error("Failed to load Trending posts:", err)
      }
    }
    fetchPosts()
  }, [])

  if (posts.length === 0)
    return <div className="text-center py-10 text-gray-500">No Trending posts available.</div>

  // Split into pairs for rows
  const postPairs = []
  for (let i = 0; i < posts.length; i += 2) {
    postPairs.push(posts.slice(i, i + 2))
  }

  return (
    <section className="bg-white py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-left mb-10 text-gray-900">Trending</h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Section – 4 posts, grouped into two rows of 2 */}
          <div className="lg:col-span-2 space-y-8">
            {postPairs.map((pair, rowIndex) => (
              <div key={rowIndex} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {pair.map((post) => (
                  <div
                    key={post.id}
                    className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition duration-300 flex flex-col border border-gray-200"
                  >
                    {/* 🖼️ Image */}
                    <div className="relative w-full h-56">
                      <Image
                        src={
                          post.imageUrl?.startsWith("http")
                            ? post.imageUrl
                            : post.imageUrl
                            ? `https://newsprk-backend.onrender.com${post.imageUrl}`
                            : "/placeholder.jpg"
                        }
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* 📝 Text */}
                    <div className="p-5 flex flex-col grow">
                      {/* Category */}
                      {post.category && (
                        <div className="mb-3">
                          <span className="bg-blue-600 text-white px-3 py-1 text-xs font-bold uppercase tracking-wider">
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
                      <h3 className="font-bold text-lg text-gray-900 mb-3 leading-tight line-clamp-3">
                        {post.title}
                      </h3>

                      {/* Excerpt */}
                      {post.excerpt && (
                        <p className="text-sm text-gray-600 mb-4 line-clamp-3 grow">{post.excerpt}</p>
                      )}

                      {/* Read More */}
                      <Link
                        href={`/posts/${post.slug}`}
                        className="text-blue-600 font-bold hover:text-blue-700 text-sm flex items-center gap-1 mt-auto"
                      >
                        READ MORE <span>›</span>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Right Section – Single Ad column with 3 stacked ads */}
          <div className="lg:col-span-1 flex flex-col justify-between space-y-6">
            {["/advertisement-banner.jpg", "/advertisement-banner.jpg", "/advertisement-banner.jpg"].map(
              (ad, index) => (
                <div
                  key={index}
                  className="bg-gray-100 rounded-lg overflow-hidden shadow hover:shadow-lg transition duration-300 flex-1"
                >
                  <Image
                    src={ad}
                    alt={`Advertisement ${index + 1}`}
                    width={340}
                    height={260}
                    className="w-full h-full object-cover"
                  />
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
