import IndustryTalkListing from "@/components/IndustryTalkListing"
import type { Post } from "@/types/Post"

export default async function IndustryTalksPage() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/posts?limit=50&category=industry-talks`,
    { cache: "no-store" }
  )

  const data = await res.json()

  const posts: Post[] = Array.isArray(data?.data)
    ? data.data
    : Array.isArray(data)
    ? data
    : []

  return (
    <main className="bg-white">
      <IndustryTalkListing posts={posts} />
    </main>
  )
}