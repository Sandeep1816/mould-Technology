"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { Post } from "@/types/Post";

interface LatestIssuesProps {
  posts?: Post[];
}

export default function LatestIssues({ posts: initialPosts = [] }: LatestIssuesProps) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);

  // ✅ Fetch posts
  useEffect(() => {
    if (!initialPosts || initialPosts.length === 0) {
      async function fetchPosts() {
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts?limit=1000`);
          const data = await res.json();
          const allPosts: Post[] = data.data || data;

          const latestIssuePosts = allPosts.filter((p) =>
            typeof p.category === "object"
              ? p.category?.slug?.toLowerCase().includes("latest-issue")
              : String(p.category || "").toLowerCase().includes("latest-issue")
          );

          setPosts(latestIssuePosts.slice(0, 4));
        } catch (err) {
          console.error("Failed to load Latest Issue posts:", err);
        }
      }
      fetchPosts();
    } else {
      setPosts(initialPosts.slice(0, 4));
    }
  }, [initialPosts]);

  // ✅ Autoplay
  useEffect(() => {
    if (!isAutoplay || posts.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % posts.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoplay, posts]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + posts.length) % posts.length);
    setIsAutoplay(false);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % posts.length);
    setIsAutoplay(false);
  };

  if (!posts || posts.length === 0)
    return <div className="text-center py-10 text-gray-400">No Latest Issue posts available.</div>;

  return (
    <section className="relative py-20 px-6 overflow-hidden">
      {/* 🧱 Realistic background: metal photo + dark overlay + gradient */}
      <div className="absolute inset-0">
        <div
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: `
              linear-gradient(to bottom, rgba(0,0,0,0.45), rgba(0,0,0,0.55)),
              url('/backgrounds/mould-factory-texture.jpg')
            `,
            backgroundBlendMode: "overlay",
            filter: "grayscale(100%) brightness(0.7)",
          }}
        ></div>
      </div>

      {/* 🔹 Foreground content */}
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <h2
          className="text-center text-[36px] font-semibold mb-14 text-white"
          style={{
            fontFamily: "Oswald, Helvetica Neue, Helvetica, Arial, sans-serif",
            letterSpacing: "0.5px",
          }}
        >
          Latest Issue
        </h2>

        {/* 🔸 Carousel container */}
        <div className="relative flex items-center">
          {/* Left arrow */}
          <button
            onClick={handlePrev}
            aria-label="Previous slide"
            className="absolute -left-8 md:-left-12 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white w-10 h-10 rounded flex items-center justify-center shadow transition"
          >
            ‹
          </button>

          {/* Slides */}
          <div className="overflow-hidden w-full">
            <div
              className="flex gap-6 transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 25.5}%)` }}
            >
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="flex-shrink-0 w-full md:w-1/4 lg:w-1/4 bg-white rounded-sm shadow-md hover:shadow-xl transition-all duration-300 flex flex-col"
                >
                  {/* Image */}
                  <div className="relative w-full h-[220px] bg-gray-100 overflow-hidden">
                    <Image
                      src={
                        post.imageUrl?.startsWith("http")
                          ? post.imageUrl
                          : post.imageUrl
                          ? `${process.env.NEXT_PUBLIC_API_URL}${post.imageUrl}`
                          : "/placeholder.svg"
                      }
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex flex-col justify-between p-6 flex-grow text-center">
                    <h3
                      className="text-[20px] text-[#003049] leading-snug mb-6 font-normal hover:text-[#0077b6] transition-colors"
                      style={{
                        fontFamily: "Oswald, Helvetica Neue, Helvetica, Arial, sans-serif",
                      }}
                    >
                      {post.title}
                    </h3>

                    <Link
                      href={`/post/${post.slug}`}
                      className="text-[14px] text-[#0077b6] font-semibold uppercase hover:text-[#0096c7] transition-all tracking-wide"
                      style={{
                        fontFamily:
                          "Roboto, system-ui, -apple-system, Helvetica, Arial, sans-serif",
                      }}
                    >
                      {post.title.toLowerCase().includes("issue")
                        ? "Digital Edition"
                        : "Read"}{" "}
                      <span className="ml-1">›</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right arrow */}
          <button
            onClick={handleNext}
            aria-label="Next slide"
            className="absolute -right-8 md:-right-12 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white w-10 h-10 rounded flex items-center justify-center shadow transition"
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
}

