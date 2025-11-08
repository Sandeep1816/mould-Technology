"use client"

import Link from "next/link"
import { Search, Menu, X } from "lucide-react"
import { useState, useEffect } from "react"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSticky, setIsSticky] = useState(false)

  // 🧠 Detect scroll for shadow effect
  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 10)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      {/* 🔵 Sticky Blue Header */}
      <header
        className={`bg-[#004d73] text-white w-full z-50 transition-all duration-300 ${
          isSticky ? "fixed top-0 shadow-md" : "relative"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="shrink-0">
            <div className="text-lg font-black leading-tight">
              <div className="text-white">MoldMaking</div>
              <div className="text-xs tracking-widest text-white">TECHNOLOGY.</div>
            </div>
          </Link>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Navigation (Desktop) */}
          <nav className="hidden lg:flex items-center gap-8">
            <button className="text-sm font-bold hover:text-gray-200">TOPICS</button>
            <button className="text-sm font-bold hover:text-gray-200">RESOURCES</button>
            <Link href="#" className="text-sm font-bold hover:text-gray-200">
              MAGAZINE
            </Link>
            <Link href="#" className="text-sm font-bold hover:text-gray-200">
              MMT CHATS
            </Link>
            <Link href="#" className="text-sm font-bold hover:text-gray-200">
              LEADTIME LEADERS
            </Link>
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-4 ml-6">
            {/* Subscribe */}
            <button className="hidden md:block bg-red-600 hover:bg-red-700 text-white px-5 py-1.5 text-sm font-bold rounded">
              SUBSCRIBE
            </button>

            {/* Search Icon */}
            <button className="text-white hover:text-gray-200">
              <Search size={20} />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden text-white hover:text-gray-200"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* 📱 Mobile Dropdown */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 bg-gray-50 px-4 py-4">
            <nav className="space-y-3">
              <Link href="#" className="block text-sm font-bold text-gray-800 hover:text-teal-700">
                TOPICS
              </Link>
              <Link href="#" className="block text-sm font-bold text-gray-800 hover:text-teal-700">
                RESOURCES
              </Link>
              <Link href="#" className="block text-sm font-bold text-gray-800 hover:text-teal-700">
                MAGAZINE
              </Link>
              <Link href="#" className="block text-sm font-bold text-gray-800 hover:text-teal-700">
                MMT CHATS
              </Link>
              <Link href="#" className="block text-sm font-bold text-gray-800 hover:text-teal-700">
                LEADTIME LEADERS
              </Link>
            </nav>
          </div>
        )}
      </header>

      {/* 🔴 Non-Sticky Red Tagline */}
      <div className="bg-red-700 text-white font-semibold text-xs px-3 py-1.5 max-w-max ml-5 mt-0 rounded-tr-md shadow-sm">
        What's New and What Works in Mold Manufacturing
      </div>
    </>
  )
}
