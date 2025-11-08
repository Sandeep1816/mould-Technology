"use client"

import Link from "next/link"

import { Post } from "../types/Post"

type NewsProductsSectionProps = {
  newsPosts: Post[]
  productPosts: Post[]

}

export default function NewsProductsSection({ newsPosts, productPosts }: NewsProductsSectionProps) {
  return (
    <section className="py-12 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* News Column */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8 pb-4 border-b-2 border-gray-200">News</h2>
            <ol className="space-y-6">
              {newsPosts.slice(0, 5).map((post, idx) => (
                <li key={post.id} className="flex gap-4">
                  <span className="text-xl font-bold text-gray-400 shrink-0">{idx + 1}.</span>
                  <div>
                    <Link
                      href={`/post/${post.slug}`}
                      className="text-gray-900 font-semibold hover:text-teal-600 transition text-sm leading-snug"
                    >
                      {post.title}
                    </Link>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Products Column */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8 pb-4 border-b-2 border-gray-200">Products</h2>
            <div className="space-y-8">
              {productPosts.slice(0, 2).map((post) => {
                const imageUrl =
                  post.imageUrl && post.imageUrl.startsWith("http")
                    ? post.imageUrl
                    : post.imageUrl
                      ? `https://newsprk-backend.onrender.com${post.imageUrl}`
                      : "/placeholder.svg"

                const date = post.publishedAt
                  ? new Date(post.publishedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })
                  : "TODAY"

                return (
                  <div key={post.id} className="flex gap-4">
                    {/* Product Image */}
                    <img
                      src={imageUrl || "/placeholder.svg"}
                      alt={post.title}
                      className="w-24 h-24 object-cover rounded shrink-0"
                    />

                    {/* Product Content */}
                    <div className="flex-1">
                      <div className="text-xs text-gray-600 font-bold mb-2">{date}</div>
                      <h3 className="text-sm font-bold text-gray-900 mb-2 line-clamp-2">{post.title}</h3>
                      <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                        {post.excerpt || post.content?.substring(0, 100) || ""}
                      </p>
                      <Link href={`/post/${post.slug}`} className="text-teal-600 font-bold text-xs hover:text-teal-700">
                        READ MORE ›
                      </Link>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Sidebar Ads */}
          <div className="space-y-6">
            {/* Ad 1 */}
            <div className="border border-gray-300 overflow-hidden">
              <img src="/green-factory-team.jpg" alt="Advertisement" className="w-full h-48 object-cover" />
              <div className="p-3 bg-gray-50 text-center text-xs text-gray-600">Advertisement</div>
            </div>

            {/* Ad 2 */}
            <div className="bg-orange-500 p-4 text-white">
              <h4 className="font-bold text-base mb-2">SWAP MOLD VERSION FASTER</h4>
              <p className="text-xs mb-3">Directly Through the parting Line</p>
              <img src="/insert-changer-tool.jpg" alt="Insert Changer" className="w-full mb-3 bg-orange-600 p-2" />
              <div className="flex gap-2 items-center justify-between">
                <span className="bg-yellow-400 text-orange-600 px-2 py-1 rounded font-bold text-xs">IC</span>
                <span className="font-bold text-xs">INSERT CHANGER</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
