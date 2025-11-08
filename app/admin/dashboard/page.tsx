"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const [stats, setStats] = useState({ posts: 0, categories: 0, authors: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return router.push("/admin/login");

    async function fetchStats() {
      try {
        const [p, c, a] = await Promise.all([
          fetch("https://newsprk-backend.onrender.com/api/posts"),
          fetch("https://newsprk-backend.onrender.com/api/categories"),
          fetch("https://newsprk-backend.onrender.com/api/authors"),
        ]);
        const [pd, cd, ad] = await Promise.all([p.json(), c.json(), a.json()]);
        setStats({
          posts: pd.data?.length ?? pd.length ?? 0,
          categories: cd.data?.length ?? cd.length ?? 0,
          authors: ad.data?.length ?? ad.length ?? 0,
        });
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, [router]);

  if (loading)
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-indigo-700 text-white py-4 shadow">
        <div className="container mx-auto px-6 flex justify-between">
          <h1 className="text-xl font-semibold">Admin Dashboard</h1>
          <button
            onClick={() => {
              localStorage.removeItem("token");
              router.push("/admin/login");
            }}
            className="bg-white text-indigo-700 px-4 py-1 rounded-md font-medium"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="p-8 grid md:grid-cols-3 gap-6">
        <StatCard title="Total Posts" value={stats.posts} />
        <StatCard title="Categories" value={stats.categories} />
        <StatCard title="Authors" value={stats.authors} />
      </main>
    </div>
  );
}

function StatCard({ title, value }: { title: string; value: number }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow text-center">
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      <p className="text-3xl font-bold text-indigo-700">{value}</p>
    </div>
  );
}
