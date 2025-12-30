"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { Post } from "@/types/Post";

interface LatestIssuesProps {
  posts?: Post[];
}

export default function LatestIssues({
  posts: initialPosts = [],
}: LatestIssuesProps) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);

  useEffect(() => {
    if (!initialPosts.length) {
      (async () => {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/posts?limit=1000`
        );
        const data = await res.json();
        const all: Post[] = data.data || data;

        const filtered = all.filter((p) =>
          typeof p.category === "object"
            ? p.category?.slug?.includes("latest-issue")
            : false
        );

        setPosts(filtered.slice(0, 3));
      })();
    } else {
      setPosts(initialPosts.slice(0, 3));
    }
  }, [initialPosts]);

  if (!posts.length) return null;

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative bg-[#F9F9F9] rounded-[18px] px-8 py-10">

          {/* Decorative shapes */}
          <Image
            src="/images/shape/flower-shape-02.png"
            alt=""
            width={120}
            height={120}
            className="absolute bottom-0 left-2 opacity-40 pointer-events-none"
          />
          <Image
            src="/images/shape/flower-shape-01.png"
            alt=""
            width={120}
            height={120}
            className="absolute top-0 right-0 opacity-40 pointer-events-none"
          />

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 relative z-10">
            {posts.map((post) => {
              const slug =
                typeof post.category === "object"
                  ? post.category?.slug
                  : "";

              const tagClass =
                slug?.includes("gaming")
                  ? "bg-[#0073FF]"
                  : slug?.includes("latest-issue")
                  ? "bg-[#E033E0]"
                  : slug?.includes("fashion")
                  ? "bg-[#E033E0]"
                  : "bg-[#F69C00]";

              return (
                <div
                  key={post.id}
                  className="bg-white rounded-[14px] shadow-[0_6px_20px_rgba(0,0,0,0.04)] p-5 flex gap-4"
                >
                  {/* Image */}
                  <Link
                    href={`/post/${post.slug}`}
                    className="text-white relative w-[96px] h-[96px] rounded-[12px] overflow-hidden flex-shrink-0"
                  >
                    <Image
                      src={
                        post.imageUrl?.startsWith("http")
                          ? post.imageUrl
                          : `${process.env.NEXT_PUBLIC_API_URL}${post.imageUrl}`
                      }
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  </Link>

                  {/* Content */}
                  <div className="flex flex-col gap-2">
                    {/* Tag */}
                    <Link
                      href={`/category/${slug}`}
                      className={`${tagClass} text-white  font-small px-4 py-[4px] rounded-full rounded-tl-none  w-fit`}
                    >
                      {typeof post.category === "object"
                        ? post.category.name
                        : post.category}
                    </Link>

                    {/* Title */}
                    <h3 className="text-title text-[#121213] hover:text-[#0073FF] transition">
                      <Link href={`/post/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h3>

                    {/* Meta */}
                    <div className="flex items-center gap-3 text-meta text-[#616C74]">
                      <span>
                        By{" "}
                        <span className="font-medium">
                          {post.author?.name || "rstheme"}
                        </span>
                      </span>

                      <span className="flex items-center gap-1">
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                          <path
                            d="M6.165 8H6.06c-.21-.02-.41-.11-.57-.25-.16-.14-.27-.33-.31-.54L3.84 1 2.46 4.2a.54.54 0 01-.46.3H.5a.5.5 0 010-1h1.17L2.93.6c.08-.2.22-.36.41-.46.18-.1.39-.14.6-.12.21.02.41.11.57.25.16.14.27.33.31.54L6.16 7l1.38-3.19A.5.5 0 018 3.5h1.5a.5.5 0 010 1H8.33L7.08 7.4c-.08.18-.2.33-.36.44-.16.11-.35.17-.56.16z"
                            fill="#616C74"
                          />
                        </svg>
                        <span>{post.views?.toLocaleString() || 0} Views</span>
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
