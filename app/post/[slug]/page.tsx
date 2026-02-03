"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"

import ShareSection from "@/components/share-section"
import RelatedPostsCarousel from "@/components/related-posts-carousel"
import ContentGateModal from "@/components/content-gate-modal"
import PostViewCounter from "@/components/PostViewCounter"
import Loader from "@/components/Loader"
import RightSidebar from "@/components/RightSidebar"
import SupplierAds from "@/components/SupplierAds"

/* ================= TYPES ================= */
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
  youtubeUrl?: string
}

/* ================= YOUTUBE HELPERS ================= */
function getYoutubeEmbed(url?: string) {
  if (!url) return null

  if (url.includes("youtube.com/embed")) return url

  const watchMatch = url.match(/[?&]v=([^&]+)/)
  if (watchMatch?.[1]) {
    return `https://www.youtube.com/embed/${watchMatch[1]}`
  }

  if (url.includes("youtu.be/")) {
    const id = url.split("youtu.be/")[1].split("?")[0]
    return `https://www.youtube.com/embed/${id}`
  }

  return null // channel / handle / playlist
}

function isYoutubeChannel(url?: string) {
  if (!url) return false
  return (
    url.includes("/@") ||
    url.includes("/channel/") ||
    url.includes("/c/")
  )
}

/* ================= PAGE ================= */
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
          `${process.env.NEXT_PUBLIC_API_URL}/api/posts?limit=1000`,
          { cache: "no-store" }
        )
        const data = await res.json()
        const posts: Post[] = Array.isArray(data.data) ? data.data : []
        const found = posts.find(p => p.slug === slugValue)
        if (found) setPost(found)
      } catch (err) {
        console.error("Failed to load post:", err)
      }
    }

    if (slugValue) fetchPost()
  }, [slugValue])

  /* ================= CONTENT GATE ================= */
  useEffect(() => {
    if (userSubmitted) return
    const timer = setTimeout(() => setShowGate(true), 9000)
    return () => clearTimeout(timer)
  }, [userSubmitted])

  if (!post) return <Loader />

  const embedUrl = getYoutubeEmbed(post.youtubeUrl)
  const isVideo = post.category?.slug === "videos"

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
      <ContentGateModal
        isOpen={showGate && !userSubmitted}
        onClose={() => setShowGate(false)}
        onSubmit={() => {
          setUserSubmitted(true)
          setShowGate(false)
        }}
      />

      <main className="bg-[#f9f9f9]">
        {slugValue && <PostViewCounter slug={slugValue} />}

        {/* ================= HERO (IMAGE ALWAYS) ================= */}
        <section className="bg-white border-b border-gray-200">
          <div className="px-6 md:px-10 lg:px-[80px] py-10">
            <p className="text-gray-500 text-sm  mb-3">
              Published {date}
            </p>

            <h1 className="text-3xl md:text-4xl font-bold text-[#003049] mb-4">
              {post.title}
            </h1>

            {post.excerpt && (
              <p className="text-gray-700 max-w-3xl mb-6">
                {post.excerpt}
              </p>
            )}

            {/* ✅ HERO IMAGE ALWAYS */}
            <div className="w-full max-h-[420px] overflow-hidden rounded-none ">
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
                  <p className="text-sm font-semibold">{post.author.name}</p>
                  <p className="text-xs text-gray-500">{post.author.bio}</p>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ================= CONTENT + SIDEBAR ================= */}
        <section className="grid grid-cols-1 lg:grid-cols-[8fr_4fr] gap-10 px-6 md:px-10 lg:px-[80px] py-10">
          <article>
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content || "" }}
            />

            <ShareSection  post={post} />

            {/* ================= VIDEO BLOCK (AFTER SHARE) ================= */}
            {isVideo && post.youtubeUrl && (
              <div className="mt-10">
                {embedUrl ? (
                  <div className="w-full  aspect-video rounded-lg overflow-hidden border shadow-lg">
                    <iframe
                      src={embedUrl}
                      title={post.title}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                ) : (
                  <div className="w-full rounded-lg border bg-black text-white flex flex-col items-center justify-center py-16">
                    <p className="text-lg font-semibold mb-4">
                      Watch more videos on YouTube
                    </p>
                    <a
                      href={post.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-red-600 px-6 py-3 rounded font-bold hover:bg-red-700"
                    >
                      Open YouTube Channel →
                    </a>
                  </div>
                )}
              </div>
            )}
          </article>

          {/* <RightSidebar /> */}
            <SupplierAds />

        </section>

        <RelatedPostsCarousel />
      </main>
    </>
  )
}
