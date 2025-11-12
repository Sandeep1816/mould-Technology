"use client"

import Link from "next/link"

type PassionOnWheelsProps = {
  post: any
}

export default function PassionOnWheels({ post }: PassionOnWheelsProps) {
  const imageUrl =
    post.imageUrl && post.imageUrl.startsWith("http")
      ? post.imageUrl
      : post.imageUrl
        ? `${process.env.NEXT_PUBLIC_API_URL}${post.imageUrl}`
        : "/manufacturing-machining.jpg"

  const date = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "TODAY"

  return (
    <section className="mb-0 bg-gray-100 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left Column */}
          <div className="flex flex-col justify-center">
            <div className="text-xs text-gray-600 font-bold tracking-widest mb-4 uppercase">{date}</div>
            <h1 className="text-4xl font-bold text-gray-900 leading-tight mb-4">{post.title}</h1>
            <p className="text-gray-700 text-base leading-relaxed mb-6">
              {post.excerpt || post.content?.substring(0, 200) || ""}
            </p>
            <Link
              href={`/post/${post.slug}`}
              className="text-teal-600 font-bold text-sm hover:text-teal-700 flex items-center gap-1 w-fit"
            >
              READ MORE <span>›</span>
            </Link>
          </div>

          {/* Right Column - Featured Image */}
          <div className="w-full">
            <img
              src={imageUrl || "/placeholder.svg"}
              alt={post.title}
              className="w-full h-80 object-cover border border-gray-300"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
