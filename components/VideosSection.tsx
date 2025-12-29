"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

type VideoPost = {
  id: number
  title: string
  slug: string
  excerpt?: string
  category?: { name: string; slug?: string } | string
  publishedAt?: string
  imageUrl?: string
  views?: number // ✅ ADD THIS
  author?: {
    name: string
    avatarUrl?: string
  }
}

export default function VideosSection() {
  const [videos, setVideos] = useState<VideoPost[]>([])

  useEffect(() => {
    async function fetchVideos() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/posts?limit=1000`
        )
        const data = await res.json()
        const all: VideoPost[] = data.data || data

        const filtered = all.filter((p) =>
          typeof p.category === "object"
            ? p.category?.slug?.toLowerCase().includes("video")
            : String(p.category || "").toLowerCase().includes("video")
        )

        // 1 featured + 3 side videos
        setVideos(filtered.slice(0, 4))
      } catch (err) {
        console.error("Failed to load videos:", err)
      }
    }

    fetchVideos()
  }, [])

  if (videos.length === 0) return null

  const featured = videos[0]
  const sideVideos = videos.slice(1)

  const imageUrl = (v?: VideoPost) =>
    v?.imageUrl?.startsWith("http")
      ? v.imageUrl
      : v?.imageUrl
      ? `${process.env.NEXT_PUBLIC_API_URL}${v.imageUrl}`
      : "/placeholder.jpg"

  const date = (d?: string) =>
    d
      ? new Date(d).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : ""

  /* ---------- AUTHOR META ---------- */
  const AuthorMeta = ({ video }: { video?: VideoPost }) => {
    if (!video?.author) return null

    return (
      <div className="flex items-center gap-2">
        <img
          src={video.author.avatarUrl || "/avatar-placeholder.png"}
          alt={video.author.name}
          className="w-6 h-6 rounded-full border border-white/20 object-cover"
        />
        <span>{video.author.name}</span>
      </div>
    )
  }

  return (
    <section className="bg-[#0f1318] py-16 px-6 text-white">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-white text-3xl font-semibold">Video News</h2>
          <Link
            href="/videos"
            className="text-sm text-gray-300 hover:text-white flex items-center gap-1"
          >
            View Channel →
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 🔥 FEATURED VIDEO */}
          <Link
            href={`/post/${featured.slug}`}
            className="lg:col-span-2 relative h-[420px] rounded-xl overflow-hidden group"
          >
            <Image
              src={imageUrl(featured)}
              alt={featured.title}
              fill
              className="object-cover group-hover:scale-105 transition duration-500"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

            {/* Play button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-red-600 rounded-full p-5 shadow-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="white"
                  className="w-6 h-6"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>

            {/* Content */}
            <div className="absolute bottom-6 left-6 max-w-xl">
              <span className="bg-orange-500 text-xs font-bold px-3 py-1 rounded">
                {typeof featured.category === "object"
                  ? featured.category?.name
                  : featured.category}
              </span>

              <h3 className="text-white text-3xl font-semibold mt-4 leading-snug">
                {featured.title}
              </h3>

              <div className="flex items-center gap-4 text-sm text-gray-300 mt-2">
                <AuthorMeta video={featured} />

                {typeof featured.views === "number" && (
                  <span>↗ {featured.views.toLocaleString()} Views</span>
                )}

                <span>{date(featured.publishedAt)}</span>
              </div>
            </div>
          </Link>

          {/* ▶️ SIDE VIDEOS */}
          <div className="space-y-6">
            {sideVideos.map((video) => (
              <Link
                key={video.id}
                href={`/post/${video.slug}`}
                className="flex gap-4 items-center border-b border-white/10 pb-6"
              >
                <div className="relative w-[110px] h-[90px] rounded-lg overflow-hidden">
                  <Image
                    src={imageUrl(video)}
                    alt={video.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                    <div className="bg-red-600 rounded-full p-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="white"
                        className="w-4 h-4"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div>
                  <span className="bg-green-500 text-xs font-bold px-3 py-1 rounded">
                    {typeof video.category === "object"
                      ? video.category?.name
                      : video.category}
                  </span>

                  <h4 className="text-white text-base font-semibold mt-2 leading-snug line-clamp-2">
                    {video.title}
                  </h4>

                  <div className="flex items-center gap-3 text-xs text-gray-400 mt-1">
                    <AuthorMeta video={video} />

                    {typeof video.views === "number" && (
                      <span>↗ {video.views.toLocaleString()} Views</span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
