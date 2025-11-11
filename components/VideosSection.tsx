"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type VideoPost = {
  id: number;
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  category?: { id: number; name: string; slug?: string } | string;
  publishedAt?: string;
  imageUrl?: string;
};

export default function VideosSection() {
  const [videos, setVideos] = useState<VideoPost[]>([]);

  useEffect(() => {
    async function fetchVideos() {
      try {
        const res = await fetch(
          "https://newsprk-backend.onrender.com/api/posts?limit=1000"
        );
        const data = await res.json();
        const allVideos: VideoPost[] = data.data || data;

        const filtered = allVideos.filter((p) =>
          typeof p.category === "object"
            ? p.category?.slug?.toLowerCase().includes("videos")
            : String(p.category || "").toLowerCase().includes("videos")
        );

        setVideos(filtered.slice(0, 6));
      } catch (err) {
        console.error("Failed to load videos:", err);
      }
    }

    fetchVideos();
  }, []);

  if (videos.length === 0)
    return (
      <section className="py-12 text-center text-gray-500">
        No videos available.
      </section>
    );

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
            Videos
          </h2>

          <Link
            href="/videos"
            className="border border-[#003049] text-[#003049] text-[14px] font-semibold px-4 py-2 uppercase tracking-wide hover:bg-[#003049] hover:text-white transition-all duration-300"
            style={{
              fontFamily: "Oswald, Helvetica Neue, Helvetica, Arial, sans-serif",
            }}
          >
            View All ›
          </Link>
        </div>

        {/* 🔸 Layout - Videos + Ads */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* 🎥 Left side – Video Cards */}
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-8">
            {videos.map((video) => {
              const category =
                typeof video.category === "object"
                  ? video.category?.name
                  : video.category || "VIDEO";

              const image =
                video.imageUrl && video.imageUrl.startsWith("http")
                  ? video.imageUrl
                  : video.imageUrl
                  ? `https://newsprk-backend.onrender.com${video.imageUrl}`
                  : "/placeholder.jpg";

              const date = video.publishedAt
                ? new Date(video.publishedAt).toLocaleDateString("en-US", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })
                : "TODAY";

              return (
                <div
                  key={video.id}
                  className="flex flex-col bg-white border border-gray-200 hover:shadow-md transition-all duration-300"
                >
                  {/* Thumbnail */}
                  <div className="relative w-full h-[180px] bg-gray-100 overflow-hidden">
                    <img
                      src={image}
                      alt={video.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    {/* Play button overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition">
                      <div className="bg-white/95 rounded-full p-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="#0077b6"
                          className="w-6 h-6"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 flex flex-col grow">
                    <div className="flex items-center gap-3 mb-2">
                      <span
                        className="bg-[#0077b6] text-white px-3 py-[3px] text-[11px] font-bold uppercase tracking-widest"
                        style={{
                          fontFamily:
                            "Oswald, Helvetica Neue, Helvetica, Arial, sans-serif",
                        }}
                      >
                        {category}
                      </span>
                      <span
                        className="text-xs text-gray-500 font-semibold uppercase"
                        style={{
                          fontFamily:
                            "Oswald, Helvetica Neue, Helvetica, Arial, sans-serif",
                        }}
                      >
                        {date}
                      </span>
                    </div>

                    {/* Title */}
                    <h3
                      className="text-[24px] font-normal text-[#003049] leading-snug mb-3 hover:text-[#0077b6] transition-colors line-clamp-3"
                      style={{
                        fontFamily:
                          "Oswald, Helvetica Neue, Helvetica, Arial, sans-serif",
                      }}
                    >
                      {video.title}
                    </h3>

                    {/* Excerpt */}
                    {video.excerpt && (
                      <p
                        className="text-[14px] text-gray-700 mb-3 leading-relaxed line-clamp-3"
                        style={{
                          fontFamily:
                            "Roboto, system-ui, -apple-system, Helvetica, Arial, sans-serif",
                        }}
                      >
                        {video.excerpt}
                      </p>
                    )}

                    {/* Watch Link */}
                    <Link
                      href={`/post/${video.slug || "#"}`}
                      className="text-[#0077b6] font-semibold text-sm hover:text-[#0096c7] flex items-center gap-1 mt-auto"
                      style={{
                        fontFamily:
                          "Oswald, Helvetica Neue, Helvetica, Arial, sans-serif",
                        letterSpacing: "0.4px",
                      }}
                    >
                      WATCH <span>›</span>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* 📢 Right side – Advertisements */}
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              <h3
                className="text-[18px] font-semibold text-[#003049] mb-4 border-b border-gray-300 pb-2"
                style={{
                  fontFamily:
                    "Oswald, Helvetica Neue, Helvetica, Arial, sans-serif",
                }}
              >
                Advertisement
              </h3>

              <div className="flex flex-col gap-6">
                {/* Ad 1 */}
                <div className="border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300">
                  <img
                    src="/ads/mmt-today.jpg"
                    alt="Advertisement 1"
                    className="w-full h-[180px] object-cover"
                  />
                </div>

                {/* Ad 2 */}
                <div className="border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300">
                  <img
                    src="/ads/moldmaking.jpg"
                    alt="Advertisement 2"
                    className="w-full h-[180px] object-cover"
                  />
                </div>

                {/* Ad 3 */}
                <div className="border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300">
                  <img
                    src="/ads/ptxpo.jpg"
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
