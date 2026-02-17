"use client"

import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Link from "next/link"
import {
  LayoutDashboard,
  FileText,
  Folder,
  LogOut,
} from "lucide-react"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()

  const [checking, setChecking] = useState(true)
  const [allowed, setAllowed] = useState(false)
  const [articlesOpen, setArticlesOpen] = useState(
  pathname.startsWith("/admin/posts") ||
  pathname.startsWith("/admin/articles")
)


  useEffect(() => {
    if (pathname === "/admin/login") {
      setAllowed(true)
      setChecking(false)
      return
    }

    const token = localStorage.getItem("token")
    const userRaw = localStorage.getItem("user")

    if (!token || !userRaw) {
      router.replace("/admin/login")
      return
    }

   if (!token || !userRaw || userRaw === "undefined") {
  localStorage.clear()
  router.replace("/admin/login")
  return
}

let user = null

try {
  user = JSON.parse(userRaw)
} catch {
  console.error("Invalid admin JSON")
  localStorage.clear()
  router.replace("/admin/login")
  return
}

if (user?.role !== "admin") {
  router.replace("/unauthorized")
  return
}


    if (user.role !== "admin") {
      router.replace("/unauthorized")
      return
    }

    setAllowed(true)
    setChecking(false)
  }, [pathname, router])

  if (checking) return null

  if (pathname === "/admin/login") {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen flex bg-[#F4F6FA]">

      {/* ================= SIDEBAR ================= */}
      <aside className="w-64 bg-[#0A2B57] text-[#E6ECF3] flex flex-col shadow-xl rounded-none">

        {/* BRAND */}
        <div className="px-6 py-5 border-b border-[#123A6F]">
          <h1 className="text-lg font-semibold tracking-wide">
            Admin Panel
          </h1>
          <p className="text-xs text-[#9FB2CC] mt-1">
            Mold Technology
          </p>
        </div>

        {/* NAV */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          <SidebarLink
            href="/admin/dashboard"
            label="Dashboard"
            icon={<LayoutDashboard size={18} />}
            active={pathname === "/admin/dashboard"}
          />

     {/* ================= TECH ARTICLES DROPDOWN ================= */}
<div>
  <button
    onClick={() => setArticlesOpen(!articlesOpen)}
    className={`flex items-center justify-between w-full px-4 py-2.5 rounded-md text-sm font-medium transition-all
      ${
        pathname.startsWith("/admin/posts") ||
        pathname.startsWith("/admin/articles")
          ? "bg-[#143D7A] text-white"
          : "text-[#9FB2CC] hover:bg-[#0F3A70] hover:text-white"
      }
    `}
  >
    <div className="flex items-center gap-3">
      <Folder size={18} />
      <span>Tech Articles</span>
    </div>
    <span className="text-xs">
      {articlesOpen ? "▾" : "▸"}
    </span>
  </button>

  {articlesOpen && (
    <div className="ml-6 mt-1 space-y-1">
      <SidebarLink
        href="/admin/posts"
        label="All Posts"
        icon={<FileText size={16} />}
        active={pathname === "/admin/posts"}
      />

      <SidebarLink
        href="/admin/articles"
        label="Article Moderation"
        icon={<Folder size={16} />}
        active={pathname === "/admin/articles"}
      />
    </div>
  )}
</div>


          <SidebarLink
            href="/admin/banners"
            label="Banners"
            icon={<Folder size={18} />}
            active={pathname === "/admin/banners"}
          />

          <SidebarLink
            href="/admin/events"
            label="Events"
            icon={<Folder size={18} />}
            active={pathname === "/admin/events"}
          />

          <SidebarLink
            href="/admin/jobs"
            label="Jobs"
            icon={<Folder size={18} />}
            active={pathname === "/admin/jobs"}
          />

       

          <SidebarLink
            href="/admin/directories"
            label="Supplier Listing"
            icon={<Folder size={18} />}
            active={pathname === "/admin/directories"}
          />

           <SidebarLink
            href="/admin/magazines"
            label="Magazine"
            icon={<Folder size={18} />}
            active={pathname === "/admin/magazines"}
          />
        </nav>

        {/* FOOTER */}
        <div className="px-5 py-4 border-t border-[#123A6F]">
          <button
            onClick={() => {
              localStorage.removeItem("token")
              localStorage.removeItem("user")
              router.push("/admin/login")
            }}
            className="flex items-center gap-3 text-sm font-medium text-[#E6ECF3]/90 hover:text-[#C9A227] transition"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* ================= CONTENT ================= */}
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          {children}
        </div>
      </main>
    </div>
  )
}

/* ================= SIDEBAR LINK ================= */

function SidebarLink({
  href,
  label,
  icon,
  active,
}: {
  href: string
  label: string
  icon: React.ReactNode
  active: boolean
}) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-4 py-2.5 rounded-md text-sm font-medium transition-all
        ${
          active
            ? "bg-[#143D7A] text-white shadow-sm"
            : "text-[#9FB2CC] hover:bg-[#0F3A70] hover:text-white"
        }
      `}
    >
      {icon}
      <span>{label}</span>
    </Link>
  )
}
