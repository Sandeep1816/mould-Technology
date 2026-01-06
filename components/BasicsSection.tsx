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
    <div className="bg-white border rounded-lg p-6">
      <h5 className="text-[18px] font-semibold mb-5 text-[#121213]">
        Explore Categories
      </h5>

      <ul className="space-y-3">
        {categories.map((cat) => (
          <li key={cat.name}>
            <Link
              href={`/category/${cat.name.toLowerCase()}`}
              className="flex items-center justify-between px-4 py-3 rounded-md bg-[#f5f5f5] hover:bg-[#ededed] transition"
            >
              <span className="text-[15px] font-medium text-[#121213]">
                {cat.name} ({cat.count})
              </span>
              <span className="text-lg">→</span>
            </Link>
          </li>
        ))}
      </ul>
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
    <div className="bg-white border rounded-lg p-6">
      <h5 className="text-[18px] font-semibold mb-5 text-[#121213]">
        Popular News
      </h5>

      <div className="space-y-5">
        {posts.slice(0, 3).map((post) => (
          <Link
            key={post.id}
            href={`/post/${post.slug}`}
            className="flex gap-4"
          >
            <img
              src={imageUrl(post)}
              alt={post.title}
              className="w-[80px] h-[80px] rounded-md object-cover"
            />

            <div>
              <span className="inline-block mb-1 text-[11px] font-bold uppercase bg-[#54bd05] text-white px-2 py-[2px] rounded">
                {typeof post.category === "object"
                  ? post.category?.name
                  : post.category}
              </span>

              <h6 className="text-[14px] font-semibold leading-snug text-[#121213] line-clamp-2">
                {post.title}
              </h6>

              <div className="text-[12px] text-[#9a9a9a] mt-1">
                By {post.author?.name} · {post.views?.toLocaleString()} Views
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function FollowUsWidget() {
  const socials = [
    { name: "Facebook", followers: "88.2k Followers", bg: "#2463D3", icon: "ri-facebook-fill" },
    { name: "Twitter - X", followers: "48.6k Followers", bg: "#000000", icon: "ri-twitter-x-fill" },
    { name: "Dribbble", followers: "39.5k Followers", bg: "#EA4C89", icon: "ri-dribbble-fill" },
    { name: "Pinterest", followers: "28.2k Followers", bg: "#B7081B", icon: "ri-pinterest-fill" },
    { name: "LinkedIn", followers: "30.3k Followers", bg: "#0077B5", icon: "ri-linkedin-fill" },
    { name: "Instagram", followers: "24.5k Followers", bg: "#E1306C", icon: "ri-instagram-line" },
  ];

  return (
    <div className="bg-white border rounded-lg p-6">
      <h5 className="text-[18px] font-semibold mb-5 text-[#121213]">
        Follow Us
      </h5>

      <ul className="space-y-3">
        {socials.map((s) => (
          <li key={s.name}>
            <div
              className="rounded-md px-4 py-3 flex items-center justify-between text-white"
              style={{ backgroundColor: s.bg }}
            >
              <div className="flex items-center gap-3 font-medium">
                <i className={`${s.icon} text-lg`} />
                {s.name}
              </div>
              <span className="text-[13px]">{s.followers}</span>
            </div>
          </li>
        ))}
      </ul>
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
    <section className="bg-[#f7f7f7] pt-[70px] pb-[80px]">
      <div className="max-w-[1320px] mx-auto px-[15px]">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-[36px] font-semibold text-[#121213]">
            Trending Stories
          </h2>

          <Link
            href="/basics"
            className="text-[14px] font-semibold uppercase text-[#0073ff]"
          >
            View All →
          </Link>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-[8fr_4fr] gap-10">
          {/* LEFT */}
          <div className="space-y-10">
            {posts.map((post) => (
              <article
                key={post.id}
                className="flex gap-6 pb-10 border-b border-[#e5e5e5]"
              >
                <Link
                  href={`/post/${post.slug}`}
                  className="w-[280px] h-[180px] shrink-0 overflow-hidden rounded-md"
                >
                  <img
                    src={
                      post.imageUrl?.startsWith("http")
                        ? post.imageUrl
                        : `${process.env.NEXT_PUBLIC_API_URL}${post.imageUrl}`
                    }
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </Link>

                <div>
                  <span className="inline-block mb-2 text-[11px] font-bold uppercase bg-[#0073ff] text-white px-3 py-[2px]">
                    {typeof post.category === "object"
                      ? post.category?.name
                      : post.category}
                  </span>

                  <h3 className="text-[24px] font-semibold text-[#121213] leading-snug">
                    {post.title}
                  </h3>

                  {post.excerpt && (
                    <p className="mt-3 text-[15px] text-[#616c74] leading-relaxed">
                      {post.excerpt}
                    </p>
                  )}
                </div>
              </article>
            ))}
          </div>

          {/* RIGHT */}
          <aside>
            <div className="sticky top-[90px] space-y-8">
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
