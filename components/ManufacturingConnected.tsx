"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Post } from "@/types/Post";

/* ================= RIGHT SIDEBAR ================= */

/* 1️⃣ EXPLORE CATEGORIES */
function ExploreCategories() {
  const categories = [
    { name: "Gaming", count: 24 },
    { name: "Sports", count: 30 },
    { name: "Technology", count: 22 },
    { name: "Politics", count: 25 },
    { name: "Travel", count: 16 },
  ];

  return (
    <div className="bg-white rounded-xl border p-6">
      <h3 className="text-xl font-semibold mb-6">Explore Categories</h3>

      <div className="space-y-3">
        {categories.map((cat) => (
          <Link
            key={cat.name}
            href={`/category/${cat.name.toLowerCase()}`}
            className="flex items-center justify-between px-4 py-3 rounded-lg bg-gray-100 hover:bg-gray-200 transition"
          >
            <span className="font-medium">
              {cat.name} ({cat.count})
            </span>
            <span className="text-lg">→</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

/* 2️⃣ POPULAR NEWS */
function PopularNewsSidebar() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    async function fetchPosts() {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/posts?limit=5`
      );
      const json = await res.json();
      setPosts(json.data || json);
    }
    fetchPosts();
  }, []);

  const imageUrl = (post: Post) =>
    post.imageUrl?.startsWith("http")
      ? post.imageUrl
      : post.imageUrl
      ? `${process.env.NEXT_PUBLIC_API_URL}${post.imageUrl}`
      : "/placeholder.jpg";

  return (
    <div className="bg-white rounded-xl border p-6">
      <h3 className="text-xl font-semibold mb-6">Popular News</h3>

      <div className="space-y-6">
        {posts.slice(0, 4).map((post) => (
          <Link
            key={post.id}
            href={`/post/${post.slug}`}
            className="flex gap-4"
          >
            <img
              src={imageUrl(post)}
              alt={post.title}
              className="w-[80px] h-[80px] rounded-lg object-cover flex-shrink-0"
            />

            <div>
              <span className="inline-block mb-1 text-[11px] font-bold uppercase bg-green-500 text-white px-2 py-1 rounded">
                {typeof post.category === "object"
                  ? post.category?.name
                  : post.category}
              </span>

              <h4 className="text-sm font-semibold leading-snug line-clamp-2">
                {post.title}
              </h4>

              <div className="text-xs text-gray-400 mt-1">
                By {post.author?.name} · {post.views?.toLocaleString()} Views
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

/* 3️⃣ TAGS */
function TagsWidget() {
  const tags = [
    "Gaming",
    "Travel",
    "Food",
    "Sports",
    "Social",
    "Marketing",
    "Trip",
    "Makeup",
    "Technology",
    "Branding",
    "Beauty",
    "Printing",
    "Business",
    "Politics",
  ];

  return (
    <div className="bg-white rounded-xl border p-6">
      <h3 className="text-xl font-semibold mb-6">Tags</h3>

      <div className="flex flex-wrap gap-3">
        {tags.map((tag) => (
          <Link
            key={tag}
            href={`/tag/${tag.toLowerCase()}`}
            className="px-4 py-2 rounded-md text-sm bg-gray-100 text-gray-700 hover:bg-blue-600 hover:text-white transition"
          >
            {tag}
          </Link>
        ))}
      </div>
    </div>
  );
}

/* ================= MAIN SECTION ================= */

type FeaturedPostsSectionProps = {
  posts: Post[];
};

export default function FeaturedPostsSection({
  posts = [],
}: FeaturedPostsSectionProps) {
  if (!posts || posts.length < 2) return null;

  const rows: Post[][] = [];
  for (let i = 0; i < Math.min(posts.length, 6); i += 2) {
    rows.push(posts.slice(i, i + 2));
  }

  const formatDate = (date?: string | null) =>
    date
      ? new Date(date).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })
      : "";

  return (
    <section className="bg-white py-14 px-6">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-bold text-[#121213]">
            Featured Post
          </h2>

          <Link
            href="/featured"
            className="text-sm font-semibold text-[#121213] hover:underline"
          >
            View All →
          </Link>
        </div>

        {/* 🔥 GRID WIDTH ADJUSTED HERE */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* LEFT CONTENT (slightly reduced width) */}
          <div className="lg:col-span-3 space-y-10">
            {rows.map((rowPosts, rowIndex) => (
              <div
                key={rowIndex}
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
              >
                {rowPosts.map((post) => {
                  const imageUrl =
                    post.imageUrl && post.imageUrl.startsWith("http")
                      ? post.imageUrl
                      : post.imageUrl
                      ? `${process.env.NEXT_PUBLIC_API_URL}${post.imageUrl}`
                      : "/placeholder.svg";

                  return (
                    <article
                      key={post.id}
                      className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition"
                    >
                      <Link href={`/post/${post.slug}`}>
                        <div className="relative h-[260px] overflow-hidden">
                          <img
                            src={imageUrl}
                            alt={post.title}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      </Link>

                      <div className="p-6">
                        {typeof post.category === "object" &&
                          post.category?.name && (
                            <span className="inline-block mb-3 bg-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase">
                              {post.category.name}
                            </span>
                          )}

                        <Link href={`/post/${post.slug}`}>
                          <h3 className="text-[20px] font-bold text-[#121213] leading-snug mb-4 hover:text-blue-600 transition">
                            {post.title}
                          </h3>
                        </Link>

                        <div className="flex items-center gap-3 text-sm text-gray-500">
                          {post.author?.name && (
                            <span>By {post.author.name}</span>
                          )}
                          {typeof post.views === "number" && (
                            <span>
                              ↗ {post.views.toLocaleString()} Views
                            </span>
                          )}
                          {post.publishedAt && (
                            <span>{formatDate(post.publishedAt)}</span>
                          )}
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            ))}
          </div>

          {/* RIGHT SIDEBAR (slightly wider) */}
          <aside className="lg:col-span-2">
            <div className="sticky top-24 space-y-8">
              <ExploreCategories />
              <PopularNewsSidebar />
              <TagsWidget />
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
