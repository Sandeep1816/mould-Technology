"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"

type LatestHeroProps = {
  post: any
}

type Post = {
  id: number
  title: string
  slug: string
  excerpt?: string
  imageUrl?: string
  publishedAt?: string
  content?: string
  category?: any
}

export default function LatestHero({ post }: LatestHeroProps) {
  const [latestPosts, setLatestPosts] = useState<Post[]>([])

  // 🧩 Fetch all "latest" posts to show smaller ones below the main one
  useEffect(() => {
    async function fetchLatest() {
      try {
        const res = await fetch("https://newsprk-backend.onrender.com/api/posts?limit=1000")
        const data = await res.json()
        const all: Post[] = data.data || data

        // Filter category === "latest" and exclude main featured post
        const filtered = all
          .filter(
            (p) =>
              typeof p.category === "object"
                ? p.category?.slug?.toLowerCase() === "latest"
                : String(p.category || "").toLowerCase() === "latest"
          )
          .filter((p) => p.id !== post.id)
          .sort(
            (a, b) =>
              new Date(b.publishedAt || "").getTime() -
              new Date(a.publishedAt || "").getTime()
          )
          .slice(0, 3)

        setLatestPosts(filtered)
      } catch (err) {
        console.error("Failed to load latest posts", err)
      }
    }

    fetchLatest()
  }, [post.id])

  // 🧠 Main featured post image
  const imageUrl =
    post.imageUrl && post.imageUrl.startsWith("http")
      ? post.imageUrl
      : post.imageUrl
        ? `https://newsprk-backend.onrender.com${post.imageUrl}`
        : "/modern-manufacturing-facility.png"

  const date = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "TODAY"

  return (
    <section className="mb-12 border-t border-b border-gray-300 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* 🔹 FEATURED MAIN POST */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left Column */}
          <div className="flex flex-col justify-center">
            <div className="text-xs text-gray-600 font-bold tracking-widest mb-4 uppercase">
              {date}
            </div>

            <h1 className="text-3xl font-bold text-gray-900 leading-tight mb-4">
              {post.title}
            </h1>

            <p className="text-gray-700 text-base leading-relaxed mb-6 line-clamp-4">
              {post.excerpt ||
                post.content?.replace(/<[^>]+>/g, "").substring(0, 200) + "..." ||
                ""}
            </p>

            <Link
              href={`/post/${post.slug}`}
              className="text-teal-600 font-bold text-sm hover:text-teal-700 flex items-center gap-1 w-fit mb-10"
            >
              READ MORE <span>›</span>
            </Link>

            {/* LATEST heading */}
            <h3 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-gray-300 pb-1">
              LATEST
            </h3>

            {/* 🔸 Small latest posts (3) */}
            <div className="grid grid-cols-1 gap-4">
              {latestPosts.map((item) => (
                <div key={item.id} className="flex gap-3 items-start">
                  <div className="w-20 h-20 relative shrink-0">
                    <Image
                      src={
                        item.imageUrl && item.imageUrl.startsWith("http")
                          ? item.imageUrl
                          : item.imageUrl
                            ? `https://newsprk-backend.onrender.com${item.imageUrl}`
                            : "/placeholder.svg"
                      }
                      alt={item.title}
                      fill
                      className="object-cover rounded border"
                    />
                  </div>
                  <div className="flex flex-col justify-center">
                    <Link
                      href={`/post/${item.slug}`}
                      className="text-sm font-semibold text-gray-900 hover:text-teal-600 leading-snug"
                    >
                      {item.title}
                    </Link>
                    <p className="text-xs text-gray-500 line-clamp-2 mt-1">
                      {item.excerpt ||
                        item.content
                          ?.replace(/<[^>]+>/g, "")
                          .substring(0, 90) + "..."}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Featured Image */}
          <div className="w-full">
            <img
              src={imageUrl || "/placeholder.svg"}
              alt={post.title}
              className="w-full h-96 object-cover border border-gray-300 rounded"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
