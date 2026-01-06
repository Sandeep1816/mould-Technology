import Link from "next/link"
import Image from "next/image"
import {
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
} from "lucide-react"
import FooterRecentPosts from "@/components/FooterRecentPosts"

export default function Footer() {
  return (
    <footer className="relative bg-[#121213] text-[#BEBEBE]">
      {/* ================= FOOTER TOP ================= */}
      <div className="pt-[70px] pb-[80px]">
        {/* BOOTSTRAP CONTAINER */}
        <div className="max-w-[1320px] mx-auto px-[15px]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

            {/* ================= BRAND ================= */}
            <div>
              <Link href="/" className="inline-block mb-6">
                <Image
                  src="/images/maxx.png"
                  alt="Logo"
                  width={140}
                  height={40}
                />
              </Link>

              <p className="text-sm leading-relaxed text-[#BEBEBE] mb-6 max-w-xs">
                We love to bring to life as a developer and I aim the today do
                this using music whatever front end tools necessary.
              </p>

              {/* SOCIAL ICONS */}
              <div className="flex items-center gap-4">
                {[Facebook, Instagram, Twitter, Linkedin, Youtube].map(
                  (Icon, i) => (
                    <Link
                      key={i}
                      href="#"
                      className="w-9 h-9 flex items-center justify-center border border-white/20 rounded hover:bg-white/10 transition"
                    >
                      <Icon size={16} />
                    </Link>
                  )
                )}
              </div>

              {/* APP STORE BUTTONS */}
              <div className="flex gap-3 mt-6">
                <Image
                  src="/images/google-play.png"
                  alt="Google Play"
                  width={120}
                  height={36}
                />
                <Image
                  src="/images/apple-store.png"
                  alt="Apple Store"
                  width={120}
                  height={36}
                />
              </div>
            </div>

            {/* ================= TOP CATEGORIES ================= */}
            <div>
              <h5 className="text-white text-lg font-semibold mb-6">
                Top Categories
              </h5>

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
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* ================= RECENT POSTS ================= */}
            <div>
              <h5 className="text-white text-lg font-semibold mb-6">
                Recent Post
              </h5>

              <FooterRecentPosts />
            </div>

            {/* ================= TAGS ================= */}
            <div>
              <h5 className="text-white text-lg font-semibold mb-6">
                Tags
              </h5>

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
                    className="px-4 py-2 text-sm border border-white/20 rounded hover:bg-white/10 transition"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= COPYRIGHT BAR ================= */}
      <div className="border-t border-white/10">
        <div className="max-w-[1320px] mx-auto px-[15px] py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 items-center text-sm gap-4">

            <div className="text-center md:text-left">
              <Link href="#" className="hover:text-white">
                Terms & Agreements
              </Link>
            </div>

            <div className="text-center">
              <p className="underline underline-offset-4">
                Copyright © 2026 Nerio. Designed by{" "}
                <Link
                  href="https://rstheme.com"
                  target="_blank"
                  className="text-white"
                >
                  RSTheme
                </Link>
                .
              </p>
            </div>

            <div className="text-center md:text-right">
              <Link href="#" className="hover:text-white">
                Privacy policy
              </Link>
            </div>

          </div>
        </div>
      </div>
    </footer>
  )
}
