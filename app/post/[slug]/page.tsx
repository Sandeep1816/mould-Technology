
"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import ShareSection from "@/components/share-section"
import RelatedPostsCarousel from "@/components/related-posts-carousel"
import AdvertisementSection from "@/components/advertisement-section"
import ContentGateModal from "@/components/content-gate-modal"

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
  const [relatedPosts, setRelatedPosts] = useState<Post[]>([])
  const [showGate, setShowGate] = useState(true)
  const [userSubmitted, setUserSubmitted] = useState(false)

  useEffect(() => {
    async function fetchPost() {
      setPost(null)
      setRelatedPosts([])

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts?limit=1000`)
        const data = await res.json()
        const allPosts = Array.isArray(data.data) ? data.data : []

        const postData = allPosts.find((p: Post) => p.slug === slugValue)

        if (!postData) {
          console.error("No post found for slug:", slugValue)
          return
        }

        setPost(postData)

        const related = allPosts.filter(
          (p: Post) => p.category?.slug === postData.category?.slug && p.slug !== slugValue,
        )
        setRelatedPosts(related.slice(0, 3))
      } catch (err) {
        console.error("Failed to load post:", err)
      }
    }

    if (slugValue) fetchPost()
  }, [slugValue])

  const handleGateSubmit = (formData: any) => {
    console.log("Form submitted:", formData)
    setUserSubmitted(true)
  }

  if (!post) return <div className="py-16 text-center text-gray-500">Loading article...</div>

  const imageUrl =
    post.imageUrl && post.imageUrl.startsWith("http")
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
        onSubmit={handleGateSubmit}
      />

      <main key={Array.isArray(slug) ? slug.join("-") : slug} className="bg-[#f9f9f9]">
        {/* HERO SECTION */}
        <section className="bg-white border-b border-gray-200">
          <div className="max-w-6xl mx-auto py-10 px-6">
            <p className="text-gray-500 text-sm mb-3 uppercase tracking-widest">Published {date}</p>

            <h1
              className="text-3xl md:text-4xl font-bold text-[#003049] leading-tight mb-4"
              style={{ fontFamily: "Oswald, sans-serif" }}
            >
              {post.title}
            </h1>

            {post.excerpt && <p className="text-gray-700 text-lg mb-6 leading-relaxed max-w-3xl">{post.excerpt}</p>}

            <div className="w-full max-h-[420px] overflow-hidden rounded-lg border border-gray-300">
              <img src={imageUrl || "/placeholder.svg"} alt={post.title} className="w-full h-full object-cover" />
            </div>

            {/* Author info */}
            {post.author && (
              <div className="flex items-center gap-3 mt-6">
                <img
                  src={post.author.avatarUrl || "/avatar-placeholder.png"}
                  alt={post.author.name}
                  className="w-10 h-10 rounded-full border border-gray-300"
                />
                <div>
                  <p className="text-sm font-semibold text-[#003049]">{post.author.name}</p>
                  <p className="text-xs text-gray-500">{post.author.bio}</p>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* MAIN CONTENT */}
        <section className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-10 py-10 px-6">
          {/* LEFT: Article */}
          <article className="lg:col-span-3">
            <div
              className="prose prose-lg max-w-none text-gray-800 space-y-6"
              style={{ fontFamily: "Roboto, sans-serif" }}
              dangerouslySetInnerHTML={{ __html: post.content || "" }}
            />

            <ShareSection />
          </article>

          {/* RIGHT: Related + Ads */}
          <aside className="space-y-8">
            {/* Related posts */}
            <div>
              <h3
                className="text-lg font-semibold text-[#003049] mb-4 border-b border-gray-300 pb-2 uppercase"
                style={{ fontFamily: "Oswald, sans-serif" }}
              >
                Read Next
              </h3>

              <div className="space-y-5">
                {relatedPosts.map((item) => (
                  <Link
                    key={item.id}
                    href={`/post/${item.slug}`}
                    className="flex items-center gap-3 group hover:bg-gray-50 p-2 rounded transition"
                  >
                    <div className="relative w-20 h-16 shrink-0 overflow-hidden rounded">
                      <Image
                        src={
                          item.imageUrl?.startsWith("http")
                            ? item.imageUrl
                            : item.imageUrl
                              ? `${process.env.NEXT_PUBLIC_API_URL}${item.imageUrl}`
                              : "/placeholder.svg"
                        }
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <p
                      className="text-sm text-[#003049] leading-snug group-hover:text-[#0077b6] transition line-clamp-2"
                      style={{ fontFamily: "Oswald, sans-serif" }}
                    >
                      {item.title}
                    </p>
                  </Link>
                ))}
              </div>
            </div>

            {/* Ads */}
            <AdvertisementSection />
          </aside>
        </section>

        {/* RELATED CONTENT CAROUSEL */}
        <RelatedPostsCarousel />
      </main>
    </>
  )
}
