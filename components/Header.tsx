"use client"

import Link from "next/link"
import Image from "next/image"
import { Menu, X, ChevronDown } from "lucide-react"
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

  const container = "max-w-[1320px] mx-auto px-[15px]"

  /* ================= RENDER ================= */
  return (
    <header className={`fixed top-0 left-0 w-full z-50 ${isSticky ? "bg-[#0A2B57] shadow-lg" : "bg-[#0A2B57]"}`}>

      {/* ================= TOP BAR ================= */}
      <div className={`${container} ${isSticky ? "h-[96px]" : "h-[142px]"} transition-all`}>
        <div className="grid grid-cols-[280px_1fr_auto] items-center h-full gap-10">

          {/* LOGO */}
          <Link href="/">
            <Image
              src="/images/moldinglogo2.png"
              alt="Logo"
              width={260}
              height={110}
              priority
            />
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden lg:flex justify-center gap-8 text-white font-medium">
            <Link href="/">Home</Link>

            <button
              onMouseEnter={() => {
                setOpenMega("topics")
                setActiveSlug("engineer")
              }}
              className="flex items-center gap-1 hover:text-[#0073FF]"
            >
              Topics <ChevronDown size={14} />
            </button>

            <button
              onMouseEnter={() => {
                setOpenMega("resources")
                setActiveSlug("webinars")
              }}
              className="flex items-center gap-1 hover:text-[#0073FF]"
            >
              Resources <ChevronDown size={14} />
            </button>

            <Link href="/articles">Magazine</Link>

            <Link href="/suppliers">Directory</Link>
            <Link href="/mmtchats">MMT CHATS</Link>
          </nav>

          {/* AUTH / USER */}
          <div className="flex items-center gap-4 relative">

            {!user && (
              <>
                <Link
                  href="/login"
                  className="hidden md:flex h-10 px-5 bg-[#0073FF] text-white rounded-md text-sm font-semibold items-center"
                >
                  Login
                </Link>

                <Link
                  href="/signup"
                  className="hidden md:flex h-10 px-5 border border-white text-white rounded-md text-sm font-semibold items-center"
                >
                  Sign Up
                </Link>
              </>
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
                        user.role === "admin"
                          ? "/admin/dashboard"
                          : user.role === "recruiter"
                          ? "/recruiter/dashboard"
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

            {/* MOBILE MENU BUTTON */}
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
      {openMega && (
        <div
          onMouseLeave={() => setOpenMega(null)}
          className="bg-[#0A2B57]"
        >
          <div className={`${container} py-10 grid grid-cols-[240px_1fr] gap-10`}>

            {/* LEFT MENU */}
            <aside className="bg-[#0A4A6A]">
              {(openMega === "topics" ? TOPICS : RESOURCES).map(item => (
                <button
                  key={item.slug}
                  onMouseEnter={() => setActiveSlug(item.slug)}
                  className={`w-full px-5 py-4 text-left uppercase font-bold flex justify-between ${
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
                  href={`/${openMega}/${activeSlug}`}
                  className="bg-red-600 px-4 py-2 text-sm font-bold text-white"
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
                        className="w-full h-40 object-cover mb-3"
                      />
                    </Link>

                    <p className="text-xs uppercase text-[#6EC1E4] font-bold mb-1">
                      {post.badge || post.category?.name}
                    </p>

                    <h4 className="text-sm font-semibold text-white leading-snug">
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
    </header>
  )
}
