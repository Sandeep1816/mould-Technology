"use client"

import ArticleCard from "./ArticleCard"

type SectionGridProps = {
  title: string
  posts: any[]
}

export default function SectionGrid({ title, posts }: SectionGridProps) {
  return (
    <section className="mt-8">
      {posts.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No articles found.</p>
      ) : (
        <div className="space-y-8">
          {posts.map((post) => (
            <ArticleCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </section>
  )
}
