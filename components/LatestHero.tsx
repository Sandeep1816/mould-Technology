"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import type { Post } from "@/types/Post" // ✅ USE SHARED TYPE

type LatestHeroProps = {
  post: Post
}

export default function LatestHero({ post }: LatestHeroProps) {
  const [latestPosts, setLatestPosts] = useState<Post[]>([])

  useEffect(() => {
    async function fetchLatest() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/posts?limit=1000`
        )
        const data = await res.json()
        const all: Post[] = data.data || data

        const filtered = all
          .filter((p) =>
            typeof p.category === "object"
              ? p.category?.slug?.toLowerCase() === "latest"
              : String(p.category || "").toLowerCase() === "latest"
          )
          .filter((p) => p.id !== post.id)
          .slice(0, 3)

        setLatestPosts(filtered)
      } catch (err) {
        console.error("Failed to load latest posts", err)
      }
    }

    fetchLatest()
  }, [post.id])

  const imageUrl =
    post.imageUrl && post.imageUrl.startsWith("http")
      ? post.imageUrl
      : post.imageUrl
      ? `${process.env.NEXT_PUBLIC_API_URL}${post.imageUrl}`
      : "/placeholder.svg"

  const date = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "Today"

  return (
    <section className="max-w-7xl mx-auto px-6 mt-8">
      <div className="grid grid-cols-1 lg:grid-cols-[1.7fr_1fr] gap-8 items-start">
        {/* ================= LEFT FEATURED CARD ================= */}
        <Link
          href={`/post/${post.slug}`}
          className="relative h-[420px] rounded-2xl overflow-hidden group"
        >
          <Image
            src={imageUrl}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

          <div className="absolute bottom-0 p-6 text-white max-w-[90%]">
            {typeof post.category === "object" && post.category?.name && (
              <span className="inline-block bg-orange-500 text-xs font-semibold px-3 py-1 rounded-full mb-3">
                {post.category.name}
              </span>
            )}

            <h1 className="text-white text-2xl md:text-3xl font-bold leading-snug mb-3">
              {post.title}
            </h1>

            <div className="flex items-center gap-4 text-sm text-gray-300">
              {post.author?.name && (
                <span className="flex items-center gap-2">
                  <img
                    src={post.author.avatarUrl || "/avatar-placeholder.png"}
                    alt={post.author.name}
                    className="w-6 h-6 rounded-full border border-white/30"
                  />
                  <span>By {post.author.name}</span>
                </span>
              )}

              {typeof post.views === "number" && (
                <span>{post.views.toLocaleString()} Views</span>
              )}

              <span>{date}</span>
            </div>
          </div>
        </Link>

        {/* ================= RIGHT SIDEBAR ================= */}
        <div className="space-y-6">
          {latestPosts.map((item) => {
            const thumb =
              item.imageUrl && item.imageUrl.startsWith("http")
                ? item.imageUrl
                : item.imageUrl
                ? `${process.env.NEXT_PUBLIC_API_URL}${item.imageUrl}`
                : "/placeholder.svg"

            const itemDate = item.publishedAt
              ? new Date(item.publishedAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              : ""

            return (
              <Link
                key={item.id}
                href={`/post/${item.slug}`}
                className="flex gap-4 items-start border-b border-gray-200 pb-6 group"
              >
                <div className="relative w-[88px] h-[88px] rounded-xl overflow-hidden shrink-0">
                  <Image
                    src={thumb}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex-1">
                  {typeof item.category === "object" && item.category?.name && (
                    <span className="inline-block text-xs font-semibold px-2 py-1 rounded bg-green-500 text-white mb-2">
                      {item.category.name}
                    </span>
                  )}

                  <h3 className="text-[17px] font-semibold leading-snug text-[#121213] group-hover:text-blue-600 transition">
                    {item.title}
                  </h3>

                  <div className="flex items-center gap-3 text-xs text-gray-400 mt-2">
                    {item.author?.name && (
                      <span className="flex items-center gap-1">
                        <img
                          src={
                            item.author.avatarUrl ||
                            "/avatar-placeholder.png"
                          }
                          alt={item.author.name}
                          className="w-5 h-5 rounded-full"
                        />
                        <span>{item.author.name}</span>
                      </span>
                    )}

                    {typeof item.views === "number" && (
                      <span>{item.views.toLocaleString()} Views</span>
                    )}

                    {itemDate && <span>{itemDate}</span>}
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
