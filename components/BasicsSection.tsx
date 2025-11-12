"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Post } from "../types/Post";

export default function BasicsSection() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts?limit=1000`);
        const data = await res.json();
        const allPosts: Post[] = data.data || data;

        const basicsPosts = allPosts.filter((p) =>
          typeof p.category === "object"
            ? p.category?.slug?.toLowerCase().includes("basics")
            : String(p.category || "").toLowerCase().includes("basics")
        );

        setPosts(basicsPosts.slice(0, 6));
      } catch (err) {
        console.error("Failed to load Basics posts:", err);
      }
    }
    fetchPosts();
  }, []);

  if (posts.length === 0)
    return <div className="text-center py-10 text-gray-500">No Basics posts available.</div>;

  return (
    <section className="bg-white py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* 🔹 Header */}
        <div className="flex items-center justify-between mb-10">
          <h2
            className="text-[34px] font-semibold text-[#003049]"
            style={{
              fontFamily: "Oswald, Helvetica Neue, Helvetica, Arial, sans-serif",
              letterSpacing: "0.4px",
            }}
          >
            Basics
          </h2>
          <Link
            href="/basics"
            className="border border-[#003049] text-[#003049] text-[14px] font-semibold px-4 py-2 uppercase tracking-wide hover:bg-[#003049] hover:text-white transition-all duration-300"
            style={{ fontFamily: "Oswald, Helvetica Neue, Helvetica, Arial, sans-serif" }}
          >
            View All ›
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* 🔸 Left side – Basics articles */}
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-8">
            {posts.map((post) => (
              <div
                key={post.id}
                className="flex flex-col bg-white border border-gray-200 hover:shadow-md transition-all duration-300"
              >
                {/* Image */}
                <div className="relative w-full h-[180px] bg-gray-100 overflow-hidden">
                  <img
                    src={
                      post.imageUrl?.startsWith("http")
                        ? post.imageUrl
                        : post.imageUrl
                        ? `${process.env.NEXT_PUBLIC_API_URL}${post.imageUrl}`
                        : "/placeholder.jpg"
                    }
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>

                {/* Content */}
                <div className="p-4 flex flex-col flex-grow">
                  {/* Category + Date */}
                  <div className="flex items-center gap-3 mb-3">
                    {post.category && (
                      <span
                        className="bg-[#0077b6] text-white px-3 py-[3px] text-[11px] font-bold uppercase tracking-widest"
                        style={{
                          fontFamily: "Oswald, Helvetica Neue, Helvetica, Arial, sans-serif",
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
                          fontFamily: "Oswald, Helvetica Neue, Helvetica, Arial, sans-serif",
                        }}
                      >
                        {new Date(post.publishedAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3
                    className="text-[24px] font-normal text-[#003049] leading-snug mb-3 hover:text-[#0077b6] transition-colors line-clamp-3"
                    style={{
                      fontFamily: "Oswald, Helvetica Neue, Helvetica, Arial, sans-serif",
                    }}
                  >
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  {post.excerpt && (
                    <p
                      className="text-[14px] text-gray-700 mb-4 leading-relaxed line-clamp-3"
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
                    className="text-[#0077b6] font-semibold text-sm hover:text-[#0096c7] flex items-center gap-1 mt-auto"
                    style={{
                      fontFamily: "Oswald, Helvetica Neue, Helvetica, Arial, sans-serif",
                      letterSpacing: "0.4px",
                    }}
                  >
                    READ MORE <span>›</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* 🔸 Right side – Ads */}
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              <h3
                className="text-[18px] font-semibold text-[#003049] mb-4 border-b border-gray-300 pb-2"
                style={{
                  fontFamily: "Oswald, Helvetica Neue, Helvetica, Arial, sans-serif",
                }}
              >
                Advertisement
              </h3>

              <div className="flex flex-col gap-6">
                {/* Ad 1 */}
                <div className="border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300">
                  <img
                    src="/advertisement-banner.jpg"
                    alt="Advertisement 1"
                    className="w-full h-[180px] object-cover"
                  />
                </div>

                {/* Ad 2 */}
                <div className="border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300">
                  <img
                    src="/advertisement-banner.jpg"
                    alt="Advertisement 2"
                    className="w-full h-[180px] object-cover"
                  />
                </div>

                {/* Ad 3 */}
                <div className="border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300">
                  <img
                    src="/advertisement-banner.jpg"
                    alt="Advertisement 3"
                    className="w-full h-[180px] object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
