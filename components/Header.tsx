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
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [mobileActiveMenu, setMobileActiveMenu] = useState<MegaType>(null)

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
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts?limit=1000`)
      .then(res => res.json())
      .then(data => {
        const posts = Array.isArray(data?.data) ? data.data : []
        setAllPosts(posts)
      })
  }, [])

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
    <header className="fixed top-0 left-0 w-full z-50 
bg-gradient-to-r from-[#9b001f] to-[#ff002f] 
shadow-lg overflow-hidden">


      {/* 🔴 Subtle Red Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(254,3,64,0.15),_transparent_60%)] pointer-events-none"></div>

      {/* ================= TOP BAR ================= */}
      <div className={`relative z-10 ${container} h-[90px] flex items-center`}>
        <div className="grid grid-cols-[1fr_auto] lg:grid-cols-[320px_1fr_auto] items-center w-full gap-6 lg:gap-10">

          {/* LOGO */}
          <Link href="/" className="flex items-center justify-start">
            <Image
              src="/images/whitelogo.png"
              alt="MoldMaking Technology Logo"
              width={300}
              height={127}
              priority
              className="h-[75px] w-auto"
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

            <Link href="/articles" className="hover:text-[#0073FF]">Magazine</Link>
            <Link href="/suppliers" className="hover:text-[#0073FF]">Directory</Link>
            <Link href="/mmtchats" className="hover:text-[#0073FF]">MMT CHATS</Link>
            <Link href="/events" className="hover:text-[#0073FF]">Events</Link>
            <Link href="/feed" className="hover:text-[#0073FF]">Jobs</Link>
          </nav>

          {/* RIGHT SIDE */}
          <div className="flex items-center justify-end gap-3">

            {!user && (
              <Link
                href="/login"
                className="hidden md:flex h-10 px-5 bg-[#0073FF] text-white rounded-md font-semibold items-center hover:bg-[#0060DD] transition-colors"
              >
                Login
              </Link>
            )}

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden h-10 w-10 border border-white/30 rounded-md flex items-center justify-center text-white hover:bg-white/10 transition-colors"
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
          className="hidden lg:block bg-black/95 border-t border-white/10 backdrop-blur-xl"
        >
          <div className={`${container} py-10 grid grid-cols-[240px_1fr] gap-10`}>

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
                </button>
              ))}
            </aside>

            <div>
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

                    <h4 className="text-sm font-semibold text-white leading-snug hover:text-[#0073FF]">
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
