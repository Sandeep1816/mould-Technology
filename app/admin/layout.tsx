"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  FileText,
  PlusCircle,
  Folder,
  Users,
  LogOut,
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  // ✅ Protect all admin routes (except login)
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token && pathname !== "/admin/login") {
      router.push("/admin/login");
    }
  }, [pathname, router]);

  // ✅ Hide sidebar for login page
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* ✅ Sidebar */}
      <aside className="w-64 bg-indigo-800 text-white flex flex-col">
        <div className="p-5 border-b border-indigo-700">
          <h1 className="text-xl font-bold tracking-wide">Admin Panel</h1>
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
            href="/admin/posts/create"
            label="Create Post"
            icon={<PlusCircle size={18} />}
            active={pathname === "/admin/posts/create"}
          />
          <SidebarLink
            href="/admin/categories"
            label="Categories"
            icon={<Folder size={18} />}
            active={pathname === "/admin/categories"}
          />
          <SidebarLink
            href="/admin/authors"
            label="Authors"
            icon={<Users size={18} />}
            active={pathname === "/admin/authors"}
          />
          <SidebarLink
  href="/admin/banners"
  label="Banners"
  icon={<Folder size={18} />}
  active={pathname === "/admin/banners"}
/>

<SidebarLink
  href="/admin/banners/reorder"
  label="Reorder Banners"
  icon={<Folder size={18} />}
  active={pathname === "/admin/banners/reorder"}
/>

        </nav>

        <div className="p-4 border-t border-indigo-700">
          <button
            onClick={() => {
              localStorage.removeItem("token");
              router.push("/admin/login");
            }}
            className="flex items-center gap-2 text-sm font-medium text-white/90 hover:text-yellow-300 transition"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* ✅ Dynamic Page Content */}
      <main className="flex-1 p-8 overflow-y-auto">{children}</main>
    </div>
  );
}

function SidebarLink({
  href,
  label,
  icon,
  active,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
  active: boolean;
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
  );
}
