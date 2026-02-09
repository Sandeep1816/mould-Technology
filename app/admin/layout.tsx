"use client"

import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Link from "next/link"
import {
  LayoutDashboard,
  FileText,
  PlusCircle,
  Folder,
  Users,
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

  // ✅ ADMIN ROLE GUARD (DO NOT REMOVE SIDEBAR)
  useEffect(() => {
    // allow admin login page
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

    const user = JSON.parse(userRaw)

    if (user.role !== "admin") {
      router.replace("/unauthorized")
      return
    }

    setAllowed(true)
    setChecking(false)
  }, [pathname, router])

  // ⛔ Prevent render while checking
  if (checking) return null

  // ✅ Login page → no sidebar
  if (pathname === "/admin/login") {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* ================= SIDEBAR ================= */}
      <aside className="w-64 bg-indigo-800 text-white flex flex-col">
        <div className="p-5 border-b border-indigo-700">
          <h1 className="text-xl font-bold tracking-wide">
            Admin Panel
          </h1>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          <SidebarLink
            href="/admin/dashboard"
            label="Dashboard"
            icon={<LayoutDashboard size={18} />}
            active={pathname === "/admin/dashboard"}
          />

          <SidebarLink
            href="/admin/posts"
            label="All Posts"
            icon={<FileText size={18} />}
            active={pathname === "/admin/posts"}
          />

       

 



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
            href="/admin/articles"
            label="Articles"
            icon={<Folder size={18} />}
            active={pathname === "/admin/articles"}
          />

                    <SidebarLink
            href="/admin/directories"
            label="Directories"
            icon={<Folder size={18} />}
            active={pathname === "/admin/directories"}
          />


        </nav>

        <div className="p-4 border-t border-indigo-700">
          <button
            onClick={() => {
              localStorage.removeItem("token")
              localStorage.removeItem("user")
              router.push("/admin/login")
            }}
            className="flex items-center gap-2 text-sm font-medium text-white/90 hover:text-yellow-300 transition"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* ================= CONTENT ================= */}
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
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
      className={`flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium transition-all ${
        active
          ? "bg-indigo-600 text-white"
          : "text-gray-300 hover:bg-indigo-700 hover:text-white"
      }`}
    >
      {icon}
      <span>{label}</span>
    </Link>
  )
}
