import Link from "next/link";
import {
  Linkedin,
  Facebook,
  Youtube,
  Twitter,
  Instagram,
} from "lucide-react";
import FooterRecentPosts from "@/components/FooterRecentPosts";

export default function Footer() {
  return (
    <footer className="w-full bg-[#0b0b0b] text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-14">

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">

          {/* BRAND */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-white mb-3">Mould</h2>

            <p className="text-sm leading-relaxed text-gray-400 mb-6">
              We love to bring ideas to life using modern frontend tools and
              industrial technology insights.
            </p>

            <div className="flex gap-3">
              {[Facebook, Instagram, Twitter, Linkedin, Youtube].map(
                (Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-9 h-9 flex items-center justify-center rounded-md bg-white/10 hover:bg-white/20 transition"
                  >
                    <Icon size={16} />
                  </a>
                )
              )}
            </div>
          </div>

          {/* TOP CATEGORIES */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm">
              Top Categories
            </h3>
            <ul className="space-y-2 text-sm">
              {[
                "Entertainment",
                "Architecture",
                "Technology",
                "Mental Health",
                "Music News",
              ].map((item) => (
                <li key={item}>
                  <Link href="#" className="hover:text-white transition">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* RECENT POSTS (CLIENT COMPONENT) */}
          <FooterRecentPosts />

          {/* TAGS */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {[
                "Gaming",
                "Travel",
                "Food",
                "Sports",
                "Marketing",
                "Technology",
                "Business",
              ].map((tag) => (
                <Link
                  key={tag}
                  href="#"
                  className="px-3 py-1 text-sm rounded-md border border-white/10 hover:bg-white/10 transition"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="border-t border-white/10 my-10" />

        {/* BOTTOM BAR */}
        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-gray-400 gap-4">
          <p>© 2025 Mould Technology. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-white">Terms</Link>
            <Link href="#" className="hover:text-white">Privacy</Link>
            <Link href="#" className="hover:text-white">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
