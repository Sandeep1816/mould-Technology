import EventsListing from "@/components/EventsListing"
import type { Post } from "@/types/Post"

export default async function EventsPage() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/posts?limit=1000`,
    { cache: "no-store" }
  )

  const data = await res.json()
  const posts: Post[] = data.data || data

  const getCategorySlug = (post: Post) =>
    typeof post.category === "object"
      ? post.category?.slug?.toLowerCase()
      : String(post.category || "").toLowerCase()

  // ✅ ONLY EVENT BLOGS
  const eventPosts = posts.filter((p) =>
    getCategorySlug(p).includes("events")
  )

  return (
    <main className="bg-white">
      <EventsListing posts={eventPosts} />
    </main>
  )
}
