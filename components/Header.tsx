"use client"

import Link from "next/link"
import Image from "next/image"
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react"
import { useState, useEffect } from "react"
import type { Post } from "@/types/Post"

/* ================= TYPES ================= */
type MegaType = "topics" | "resources" | null

type User = {
  id: number
  email: string
  role: "admin" | "recruiter" | "candidate"
}

/* ================= MENUS ================= */
const TOPICS = [
  { label: "Engineer", slug: "engineer" },
  { label: "Build", slug: "build" },
  { label: "Maintain", slug: "maintain" },
  { label: "Manage", slug: "manage" },
]

const RESOURCES = [
  { label: "Webinars", slug: "webinars" },
  { label: "Videos", slug: "videos" },
  { label: "Events", slug: "events" },
  { label: "Suppliers", slug: "suppliers" },
  { label: "Basics", slug: "basics" },
  { label: "Mold Design & Optimization", slug: "mold-design-optimization" },
]

export default function Header() {
  const [openMega, setOpenMega] = useState<MegaType>(null)
  const [isSticky, setIsSticky] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [mobileActiveMenu, setMobileActiveMenu] = useState<MegaType>(null)

  /* ================= AUTH ================= */
  const [user, setUser] = useState<User | null>(null)
  const [openUserMenu, setOpenUserMenu] = useState(false)

  /* ================= POSTS ================= */
  const [allPosts, setAllPosts] = useState<Post[]>([])
  const [activeSlug, setActiveSlug] = useState("engineer")

  /* ================= INIT ================= */
  useEffect(() => {
    const stored = localStorage.getItem("user")
    if (stored) setUser(JSON.parse(stored))
  }, [])

  useEffect(() => {
    const onScroll = () => setIsSticky(window.scrollY > 10)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts?limit=1000`)
      .then(res => res.json())
      .then(data => {
        const posts = Array.isArray(data?.data) ? data.data : []
        setAllPosts(posts)
      })
  }, [])

  // Close mobile menu when screen resizes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMenuOpen(false)
        setMobileActiveMenu(null)
      }
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isMenuOpen])

  /* ================= HELPERS ================= */
  const slugOf = (post: Post) =>
    typeof post.category === "object"
      ? post.category?.slug?.toLowerCase()
      : ""

  const filteredPosts = allPosts
    .filter(p => slugOf(p).includes(activeSlug))
    .slice(0, 4)

  function handleLogout() {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    window.location.href = "/login"
  }

  const container = "max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-[15px]"

  /* ================= RENDER ================= */
  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      isSticky 
        ? "bg-[#0A2B57] shadow-xl border-b border-white/10" 
        : "bg-[#0A2B57]"
    }`}>

      {/* ================= TOP BAR ================= */}
      <div className={`${container} transition-all duration-300 ${
        isSticky ? "h-[60px] sm:h-[70px] lg:h-[90px]" : "h-[70px] sm:h-[90px] lg:h-[130px]"
      }`}>
        <div className="grid grid-cols-[auto_1fr_auto] lg:grid-cols-[240px_1fr_auto] xl:grid-cols-[280px_1fr_auto] items-center h-full gap-3 sm:gap-4 lg:gap-8 xl:gap-10">

          {/* ========== LOGO ========== */}
          <Link href="/" className="flex items-center">
            <Image
              src="/images/moldinglogo2.png"
              alt="MoldMaking Technology Logo"
              width={isSticky ? 160 : 240}
              height={isSticky ? 68 : 102}
              priority
              className={`w-auto transition-all duration-300 ${
                isSticky 
                  ? "h-[40px] sm:h-[50px] lg:h-[60px]" 
                  : "h-[50px] sm:h-[70px] lg:h-[90px]"
              }`}
            />
          </Link>

          {/* ========== DESKTOP NAVIGATION ========== */}
          <nav className="hidden lg:flex justify-center items-center gap-5 xl:gap-7 text-white font-medium text-[15px] xl:text-base">
            
            {/* Topics Dropdown */}
            <button
              onMouseEnter={() => {
                setOpenMega("topics")
                setActiveSlug("engineer")
              }}
              className="flex items-center gap-1.5 py-2 hover:text-[#0073FF] transition-colors duration-200 group"
            >
              <span>Topics</span>
              <ChevronDown size={16} className="group-hover:translate-y-0.5 transition-transform" />
            </button>

            {/* Resources Dropdown */}
            <button
              onMouseEnter={() => {
                setOpenMega("resources")
                setActiveSlug("webinars")
              }}
              className="flex items-center gap-1.5 py-2 hover:text-[#0073FF] transition-colors duration-200 group"
            >
              <span>Resources</span>
              <ChevronDown size={16} className="group-hover:translate-y-0.5 transition-transform" />
            </button>

            {/* Direct Links */}
            <Link href="/articles" className="py-2 hover:text-[#0073FF] transition-colors duration-200">
              Magazine
            </Link>
            <Link href="/suppliers" className="py-2 hover:text-[#0073FF] transition-colors duration-200">
              Directory
            </Link>
            <Link href="/mmtchats" className="py-2 hover:text-[#0073FF] transition-colors duration-200">
              MMT CHATS
            </Link>
            <Link href="/events" className="py-2 hover:text-[#0073FF] transition-colors duration-200">
              Events
            </Link>
            <Link href="/feed" className="py-2 hover:text-[#0073FF] transition-colors duration-200">
              Jobs
            </Link>
          </nav>

          {/* ========== AUTH & MOBILE MENU ========== */}
          <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">

            {/* Login Button - Desktop */}
            {!user && (
              <Link
                href="/login"
                className="hidden md:flex h-9 lg:h-10 px-4 lg:px-6 bg-[#0073FF] text-white rounded-md text-sm font-semibold items-center justify-center hover:bg-[#0060DD] transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Login
              </Link>
            )}

            {/* User Menu - Desktop */}
            {user && (
              <div className="relative">
                <button
                  onClick={() => setOpenUserMenu(!openUserMenu)}
                  className="flex items-center gap-2 lg:gap-3 bg-white/10 backdrop-blur-sm px-2.5 lg:px-3 py-2 rounded-md text-white hover:bg-white/20 transition-all duration-200 border border-white/20"
                >
                  <img
                    src="https://i.pravatar.cc/40"
                    alt="User avatar"
                    className="w-7 h-7 lg:w-8 lg:h-8 rounded-full border-2 border-white/30"
                  />
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-semibold leading-tight">
                      {user.email.split("@")[0]}
                    </p>
                    <p className="text-xs text-gray-300 capitalize">
                      {user.role}
                    </p>
                  </div>
                  <ChevronDown size={14} className={`transition-transform ${openUserMenu ? 'rotate-180' : ''}`} />
                </button>

                {openUserMenu && (
                  <>
                    <div 
                      className="fixed inset-0 z-40"
                      onClick={() => setOpenUserMenu(false)}
                    />
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-2xl border border-gray-200 text-black z-50 overflow-hidden">
                      <Link
                        href={
                          user.role === "admin"
                            ? "/admin/dashboard"
                            : user.role === "recruiter"
                            ? "/recruiter/dashboard"
                            : "/candidate/feed"
                        }
                        className="block px-4 py-3 hover:bg-blue-50 text-sm transition-colors border-b border-gray-100"
                        onClick={() => setOpenUserMenu(false)}
                      >
                        Dashboard
                      </Link>

                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors font-medium"
                      >
                        Logout
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden h-9 w-9 sm:h-10 sm:w-10 border border-white/30 rounded-md flex items-center justify-center text-white hover:bg-white/10 transition-all duration-200 backdrop-blur-sm"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* ================= DESKTOP MEGA MENU ================= */}
      {openMega && (
        <div
          onMouseLeave={() => setOpenMega(null)}
          className="hidden lg:block bg-gradient-to-b from-[#0A2B57] to-[#08385C] border-t border-white/10 shadow-2xl"
        >
          <div className={`${container} py-8 lg:py-10 grid grid-cols-[220px_1fr] xl:grid-cols-[240px_1fr] gap-8 lg:gap-10`}>

            {/* LEFT SIDEBAR MENU */}
            <aside className="bg-white/5 backdrop-blur-sm rounded-lg overflow-hidden border border-white/10 shadow-lg">
              {(openMega === "topics" ? TOPICS : RESOURCES).map(item => (
                <button
                  key={item.slug}
                  onMouseEnter={() => setActiveSlug(item.slug)}
                  className={`w-full px-5 py-3.5 text-left uppercase font-bold text-sm flex justify-between transition-all duration-200 ${
                    activeSlug === item.slug
                      ? "bg-[#0073FF] text-white shadow-md"
                      : "text-white hover:bg-white/10"
                  }`}
                >
                  <span>{item.label}</span>
                  {activeSlug === item.slug && <ChevronRight size={18} />}
                </button>
              ))}
            </aside>

            {/* RIGHT CONTENT GRID */}
            <div>
              {/* Header */}
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/10">
                <h3 className="text-2xl xl:text-3xl font-bold uppercase text-white">  
                  {activeSlug.replace(/-/g, " ")}
                </h3>

                <Link
                  href={`/${activeSlug}`}
                  className="bg-red-600 hover:bg-red-700 px-5 py-2.5 text-sm font-bold text-white transition-all duration-200 shadow-lg hover:shadow-xl rounded"
                >
                  See All →
                </Link>
              </div>

              {/* Posts Grid */}
              <div className="grid grid-cols-2 xl:grid-cols-4 gap-5 lg:gap-6">
                {filteredPosts.map(post => (
                  <article key={post.id} className="group">
                    <Link href={`/post/${post.slug}`} className="block">
                      <div className="relative overflow-hidden rounded-lg mb-3 shadow-md group-hover:shadow-xl transition-shadow">
                        <img
                          src={post.imageUrl || "/placeholder.svg"}
                          alt={post.title}
                          className="w-full h-36 xl:h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </Link>

                    <p className="text-[10px] xl:text-xs uppercase text-[#6EC1E4] font-bold mb-1.5 tracking-wide">
                      {post.badge || post.category?.name}
                    </p>

                    <h4 className="text-sm xl:text-base font-semibold text-white leading-snug group-hover:text-[#0073FF] transition-colors line-clamp-2">
                      <Link href={`/post/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h4>
                  </article>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ================= MOBILE MENU ================= */}
      {isMenuOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm lg:hidden z-40"
            onClick={() => setIsMenuOpen(false)}
          />
          
          {/* Mobile Menu Panel */}
          <div className="fixed top-[60px] sm:top-[70px] left-0 right-0 bottom-0 bg-gradient-to-b from-[#0A2B57] to-[#08385C] lg:hidden z-50 overflow-y-auto shadow-2xl">
            <nav className="py-2">
              
              {/* Topics Section */}
              <div className="border-b border-white/10">
                <button
                  onClick={() => setMobileActiveMenu(mobileActiveMenu === "topics" ? null : "topics")}
                  className="w-full px-5 sm:px-6 py-4 text-white font-semibold flex items-center justify-between hover:bg-white/5 transition-colors text-base sm:text-lg"
                >
                  <span>Topics</span>
                  <ChevronDown 
                    size={20} 
                    className={`transition-transform duration-300 ${mobileActiveMenu === "topics" ? "rotate-180" : ""}`}
                  />
                </button>
                
                {mobileActiveMenu === "topics" && (
                  <div className="bg-white/5 backdrop-blur-sm px-3 sm:px-4 py-2 border-t border-white/10">
                    {TOPICS.map(item => (
                      <Link
                        key={item.slug}
                        href={`/${item.slug}`}
                        className="flex items-center justify-between px-4 py-3 text-white hover:bg-white/10 transition-colors rounded-md mb-1"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <span className="text-sm sm:text-base">{item.label}</span>
                        <ChevronRight size={16} />
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Resources Section */}
              <div className="border-b border-white/10">
                <button
                  onClick={() => setMobileActiveMenu(mobileActiveMenu === "resources" ? null : "resources")}
                  className="w-full px-5 sm:px-6 py-4 text-white font-semibold flex items-center justify-between hover:bg-white/5 transition-colors text-base sm:text-lg"
                >
                  <span>Resources</span>
                  <ChevronDown 
                    size={20} 
                    className={`transition-transform duration-300 ${mobileActiveMenu === "resources" ? "rotate-180" : ""}`}
                  />
                </button>
                
                {mobileActiveMenu === "resources" && (
                  <div className="bg-white/5 backdrop-blur-sm px-3 sm:px-4 py-2 border-t border-white/10">
                    {RESOURCES.map(item => (
                      <Link
                        key={item.slug}
                        href={`/${item.slug}`}
                        className="flex items-center justify-between px-4 py-3 text-white hover:bg-white/10 transition-colors rounded-md mb-1"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <span className="text-sm sm:text-base">{item.label}</span>
                        <ChevronRight size={16} />
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Direct Links */}
              <Link
                href="/articles"
                className="block px-5 sm:px-6 py-4 text-white font-semibold border-b border-white/10 hover:bg-white/5 transition-colors text-base sm:text-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Magazine
              </Link>

              <Link
                href="/suppliers"
                className="block px-5 sm:px-6 py-4 text-white font-semibold border-b border-white/10 hover:bg-white/5 transition-colors text-base sm:text-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Directory
              </Link>

              <Link
                href="/mmtchats"
                className="block px-5 sm:px-6 py-4 text-white font-semibold border-b border-white/10 hover:bg-white/5 transition-colors text-base sm:text-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                MMT CHATS
              </Link>

              <Link
                href="/events"
                className="block px-5 sm:px-6 py-4 text-white font-semibold border-b border-white/10 hover:bg-white/5 transition-colors text-base sm:text-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Events
              </Link>

              <Link
                href="/feed"
                className="block px-5 sm:px-6 py-4 text-white font-semibold border-b border-white/10 hover:bg-white/5 transition-colors text-base sm:text-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Jobs
              </Link>

              {/* Mobile Login Button */}
              {!user && (
                <div className="px-5 sm:px-6 py-5">
                  <Link
                    href="/login"
                    className="block w-full py-3.5 bg-[#0073FF] text-white rounded-lg text-center font-semibold hover:bg-[#0060DD] transition-all duration-200 shadow-lg text-base sm:text-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                </div>
              )}

            </nav>
          </div>
        </>
      )}
    </header>
  )
}