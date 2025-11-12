"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

type LatestHeroProps = {
  post: any;
};

type Post = {
  id: number;
  title: string;
  slug: string;
  excerpt?: string;
  imageUrl?: string;
  publishedAt?: string;
  content?: string;
  category?: any;
};

export default function LatestHero({ post }: LatestHeroProps) {
  const [latestPosts, setLatestPosts] = useState<Post[]>([]);

  // 🧩 Fetch all "latest" posts
  useEffect(() => {
    async function fetchLatest() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts?limit=1000`)
        const data = await res.json();
        const all: Post[] = data.data || data;

        const filtered = all
          .filter(
            (p) =>
              typeof p.category === "object"
                ? p.category?.slug?.toLowerCase() === "latest"
                : String(p.category || "").toLowerCase() === "latest"
          )
          .filter((p) => p.id !== post.id)
          .sort(
            (a, b) =>
              new Date(b.publishedAt || "").getTime() -
              new Date(a.publishedAt || "").getTime()
          )
          .slice(0, 3);

        setLatestPosts(filtered);
      } catch (err) {
        console.error("Failed to load latest posts", err);
      }
    }

    fetchLatest();
  }, [post.id]);

  // 🧠 Featured image
  const imageUrl =
    post.imageUrl && post.imageUrl.startsWith("http")
      ? post.imageUrl
      : post.imageUrl
      ? `${process.env.NEXT_PUBLIC_API_URL}${post.imageUrl}`
      : "/modern-manufacturing-facility.png";

  const date = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "TODAY";

  return (
    <section className="mb-12 border-t border-b border-gray-300 py-12 px-6 bg-[#f5f6f7]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* LEFT COLUMN */}
          <div className="flex flex-col justify-center">
            <div className="text-xs text-gray-600 font-bold tracking-widest mb-4 uppercase">
              {date}
            </div>

            <h1
              className="text-3xl font-bold text-[#003049] leading-tight mb-4"
              style={{ fontFamily: "var(--font-oswald)" }}
            >
              {post.title}
            </h1>

            <p className="text-gray-700 text-base leading-relaxed mb-6 line-clamp-4">
              {post.excerpt ||
                post.content?.replace(/<[^>]+>/g, "").substring(0, 200) + "..." ||
                ""}
            </p>

            <Link
              href={`/post/${post.slug}`}
              className="text-[#0077b6] font-semibold text-sm hover:text-[#0096c7] flex items-center gap-1 w-fit mb-10"
              style={{ fontFamily: "var(--font-oswald)" }}
            >
              READ MORE <span>›</span>
            </Link>

            {/* 🔹 LATEST HEADING */}
            <div className="flex items-center justify-center my-6">
              <div className="flex-grow border-t border-gray-400"></div>
              <span
                className="px-3 text-[20px] font-semibold text-[#04394D] uppercase tracking-wider"
                style={{ fontFamily: "var(--font-oswald)" }}
              >
                Latest
              </span>
              <div className="flex-grow border-t border-gray-400"></div>
            </div>

            {/* 🔸 3 LATEST POSTS */}
            <div className="space-y-6">
              {latestPosts.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 border-b border-gray-200 pb-4 hover:bg-gray-50 hover:shadow-sm rounded-md transition-all duration-200"
                >
                  {/* Thumbnail */}
                  <div className="relative w-[100px] h-[75px] shrink-0 overflow-hidden rounded-sm">
                    <Image
                      src={
                        item.imageUrl && item.imageUrl.startsWith("http")
                          ? item.imageUrl
                          : item.imageUrl
                          ? `${process.env.NEXT_PUBLIC_API_URL}${item.imageUrl}`
                          : "/placeholder.svg"
                      }
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Title only */}
                  <div className="flex-1 flex flex-col justify-center">
                    <Link
                      href={`/post/${item.slug}`}
                      className="text-[20px] text-[#003049] leading-snug hover:text-[#0077b6] transition-colors"
                      style={{ fontFamily: "var(--font-oswald)", fontWeight: 400 }}
                    >
                      {item.title}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN - FEATURED IMAGE */}
          <div className="w-full">
            <img
              src={imageUrl || "/placeholder.svg"}
              alt={post.title}
              className="w-full h-96 object-cover border border-gray-300 rounded"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
