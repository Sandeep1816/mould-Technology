"use client";

import { useEffect, useState } from "react";

type VideoPost = {
  id: number;
  title: string;
  slug?: string;
  category?: { name: string } | string;
  publishedAt?: string;
  imageUrl?: string;
};

export default function VideosSection() {
  const [videos, setVideos] = useState<VideoPost[]>([]);
  const [loading, setLoading] = useState(true);

  // 🧩 Fallback placeholder videos (if backend has no data)
  const fallbackVideos = [
    {
      id: 1,
      title:
        "CAD/CAM Software Suite Enhances Intelligent Workflow for Tool, Moldmaking Projects",
      category: "DESIGN & MFG. SOFTWARE",
      publishedAt: "2024-07-24",
      imageUrl: "/cad-cam-software-design.jpg",
    },
    {
      id: 2,
      title: "CNC Platform Creates Adaptable Interface for Workholding",
      category: "WORKHOLDING",
      publishedAt: "2024-06-25",
      imageUrl: "/cnc-workholding-platform.jpg",
    },
    {
      id: 3,
      title: "Tangentially Mounted Inserts Achieve Multifunctional Milling",
      category: "CUTTING TOOLS",
      publishedAt: "2024-05-23",
      imageUrl: "/cutting-tools-inserts.jpg",
    },
  ];

  // 🧠 Fetch from backend on mount
  useEffect(() => {
    async function fetchVideos() {
      try {
        const res = await fetch(
          "https://newsprk-backend.onrender.com/api/posts?category=videos",
          { cache: "no-store" }
        );
        const data = await res.json();
        const posts = data.data || data;

        if (Array.isArray(posts) && posts.length > 0) {
          setVideos(posts);
        } else {
          setVideos(fallbackVideos);
        }
      } catch (err) {
        console.error("Failed to load videos:", err);
        setVideos(fallbackVideos);
      } finally {
        setLoading(false);
      }
    }

    fetchVideos();
  }, []);

  // 🕑 Loading State
  if (loading) {
    return (
      <section className="py-12 px-4 bg-white text-center">
        <div className="text-gray-600">Loading videos...</div>
      </section>
    );
  }

  // 🎥 Render videos
  return (
    <section className="py-12 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Videos
          </h2>
          <a
            href="#"
            className="border-2 border-teal-700 text-teal-700 px-6 py-2 font-bold hover:bg-teal-700 hover:text-white transition"
          >
            VIEW ALL &gt;
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {videos.map((video) => {
            const categoryName =
              typeof video.category === "object"
                ? video.category?.name
                : video.category || "VIDEO";

            const image =
              video.imageUrl && video.imageUrl.startsWith("http")
                ? video.imageUrl
                : video.imageUrl
                ? `https://newsprk-backend.onrender.com${video.imageUrl}`
                : "/placeholder.svg";

            const date = video.publishedAt
              ? new Date(video.publishedAt).toLocaleDateString("en-US", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })
              : "Today";

            return (
              <div
                key={video.id}
                className="bg-gray-50 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative">
                  <img
                    src={image}
                    alt={video.title}
                    className="w-full h-40 object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 hover:bg-opacity-50 transition">
                    <div className="bg-white rounded-full p-3 text-teal-700">
                      <svg
                        className="w-6 h-6 fill-current"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="p-4">
                  <div className="bg-teal-700 text-white text-xs font-bold px-3 py-1 inline-block mb-2">
                    {categoryName}
                  </div>
                  <p className="text-xs text-gray-600 mb-2">{date}</p>
                  <h3 className="font-bold text-gray-900 mb-2 text-sm leading-tight">
                    {video.title}
                  </h3>
                  <a
                    href={`/post/${video.slug || "#"}`}
                    className="text-teal-600 font-bold text-sm hover:text-teal-700"
                  >
                    WATCH &gt;
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
