"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import type { Post } from "@/types/Post"

interface LatestIssuesProps {
  posts?: Post[]
}

/* ================= COLOR CONFIG ================= */

// Badge → Color mapping (scalable)
const BADGE_COLORS: Record<string, string> = {
  FEATURED: "bg-[#E11D48]",   // red
  WEBINAR: "bg-[#7C3AED]",    // purple
  EVENT: "bg-[#0EA5E9]",      // blue
  TRENDING: "bg-[#F97316]",   // orange
  EXCLUSIVE: "bg-[#059669]",  // green
}

// Category → Color mapping (fallback)
const CATEGORY_COLORS: Record<string, string> = {
  gaming: "bg-[#0073FF]",
  fashion: "bg-[#E033E0]",
  "latest-issue": "bg-[#F69C00]",
}

export default function LatestIssues({
  posts: initialPosts = [],
}: LatestIssuesProps) {
  const [posts, setPosts] = useState<Post[]>(initialPosts)

  useEffect(() => {
    if (!initialPosts.length) {
      ;(async () => {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/posts?limit=1000`
        )
        const data = await res.json()
        const all: Post[] = data.data || data

        const filtered = all.filter((p) =>
          typeof p.category === "object"
            ? p.category?.slug?.includes("latest-issue")
            : false
        )

        setPosts(filtered.slice(0, 3))
      })()
    } else {
      setPosts(initialPosts.slice(0, 3))
    }
  }, [initialPosts])

  if (!posts.length) return null

  return (
    <section className="pt-[40px] w-full">
      <div className="max-w-[1320px] mx-auto px-[12px]">
        <div className="relative bg-[#F7F7F7] rounded-[18px] px-[24px] py-[28px]">

          {/* background shapes */}
          <Image
            src="/images/shape/flower-shape-01.png"
            alt=""
            width={120}
            height={120}
            className="absolute top-0 right-0 opacity-40 pointer-events-none"
          />
          <Image
            src="/images/shape/flower-shape-02.png"
            alt=""
            width={120}
            height={120}
            className="absolute bottom-0 left-2 opacity-40 pointer-events-none"
          />

          {/* posts */}
          <div className="flex flex-wrap gap-y-6 gap-x-6 relative z-10">
            {posts.map((post) => {
              const slug =
                typeof post.category === "object"
                  ? post.category?.slug || ""
                  : ""

              const categoryName =
                typeof post.category === "object"
                  ? post.category?.name || ""
                  : ""

              const badge = post.badge?.trim()

              /* ================= TEXT LOGIC ================= */
              // Badge wins → else category
              const tagText = badge ? badge : categoryName

              /* ================= COLOR LOGIC ================= */
              let tagClass = "bg-[#9CA3AF]" // default gray

              if (badge) {
                tagClass =
                  BADGE_COLORS[badge.toUpperCase()] || "bg-[#6B7280]"
              } else {
                const match = Object.keys(CATEGORY_COLORS).find((key) =>
                  slug.includes(key)
                )
                if (match) tagClass = CATEGORY_COLORS[match]
              }

              return (
                <div
                  key={post.id}
                  className="w-full md:w-[calc(50%-12px)] xl:w-[calc(33.333%-16px)]"
                >
                  <div className="flex gap-5 bg-white rounded-[14px] p-5 h-full">
                    {/* thumbnail */}
                    <Link
                      href={`/post/${post.slug}`}
                      className="relative w-[96px] h-[96px] rounded-[12px] overflow-hidden flex-shrink-0"
                    >
                      <Image
                        src={
                          post.imageUrl?.startsWith("http")
                            ? post.imageUrl
                            : `${process.env.NEXT_PUBLIC_API_URL}${post.imageUrl}`
                        }
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                    </Link>

                    {/* content */}
                    <div className="flex flex-col gap-2">
                      {tagText && (
                        <Link
                          href={`/category/${slug}`}
                          className={`${tagClass} text-white px-4 py-[4px] rounded-full rounded-tl-none w-fit text-xs font-medium`}
                        >
                          {tagText}
                        </Link>
                      )}

                      <h6 className="text-[18px] leading-snug font-semibold text-[#121213] underline hover:text-[#0073FF] transition">
                        <Link href={`/post/${post.slug}`}>
                          {post.title}
                        </Link>
                      </h6>

                      <div className="flex items-center gap-4 text-[13px] text-[#616C74]">
                        <span>
                          By{" "}
                          <span className="font-medium">
                            {post.author?.name || "rstheme"}
                          </span>
                        </span>
                        <span>
                          {post.views?.toLocaleString() || 0} Views
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

        </div>
      </div>
    </section>
  )
}
