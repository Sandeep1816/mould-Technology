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
import Image from "next/image"

type MegaType = "technology" | "sports" | null
type MobileDrop = "technology" | "sports" | "categories" | "pages" | null

type User = {
  id: number
  email: string
  role: "admin" | "recruiter" | "candidate"
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [openMega, setOpenMega] = useState<MegaType>(null)
  const [mobileDrop, setMobileDrop] = useState<MobileDrop>(null)
  const [isSticky, setIsSticky] = useState(false)

  /* ================= AUTH ================= */
  const [user, setUser] = useState<User | null>(null)
  const [openUserMenu, setOpenUserMenu] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem("user")
    if (stored) {
      setUser(JSON.parse(stored))
    }
  }, [])

  function handleLogout() {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    window.location.href = "/login"
  }

  useEffect(() => {
    const onScroll = () => setIsSticky(window.scrollY > 5)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const container = "max-w-[1320px] mx-auto px-[15px]"

  return (
    <>
      {/* ================= TOP BAR ================= */}
      <div className="w-full bg-[#0A2B57] text-white">
        <div className={`${container} h-[52px] flex items-center justify-between`}>
          <div className="flex items-center gap-4 text-sm">
            <span className="flex items-center gap-2 text-red-500 font-medium">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              Live News
            </span>
            <span className="text-[#BEBEBE] hidden md:block">
              New Ideas. Proven Practices in Mold Manufacturing
            </span>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-2 text-sm text-[#BEBEBE]">
              <Calendar size={14} />
              AUGUST 5, 2025
            </div>
          </div>
        </div>
      </div>

      {/* ================= HEADER ================= */}
      <header
        className={`w-full z-50 transition-all ${
          isSticky ? "fixed top-0 bg-[#0A2B57] shadow-lg" : "relative bg-[#0A2B57]"
        }`}
      >
        <div className={`${container} h-[90px]`}>
          <div className="grid grid-cols-[280px_1fr_auto] items-center h-full gap-10">

            {/* ================= LOGO ================= */}
            <Link href="/" className="flex items-center">
              <div className="w-[260px]">
                <Image
                  src="/images/moldinglogo2.png"
                  alt="Logo"
                  width={260}
                  height={110}
                  priority
                  className="w-full h-auto object-contain"
                />
              </div>
            </Link>

            {/* ================= DESKTOP MENU ================= */}
            <nav className="hidden lg:flex items-center justify-center gap-8 text-white font-medium">
              <Link href="/" className="hover:text-[#0073FF]">Home</Link>

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
                Directory <ChevronDown size={14} />
              </button>

              <button className="flex items-center gap-1 hover:text-[#0073FF]">
                Events <ChevronDown size={14} />
              </button>

              <Link href="/contact" className="hover:text-[#0073FF]">
                Contact
              </Link>
            </nav>

            {/* ================= AUTH ACTIONS ================= */}
            <div className="flex items-center gap-4 relative">

              {!user && (
                <Link
                  href="/login"
                  className="hidden md:flex h-10 px-5 bg-[#0073FF] text-white rounded-md text-sm font-semibold items-center"
                >
                  Sign In
                </Link>
              )}

              {user && (
                <div className="relative">
                  <button
                    onClick={() => setOpenUserMenu(!openUserMenu)}
                    className="flex items-center gap-3 bg-white/10 px-3 py-2 rounded-md text-white"
                  >
                    <img
                      src="https://i.pravatar.cc/40"
                      className="w-8 h-8 rounded-full"
                    />
                    <div className="hidden md:block text-left">
                      <p className="text-sm font-semibold">
                        {user.email.split("@")[0]}
                      </p>
                      <p className="text-xs text-gray-300 capitalize">
                        {user.role}
                      </p>
                    </div>
                    <ChevronDown size={14} />
                  </button>

                  {openUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg text-black z-50 overflow-hidden">
                      <Link
                        href={
                          user.role === "recruiter"
                            ? "/recruiter/dashboard"
                            : user.role === "admin"
                            ? "/admin/dashboard"
                            : "/candidate/feed"
                        }
                        className="block px-4 py-3 hover:bg-gray-100 text-sm"
                      >
                        Dashboard
                      </Link>

                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              )}

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden h-10 w-10 border border-white/20 rounded-md flex items-center justify-center text-white"
              >
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>

        {/* ================= MOBILE MENU ================= */}
        {isMenuOpen && (
          <div className="lg:hidden bg-[#121213] border-t border-white/10">
            <div className="px-6 py-6 space-y-4 text-white">
              <Link href="/" className="block">Home</Link>
              <Link href="/contact" className="block">Contact</Link>

              {!user && (
                <Link
                  href="/login"
                  className="block text-center bg-[#0073FF] py-2 rounded-md mt-4"
                >
                  Sign In
                </Link>
              )}

              {user && (
                <button
                  onClick={handleLogout}
                  className="block w-full bg-red-600 py-2 rounded-md mt-4"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        )}

        {/* ================= DESKTOP MEGA MENU ================= */}
        <div
          onMouseLeave={() => setOpenMega(null)}
          className={`absolute left-0 right-0 top-full bg-white transition-all duration-200 ${
            openMega ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        >
          <div className={`${container} py-10 rounded-b-xl`}>

            {/* ================= SPORTS ================= */}
            {openMega === "sports" && (
              <>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-black">Sports</h3>

                  <Link
                    href="/sports"
                    className="flex items-center gap-1 text-sm font-semibold text-black hover:underline"
                  >
                    View All <ArrowRight size={14} />
                  </Link>
                </div>

                <div className="grid grid-cols-4 gap-6">
                  {[
                    "Local Team Clinches The National Championship.",
                    "Soccer League Playoffs Heat Up With Surprise Upsets",
                    "Rising Star Dominates Tennis Unbeaten Streak",
                    "Soccer Legend Announces From International Play",
                  ].map((title, i) => (
                    <div key={i} className="space-y-3">
                      <img
                        src="https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf?auto=format&fit=crop&w=800&q=80"
                        className="h-[160px] w-full rounded-xl object-cover"
                      />
                      <h4 className="font-semibold text-[15px] text-black">
                        {title}
                      </h4>
                      <p className="text-xs text-gray-500">
                        By rstheme · 5,385 Views
                      </p>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* ================= TECHNOLOGY ================= */}
            {openMega === "technology" && (
              <div className="grid grid-cols-3 gap-10">
                {/* FEATURED */}
                <div>
                  <h3 className="text-xl font-bold mb-4 text-black">Technology</h3>
                  <img
                    src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80"
                    className="rounded-xl mb-4"
                  />
                  <p className="text-gray-600 text-sm">
                    In today’s fast-paced digital world, Artificial Intelligence is empowering developers.
                  </p>
                </div>

                {/* LATEST */}
                <div>
                  <h4 className="font-semibold mb-4 text-black">Latest News</h4>
                  <div className="space-y-5">
                    {["New Tech Startups Are Pushing Creating", "Green Tech Solutions Fighting Climate Change"].map((t, i) => (
                      <div key={i} className="flex gap-4">
                        <img
                          src="https://images.unsplash.com/photo-1581091215367-59ab6c3c3f33?auto=format&fit=crop&w=300&q=80"
                          className="w-20 h-20 rounded-lg object-cover"
                        />
                        <div>
                          <h5 className="font-semibold text-sm text-black">{t}</h5>
                          <p className="text-xs text-gray-500">By rstheme · 5,385 Views</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* TRENDING */}
                <div>
                  <h4 className="font-semibold mb-4 text-black">Trending News</h4>
                  <div className="space-y-5">
                    {["Reen Tech Sustainable The Future Difference", "Grassroots Movements The Changing Artificial"].map((t, i) => (
                      <div key={i} className="flex gap-4">
                        <img
                          src="https://images.unsplash.com/photo-1526378722484-cc5c510ff4c8?auto=format&fit=crop&w=300&q=80"
                          className="w-20 h-20 rounded-lg object-cover"
                        />
                        <div>
                          <h5 className="font-semibold text-sm text-black">{t}</h5>
                          <p className="text-xs text-gray-500">By rstheme · 5,385 Views</p>
                        </div>
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
