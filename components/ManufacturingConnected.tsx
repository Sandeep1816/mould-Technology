"use client";

import Link from "next/link";
import type { Post } from "../types/Post";

type ManufacturingConnectedProps = {
  posts?: Post[];
};

export default function ManufacturingConnected({ posts = [] }: ManufacturingConnectedProps) {
  const displayedPosts =
    posts.length > 0
      ? posts
      : [
          {
            id: 1,
            title: "Recycled, but also High-Quality, Efficient and Cost-Competitive",
            imageUrl: "/recycled-materials-manufacturing.jpg",
            slug: "recycled-high-quality-efficient",
            excerpt:
              "Recycling technology is improving fast — producing sustainable materials that meet industry-grade performance.",
          },
          {
            id: 2,
            title: "The Cyber Wake-Up Call for Manufacturing",
            imageUrl: "/cybersecurity-business.jpg",
            slug: "cyber-wake-up-call-for-manufacturing",
            excerpt:
              "As industrial systems get smarter, cybersecurity becomes the new frontline of manufacturing innovation.",
          },
          {
            id: 3,
            title: "AI's Achilles Heel",
            imageUrl: "/artificial-intelligence-technology.png",
            slug: "ais-achilles-heel",
            excerpt:
              "AI is transforming manufacturing, but its dependence on clean data and security protocols remains a challenge.",
          },
          {
            id: 4,
            title: "How to Address the Proficiency Gap in Manufacturing",
            imageUrl: "/manufacturing-worker-training.jpg",
            slug: "how-to-address-proficiency-gap",
            excerpt:
              "Closing the skills gap requires investment in people, technology, and continuous improvement strategies.",
          },
        ];

  return (
    <section className="bg-[#001B44] py-16 px-4 font-['Roboto',system-ui,apple-system]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h2
            className="text-[32px] md:text-[36px] font-bold tracking-tight text-white mb-2 uppercase"
            style={{ fontFamily: "Oswald, Helvetica Neue, Helvetica, Arial, sans-serif" }}
          >
            Manufacturing Connected
          </h2>
          <p
            className="text-[16px] text-gray-300"
            style={{ fontFamily: "Roboto, system-ui, apple-system, sans-serif" }}
          >
            Industry Moves Fast. We Make Sense of What's Next.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayedPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-md overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col"
            >
              {/* Image */}
              <div className="relative w-full h-48 overflow-hidden">
                <img
                  src={
                    post.imageUrl?.startsWith("http")
                      ? post.imageUrl
                      : post.imageUrl
                      ? `https://newsprk-backend.onrender.com${post.imageUrl}`
                      : "/placeholder.svg"
                  }
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Text */}
              <div className="p-4 flex flex-col flex-grow border-t border-gray-200">
                <h3
                  className="text-[16px] font-bold text-[#003366] mb-2 leading-snug hover:text-[#0077B6] transition"
                  style={{ fontFamily: "Oswald, Helvetica Neue, Helvetica, Arial, sans-serif" }}
                >
                  {post.title}
                </h3>

                <p
                  className="text-[14px] text-gray-700 mb-3 leading-snug flex-grow"
                  style={{ fontFamily: "Roboto, system-ui, apple-system, sans-serif" }}
                >
                  {post.excerpt}
                </p>

                <Link
                  href={`/post/${post.slug}`}
                  className="text-[#D92B2B] font-bold text-[13px] flex items-center gap-1 hover:text-[#B71C1C] uppercase tracking-wide"
                  style={{ fontFamily: "Oswald, Helvetica Neue, Helvetica, Arial, sans-serif" }}
                >
                  READ MORE <span>›</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
