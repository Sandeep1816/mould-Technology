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

        // ✅ Required for layout (3 small + 2 feature)
        setPosts(trendingPosts.slice(0, 5));
      } catch (err) {
        console.error("Failed to load Trending posts:", err);
      }
    }
    fetchPosts();
  }, []);

  if (posts.length === 0) {
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

  /* ---------------- AUTHOR META ---------------- */
  const Meta = ({ post }: { post?: Post }) => {
    if (!post?.author) return null;

    return (
      <div className="flex items-center gap-3 mt-3">
        <img
          src={post.author.avatarUrl || "/avatar-placeholder.png"}
          alt={post.author.name}
          className="w-8 h-8 rounded-full border border-white/20 object-cover"
        />

        <div className="leading-tight">
          <p className="text-sm font-semibold text-white">
            {post.author.name}
          </p>

          {post.publishedAt && (
            <p className="text-[11px] text-gray-400">
              {new Date(post.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </p>
          )}
        </div>
      </div>
    );
  };

  return (
    <section className="bg-[#0f1318] py-16 px-6 text-white">
      <div className="max-w-7xl mx-auto space-y-10">

        {/* HEADER */}
        <div className="flex items-center justify-between">
          <h2 className="text-white text-3xl font-semibold">Trending News</h2>
          <Link
            href="/trending"
            className="text-sm text-gray-300 hover:text-white"
          >
            View All →
          </Link>
        </div>

        {/* SMALL POSTS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[s1, s2, s3].map(
            (post, index) =>
              post && (
                <div
                  key={index}
                  className="flex items-start gap-4 border-b border-white/10 pb-6"
                >
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

                    <h3 className=" text-white text-base font-semibold leading-snug line-clamp-2">
                      {post.title}
                    </h3>

                    <Meta post={post} />
                  </div>
                </div>
              )
          )}
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
