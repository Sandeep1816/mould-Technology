"use client"

import Link from "next/link"
import type { Post } from "@/types/Post"
import SupplierAds from "@/components/SupplierAds"

type Props = {
  posts: Post[]
}

export default function VideoListing({ posts }: Props) {
  return (
    <>
      {/* ================= HERO BANNER ================= */}
      <section className="w-full bg-black">
        <div className="relative w-full h-[330px] md:h-[330px] lg:h-[420px] overflow-hidden">
          <img
            src="/artificial-intelligence-technology.png" // 👈 replace with your banner image
            alt="Videos Banner"
            className="w-full h-full object-cover"
          />

          {/* OPTIONAL OVERLAY */}
          <div className="absolute inset-0 bg-black/40 flex items-center">
            <div className="max-w-7xl mx-auto px-6">
              {/* <h1
                className="text-white text-3xl md:text-4xl lg:text-5xl font-bold"
                style={{
                  fontFamily:
                    "Oswald, Helvetica Neue, Helvetica, Arial, sans-serif",
                }}
              >
                Videos
              </h1> */}
            </div>
          </div>
        </div>
      </section>

      {/* ================= VIDEO LIST ================= */}
      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-10">

          {/* LEFT – VIDEO LIST */}
          <div className="space-y-10">
            {posts.map((post) => {
              const imageUrl =
                post.imageUrl?.startsWith("http")
                  ? post.imageUrl
                  : post.imageUrl
                  ? `${process.env.NEXT_PUBLIC_API_URL}${post.imageUrl}`
                  : "/placeholder.svg"

              const date = post.publishedAt
                ? new Date(post.publishedAt).toLocaleDateString("en-US", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })
                : ""

              return (
                <article
                  key={post.id}
                  className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-6 pb-10 border-b border-gray-200"
                >
                  {/* THUMBNAIL + PLAY ICON */}
                  <div className="relative">
                    <img
                      src={imageUrl}
                      alt={post.title}
                      className="w-full h-[160px] object-cover rounded-sm"
                    />

                    <span className="absolute inset-0 flex items-center justify-center">
                      <span className="w-14 h-14 bg-black/70 rounded-full flex items-center justify-center text-white text-xl">
                        ▶
                      </span>
                    </span>
                  </div>

                  {/* CONTENT */}
                  <div>
                    {/* BADGE + DATE */}
                    <div className="flex items-center gap-4 mb-2">
                      {post.badge && (
                        <span className="bg-[#0072BC] text-white text-[11px] font-bold px-2 py-[2px] uppercase">
                          {post.badge}
                        </span>
                      )}

                      <span className="text-xs text-gray-500">
                        {date}
                      </span>
                    </div>

                    {/* TITLE */}
                    <h2
                      className="text-[22px] font-bold text-gray-900 leading-snug mb-3"
                      style={{
                        fontFamily:
                          "Oswald, Helvetica Neue, Helvetica, Arial, sans-serif",
                      }}
                    >
                      {post.title.length > 80
                        ? post.title.slice(0, 80) + "…"
                        : post.title}
                    </h2>

                    {/* EXCERPT */}
                    <p className="text-gray-600 text-[15px] leading-relaxed mb-4">
                      {post.excerpt
                        ? post.excerpt
                        : post.content
                            ?.replace(/<[^>]+>/g, "")
                            .slice(0, 180) + "..."}
                    </p>

                    {/* CTA */}
                    <Link
                      href={`/post/${post.slug}`}
                      className="text-[#0072BC] font-bold text-sm uppercase hover:underline"
                      style={{
                        fontFamily:
                          "Oswald, Helvetica Neue, Helvetica, Arial, sans-serif",
                      }}
                    >
                      Watch →
                    </Link>
                  </div>
                </article>
              )
            })}
          </div>

          {/* RIGHT – ADS */}
          <aside className="space-y-6 sticky top-24 h-fit">
            {/* <img src="/advertisement-banner.jpg" className="w-full border" />
            <img src="/advertisement-banner.jpg" className="w-full border" />
            <img src="/advertisement-banner.jpg" className="w-full border" /> */}
             <SupplierAds />
          </aside>

        </div>
      </section>
    </>
  )
}
