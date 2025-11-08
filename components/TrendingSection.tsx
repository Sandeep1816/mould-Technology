// "use client"

// import Image from "next/image"
// import Link from "next/link"
// import { useEffect, useState } from "react"
// import type { Post } from "../types/Post"

// export default function TrendingSection() {
//   const [posts, setPosts] = useState<Post[]>([])

//   useEffect(() => {
//     async function fetchPosts() {
//       try {
//         const res = await fetch("https://newsprk-backend.onrender.com/api/posts")
//         const data = await res.json()
//         const allPosts: Post[] = data.data || data

//         // 🧩 Filter for "Latest Issue" category
//         const latestIssuePosts = allPosts.filter((p) =>
//           typeof p.category === "object"
//             ? p.category?.slug?.toLowerCase().includes("trending")
//             : String(p.category || "").toLowerCase().includes("trending")
//         )

//         setPosts(latestIssuePosts.slice(0, 4))
//       } catch (err) {
//         console.error("Failed to load Trending posts:", err)
//       }
//     }
//     fetchPosts()
//   }, [])

//   if (posts.length === 0)
//     return (
//       <div className="text-center py-10 text-gray-500">
//         No  Trending posts available.
//       </div>
//     )

//   return (
//     <section className="bg-gray-100 py-12 px-6">
//       <div className="max-w-6xl mx-auto">
//         <h2 className="text-3xl font-bold text-left mb-10 text-blue-800">
//           Trending
//         </h2>

//         {/* ✅ Grid layout */}
//         <div className="grid gap-6 md:grid-cols-4 sm:grid-cols-2 grid-cols-1">
//           {posts.map((post) => (
//             <div
//               key={post.id}
//               className="bg-white rounded-lg shadow hover:shadow-lg transition duration-300 overflow-hidden flex flex-col"
//             >
//               {/* 🖼️ Image */}
//               <div className="relative w-full h-48">
//                 <Image
//                   src={post.imageUrl || "/placeholder.jpg"}
//                   alt={post.title}
//                   fill
//                   className="object-cover"
//                 />
//               </div>

//               {/* 🧠 Text content */}
//               <div className="p-5 flex flex-col flex-grow">
//                 <h3 className="font-semibold text-lg text-gray-800 mb-2 leading-tight line-clamp-2">
//                   {post.title}
//                 </h3>

//                 {/* ✍️ Excerpt */}
//                 {post.excerpt && (
//                   <p className="text-sm text-gray-600 mb-4 line-clamp-3">
//                     {post.excerpt}
//                   </p>
//                 )}

//                 {/* 🔗 Read / Digital Edition */}
//                 <Link
//                   href={`/posts/${post.slug}`}
//                   className="mt-auto text-blue-600 font-semibold hover:underline text-sm"
//                 >
//                   {post.title.toLowerCase().includes("issue")
//                     ? "DIGITAL EDITION →"
//                     : "READ →"}
//                 </Link>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   )
// }


"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import type { Post } from "../types/Post"

