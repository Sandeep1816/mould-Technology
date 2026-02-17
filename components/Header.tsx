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

  const container = "max-w-[1320px] mx-auto px-4 md:px-6 lg:px-[15px]"

  /* ================= RENDER ================= */
  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all ${isSticky ? "bg-[#0A2B57] shadow-lg" : "bg-[#0A2B57]"}`}>

      {/* ================= TOP BAR ================= */}
      <div className={`${container} ${isSticky ? "h-[80px] md:h-[100px] lg:h-[100px]" : "h-[90px] md:h-[120px] lg:h-[150px]"} transition-all`}>
        <div className="grid grid-cols-[1fr_auto] lg:grid-cols-[320px_1fr_auto] items-center h-full gap-6 lg:gap-10">

      {/* LOGO */}
<Link href="/" className="flex items-center justify-start">
  <Image
    src="/images/tooling new.png"
    alt="MoldMaking Technology Logo"
    width={300}
    height={127}
    priority
    quality={100}
    sizes="(max-width: 768px) 70px, (max-width: 1024px) 90px, 120px"
    className={`w-auto transition-all ${
      isSticky 
        ? "h-[60px] md:h-[70px] lg:h-[80px]" 
        : "h-[70px] md:h-[90px] lg:h-[120px]"
    }`}
    style={{ imageRendering: 'crisp-edges' }}
  />
</Link>

          {/* DESKTOP NAV */}
          <nav className="hidden lg:flex justify-center gap-6 xl:gap-8 text-white font-medium text-sm xl:text-base">
            <button
              onMouseEnter={() => {
                setOpenMega("topics")
                setActiveSlug("engineer")
              }}
              className="flex items-center gap-1 hover:text-[#0073FF] transition-colors"
            >
              Topics <ChevronDown size={14} />
            </button>

            <button
              onMouseEnter={() => {
                setOpenMega("resources")
                setActiveSlug("webinars")
              }}
              className="flex items-center gap-1 hover:text-[#0073FF] transition-colors"
            >
              Resources <ChevronDown size={14} />
            </button>

            <Link href="/articles" className="hover:text-[#0073FF] transition-colors">Magazine</Link>
            <Link href="/suppliers" className="hover:text-[#0073FF] transition-colors">Directory</Link>
            <Link href="/mmtchats" className="hover:text-[#0073FF] transition-colors">MMT CHATS</Link>
            <Link href="/events" className="hover:text-[#0073FF] transition-colors">Events</Link>
            <Link href="/feed" className="hover:text-[#0073FF] transition-colors">Jobs</Link>
          </nav>

          {/* AUTH / USER */}
          <div className="flex items-center justify-end gap-3 md:gap-4">

            {!user && (
              <Link
                href="/login"
                className="hidden md:flex h-10 lg:h-11 px-5 lg:px-6 bg-[#0073FF] text-white rounded-md text-sm lg:text-base font-semibold items-center hover:bg-[#0060DD] transition-colors shadow-lg"
              >
                Login
              </Link>
            )}

            {user && (
              <div className="relative">
                <button
                  onClick={() => setOpenUserMenu(!openUserMenu)}
                  className="flex items-center gap-2 md:gap-3 bg-white/10 px-3 md:px-4 py-2 md:py-2.5 rounded-md text-white hover:bg-white/20 transition-colors border border-white/20"
                >
                  <img
                    src="https://i.pravatar.cc/40"
                    alt="User avatar"
                    className="w-8 h-8 md:w-9 md:h-9 rounded-full border-2 border-white/30"
                  />
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-semibold leading-tight">
                      {user.email.split("@")[0]}
                    </p>
                    <p className="text-xs text-gray-300 capitalize">
                      {user.role}
                    </p>
                  </div>
                  <ChevronDown size={14} />                                                                                                                                                                   
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
                        className="block px-4 py-3 hover:bg-gray-100 text-sm transition-colors border-b border-gray-100"
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

            {/* MOBILE MENU BUTTON */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden h-10 w-10 md:h-11 md:w-11 border border-white/30 rounded-md flex items-center justify-center text-white hover:bg-white/10 transition-colors backdrop-blur-sm shadow-lg"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* ================= DESKTOP MEGA MENU ================= */}
      {openMega && (
        <div
          onMouseLeave={() => setOpenMega(null)}
          className="hidden lg:block bg-[#0A2B57] border-t border-white/10"
        >
          <div className={`${container} py-10 grid grid-cols-[240px_1fr] gap-10`}>

            {/* LEFT MENU */}
            <aside className="bg-[#0A4A6A] rounded-lg overflow-hidden shadow-xl">
              {(openMega === "topics" ? TOPICS : RESOURCES).map(item => (
                <button
                  key={item.slug}
                  onMouseEnter={() => setActiveSlug(item.slug)}
                  className={`w-full px-5 py-4 text-left uppercase font-bold flex justify-between transition-colors ${
                    activeSlug === item.slug
                      ? "bg-[#003B5C] text-white"
                      : "text-white hover:bg-[#0F5D86]"
                  }`}
                >
                  {item.label}
                  {activeSlug === item.slug && <span>›</span>}
                </button>
              ))}
            </aside>

            {/* RIGHT POSTS */}
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold uppercase text-white">  
                  {activeSlug.replace(/-/g, " ")}
                </h3>

                <Link
                  href={`/${activeSlug}`}
                  className="bg-red-600 px-4 py-2 text-sm font-bold text-white hover:bg-red-700 transition-colors rounded shadow-lg"
                >
                  See All →
                </Link>
              </div>

              <div className="grid grid-cols-4 gap-6">
                {filteredPosts.map(post => (
                  <article key={post.id}>
                    <Link href={`/post/${post.slug}`}>
                      <img
                        src={post.imageUrl || "/placeholder.svg"}
                        alt={post.title}
                        className="w-full h-40 object-cover mb-3 rounded hover:opacity-90 transition-opacity"
                      />
                    </Link>

                    <p className="text-xs uppercase text-[#6EC1E4] font-bold mb-1">
                      {post.badge || post.category?.name}
                    </p>

                    <h4 className="text-sm font-semibold text-white leading-snug hover:text-[#0073FF] transition-colors">
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
            className="fixed inset-0 bg-black/50 lg:hidden z-40"
            onClick={() => setIsMenuOpen(false)}
          />
          
          {/* Mobile Menu Panel */}
          <div className={`fixed ${isSticky ? "top-[80px] md:top-[100px]" : "top-[90px] md:top-[120px]"} left-0 right-0 bottom-0 bg-[#0A2B57] lg:hidden z-50 overflow-y-auto`}>
            <nav className="py-4">
              
              {/* Topics Section */}
              <div className="border-b border-white/10">
                <button
                  onClick={() => setMobileActiveMenu(mobileActiveMenu === "topics" ? null : "topics")}
                  className="w-full px-6 py-4 text-white font-semibold flex items-center justify-between hover:bg-white/5 transition-colors"
                >
                  <span>Topics</span>
                  <ChevronDown 
                    size={18} 
                    className={`transition-transform ${mobileActiveMenu === "topics" ? "rotate-180" : ""}`}
                  />
                </button>
                
                {mobileActiveMenu === "topics" && (
                  <div className="bg-[#0A4A6A] px-4 py-2">
                    {TOPICS.map(item => (
                      <Link
                        key={item.slug}
                        href={`/${item.slug}`}
                        className="flex items-center justify-between px-4 py-3 text-white hover:bg-white/10 transition-colors rounded"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <span>{item.label}</span>
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
                  className="w-full px-6 py-4 text-white font-semibold flex items-center justify-between hover:bg-white/5 transition-colors"
                >
                  <span>Resources</span>
                  <ChevronDown 
                    size={18} 
                    className={`transition-transform ${mobileActiveMenu === "resources" ? "rotate-180" : ""}`}
                  />
                </button>
                
                {mobileActiveMenu === "resources" && (
                  <div className="bg-[#0A4A6A] px-4 py-2">
                    {RESOURCES.map(item => (
                      <Link
                        key={item.slug}
                        href={`/${item.slug}`}
                        className="flex items-center justify-between px-4 py-3 text-white hover:bg-white/10 transition-colors rounded"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <span className="text-sm">{item.label}</span>
                        <ChevronRight size={16} />
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Direct Links */}
              <Link
                href="/articles"
                className="block px-6 py-4 text-white font-semibold border-b border-white/10 hover:bg-white/5 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Magazine
              </Link>

              <Link
                href="/suppliers"
                className="block px-6 py-4 text-white font-semibold border-b border-white/10 hover:bg-white/5 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Directory
              </Link>

              <Link
                href="/mmtchats"
                className="block px-6 py-4 text-white font-semibold border-b border-white/10 hover:bg-white/5 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                MMT CHATS
              </Link>

              <Link
                href="/events"
                className="block px-6 py-4 text-white font-semibold border-b border-white/10 hover:bg-white/5 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Events
              </Link>

              <Link
                href="/feed"
                className="block px-6 py-4 text-white font-semibold border-b border-white/10 hover:bg-white/5 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Jobs
              </Link>

              {/* Mobile Login Button */}
              {!user && (
                <div className="px-6 py-5">
                  <Link
                    href="/login"
                    className="block w-full py-3.5 bg-[#0073FF] text-white rounded-md text-center font-semibold hover:bg-[#0060DD] transition-colors shadow-lg"
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