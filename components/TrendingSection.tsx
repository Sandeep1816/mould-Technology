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

        // 3 small + 2 feature posts
        setPosts(trendingPosts.slice(0, 5));
      } catch (err) {
        console.error("Failed to load Trending posts:", err);
      }
    }
    fetchPosts();
  }, []);

  if (!posts.length) {
    return (
      <div className="text-center py-10 text-gray-500">
        No Trending posts available.
      </div>
    );
  }

  const s1 = posts[0];
  const s2 = posts[1];
  const s3 = posts[2];
  const big = posts[3];
  const right = posts[4];

  const imageUrl = (post?: Post) =>
    post?.imageUrl?.startsWith("http")
      ? post.imageUrl
      : post?.imageUrl
      ? `${process.env.NEXT_PUBLIC_API_URL}${post.imageUrl}`
      : "/placeholder.jpg";

  /* ---------- META (VIEWS + DATE) ---------- */
  const Meta = ({ post }: { post?: Post }) => {
    if (!post) return null;

    return (
      <div className="flex items-center gap-4 mt-2 text-[13px] text-gray-400">
        {/* Views */}
        <span className="flex items-center gap-1">
          <svg
            width="10"
            height="8"
            viewBox="0 0 10 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.165 8H6.06c-.21-.02-.41-.11-.57-.25-.16-.14-.27-.33-.31-.54L3.84 1 2.46 4.2a.54.54 0 01-.46.3H.5a.5.5 0 010-1h1.17L2.93.6c.08-.2.22-.36.41-.46.18-.1.39-.14.6-.12.21.02.41.11.57.25.16.14.27.33.31.54L6.16 7l1.38-3.19A.5.5 0 018 3.5h1.5a.5.5 0 010 1H8.33L7.08 7.4c-.08.18-.2.33-.36.44-.16.11-.35.17-.56.16z"
              fill="#9CA3AF"
            />
          </svg>
          <span>{post.views?.toLocaleString() || 0} Views</span>
        </span>

        {/* Date */}
        {post.publishedAt && (
          <span>
            {new Date(post.publishedAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        )}
      </div>
    );
  };

  return (
    <section className="bg-[#0f1318] py-16 px-6 text-white">
      <div className="max-w-7xl mx-auto space-y-10">

        {/* HEADER */}
        <div className="flex items-center justify-between">
          <h2 className="text-white text-3xl font-semibold">
            Trending News
          </h2>
          <Link
            href="/trending"
            className="text-sm text-gray-300 hover:text-white"
          >
            View All →
          </Link>
        </div>

        {/* TOP 3 SMALL POSTS (CONTINUOUS LINES) */}
        <div className="relative py-8">
          {/* TOP LINE */}
          <span className="absolute top-0 left-0 w-full h-px bg-white/10" />
          {/* BOTTOM LINE */}
          <span className="absolute bottom-0 left-0 w-full h-px bg-white/10" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[s1, s2, s3].map(
              (post, index) =>
                post && (
                  <div key={index} className="flex items-start gap-4">
                    <Image
                      src={imageUrl(post)}
                      alt={post.title}
                      width={90}
                      height={90}
                      className="rounded-lg object-cover"
                    />

                    <div>
                      <span className="inline-block mb-2 text-xs font-bold px-3 py-1 rounded bg-orange-500">
                        {typeof post.category === "object"
                          ? post.category?.name
                          : post.category}
                      </span>

                      <h3 className="text-white text-base font-semibold leading-snug line-clamp-2">
                        {post.title}
                      </h3>

                      <Meta post={post} />
                    </div>
                  </div>
                )
            )}
          </div>
        </div>

        {/* FEATURE POSTS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* BIG LEFT */}
          {big && (
            <Link
              href={`/post/${big.slug}`}
              className="lg:col-span-2 relative h-[420px] rounded-xl overflow-hidden group"
            >
              <Image
                src={imageUrl(big)}
                alt={big.title}
                fill
                className="object-cover group-hover:scale-105 transition duration-500"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

              <div className="absolute bottom-6 left-6 max-w-xl">
                <span className="bg-blue-600 text-xs font-bold px-3 py-1 rounded">
                  {typeof big.category === "object"
                    ? big.category?.name
                    : big.category}
                </span>

                <h2 className="text-white text-3xl font-semibold mt-4 leading-snug">
                  {big.title}
                </h2>

                <Meta post={big} />
              </div>
            </Link>
          )}

          {/* RIGHT FEATURE */}
          {right && (
            <Link
              href={`/post/${right.slug}`}
              className="relative h-[420px] rounded-xl overflow-hidden group"
            >
              <Image
                src={imageUrl(right)}
                alt={right.title}
                fill
                className="object-cover group-hover:scale-105 transition duration-500"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

              <div className="absolute bottom-6 left-6">
                <span className="bg-pink-600 text-xs font-bold px-3 py-1 rounded">
                  {typeof right.category === "object"
                    ? right.category?.name
                    : right.category}
                </span>

                <h3 className="text-white text-xl font-semibold mt-4 leading-snug">
                  {right.title}
                </h3>

                <Meta post={right} />
              </div>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
