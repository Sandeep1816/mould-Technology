"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"

import ShareSection from "@/components/share-section"
import RelatedPostsCarousel from "@/components/related-posts-carousel"
import ContentGateModal from "@/components/content-gate-modal"
import PostViewCounter from "@/components/PostViewCounter"
import Loader from "@/components/Loader"
import RightSidebar from "@/components/RightSidebar"

type Author = {
  id: number
  name: string
  bio?: string
  avatarUrl?: string
}

type Category = {
  id: number
  name: string
  slug?: string
}

type Post = {
  id: number
  title: string
  slug: string
  excerpt?: string
  content?: string
  imageUrl?: string
  publishedAt?: string
  author?: Author
  category?: Category
}

export default function PostDetailsPage() {
  const { slug } = useParams()
  const slugValue = Array.isArray(slug) ? slug[0] : slug

  const [post, setPost] = useState<Post | null>(null)
  const [showGate, setShowGate] = useState(false)
  const [userSubmitted, setUserSubmitted] = useState(false)

  /* ================= FETCH POST ================= */
  useEffect(() => {
    async function fetchPost() {
      setPost(null)

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/posts?limit=1000`
        )
        const data = await res.json()
        const allPosts = Array.isArray(data.data) ? data.data : []

        const postData = allPosts.find((p: Post) => p.slug === slugValue)
        if (!postData) return

        setPost(postData)
      } catch (err) {
        console.error("Failed to load post:", err)
      }
    }

    if (slugValue) fetchPost()
  }, [slugValue])

  /* ================= CONTENT GATE TIMER ================= */
  useEffect(() => {
    if (userSubmitted) return

    const timer = setTimeout(() => {
      setShowGate(true)
    }, 9000)

    return () => clearTimeout(timer)
  }, [userSubmitted])

  const handleGateSubmit = (formData: any) => {
    console.log("Form submitted:", formData)
    setUserSubmitted(true)
    setShowGate(false)
  }

  if (!post) return <Loader />

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
    : "Today"

  return (
    <>
      {/* ================= CONTENT GATE ================= */}
      <ContentGateModal
        isOpen={showGate && !userSubmitted}
        onClose={() => setShowGate(false)}
        onSubmit={handleGateSubmit}
      />

      <main className="bg-[#f9f9f9] text-[16px]">
        {slugValue && <PostViewCounter slug={slugValue} />}

        {/* ================= HERO ================= */}
        <section className="bg-white border-b border-gray-200">
          <div className="max-w-full mx-auto py-10 px-6 md:px-10 lg:px-[80px]">
            <p className="text-gray-500 text-sm mb-3 uppercase tracking-widest">
              Published {date}
            </p>

            <h1 className="text-3xl md:text-4xl font-bold text-[#003049] mb-4">
              {post.title}
            </h1>

            {post.excerpt && (
              <p className="text-gray-700 text-[16px] mb-6 max-w-3xl leading-relaxed">
                {post.excerpt}
              </p>
            )}

            <div className="w-full max-h-[420px] overflow-hidden rounded-lg border">
              <img
                src={imageUrl}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>

            {post.author && (
              <div className="flex items-center gap-3 mt-6">
                <img
                  src={post.author.avatarUrl || "/avatar-placeholder.png"}
                  className="w-10 h-10 rounded-full border"
                  alt={post.author.name}
                />
                <div>
                  <p className="text-sm font-semibold">
                    {post.author.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {post.author.bio}
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ================= CONTENT + SIDEBAR ================= */}
        <section className="max-w-full mx-auto grid grid-cols-1 lg:grid-cols-[8fr_4fr] gap-10 py-10 px-6 md:px-10 lg:px-[80px]">
          {/* LEFT CONTENT */}
          <article>
            <div
              className="prose max-w-none text-[16px] leading-relaxed"
              dangerouslySetInnerHTML={{ __html: post.content || "" }}
            />

            <ShareSection />
          </article>

          {/* RIGHT SIDEBAR */}
          <RightSidebar />
        </section>

        {/* ================= RELATED CAROUSEL ================= */}
        <RelatedPostsCarousel />
      </main>
    </>
  )
}
