"use client"

import Link from "next/link"
import type { Post } from "@/types/Post"

type FeaturedPostsSectionProps = {
  posts: Post[]          // pass at least 6 posts
}

export default function FeaturedPostsSection({
  posts = [],
}: FeaturedPostsSectionProps) {
  if (!posts || posts.length < 2) return null

  // split posts into rows (2 posts per row)
  const rows = []
  for (let i = 0; i < Math.min(posts.length, 6); i += 2) {
    rows.push(posts.slice(i, i + 2))
  }

  const formatDate = (date?: string | null) =>
    date
      ? new Date(date).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })
      : ""

  return (
    <section className="bg-white py-14 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-bold text-[#121213]">
            Featured Post
          </h2>

          <Link
            href="/featured"
            className="text-sm font-semibold text-[#121213] hover:underline flex items-center gap-1"
          >
            View All →
          </Link>
        </div>

        {/* ROWS */}
        <div className="space-y-10">
          {rows.map((rowPosts, rowIndex) => (
            <div
              key={rowIndex}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              {/* 2 FEATURED POSTS */}
              {rowPosts.map((post) => {
                const imageUrl =
                  post.imageUrl && post.imageUrl.startsWith("http")
                    ? post.imageUrl
                    : post.imageUrl
                    ? `${process.env.NEXT_PUBLIC_API_URL}${post.imageUrl}`
                    : "/placeholder.svg"

                return (
                  <article
                    key={post.id}
                    className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition"
                  >
                    {/* Image */}
                    <Link href={`/post/${post.slug}`}>
                      <div className="relative h-[260px] overflow-hidden">
                        <img
                          src={imageUrl}
                          alt={post.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    </Link>

                    {/* Content */}
                    <div className="p-6">
                      {/* Category */}
                      {typeof post.category === "object" && post.category?.name && (
                        <span className="inline-block mb-3 bg-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase">
                          {post.category.name}
                        </span>
                      )}

                      {/* Title */}
                      <Link href={`/post/${post.slug}`}>
                        <h3 className="text-[20px] font-bold text-[#121213] leading-snug mb-4 hover:text-blue-600 transition">
                          {post.title}
                        </h3>
                      </Link>

                      {/* Meta */}
                      <div className="flex items-center gap-3 text-sm text-gray-500">
                        {post.author?.name && (
                          <span>By {post.author.name}</span>
                        )}

                        {typeof post.views === "number" && (
                          <span className="flex items-center gap-1">
                            ↗ {post.views.toLocaleString()} Views
                          </span>
                        )}

                        {post.publishedAt && (
                          <span>{formatDate(post.publishedAt)}</span>
                        )}
                      </div>
                    </div>
                  </article>
                )
              })}

              {/* ADVERTISEMENT (RIGHT CARD) */}
              <div className="rounded-xl overflow-hidden bg-gradient-to-br from-[#0F1C4D] to-[#1A2C6B] flex items-center justify-center">
                <div className="text-center p-8">
                  <img
                    src="/nerio-ad-preview.png"
                    alt="Advertisement"
                    className="mx-auto mb-6 max-h-[240px]"
                  />

                  <h4 className="text-white text-lg font-semibold mb-4">
                    Perfect WordPress Theme
                  </h4>

                  <Link
                    href="#"
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition"
                  >
                    Buy Now Mould  →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
