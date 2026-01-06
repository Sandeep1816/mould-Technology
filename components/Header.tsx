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
    const onScroll = () => setIsSticky(window.scrollY > 5)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  /* ✅ EXACT NERIO CONTAINER */
  const container = "max-w-[1320px] mx-auto px-[15px]"

  return (
    <>
      {/* ================= TOP BAR ================= */}
      <div className="w-full bg-[#121213] text-white">
        <div className={`${container} h-[52px] flex items-center justify-between`}>
          {/* LEFT */}
          <div className="flex items-center gap-4 text-sm">
            <span className="flex items-center gap-2 text-red-500 font-medium">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              Live News
            </span>

            <span className="text-[#BEBEBE] hidden md:block">
              Global Warming Is Changing How Hurricanes Work
            </span>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-2 text-sm text-[#BEBEBE]">
              <Calendar size={14} />
              AUGUST 5, 2025
            </div>

            <div className="hidden lg:flex gap-3 text-lg">
              <i className="ri-facebook-fill" />
              <i className="ri-instagram-line" />
              <i className="ri-linkedin-fill" />
              <i className="ri-twitter-x-line" />
            </div>
          </div>
        </div>
      </div>

      {/* ================= MAIN HEADER ================= */}
      <header
        className={`w-full z-50 transition-all ${
          isSticky ? "fixed top-0 bg-[#121213] shadow-lg" : "relative bg-[#121213]"
        }`}
      >
        <div className={`${container} h-[80px]`}>
          {/* GRID LIKE NERIO */}
          <div className="grid grid-cols-[auto_1fr_auto] items-center h-full gap-10">
            {/* LOGO */}
            <Link href="/" className="flex items-center gap-2">
              <span className="text-3xl font-bold text-[#0073FF]">N</span>
              <span className="text-xl font-bold text-white">erio</span>
            </Link>

            {/* MENU */}
            <nav className="hidden lg:flex items-center justify-center gap-8 text-white font-medium">
              <button className="flex items-center gap-1 hover:text-[#0073FF]">
                Home <ChevronDown size={14} />
              </button>

              <button
                onMouseEnter={() => setOpenMega("technology")}
                className="flex items-center gap-1 hover:text-[#0073FF]"
              >
                Technology <ChevronDown size={14} />
              </button>

              <button
                onMouseEnter={() => setOpenMega("sports")}
                className="flex items-center gap-1 hover:text-[#0073FF]"
              >
                Sports <ChevronDown size={14} />
              </button>

              <button className="flex items-center gap-1 hover:text-[#0073FF]">
                Categories <ChevronDown size={14} />
              </button>

              <button className="flex items-center gap-1 hover:text-[#0073FF]">
                Pages <ChevronDown size={14} />
              </button>

              <Link href="/contact" className="hover:text-[#0073FF]">
                Contact
              </Link>
            </nav>

            {/* ACTIONS */}
            <div className="flex items-center gap-4">
              <div className="hidden lg:flex items-center bg-[#1a1a1a] border border-white/10 rounded-md px-3 h-10 w-[220px]">
                <Search size={16} className="text-gray-400" />
                <input
                  placeholder="Search..."
                  className="bg-transparent outline-none text-sm text-white ml-2 w-full"
                />
              </div>

              <Link
                href="/login"
                className="hidden md:flex items-center justify-center h-10 px-5 bg-[#0073FF] text-white rounded-md text-sm font-semibold"
              >
                Sign In
              </Link>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden h-10 w-10 border border-white/20 rounded-md flex items-center justify-center text-white"
              >
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>

        {/* ================= MEGA MENU ================= */}
        <div
          onMouseLeave={() => setOpenMega(null)}
          className={`absolute left-0 right-0 top-full bg-white transition-all ${
            openMega ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        >
          <div className={`${container} py-10`}>
            {/* TECHNOLOGY */}
            {openMega === "technology" && (
              <div className="grid grid-cols-3 gap-10">
                <div>
                  <h4 className="font-bold mb-4">Technology</h4>
                  <img
                    src="https://images.unsplash.com/photo-1581090700227-1e37b190418e"
                    className="rounded-lg mb-4"
                  />
                  <p className="text-sm text-gray-600">
                    Artificial Intelligence is empowering developers.
                  </p>
                </div>

                {["Latest News", "Trending News"].map((title) => (
                  <div key={title}>
                    <h4 className="font-bold mb-4">{title}</h4>
                    <div className="space-y-5">
                      {[1, 2].map((i) => (
                        <div key={i} className="flex gap-4">
                          <img
                            src="https://images.unsplash.com/photo-1526378722484-d4ff0f9c9b8c"
                            className="w-20 h-20 rounded object-cover"
                          />
                          <div>
                            <p className="font-semibold text-sm">
                              Sample headline here
                            </p>
                            <span className="text-xs text-gray-500">
                              By rstheme · 5,385 Views
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* SPORTS */}
            {openMega === "sports" && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h4 className="font-bold">Sports</h4>
                  <Link href="#" className="flex items-center gap-1 text-sm">
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
                        Sports headline example
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
        </div>
      </header>
    </>
  )
}
