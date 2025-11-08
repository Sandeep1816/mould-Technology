"use client"

import Link from "next/link"
import type { Post } from "../types/Post"

type ManufacturingConnectedProps = {
  posts?: Post[]
}

export default function ManufacturingConnected({ posts = [] }: ManufacturingConnectedProps) {
  // ✅ Use backend data if available, else fallback
  const displayedPosts =
    posts.length > 0
      ? posts
      : [
          {
            id: 1,
            title: "How to Address the Proficiency Gap in Manufacturing",
            imageUrl: "/manufacturing-worker-training.jpg",
            slug: "how-to-address-proficiency-gap",
            excerpt:
              "Closing the skills gap requires investment in people, technology, and continuous improvement strategies.",
          },
          {
            id: 2,
            title: "AI's Achilles Heel",
            imageUrl: "/artificial-intelligence-technology.png",
            slug: "ais-achilles-heel",
            excerpt:
              "AI is transforming manufacturing, but its dependence on clean data and security protocols remains a challenge.",
          },
          {
            id: 3,
            title: "The Cyber Wake-Up Call for Manufacturing",
            imageUrl: "/cybersecurity-business.jpg",
            slug: "cyber-wake-up-call-for-manufacturing",
            excerpt:
              "As industrial systems get smarter, cybersecurity becomes the new frontline of manufacturing innovation.",
          },
          {
            id: 4,
            title: "Recycled, but also High-Quality, Efficient and Cost-Competitive",
            imageUrl: "/recycled-materials-manufacturing.jpg",
            slug: "recycled-high-quality-efficient",
            excerpt:
              "Recycling technology is improving fast — producing sustainable materials that meet industry-grade performance.",
          },
        ]

  return (
    <section className="bg-gradient-to-b from-slate-900 to-blue-900 py-16 px-4 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 1200 600" preserveAspectRatio="none">
          <defs>
            <pattern id="diagonal-lines" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="40" y2="40" stroke="currentColor" strokeWidth="2" />
              <line x1="40" y1="0" x2="0" y2="40" stroke="currentColor" strokeWidth="2" />
            </pattern>
          </defs>
          <rect width="1200" height="600" fill="url(#diagonal-lines)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-3 tracking-tight">MANUFACTURING CONNECTED</h2>
          <p className="text-lg text-gray-300">Industry Moves Fast. We Make Sense of What's Next.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayedPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group flex flex-col"
            >
              {/* Image */}
              <div className="relative w-full h-48 overflow-hidden bg-gray-200">
                <img
                  src={
                    post.imageUrl?.startsWith("http")
                      ? post.imageUrl
                      : post.imageUrl
                        ? `https://newsprk-backend.onrender.com${post.imageUrl}`
                        : "/placeholder.svg"
                  }
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Text Section */}
              <div className="p-5 flex flex-col flex-grow">
                <h3 className="font-bold text-gray-900 mb-2 text-lg leading-snug line-clamp-3 group-hover:text-teal-700 transition">
                  {post.title}
                </h3>

                {post.excerpt && <p className="text-sm text-gray-600 mb-4 line-clamp-2 flex-grow">{post.excerpt}</p>}

                <Link
                  href={`/post/${post.slug}`}
                  className="text-red-600 font-bold text-sm hover:text-red-700 transition flex items-center gap-1"
                >
                  READ MORE <span>›</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
