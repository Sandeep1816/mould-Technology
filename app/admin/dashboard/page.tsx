"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  FileText,
  PlusCircle,
  Folder,
  Users,
  LogOut,
} from "lucide-react";

export default function Dashboard() {
  const router = useRouter();
  const pathname = usePathname();

  const [stats, setStats] = useState({ posts: 0, categories: 0, authors: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return router.push("/admin/login");

    async function fetchStats() {
      try {
        // ✅ Fetch posts with limit to ensure full count
        const [p, c, a] = await Promise.all([
          fetch("https://newsprk-backend.onrender.com/api/posts?limit=1000"),
          fetch("https://newsprk-backend.onrender.com/api/categories"),
          fetch("https://newsprk-backend.onrender.com/api/authors"),
        ]);
        const [pd, cd, ad] = await Promise.all([p.json(), c.json(), a.json()]);

        setStats({
          posts: pd?.data?.length ?? pd.length ?? 0,
          categories: cd?.data?.length ?? cd.length ?? 0,
          authors: ad?.data?.length ?? ad.length ?? 0,
        });
      } catch (e) {
        console.error("Error fetching stats:", e);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, [router]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600 text-lg">
        Loading Dashboard...
      </div>
    );

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

      {/* ✅ Main Dashboard */}
      <main className="flex-1 p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-8">
          Admin Dashboard Overview
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard title="Total Posts" value={stats.posts} />
          <StatCard title="Categories" value={stats.categories} />
          <StatCard title="Authors" value={stats.authors} />
        </div>
      </main>
    </div>
  );
}

/* 🔹 Sidebar Link Component */
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

/* 🔹 Stats Card Component */
function StatCard({ title, value }: { title: string; value: number }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 text-center hover:shadow-md transition">
      <h3 className="text-lg font-semibold text-gray-700 mb-2">{title}</h3>
      <p className="text-4xl font-bold text-indigo-700">{value}</p>
    </div>
  );
}
