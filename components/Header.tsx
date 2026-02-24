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
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [openUserMenu, setOpenUserMenu] = useState(false)

  const [allPosts, setAllPosts] = useState<Post[]>([])
  const [activeSlug, setActiveSlug] = useState("engineer")

  const container = "max-w-[1320px] mx-auto px-4 md:px-6 lg:px-[15px]"

  /* ================= INIT ================= */
  useEffect(() => {
    const stored = localStorage.getItem("user")
    if (stored) setUser(JSON.parse(stored))
  }, [])

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts?limit=50`)
      .then(res => res.json())
      .then(data => {
        const posts = Array.isArray(data?.data) ? data.data : []
        setAllPosts(posts)
      })
  }, [])

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "unset"
  }, [isMenuOpen])

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

  return (
    <header className="fixed top-0 left-0 w-full z-50 shadow-lg">

      {/* ================= TOP BAR ================= */}
      <div className="flex h-[90px] w-full">

        {/* LEFT WHITE LOGO SECTION */}
        <div className="bg-white flex items-center px-[45px] shrink-0 border-r border-gray-200">
          <Link href="/" className="flex items-center">
            <Image
              src="/images/tooling-red.png"
              alt="MoldMaking Technology Logo"
              width={300}
              height={127}
              priority
              className="h-[75px] w-auto"
            />
          </Link>
        </div>

    {/* RIGHT BLUE NAV SECTION */}
<div className="relative flex-1 bg-[#0F5B78]">

  {/* Slanted Left Edge */}
  <div className="absolute left-0 top-0 h-full w-12 bg-[#0F5B78] -translate-x-6 skew-x-[-20deg]" />

  <div className={`${container} h-full flex items-center justify-between relative`}>

    {/* DESKTOP NAV */}
    <nav className="hidden lg:flex items-center ml-16 gap-8 text-white font-semibold text-sm tracking-wide">

      <button
        onMouseEnter={() => {
          setOpenMega("topics")
          setActiveSlug("engineer")
        }}
        className="group relative flex items-center gap-1"
      >
        Topics <ChevronDown size={14} />
        <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-white transition-all group-hover:w-full" />
      </button>

      <button
        onMouseEnter={() => {
          setOpenMega("resources")
          setActiveSlug("webinars")
        }}
        className="group relative flex items-center gap-1"
      >
        Resources <ChevronDown size={14} />
        <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-white transition-all group-hover:w-full" />
      </button>

      <Link href="/articles" className="group relative">
        Magazine
        <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-white transition-all group-hover:w-full" />
      </Link>

      <Link href="/suppliers" className="group relative">
        Directory
        <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-white transition-all group-hover:w-full" />
      </Link>

      <Link href="/mmtchats" className="group relative">
        Industry Talks
        <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-white transition-all group-hover:w-full" />
      </Link>

      <Link href="/events" className="group relative">
        Events
        <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-white transition-all group-hover:w-full" />
      </Link>

      <Link href="/feed" className="group relative">
        Jobs
        <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-white transition-all group-hover:w-full" />
      </Link>

    </nav>

    {/* RIGHT SIDE */}
    <div className="flex items-center gap-3 relative">

      {!user && (
        <Link
          href="/login"
          className="hidden md:flex h-10 px-5 bg-[#E11D2E] text-white rounded-md font-semibold items-center hover:bg-[#C41524] transition-colors shadow-md"
        >
          Login
        </Link>
      )}

      {user && (
        <div className="relative hidden md:block">
          <button
            onClick={() => setOpenUserMenu(!openUserMenu)}
            className="flex items-center gap-3 bg-white/10 px-4 py-2 rounded-md text-white hover:bg-white/20 transition border border-white/20"
          >
           <div className="relative w-8 h-8">
  <Image
    src="https://i.pravatar.cc/40"
    alt="User avatar"
    fill
    className="rounded-full object-cover border-2 border-white/30"
    sizes="32px"
  />
</div>

            <div className="text-left">
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

              <div className="absolute right-0 mt-2 w-52 bg-white rounded-lg shadow-2xl border border-gray-200 text-black z-50 overflow-hidden">
                <Link
                  href={
                    user.role === "admin"
                      ? "/admin/dashboard"
                      : user.role === "recruiter"
                      ? "/recruiter/dashboard"
                      : "/candidate/feed"
                  }
                  className="block px-4 py-3 hover:bg-gray-100 text-sm transition border-b"
                  onClick={() => setOpenUserMenu(false)}
                >
                  Dashboard
                </Link>

                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition font-medium"
                >
                  Logout
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {/* MOBILE BUTTON */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="lg:hidden h-10 w-10 border border-white/30 rounded-md flex items-center justify-center text-white hover:bg-white/10 transition-colors"
      >
        {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

    </div>

  </div>
</div>

      </div>

      {/* ================= DESKTOP MEGA MENU ================= */}
      {openMega && (
        <div
          onMouseLeave={() => setOpenMega(null)}
          className="hidden lg:block bg-[#0A4A6A] border-t border-white/10"
        >
          <div className={`${container} py-10 grid grid-cols-[240px_1fr] gap-10`}>

            <aside className="bg-[#083A54] rounded-lg overflow-hidden shadow-xl">
              {(openMega === "topics" ? TOPICS : RESOURCES).map(item => (
                <button
                  key={item.slug}
                  onMouseEnter={() => setActiveSlug(item.slug)}
                  className={`w-full px-5 py-4 text-left uppercase font-bold transition-colors ${
                    activeSlug === item.slug
                      ? "bg-[#062E45] text-white"
                      : "text-white hover:bg-[#0F5D86]"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </aside>

            <div className="grid grid-cols-4 gap-6">
              {filteredPosts.map(post => (
                <article key={post.id}>
                  <Link href={`/post/${post.slug}`}>
                    <div className="relative w-full h-40 mb-3">
  <Image
    src={post.imageUrl || "/placeholder.svg"}
    alt={post.title}
    fill
    className="object-cover rounded hover:opacity-90 transition-opacity"
    sizes="(max-width:1024px) 100vw, 25vw"
  />
</div>
                  </Link>

                  <h4 className="text-sm font-semibold text-white leading-snug hover:text-[#E11D2E]">
                    <Link href={`/post/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h4>
                </article>
              ))}
            </div>

          </div>
        </div>
      )}

      {/* ================= MOBILE MENU ================= */}
      {isMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 lg:hidden z-40"
            onClick={() => setIsMenuOpen(false)}
          />

          <div className="fixed top-[90px] left-0 right-0 bottom-0 bg-[#0F5B78] lg:hidden z-50 overflow-y-auto">
            <nav className="py-4 text-white font-semibold">

              <Link href="/articles" className="block px-6 py-4 border-b border-white/10 hover:bg-white/10" onClick={() => setIsMenuOpen(false)}>Magazine</Link>
              <Link href="/suppliers" className="block px-6 py-4 border-b border-white/10 hover:bg-white/10" onClick={() => setIsMenuOpen(false)}>Directory</Link>
              <Link href="/mmtchats" className="block px-6 py-4 border-b border-white/10 hover:bg-white/10" onClick={() => setIsMenuOpen(false)}>Industry Talks</Link>
              <Link href="/events" className="block px-6 py-4 border-b border-white/10 hover:bg-white/10" onClick={() => setIsMenuOpen(false)}>Events</Link>
              <Link href="/feed" className="block px-6 py-4 border-b border-white/10 hover:bg-white/10" onClick={() => setIsMenuOpen(false)}>Jobs</Link>

              {!user && (
                <div className="px-6 py-5">
                  <Link
                    href="/login"
                    className="block w-full py-3 bg-[#E11D2E] text-white rounded-md text-center font-semibold hover:bg-[#C41524]"
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
