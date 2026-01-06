import Link from "next/link";
import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
} from "lucide-react";
import FooterRecentPosts from "@/components/FooterRecentPosts";

export default function Footer() {
  return (
    <footer className="relative w-full bg-gradient-to-b from-[#0b0b0b] to-[#050505] text-gray-300">
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-14">

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14">

          {/* BRAND */}
          <div className="lg:col-span-1">
            <h2 className="text-3xl font-bold text-white mb-4 flex items-center gap-1">
              Mou<span className="text-blue-500">l</span>d
            </h2>

            <p className="text-sm leading-relaxed text-gray-400 max-w-xs mb-6">
              We love to bring to life as a developer and aim the today do this
              using music whatever front end tools necessary.
            </p>

            <div className="flex gap-3">
              {[Facebook, Instagram, Twitter, Linkedin, Youtube].map(
                (Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-10 h-10 rounded-md bg-white/10 flex items-center justify-center hover:bg-white/20 transition"
                  >
                    <Icon size={18} />
                  </a>
                )
              )}
            </div>
          </div>

          {/* TOP CATEGORIES */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-6 relative">
              Top Categories
              <span className="block w-10 h-[2px] bg-white mt-2" />
            </h3>

            <ul className="space-y-3 text-sm">
              {[
                "Entertainment",
                "Architecture",
                "Technology",
                "Menial Health",
                "Music News",
                "Food & Dining",
                "Government",
                "Marketing",
              ].map((item) => (
                <li key={item}>
                  <Link href="#" className="hover:text-white transition">
                    • {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* RECENT POSTS */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-6 relative">
              Recent Post
              <span className="block w-10 h-[2px] bg-white mt-2" />
            </h3>

            <FooterRecentPosts />
          </div>

          {/* TAGS */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-6 relative">
              Tags
              <span className="block w-10 h-[2px] bg-white mt-2" />
            </h3>

            <div className="border border-white/10 rounded-xl p-6">
              <div className="flex flex-wrap gap-3">
                {[
                  "Gaming",
                  "Travel",
                  "Food",
                  "Sports",
                  "Social",
                  "Marketing",
                  "Trip",
                  "Makeup",
                  "Technology",
                  "Branding",
                  "Beauty",
                  "Printing",
                  "Business",
                  "Politics",
                ].map((tag) => (
                  <Link
                    key={tag}
                    href="#"
                    className="px-4 py-2 text-sm rounded-md bg-white/5 border border-white/10 hover:bg-white/10 transition"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="border-t border-white/10 my-14" />

        {/* BOTTOM BAR */}
        <div className="grid grid-cols-1 md:grid-cols-3 items-center text-xs text-gray-400 gap-6">

          <div className="text-left">
            <Link href="#" className="hover:text-white">
              Terms & Agreements
            </Link>
          </div>

          <div className="text-center">
            Copyright © 2026 Nerio. Designed by{" "}
            <span className="text-blue-500 cursor-pointer">RSTheme</span>.
          </div>

          <div className="text-right">
            <Link href="#" className="hover:text-white">
              Privacy policy
            </Link>
          </div>

        </div>
      </div>

      {/* SCROLL TO TOP BUTTON (visual match) */}
      <button className="fixed bottom-6 right-6 w-10 h-10 rounded-md bg-blue-600 text-white flex items-center justify-center shadow-lg hover:bg-blue-700 transition">
        ↑
      </button>
    </footer>
  );
}
