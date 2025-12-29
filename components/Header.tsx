"use client"

import Link from "next/link"
import {
  Search,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  Calendar,
} from "lucide-react"
import { useState, useEffect } from "react"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [openMega, setOpenMega] = useState<"topics" | "resources" | null>(null)
  const [isSticky, setIsSticky] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 5)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      {/* ================= TOP LIVE NEWS BAR ================= */}
      <div className="bg-[#0d0f12] text-white text-sm">
        <div className="max-w-7xl mx-auto px-5 h-[46px] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-2 text-red-500 font-semibold">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              LIVE NEWS
            </span>
            <span className="text-gray-300 hidden md:inline">
              Global Warming Is Changing How Hurricanes Work
            </span>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-2 bg-blue-600 px-3 py-1.5 rounded-full text-xs font-semibold">
              <Calendar size={14} />
              AUGUST 5, 2025
            </div>

            <div className="flex items-center gap-3 text-gray-300">
              <span className="hidden sm:inline text-xs font-semibold">
                Follow Us:
              </span>
              <a href="#">f</a>
              <a href="#">◎</a>
              <a href="#">in</a>
              <a href="#">𝕏</a>
            </div>
          </div>
        </div>
      </div>

      {/* ================= MAIN HEADER ================= */}
      <header
        className={`w-full z-50 transition-all duration-300 ${
          isSticky ? "fixed top-0 shadow-lg" : "relative"
        } bg-gradient-to-b from-[#0b0b0b] to-[#151515]`}
      >
        <div className="max-w-7xl mx-auto px-5 h-[72px] flex items-center justify-between">
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-1">
            <span className="text-3xl font-black text-blue-500">M</span>
            <span className="text-2xl font-black text-white">ould</span>
          </Link>

          {/* ================= NAV (HOVER BASED) ================= */}
          <nav className="hidden lg:flex items-center gap-8 text-[15px] font-semibold text-gray-200">
            <button className="flex items-center gap-1 hover:text-blue-500 transition">
              Home <ChevronDown size={14} />
            </button>

            <button
              onMouseEnter={() => setOpenMega("topics")}
              className="flex items-center gap-1 hover:text-blue-500 transition"
            >
              Technology <ChevronDown size={14} />
            </button>

            <button className="flex items-center gap-1 hover:text-blue-500 transition">
              Sports <ChevronDown size={14} />
            </button>

            <button className="flex items-center gap-1 hover:text-blue-500 transition">
              Categories <ChevronDown size={14} />
            </button>

            <button
              onMouseEnter={() => setOpenMega("resources")}
              className="flex items-center gap-1 hover:text-blue-500 transition"
            >
              Pages <ChevronDown size={14} />
            </button>

            <Link href="#" className="hover:text-blue-500">
              Contact
            </Link>
          </nav>

          {/* RIGHT */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center bg-[#1c1c1c] border border-[#2a2a2a] rounded-md px-3 h-10 w-[220px]">
              <Search size={16} className="text-gray-400" />
              <input
                placeholder="Search..."
                className="bg-transparent outline-none text-sm text-gray-300 ml-2 w-full"
              />
            </div>

            <Link href="/subscribe">
              <button className="bg-blue-600 hover:bg-blue-700 transition text-white px-5 h-10 rounded-md text-sm font-semibold">
                Sign In
              </button>
            </Link>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden border border-[#2a2a2a] h-10 w-10 rounded-md flex items-center justify-center text-white"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* ================= MEGA MENU (WHITE / HOVER) ================= */}
        <div
          onMouseLeave={() => setOpenMega(null)}
          className={`absolute left-0 right-0 top-full flex justify-center transition-opacity duration-200 ${
            openMega
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
        >
          <div
            className={`max-w-7xl w-full bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden transition-[max-height] duration-300 ${
              openMega ? "max-h-[650px]" : "max-h-0"
            }`}
          >
            {openMega && (
              <div className="flex">
                {/* LEFT */}
                <div className="w-72 bg-gray-50 py-6 border-r border-gray-200">
                  {(openMega === "topics"
                    ? ["Engineer", "Build", "Maintain", "Manage", "All Topics"]
                    : ["Webinars", "Videos", "Events", "Suppliers", "Basics / 101"]
                  ).map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between px-6 py-4 text-sm font-semibold text-gray-800 hover:bg-gray-100 cursor-pointer"
                    >
                      {item}
                      <ChevronRight size={16} />
                    </div>
                  ))}
                </div>

                {/* RIGHT */}
                <div className="flex-1 p-8 bg-white text-gray-900">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold uppercase tracking-wide">
                      {openMega === "topics" ? "Engineer" : "Webinars"}
                    </h2>

                    <button className="text-blue-600 font-semibold flex items-center gap-1">
                      See All <ChevronRight size={14} />
                    </button>
                  </div>

                  <div className="grid grid-cols-4 gap-8">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i}>
                        <div className="h-36 bg-gray-200 rounded-md mb-3" />
                        <div className="text-xs text-blue-600 font-bold">
                          ON DEMAND
                        </div>
                        <div className="font-semibold mt-1">
                          Sample Webinar Title {i}
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          Short description exactly like Mould design.
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  )
}
