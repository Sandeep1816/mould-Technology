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
  const [isSideOpen, setIsSideOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 5)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      {/* ================= TOP LIVE NEWS BAR ================= */}
      <div className="bg-[#0d0f12] text-white">
        <div className="max-w-full mx-auto px-5 h-14 flex items-center justify-between text-body">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-2 text-red-500 font-medium">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              LIVE NEWS
            </span>

            <span className="text-gray-300 hidden md:inline">
              Global Warming Is Changing How Hurricanes Work
            </span>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-2 bg-blue-600 px-3 py-1.5 rounded-full rounded-tl-none text-white font-medium">
              <Calendar size={14} />
              AUGUST 5, 2025
            </div>

            <div className="flex items-center gap-3 header-top-social">
              <span className="hidden sm:inline text-white font-medium">
                Follow Us:
              </span>

              <a href="#"><i className="ri-facebook-fill" /></a>
              <a href="#"><i className="ri-instagram-line" /></a>
              <a href="#"><i className="ri-linkedin-fill" /></a>
              <a href="#"><i className="ri-twitter-x-line" /></a>
            </div>
          </div>
        </div>
      </div>

      {/* ================= MAIN HEADER ================= */}
      <header
        className={`w-full z-50 transition-all duration-300 ${
          isSticky ? "fixed top-0 shadow-lg" : "relative"
        } bg-linear-to-b from-[#0b0b0b] to-[#151515]`}
      >
        <div className="max-w-full mx-auto px-5 h-20 flex items-center justify-between">
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-1">
            <span className="text-[28px] font-bold text-blue-500">M</span>
            <span className="text-[24px] font-bold text-white">ould</span>
          </Link>

          {/* NAV */}
          <nav className="hidden lg:flex items-center gap-8 text-body font-medium text-gray-200">
            <button className="flex items-center gap-1 hover:text-blue-500">
              Home <ChevronDown size={14} />
            </button>

            <button
              onMouseEnter={() => setOpenMega("topics")}
              className="flex items-center gap-1 hover:text-blue-500"
            >
              Technology <ChevronDown size={14} />
            </button>

            <button className="flex items-center gap-1 hover:text-blue-500">
              Sports <ChevronDown size={14} />
            </button>

            <button className="flex items-center gap-1 hover:text-blue-500">
              Categories <ChevronDown size={14} />
            </button>

            <button
              onMouseEnter={() => setOpenMega("resources")}
              className="flex items-center gap-1 hover:text-blue-500"
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
                className="bg-transparent outline-none text-gray-300 ml-2 w-full"
              />
            </div>

            <Link href="/subscribe">
              <button className="bg-blue-600 hover:bg-blue-700 transition text-white px-5 h-10 rounded-md font-semibold">
                Sign In
              </button>
            </Link>

            {/* BAR ICON */}
            <button
              onClick={() => setIsSideOpen(true)}
              className="hidden lg:flex flex-col justify-between w-6 h-5 cursor-pointer"
            >
              <span className="h-[2px] bg-white" />
              <span className="h-[2px] bg-white" />
              <span className="h-[2px] bg-white" />
            </button>

            {/* MOBILE MENU */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden border border-[#2a2a2a] h-10 w-10 rounded-md flex items-center justify-center text-white"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* ================= MEGA MENU ================= */}
        <div
          onMouseLeave={() => setOpenMega(null)}
          className={`absolute left-0 right-0 top-full flex justify-center transition-opacity ${
            openMega ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <div className="max-w-7xl w-full bg-white rounded-xl shadow-2xl border overflow-hidden">
            {openMega && (
              <div className="flex">
                <div className="w-72 bg-gray-50 py-6 border-r">
                  {(openMega === "topics"
                    ? ["Engineer", "Build", "Maintain", "Manage", "All Topics"]
                    : ["Webinars", "Videos", "Events", "Suppliers", "Basics / 101"]
                  ).map((item) => (
                    <div
                      key={item}
                      className="flex items-center justify-between px-6 py-4 hover:bg-gray-100 cursor-pointer"
                    >
                      {item}
                      <ChevronRight size={16} />
                    </div>
                  ))}
                </div>

                <div className="flex-1 p-8">
                  <div className="grid grid-cols-4 gap-8">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i}>
                        <div className="h-36 bg-gray-200 rounded-md mb-3" />
                        <div className="text-blue-600 font-semibold text-sm">
                          ON DEMAND
                        </div>
                        <div className="font-semibold mt-1">
                          Sample Webinar {i}
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          Short description exactly like mould design.
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

      {/* ================= SIDE PANEL ================= */}
      <div
        className={`fixed inset-0 z-[999] ${
          isSideOpen ? "visible" : "invisible"
        }`}
      >
        <div
          onClick={() => setIsSideOpen(false)}
          className={`absolute inset-0 bg-black/50 transition-opacity ${
            isSideOpen ? "opacity-100" : "opacity-0"
          }`}
        />

        <aside
          className={`absolute right-0 top-0 h-full w-[380px] bg-white shadow-2xl transform transition-transform duration-300 ${
            isSideOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between px-6 py-4 border-b">
            <div className="text-2xl font-bold text-blue-600">Mould</div>
            <button
              onClick={() => setIsSideOpen(false)}
              className="h-10 w-10 bg-blue-600 text-white rounded-md flex items-center justify-center"
            >
              <X size={20} />
            </button>
          </div>

          <div className="p-6 space-y-8 overflow-y-auto h-[calc(100%-64px)]">
            <p className="text-gray-600 text-sm">
              Nerio News Magazine brings you trusted timely and thought-provoking
              stories from around the globe.
            </p>

            <div className="grid grid-cols-3 gap-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-20 bg-gray-200 rounded-md" />
              ))}
            </div>

            <div>
              <h4 className="text-lg font-bold mb-4">Contact Info</h4>
              <ul className="space-y-3 text-sm text-gray-700">
                <li>📍 374 William S Canning Blvd, Fall River MA, USA</li>
                <li>📞 +123-4669-1234</li>
                <li>✉️ support@company.com</li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-4">Follow Us</h4>
              <div className="flex gap-3">
                {["facebook", "twitter-x", "youtube", "linkedin"].map((i) => (
                  <a
                    key={i}
                    href="#"
                    className="h-10 w-10 border rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition"
                  >
                    <i className={`ri-${i}-fill`} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </aside>
      </div>
    </>
  )
}
