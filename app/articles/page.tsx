import ArticlesLatestIssue from "@/components/ArticlesLatestIssue"
import ArticlesIssueGrid from "@/components/ArticlesIssueGrid"
import type { Post } from "@/types/Post"

export default async function ArticlesPage() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/posts?limit=1000`,
    { cache: "no-store" }
  )

  const data = await res.json()
  const posts: Post[] = Array.isArray(data?.data) ? data.data : []

  const getSlug = (p: Post) =>
    typeof p.category === "object"
      ? p.category?.slug?.toLowerCase()
      : String(p.category || "").toLowerCase()

  const articles = posts.filter((p) =>
    ["analysis", "leadership", "artificial-intelligence", "industry"].some((k) =>
      getSlug(p).includes(k)
    )
  )

  const coverStory = articles[0]
  const issueArticles = articles.slice(1, 5)

  return (
    <main className="bg-white">
      {coverStory && <ArticlesLatestIssue post={coverStory} />}
      <ArticlesIssueGrid posts={issueArticles} />
    </main>
  )
}
