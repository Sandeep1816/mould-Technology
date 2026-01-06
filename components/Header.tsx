"use client"

import Link from "next/link"
import {
  Search,
  Menu,
  X,
  ChevronDown,
  Calendar,
  ArrowRight,
} from "lucide-react"
import { useState, useEffect } from "react"

type MegaType = "technology" | "sports" | null

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [openMega, setOpenMega] = useState<MegaType>(null)
  const [isSticky, setIsSticky] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 5)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const container = "max-w-[1120px] mx-auto px-4 sm:px-6 lg:px-10"

  return (
    <>
      {/* ================= TOP BAR ================= */}
      <div className="w-full bg-[#0d0f12] text-white">
        <div
          className={`${container} py-3 flex flex-col gap-3 sm:h-14 sm:flex-row sm:items-center sm:justify-between`}
        >
          {/* LEFT */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 text-center sm:text-left">
            <span className="flex items-center justify-center sm:justify-start gap-2 text-red-500 font-medium">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              LIVE NEWS
            </span>
            <span className="text-gray-300 text-sm">
              Youth Sports Developing the Next Generation
            </span>
          </div>

          {/* RIGHT */}
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6">
            <div className="flex items-center gap-2 bg-blue-600 px-3 py-1.5 rounded-full text-sm">
              <Calendar size={14} />
              AUGUST 5, 2025
            </div>

            <div className="flex gap-4">
              <a href="#"><i className="ri-facebook-fill" /></a>
              <a href="#"><i className="ri-instagram-line" /></a>
              <a href="#"><i className="ri-linkedin-fill" /></a>
              <a href="#"><i className="ri-twitter-x-line" /></a>
            </div>
          </div>
        </div>
      </div>

      {/* ================= HEADER ================= */}
      <header
        className={`w-full z-50 ${
          isSticky ? "fixed top-0 shadow-lg" : "relative"
        } bg-linear-to-b from-[#0b0b0b] to-[#151515]`}
      >
        <div className={`${container} h-16 lg:h-20 flex items-center justify-between`}>
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl lg:text-3xl font-bold text-blue-500">M</span>
            <span className="text-lg lg:text-xl font-bold text-white">OULD</span>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden lg:flex items-center gap-8 text-gray-200 font-medium">
            {["Home", "Technology", "Sports", "Categories", "Pages"].map((item) => (
              <button
                key={item}
                onMouseEnter={() =>
                  item === "Technology"
                    ? setOpenMega("technology")
                    : item === "Sports"
                    ? setOpenMega("sports")
                    : null
                }
                className="flex items-center gap-1 hover:text-blue-500"
              >
                {item} <ChevronDown size={14} />
              </button>
            ))}

            <Link href="#" className="hover:text-blue-500">
              Contact
            </Link>
          </nav>

          {/* RIGHT */}
          <div className="flex items-center gap-3 lg:gap-4">
            <div className="hidden lg:flex items-center bg-[#1c1c1c] border border-[#2a2a2a] rounded-md px-3 h-10 w-[220px]">
              <Search size={16} className="text-gray-400" />
              <input
                placeholder="Search..."
                className="bg-transparent outline-none text-gray-300 ml-2 w-full"
              />
            </div>

            <button className="hidden sm:block bg-blue-600 text-white px-4 lg:px-5 h-10 rounded-md font-semibold">
              Sign In
            </button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden h-10 w-10 border border-[#2a2a2a] rounded-md flex items-center justify-center text-white"
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* ================= MOBILE MENU ================= */}
        {isMenuOpen && (
          <div className="lg:hidden bg-[#0f0f0f] border-t border-[#2a2a2a]">
            <nav className="flex flex-col px-6 py-6 space-y-4 text-gray-200 font-medium">
              {["Home", "Technology", "Sports", "Categories", "Pages", "Contact"].map(
                (item) => (
                  <Link
                    key={item}
                    href="#"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center justify-between hover:text-blue-500"
                  >
                    {item}
                    <ChevronDown size={14} />
                  </Link>
                )
              )}

              <button className="mt-4 bg-blue-600 text-white h-11 rounded-md font-semibold">
                Sign In
              </button>
            </nav>
          </div>
        )}

        {/* ================= DESKTOP MEGA MENUS ================= */}
        <div
          onMouseLeave={() => setOpenMega(null)}
          className={`absolute left-0 right-0 top-full justify-center transition hidden lg:flex ${
            openMega ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        >
          {/* TECHNOLOGY */}
          {openMega === "technology" && (
            <div className="bg-white rounded-xl shadow-2xl p-10 w-full max-w-[1120px] grid grid-cols-3 gap-10">
              <div>
                <h3 className="font-bold mb-5 text-lg">Technology</h3>
                <img
                  src="https://images.unsplash.com/photo-1581090700227-1e37b190418e"
                  className="rounded-xl mb-4"
                />
                <p className="text-gray-600 text-base leading-relaxed">
                  Artificial Intelligence is empowering developers.
                </p>
              </div>

              {[
                "Latest News",
                "Trending News",
              ].map((title) => (
                <div key={title}>
                  <h3 className="font-bold mb-5 text-lg">{title}</h3>
                  <ul className="space-y-6">
                    {[1, 2].map((i) => (
                      <li key={i} className="flex gap-4">
                        <img
                          src="https://images.unsplash.com/photo-1526378722484-d4ff0f9c9b8c"
                          className="w-20 h-20 rounded-lg object-cover"
                        />
                        <div>
                          <p className="font-semibold text-base">
                            Sample {title} Item
                          </p>
                          <span className="text-sm text-gray-500">
                            By rstheme · 5,385 Views
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {/* SPORTS (UNCHANGED) */}
          {openMega === "sports" && (
            <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-[1120px]">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-lg">Sports</h3>
                <Link href="#" className="flex items-center gap-1 text-sm font-medium">
                  View All <ArrowRight size={14} />
                </Link>
              </div>

              <div className="grid grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i}>
                    <img
                      src="https://images.unsplash.com/photo-1505842465776-3ac7b0b0b52a"
                      className="rounded-lg mb-3 h-36 w-full object-cover"
                    />
                    <p className="font-semibold text-sm">
                      Sports Headline Example
                    </p>
                    <span className="text-xs text-gray-500">
                      By rstheme · 5,385 Views
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  )
}
