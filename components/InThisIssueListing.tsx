"use client"

import Link from "next/link"
import type { Post } from "@/types/Post"

type Props = {
  posts: Post[]
}

export default function InThisIssueListing({ posts }: Props) {
  return (
    <section className="max-w-7xl mx-auto px-6 py-10">
      {/* PAGE TITLE */}
      <h1
        className="text-[36px] font-bold text-[#003B5C] mb-10"
        style={{
          fontFamily:
            "Oswald, Helvetica Neue, Helvetica, Arial, sans-serif",
        }}
      >
        In This Issue
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-10">
        {/* LEFT – ARTICLES */}
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
                {/* IMAGE */}
                <img
                  src={imageUrl}
                  alt={post.title}
                  className="w-full h-[180px] object-contain border bg-white"
                />

                {/* CONTENT */}
                <div>
                  {/* BADGE + DATE */}
                  <div className="flex items-center gap-3 mb-2">
                    <span className="bg-gray-700 text-white text-xs px-2 py-1 font-bold uppercase">
                      {post.badge || "In This Issue"}
                    </span>
                    <span className="text-xs text-gray-500">{date}</span>
                  </div>

                  {/* TITLE */}
                  <h2
                    className="text-[22px] font-bold text-gray-900 leading-snug mb-3"
                    style={{
                      fontFamily:
                        "Oswald, Helvetica Neue, Helvetica, Arial, sans-serif",
                    }}
                  >
                    {post.title}
                  </h2>

                  {/* EXCERPT */}
                  <p className="text-gray-600 text-[15px] leading-relaxed mb-4">
                    {post.excerpt ||
                      post.content
                        ?.replace(/<[^>]+>/g, "")
                        .substring(0, 160) + "..."}
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
                    Read More →
                  </Link>
                </div>
              </article>
            )
          })}

          {!posts.length && (
            <p className="text-gray-500">
              No articles found for this issue.
            </p>
          )}
        </div>

        {/* RIGHT – ADS */}
        <aside className="space-y-6 sticky top-24 h-fit">
          <img src="/ads/ad1.jpg" className="w-full border" />
          <img src="/ads/ad2.jpg" className="w-full border" />
          <img src="/ads/ad3.jpg" className="w-full border" />
          <img src="/ads/ad4.jpg" className="w-full border" />
        </aside>
      </div>
    </section>
  )
}
