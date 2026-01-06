"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { Post } from "../types/Post";

export default function TrendingSection() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    async function fetchPosts() {
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

      setPosts(trendingPosts.slice(0, 5));
    }

    fetchPosts();
  }, []);

  if (!posts.length) return null;

  const [s1, s2, s3, big, right] = posts;

  const imageUrl = (post?: Post) =>
    post?.imageUrl?.startsWith("http")
      ? post.imageUrl
      : post?.imageUrl
      ? `${process.env.NEXT_PUBLIC_API_URL}${post.imageUrl}`
      : "/placeholder.jpg";

  const Meta = ({ post }: { post?: Post }) =>
    post ? (
      <div className="flex items-center gap-4 mt-2 text-[13px] text-white/70">
        <span>{post.views?.toLocaleString()} Views</span>
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
    ) : null;

  return (
    /* 🔹 rs-trending-news-area */
    <section className="bg-[#0f1318] pt-[70px] pb-[80px] text-white">
      {/* 🔹 container */}
      <div className="max-w-[1320px] mx-auto px-[12px] space-y-10">

        {/* HEADER */}
        <div className="flex items-center justify-between">
          <h2 className="text-[36px] font-semibold text-white">
            Trending News
          </h2>
          <Link href="/trending" className="text-sm text-white/70 hover:text-white">
            View All →
          </Link>
        </div>

        {/* TOP 3 SMALL POSTS */}
        <div className="relative py-8">
          <span className="absolute top-0 left-0 w-full h-px bg-white/10" />
          <span className="absolute bottom-0 left-0 w-full h-px bg-white/10" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[s1, s2, s3].map(
              (post, i) =>
                post && (
                  <div key={i} className="flex gap-4">
                    <Image
                      src={imageUrl(post)}
                      alt={post.title}
                      width={90}
                      height={90}
                      className="rounded-lg object-cover"
                    />
                    <div>
                      <span className="inline-block mb-2 text-xs font-bold px-3 py-1 rounded bg-yellow-500 text-black">
                        {typeof post.category === "object"
                          ? post.category?.name
                          : post.category}
                      </span>
                      <h3 className="text-white text-[16px] font-semibold leading-snug">
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

          {big && (
            <Link
              href={`/post/${big.slug}`}
              className="lg:col-span-2 relative h-[420px] rounded-xl overflow-hidden"
            >
              <Image src={imageUrl(big)} alt={big.title} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-6 left-6 max-w-xl">
                <span className="bg-blue-600 text-xs font-bold px-3 py-1 rounded">
                  {typeof big.category === "object" ? big.category?.name : big.category}
                </span>
                <h2 className="text-white text-[30px] font-semibold mt-4">
                  {big.title}
                </h2>
                <Meta post={big} />
              </div>
            </Link>
          )}

          {right && (
            <Link
              href={`/post/${right.slug}`}
              className="relative h-[420px] rounded-xl overflow-hidden"
            >
              <Image src={imageUrl(right)} alt={right.title} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <span className="bg-pink-600 text-xs font-bold px-3 py-1 rounded">
                  {typeof right.category === "object"
                    ? right.category?.name
                    : right.category}
                </span>
                <h3 className="text-white text-[24px] font-semibold mt-4">
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
