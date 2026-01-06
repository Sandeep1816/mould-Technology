"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

type VideoPost = {
  id: number
  title: string
  slug: string
  category?: { name: string; slug?: string } | string
  publishedAt?: string
  imageUrl?: string
  views?: number
  author?: {
    name: string
    avatarUrl?: string
  }
}

export default function VideosSection() {
  const [videos, setVideos] = useState<VideoPost[]>([])

  useEffect(() => {
    async function fetchVideos() {
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

      setVideos(filtered.slice(0, 4))
    }

    fetchVideos()
  }, [])

  if (!videos.length) return null

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
          month: "short",
          day: "numeric",
          year: "numeric",
        })
      : ""

  const AuthorMeta = ({ video }: { video?: VideoPost }) =>
    video?.author ? (
      <span className="flex items-center gap-2">
        <img
          src={video.author.avatarUrl || "/avatar-placeholder.png"}
          alt={video.author.name}
          className="w-6 h-6 rounded-full border border-white/30"
        />
        {video.author.name}
      </span>
    ) : null

  return (
    /* ✅ EXACT NERIO SECTION SPACING */
    <section className="bg-[#171A1E] pt-[70px] pb-[80px] text-white">
      {/* ✅ EXACT BOOTSTRAP CONTAINER */}
      <div className="max-w-[1320px] mx-auto px-[15px]">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-[36px] font-semibold">Video News</h2>

          <Link
            href="/videos"
            className="text-sm font-medium flex items-center gap-2"
          >
            View Channel →
          </Link>
        </div>

        {/* GRID — col-xl-8 / col-xl-4 */}
        <div className="grid grid-cols-1 lg:grid-cols-[8fr_4fr] gap-8">

          {/* FEATURED VIDEO */}
          <Link
            href={`/post/${featured.slug}`}
            className="relative h-[460px] rounded-xl overflow-hidden group"
          >
            <Image
              src={imageUrl(featured)}
              alt={featured.title}
              fill
              className="object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

            {/* PLAY BUTTON */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-red-600 rounded-full p-5">
                ▶
              </div>
            </div>

            {/* CONTENT */}
            <div className="absolute bottom-6 left-6 max-w-[85%]">
              <span className="bg-[#F69C00] text-xs font-bold px-3 py-1 rounded">
                {typeof featured.category === "object"
                  ? featured.category?.name
                  : featured.category}
              </span>

              <h3 className="text-[28px] font-semibold mt-4 leading-snug">
                {featured.title}
              </h3>

              <div className="flex items-center gap-4 text-sm text-gray-300 mt-3">
                <AuthorMeta video={featured} />
                <span>{date(featured.publishedAt)}</span>
                {featured.views && <span>{featured.views.toLocaleString()} Views</span>}
              </div>
            </div>
          </Link>

          {/* SIDE VIDEOS */}
          <div className="space-y-6">
            {sideVideos.map((video) => (
              <Link
                key={video.id}
                href={`/post/${video.slug}`}
                className="flex gap-4 pb-6 border-b border-white/10"
              >
                <div className="relative w-[120px] h-[90px] rounded-lg overflow-hidden">
                  <Image
                    src={imageUrl(video)}
                    alt={video.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="bg-red-600 rounded-full p-2">▶</div>
                  </div>
                </div>

                <div>
                  <span className="bg-[#54BD05] text-xs font-bold px-3 py-1 rounded">
                    {typeof video.category === "object"
                      ? video.category?.name
                      : video.category}
                  </span>

                  <h4 className="text-base font-semibold mt-2 leading-snug line-clamp-2">
                    {video.title}
                  </h4>

                  <div className="flex items-center gap-3 text-xs text-gray-400 mt-2">
                    <AuthorMeta video={video} />
                    {video.views && <span>{video.views.toLocaleString()} Views</span>}
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