export default function TrendingSection() {
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch("https://newsprk-backend.onrender.com/api/posts")
        const data = await res.json()
        const allPosts: Post[] = data.data || data

        const trendingPosts = allPosts.filter((p) =>
          typeof p.category === "object"
            ? p.category?.slug?.toLowerCase().includes("trending")
            : String(p.category || "")
                .toLowerCase()
                .includes("trending"),
        )

        setPosts(trendingPosts.slice(0, 8)) // Get more posts for repeated rows
      } catch (err) {
        console.error("Failed to load Trending posts:", err)
      }
    }
    fetchPosts()
  }, [])

  if (posts.length === 0) return <div className="text-center py-10 text-gray-500">No Trending posts available.</div>

  return (
    <section className="bg-white py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-left mb-10 text-gray-900">Trending</h2>

        <div className="space-y-12">
          {Array.from({ length: Math.ceil(posts.length / 2) }).map((_, rowIndex) => {
            const post1 = posts[rowIndex * 2]
            const post2 = posts[rowIndex * 2 + 1]

            return (
              <div key={rowIndex} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Side - Two Blog Posts in a Row */}
                <div className="lg:col-span-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Blog Post 1 */}
                    {post1 && (
                      <div className="bg-white rounded-lg shadow hover:shadow-lg transition duration-300 overflow-hidden flex flex-col border border-gray-200">
                        {/* 🖼️ Image */}
                        <div className="relative w-full h-56">
                          <Image
                            src={post1.imageUrl || "/placeholder.jpg"}
                            alt={post1.title}
                            fill
                            className="object-cover"
                          />
                        </div>

                        {/* 📝 Text content */}
                        <div className="p-5 flex flex-col grow">
                          {/* Category Badge */}
                          {post1.category && (
                            <div className="mb-3">
                              <span className="bg-blue-600 text-white px-3 py-1 text-xs font-bold uppercase tracking-wider">
                                {typeof post1.category === "object" ? post1.category?.name : post1.category}
                              </span>
                            </div>
                          )}

                          {/* Date */}
                          {post1.publishedAt && (
                            <span className="text-xs text-gray-500 font-semibold mb-2">
                              {new Date(post1.publishedAt).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              })}
                            </span>
                          )}

                          {/* Title */}
                          <h3 className="font-bold text-lg text-gray-900 mb-3 leading-tight line-clamp-3">
                            {post1.title}
                          </h3>

                          {/* Excerpt */}
                          {post1.excerpt && (
                            <p className="text-sm text-gray-600 mb-4 line-clamp-3 grow">{post1.excerpt}</p>
                          )}

                          {/* Read More Link */}
                          <Link
                            href={`/posts/${post1.slug}`}
                            className="text-blue-600 font-bold hover:text-blue-700 text-sm flex items-center gap-1 mt-auto"
                          >
                            READ MORE <span>›</span>
                          </Link>
                        </div>
                      </div>
                    )}

                    {/* Blog Post 2 */}
                    {post2 && (
                      <div className="bg-white rounded-lg shadow hover:shadow-lg transition duration-300 overflow-hidden flex flex-col border border-gray-200">
                        {/* 🖼️ Image */}
                        <div className="relative w-full h-56">
                          <Image
                            src={post2.imageUrl || "/placeholder.jpg"}
                            alt={post2.title}
                            fill
                            className="object-cover"
                          />
                        </div>

                        {/* 📝 Text content */}
                        <div className="p-5 flex flex-col grow">
                          {/* Category Badge */}
                          {post2.category && (
                            <div className="mb-3">
                              <span className="bg-blue-600 text-white px-3 py-1 text-xs font-bold uppercase tracking-wider">
                                {typeof post2.category === "object" ? post2.category?.name : post2.category}
                              </span>
                            </div>
                          )}

                          {/* Date */}
                          {post2.publishedAt && (
                            <span className="text-xs text-gray-500 font-semibold mb-2">
                              {new Date(post2.publishedAt).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              })}
                            </span>
                          )}

                          {/* Title */}
                          <h3 className="font-bold text-lg text-gray-900 mb-3 leading-tight line-clamp-3">
                            {post2.title}
                          </h3>

                          {/* Excerpt */}
                          {post2.excerpt && (
                            <p className="text-sm text-gray-600 mb-4 line-clamp-3 grow">{post2.excerpt}</p>
                          )}

                          {/* Read More Link */}
                          <Link
                            href={`/posts/${post2.slug}`}
                            className="text-blue-600 font-bold hover:text-blue-700 text-sm flex items-center gap-1 mt-auto"
                          >
                            READ MORE <span>›</span>
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Side - Advertisement/Banner Images */}
                <div className="lg:col-span-1">
                  <div className="space-y-6">
                    {/* Advertisement Placeholder 1 */}
                    <div className="bg-gray-200 rounded-lg overflow-hidden shadow hover:shadow-lg transition duration-300">
                      <Image
                        src="/advertisement-banner-1.jpg"
                        alt="Advertisement 1"
                        width={340}
                        height={280}
                        className="w-full h-auto object-cover"
                      />
                    </div>

                    {/* Advertisement Placeholder 2 */}
                    <div className="bg-gray-200 rounded-lg overflow-hidden shadow hover:shadow-lg transition duration-300">
                      <Image
                        src="/advertisement-banner-2.jpg"
                        alt="Advertisement 2"
                        width={340}
                        height={280}
                        className="w-full h-auto object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
