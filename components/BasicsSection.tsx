"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Post } from "../types/Post";

/* ------------------ RIGHT SIDEBAR COMPONENTS ------------------ */

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
        {posts.slice(0, 3).map((post) => (
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

/* ✅ FOLLOW US – EXACT NERIO DESIGN */
function FollowUsWidget() {
  const socials = [
    {
      name: "Facebook",
      followers: "88.2k Followers",
      bg: "bg-[#2463D3]",
      icon: "ri-facebook-fill",
    },
    {
      name: "Twitter - X",
      followers: "48.6k Followers",
      bg: "bg-black",
      icon: "ri-twitter-x-fill",
    },
    {
      name: "Dribbble",
      followers: "39.5k Followers",
      bg: "bg-[#F43F8C]",
      icon: "ri-dribbble-fill",
    },
    {
      name: "Pinterest",
      followers: "28.2k Followers",
      bg: "bg-[#B7081B]",
      icon: "ri-pinterest-fill",
    },
    {
      name: "LinkedIn",
      followers: "30.3k Followers",
      bg: "bg-[#0077B5]",
      icon: "ri-linkedin-fill",
    },
    {
      name: "Instagram",
      followers: "24.5k Followers",
      bg: "bg-[#E1306C]",
      icon: "ri-instagram-line",
    },
  ];

  return (
    <div className="bg-white rounded-xl border p-6">
      <h3 className="text-xl font-semibold mb-6">Follow Us</h3>

      <div className="space-y-3">
        {socials.map((s) => (
          <div
            key={s.name}
            className={`${s.bg} text-white rounded-lg px-4 py-3 flex items-center justify-between`}
          >
            <div className="flex items-center gap-3 font-semibold">
              <i className={`${s.icon} text-lg`} />
              {s.name}
            </div>
            <span className="text-sm font-medium">
              {s.followers}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------ MAIN SECTION ------------------ */

export default function BasicsSection() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    async function fetchPosts() {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/posts?limit=1000`
      );
      const json = await res.json();
      const allPosts: Post[] = json.data || json;

      const basicsPosts = allPosts.filter((p) =>
        typeof p.category === "object"
          ? p.category?.slug?.toLowerCase().includes("basics")
          : String(p.category || "").toLowerCase().includes("basics")
      );

      setPosts(basicsPosts.slice(0, 6));
    }

    fetchPosts();
  }, []);

  if (!posts.length) return null;

  return (
    <section className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-[34px] font-semibold tracking-tight text-[#111] font-oswald">
            Trending Stories
          </h2>

          <Link
            href="/basics"
            className="text-sm font-semibold uppercase tracking-wide text-[#0077b6] hover:underline"
          >
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          {/* LEFT CONTENT */}
          <div className="lg:col-span-3 space-y-10">
            {posts.map((post) => (
              <article
                key={post.id}
                className="flex gap-6 border-b pb-10 last:border-b-0"
              >
                <Link
                  href={`/post/${post.slug}`}
                  className="w-[280px] h-[180px] flex-shrink-0 overflow-hidden rounded-md bg-gray-100"
                >
                  <img
                    src={
                      post.imageUrl?.startsWith("http")
                        ? post.imageUrl
                        : post.imageUrl
                        ? `${process.env.NEXT_PUBLIC_API_URL}${post.imageUrl}`
                        : "/placeholder.jpg"
                    }
                    alt={post.title}
                    className="w-full h-full object-cover hover:scale-105 transition"
                  />
                </Link>

                <div className="flex flex-col">
                  {post.category && (
                    <span className="inline-block mb-2 text-[11px] font-bold uppercase tracking-widest bg-[#0077b6] text-white px-3 py-1 w-fit">
                      {typeof post.category === "object"
                        ? post.category.name
                        : post.category}
                    </span>
                  )}

                  <Link href={`/post/${post.slug}`}>
                    <h3 className="text-[26px] leading-snug font-semibold text-[#111] hover:text-[#0077b6] transition">
                      {post.title}
                    </h3>
                  </Link>

                  {post.excerpt && (
                    <p className="mt-3 text-[15px] text-gray-600 line-clamp-3">
                      {post.excerpt}
                    </p>
                  )}

                  <div className="mt-4 flex items-center gap-4 text-[13px] text-gray-500">
                    <span>
                      By{" "}
                      <strong className="text-gray-700">
                        {post.author?.name}
                      </strong>
                    </span>
                    <span>•</span>
                    {post.views && (
                      <span>{post.views.toLocaleString()} Views</span>
                    )}
                    <span>•</span>
                    {post.publishedAt && (
                      <span>
                        {new Date(post.publishedAt).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          }
                        )}
                      </span>
                    )}
                  </div>
                </div>
              </article>
            ))}

            {/* ✅ LOAD MORE NEWS */}
            <div className="flex justify-center pt-4">
              <button className="flex items-center gap-2 px-6 py-3 rounded-md border bg-white hover:bg-gray-100 transition text-sm font-medium">
                Load More News
                <span className="text-lg">↻</span>
              </button>
            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 space-y-8">
              <ExploreCategories />
              <PopularNewsSidebar />
              <FollowUsWidget />
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
