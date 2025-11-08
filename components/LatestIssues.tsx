"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import type { Post } from "@/types/Post"

interface LatestIssuesProps {
  posts?: Post[]
}

export default function LatestIssues({ posts: initialPosts = [] }: LatestIssuesProps) {
  const [posts, setPosts] = useState<Post[]>(initialPosts)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoplay, setIsAutoplay] = useState(true)

  // ✅ Load posts if not provided
  useEffect(() => {
    if (!initialPosts || initialPosts.length === 0) {
      async function fetchPosts() {
        try {
          const res = await fetch("https://newsprk-backend.onrender.com/api/posts")
          const data = await res.json()
          const allPosts: Post[] = data.data || data

          // Filter for "latest-issue" category
          const latestIssuePosts = allPosts.filter((p) =>
            typeof p.category === "object"
              ? p.category?.slug?.toLowerCase().includes("latest-issue")
              : String(p.category || "").toLowerCase().includes("latest-issue")
          )

          setPosts(latestIssuePosts.slice(0, 4))
        } catch (err) {
          console.error("Failed to load Latest Issue posts:", err)
        }
      }
      fetchPosts()
    } else {
      setPosts(initialPosts.slice(0, 4))
    }
  }, [initialPosts])

  // ✅ Autoplay carousel safely
  useEffect(() => {
    if (!isAutoplay || posts.length === 0) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % posts.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [isAutoplay, posts]) // 🔹 use posts (not posts.length)

  const handlePrev = () => {
    if (posts.length === 0) return
    setCurrentIndex((prev) => (prev - 1 + posts.length) % posts.length)
    setIsAutoplay(false)
  }

  const handleNext = () => {
    if (posts.length === 0) return
    setCurrentIndex((prev) => (prev + 1) % posts.length)
    setIsAutoplay(false)
  }

  if (!posts || posts.length === 0)
    return <div className="text-center py-10 text-gray-400">No Latest Issue posts available.</div>

  return (
    <section className="relative py-20 px-6 overflow-hidden bg-gradient-to-b from-gray-700 via-gray-600 to-gray-700">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-400 to-transparent transform -skew-x-12" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-white">
          Latest Issue
        </h2>

        <div className="relative">
          {/* Carousel track */}
          <div className="overflow-hidden">
            <div
              className="flex gap-6 transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${currentIndex * 25.5}%)`,
              }}
            >
              {posts.map((post) => (
                <div key={post.id} className="flex-shrink-0 w-full md:w-1/4 lg:w-1/4">
                  <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col h-full">
                    {/* Image */}
                    <div className="relative w-full h-48 bg-gray-200">
                      <Image
                        src={
                          post.imageUrl?.startsWith("http")
                            ? post.imageUrl
                            : post.imageUrl
                            ? `https://newsprk-backend.onrender.com${post.imageUrl}`
                            : "/placeholder.svg"
                        }
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="font-bold text-lg text-gray-900 mb-4 leading-tight line-clamp-3 min-h-20">
                        {post.title}
                      </h3>

                      {/* Link */}
                      <Link
                        href={`/posts/${post.slug}`}
                        className="mt-auto text-blue-600 font-semibold hover:text-blue-800 transition-colors text-sm inline-flex items-center"
                      >
                        {post.title.toLowerCase().includes("issue")
                          ? "DIGITAL EDITION"
                          : "READ"}{" "}
                        <span className="ml-2">›</span>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Prev / Next buttons */}
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 md:-translate-x-16 z-20 bg-white hover:bg-gray-100 w-10 h-10 rounded flex items-center justify-center transition-colors"
            aria-label="Previous slide"
          >
            <span className="text-gray-800 text-xl">‹</span>
          </button>

          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 md:translate-x-16 z-20 bg-white hover:bg-gray-100 w-10 h-10 rounded flex items-center justify-center transition-colors"
            aria-label="Next slide"
          >
            <span className="text-gray-800 text-xl">›</span>
          </button>

          {/* Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {posts.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index)
                  setIsAutoplay(false)
                }}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? "bg-white w-8"
                    : "bg-white/40 w-2 hover:bg-white/60"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
