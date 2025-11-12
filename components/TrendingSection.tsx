"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { Post } from "../types/Post";

export default function TrendingSection() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/posts?limit=1000`
        );
        const data = await res.json();
        const allPosts: Post[] = data.data || data;

        const trendingPosts = allPosts.filter((p) =>
          typeof p.category === "object"
            ? p.category?.slug?.toLowerCase().includes("trending")
            : String(p.category || "").toLowerCase().includes("trending")
        );

        setPosts(trendingPosts.slice(0, 4)); // show 4 trending blogs
      } catch (err) {
        console.error("Failed to load Trending posts:", err);
      }
    }
    fetchPosts();
  }, []);

  if (posts.length === 0)
    return (
      <div className="text-center py-10 text-gray-500">
        No Trending posts available.
      </div>
    );

  const postPairs = [];
  for (let i = 0; i < posts.length; i += 2) {
    postPairs.push(posts.slice(i, i + 2));
  }

  return (
    <section className="bg-[#f9f9f9] py-14 px-6">
      <div className="max-w-7xl mx-auto">
        {/* 🔹 Section Title */}
        <h2
          className="text-[32px] font-semibold mb-10 text-[#003049]"
          style={{
            fontFamily: "Oswald, Helvetica Neue, Helvetica, Arial, sans-serif",
            letterSpacing: "0.5px",
          }}
        >
          Trending
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* 📰 Left side – trending posts */}
          <div className="lg:col-span-2 space-y-12">
            {postPairs.map((pair, rowIndex) => (
              <div
                key={rowIndex}
                className="grid grid-cols-1 md:grid-cols-2 gap-10"
              >
                {pair.map((post) => (
                  <div
                    key={post.id}
                    className="bg-white border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden rounded-none"
                  >
                    {/* 📸 Post Image */}
                    <div className="relative w-full h-[250px] overflow-hidden">
                      <Image
                        src={
                          post.imageUrl?.startsWith("http")
                            ? post.imageUrl
                            : post.imageUrl
                            ? `${process.env.NEXT_PUBLIC_API_URL}${post.imageUrl}`
                            : "/placeholder.jpg"
                        }
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>

                    {/* 📝 Post Content */}
                    <div className="p-5">
                      {/* Category + Date */}
                      <div className="flex items-center gap-3 mb-3">
                        {post.category && (
                          <span
                            className="bg-[#0077b6] text-white px-3 py-[3px] text-[11px] font-bold uppercase tracking-wide"
                            style={{
                              fontFamily:
                                "Oswald, Helvetica Neue, Helvetica, Arial, sans-serif",
                            }}
                          >
                            {typeof post.category === "object"
                              ? post.category?.name
                              : post.category}
                          </span>
                        )}
                        {post.publishedAt && (
                          <span
                            className="text-xs text-gray-500 font-semibold uppercase"
                            style={{
                              fontFamily:
                                "Oswald, Helvetica Neue, Helvetica, Arial, sans-serif",
                            }}
                          >
                            {new Date(
                              post.publishedAt
                            ).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                        )}
                      </div>

                      {/* Title */}
                      <h3
                        className="text-[24px] text-[#003049] leading-snug font-normal mb-2 hover:text-[#0077b6] transition-colors line-clamp-3"
                        style={{
                          fontFamily:
                            "Oswald, Helvetica Neue, Helvetica, Arial, sans-serif",
                        }}
                      >
                        {post.title}
                      </h3>

                      {/* Excerpt */}
                      {post.excerpt && (
                        <p
                          className="text-[14px] text-gray-600 mb-4 leading-relaxed line-clamp-3"
                          style={{
                            fontFamily:
                              "Roboto, system-ui, -apple-system, Helvetica, Arial, sans-serif",
                          }}
                        >
                          {post.excerpt}
                        </p>
                      )}

                      {/* Read More */}
                      <Link
                        href={`/post/${post.slug}`}
                        className="text-[#0077b6] font-semibold text-sm hover:text-[#0096c7] flex items-center gap-1"
                        style={{
                          fontFamily:
                            "Oswald, Helvetica Neue, Helvetica, Arial, sans-serif",
                          letterSpacing: "0.3px",
                        }}
                      >
                        READ MORE <span>›</span>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* 📢 Right side – Single Ad Container */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-gray-200 shadow-sm p-4 flex flex-col gap-4 rounded-none">
              <h3
                className="text-[18px] text-[#003049] font-semibold uppercase mb-2 border-b pb-2"
                style={{
                  fontFamily:
                    "Oswald, Helvetica Neue, Helvetica, Arial, sans-serif",
                  letterSpacing: "0.5px",
                }}
              >
                Advertisement
              </h3>

              {[
                "/advertisement-banner.jpg",
                "/advertisement-banner.jpg",
                "/advertisement-banner.jpg",
              ].map((ad, index) => (
                <div
                  key={index}
                  className="overflow-hidden border border-gray-200 hover:shadow-md transition-all duration-300"
                >
                  <Image
                    src={ad}
                    alt={`Advertisement ${index + 1}`}
                    width={400}
                    height={160} // ✅ reduced height
                    className="w-full h-[240px] object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
